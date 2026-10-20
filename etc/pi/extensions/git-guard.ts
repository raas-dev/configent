/**
 * Shared-Checkout Git Guard
 *
 * Ports oh-my-pi's `bash.gitGuard` behaviour to pi. Agents sharing one checkout
 * lose work when one of them runs a git command that discards uncommitted
 * changes or moves HEAD. This extension refuses, in the bash tool:
 *
 * - `stash`, except the read-only `stash list` and `stash show`;
 * - `reset --hard`, and `reset` to a commit other than HEAD's;
 * - `checkout`, `switch`, and working-tree `restore`, unless a merge, rebase,
 *   cherry-pick, or revert is underway, where they pick conflict sides — and
 *   even then not forced (`-f`, `--force`, `--discard-changes`) or over the
 *   whole tree (`.`, `:/`, `*`).
 *
 * Index-only commands always run: `reset [<path>…]` and `restore --staged` only
 * unstage. Nothing else about git is judged.
 *
 * On by default. Turn it off for one session with `PI_GIT_GUARD=0`, or
 * persistently with `/git-guard off` (global settings) or `/git-guard project-off`
 * (project settings). See `enabled`.
 *
 * One behavioural gap against oh-my-pi is expansion. oh-my-pi guards at the
 * shell's git builtin, after expansion, so `s=stash && git $s` is judged as a
 * stash. A `tool_call` extension sees the command line before the shell runs
 * it, so `git $s` is opaque here and is allowed. Everything spelled literally
 * on the command line is judged — including `$(…)`, backticks, braces,
 * `cd`-relative paths, `git -C`, and `git` reached through `env`/`sudo`/`command`.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import type {
	ExtensionAPI,
	ExtensionContext,
	ToolCallEvent,
	ToolCallEventResult,
} from "@earendil-works/pi-coding-agent";

// ── tokenizer ────────────────────────────────────────────────────────────────

/** `word` is a token bash would expand; `op` is punctuation or an operator. */
interface Token {
	kind: "word" | "op";
	text: string;
	/** A word that begins a simple command, as `do` and `then` do. */
	sep: boolean;
}

/** Two-character operators, longest first. */
const PAIRS = [";;", "&&", "||", "|&", ";;&", ";&"];
/** Single-character operators. */
const CHARS = new Set([";", "|", "&", "(", ")", "{", "}", "\n", "<", ">", "`"]);
/** Words that begin a simple command of their own. */
const KEYWORDS = new Set([
	"do",
	"then",
	"else",
	"elif",
	"if",
	"fi",
	"while",
	"until",
	"for",
	"select",
	"case",
	"function",
	"!",
	"{",
	"}",
	"time",
]);

/**
 * Splits a command line into words and operator boundaries. Quoted regions are
 * kept verbatim, so an expansion we cannot resolve stays a literal: the guard
 * allows what it cannot read rather than block blindly.
 */
function tokenize(command: string): Token[] {
	const tokens: Token[] = [];
	let word = "";
	let open = false;

	const flush = (sep = false) => {
		if (!open) return;
		tokens.push({ kind: "word", text: word, sep });
		word = "";
		open = false;
	};

	for (let at = 0; at < command.length; at++) {
		const ch = command[at]!;

		if (ch === "\\" && at + 1 < command.length) {
			word += command[at + 1]!;
			open = true;
			at++;
			continue;
		}

		// A quote runs to its partner, or to the end of input when unclosed.
		if (ch === "'" || ch === '"' || ch === "`") {
			const end = closingQuote(command, at, ch);
			word += command.slice(at, end + 1);
			open = true;
			at = end;
			continue;
		}

		// `$(…)`, `${…}`, `<(…)`: one token, nested body included.
		if (ch === "$" || ch === "<") {
			const opener = command[at + 1];
			const close = opener === "(" ? ")" : opener === "{" ? "}" : opener;
			if (close === ")" || close === "}") {
				const end = closingQuote(command, at + 1, close);
				word += command.slice(at, end + 1);
				open = true;
				at = end;
				continue;
			}
		}

		if (ch === "#" && !open) {
			const eol = command.indexOf("\n", at);
			if (eol === -1) break;
			at = eol - 1;
			continue;
		}

		if (ch === " " || ch === "\t" || ch === "\r") {
			flush();
			continue;
		}

		const pair = command.slice(at, at + 2);
		if (PAIRS.includes(pair)) {
			flush();
			tokens.push({ kind: "op", text: pair, sep: true });
			at++;
			continue;
		}

		if (CHARS.has(ch)) {
			flush();
			tokens.push({ kind: "op", text: ch, sep: true });
			continue;
		}

		word += ch;
		open = true;
	}

	flush();
	return tokens;
}

/** Index of the delimiter closing one opened at `from`, or the last character. */
function closingQuote(text: string, from: number, close: string): number {
	let depth = 0;
	for (let at = from; at < text.length; at++) {
		const ch = text[at]!;
		if (ch === "\\") {
			at++;
			continue;
		}
		if (ch === close) {
			if (depth === 0) return at;
			depth--;
		} else if (ch === "(" || ch === "{") {
			depth++;
		}
	}
	return text.length;
}

// ── locating the gits a shell would run ──────────────────────────────────────

/** A `git` as a shell would run it: git's own words, and the directory it runs in. */
export interface Invocation {
	args: string[];
	cwd: string;
}

/** Programs that only launch another program. */
const WRAPPERS = new Set(["command", "env", "sudo", "nohup", "exec", "time", "builtin", "stdbuf", "nice", "timeout"]);
/** Wrapper flags whose value is the next word rather than `=value`. */
const WRAPPER_VALUED_FLAGS = new Set(["-u", "-g", "-p", "-C", "-k", "-r", "-n", "-t", "-o", "-e"]);

/** Finds every `git` in `command`, in the directory the shell would run it in. */
export function findInvocations(command: string, cwd: string): Invocation[] {
	const found: Invocation[] = [];
	walk(tokenize(command), cwd, found);
	return found;
}

function walk(tokens: Token[], cwd: string, found: Invocation[]) {
	let dir = cwd;
	let at = 0;

	while (at < tokens.length) {
		const token = tokens[at]!;
		if (token.sep) {
			// `cd` persists: the directory it names is where later words run.
			dir = directoryAfter(tokens, at - 1, dir);
			at++;
			continue;
		}
		if (token.kind === "op") {
			at++;
			continue;
		}

		// One simple command: every word up to the next operator or separator.
		const words: string[] = [];
		while (at < tokens.length) {
			const word = tokens[at]!;
			if (word.kind === "op" || word.sep) break;
			words.push(word.text);
			at++;
		}

		const program = programIndex(words);
		if (program === -1) continue;
		const name = basename(stripQuotes(words[program]!));
		if (name === "git") {
			found.push({ args: words.slice(program + 1).map(stripQuotes), cwd: dir });
		} else if (name === "cd") {
			dir = resolve(dir, expandHome(words[program + 1]));
		}
	}
}

/**
 * Index of the word naming the program, skipping prefixes that only launch
 * something else: `env FOO=bar sudo -u root command git …`.
 */
function programIndex(words: string[]): number {
	let at = 0;
	while (at < words.length) {
		const word = stripQuotes(words[at]!);
		if (!WRAPPERS.has(word) && !/^[A-Za-z_][A-Za-z0-9_]*=/.test(word)) break;
		// A flag may take its value as the next word.
		if (WRAPPER_VALUED_FLAGS.has(word)) at++;
		at++;
	}
	return at < words.length ? at : -1;
}

/** Directory a command ending at `end` leaves behind; only `cd` changes it. */
function directoryAfter(tokens: Token[], end: number, dir: string): string {
	let target: string | undefined;
	let name: string | undefined;
	for (let at = end; at >= 0; at--) {
		const token = tokens[at]!;
		if (token.kind !== "word") continue;
		if (target === undefined && !token.text.startsWith("-")) {
			target = token.text;
			continue;
		}
		name = token.text;
		break;
	}
	if (name !== undefined && basename(stripQuotes(name)) === "cd") {
		return resolve(dir, expandHome(target));
	}
	return dir;
}

/** Program name without its directory, so `/usr/bin/git` is judged too. */
function stripQuotes(word: string): string {
	return word.replace(/^['"$(]+|['")]+$/g, "");
}

function expandHome(word: string | undefined): string {
	if (word === undefined || word === "") return ".";
	if (word === "~") return homedir();
	if (word.startsWith("~/")) return join(homedir(), word.slice(2));
	return stripQuotes(word);
}

// ── reading git's arguments ──────────────────────────────────────────────────

/** A git subcommand the guard judges. */
type Sub = "stash" | "reset" | "checkout" | "switch" | "restore";

const SUBS: Sub[] = ["stash", "reset", "checkout", "switch", "restore"];

/** Short and long options whose value may be the next word. */
const VALUED: Record<Sub, { short: string; long: string[] }> = {
	stash: { short: "", long: [] },
	reset: { short: "U", long: ["pathspec-from-file", "unified", "inter-hunk-context"] },
	checkout: {
		short: "bBU",
		long: ["orphan", "conflict", "pathspec-from-file", "unified", "inter-hunk-context"],
	},
	switch: { short: "cC", long: ["orphan", "conflict"] },
	restore: {
		short: "sU",
		long: ["source", "conflict", "pathspec-from-file", "unified", "inter-hunk-context"],
	},
};

export type Arg =
	| { kind: "long"; name: string }
	| { kind: "short"; flag: string }
	| { kind: "operand"; value: string }
	| { kind: "pathspec"; value: string };

/**
 * Splits a subcommand's arguments the way git's parse-options reads them, so an
 * option value is never mistaken for an operand.
 */
function scan(sub: Sub, args: string[]): Arg[] {
	const valued = VALUED[sub];
	const scanned: Arg[] = [];
	let options = true;

	for (let at = 0; at < args.length; at++) {
		const arg = args[at]!;
		if (arg === "--") {
			for (at++; at < args.length; at++) scanned.push({ kind: "pathspec", value: args[at]! });
			break;
		}
		if (!options) {
			scanned.push({ kind: "operand", value: arg });
		} else if (arg === "--end-of-options") {
			options = false;
		} else if (arg.startsWith("--")) {
			const eq = arg.indexOf("=");
			const name = eq === -1 ? arg.slice(2) : arg.slice(2, eq);
			if (eq === -1 && valued.long.includes(name)) at++;
			scanned.push({ kind: "long", name });
		} else if (arg.startsWith("-") && arg.length > 1) {
			const bundle = arg.slice(1);
			for (let pos = 0; pos < bundle.length; pos++) {
				const flag = bundle[pos]!;
				scanned.push({ kind: "short", flag });
				if (valued.short.includes(flag)) {
					// The value is the rest of the bundle, else the next word.
					if (pos + 1 === bundle.length) at++;
					break;
				}
			}
		} else {
			scanned.push({ kind: "operand", value: arg });
		}
	}
	return scanned;
}

/** `git [<global options>] <sub> <args>…` with a guarded subcommand. */
export interface Parsed {
	/** `-C` directories, applied in order. */
	dirs: string[];
	/** `--git-dir`/`--work-tree` point git at another repository. */
	redirected: boolean;
	sub: Sub;
	args: string[];
}

const GLOBAL_VALUED = new Set(["-C", "--git-dir", "--work-tree", "-c", "--config-env", "--namespace", "--super-prefix", "--attr-source"]);

export function parseInvocation(args: string[]): Parsed | undefined {
	const dirs: string[] = [];
	let redirected = false;

	for (let at = 0; at < args.length; at++) {
		const arg = args[at]!;
		if (arg === "-C") {
			const dir = args[at + 1];
			if (dir === undefined) return undefined;
			dirs.push(dir);
			at++;
		} else if (arg === "--git-dir" || arg === "--work-tree") {
			redirected = true;
			at++;
		} else if (GLOBAL_VALUED.has(arg)) {
			at++;
		} else if (arg.startsWith("--git-dir=") || arg.startsWith("--work-tree=")) {
			redirected = true;
		} else if (arg.startsWith("-")) {
			// A valueless global option.
		} else {
			const sub = SUBS.find((name) => name === arg);
			if (!sub) return undefined;
			return { dirs, redirected, sub, args: args.slice(at + 1) };
		}
	}
	return undefined;
}

export type Verdict =
	| { kind: "allow" }
	| { kind: "stash" }
	/** Discards the working tree or index wholesale; refused even mid-conflict. */
	| { kind: "destructive" }
	/** `reset` to this revision without a pathspec: moves HEAD unless it names HEAD's commit. */
	| { kind: "resetTo"; rev: string }
	/** Rewrites working-tree files or switches branches; allowed only mid-conflict. */
	| { kind: "conflictOnly" };

export function classify(sub: Sub, args: string[]): Verdict {
	if (sub === "stash") {
		return args[0] === "list" || args[0] === "show" ? { kind: "allow" } : { kind: "stash" };
	}
	const scanned = scan(sub, args);
	return sub === "reset" ? classifyReset(scanned) : classifyTreeWrite(sub, scanned);
}

/**
 * `reset` moves HEAD only in its `reset [<mode>] <commit>` form: one revision
 * and no pathspec. With paths, a pathspec file, or `--patch` it rewrites index
 * entries only.
 */
function classifyReset(scanned: Arg[]): Verdict {
	let hard = false;
	let indexOnly = false;
	const operands: string[] = [];

	for (const arg of scanned) {
		if (arg.kind === "long") {
			if (arg.name === "hard") hard = true;
			if (arg.name === "patch" || arg.name === "pathspec-from-file") indexOnly = true;
		} else if (arg.kind === "short") {
			if (arg.flag === "p") indexOnly = true;
		} else if (arg.kind === "operand") {
			operands.push(arg.value);
		} else {
			indexOnly = true;
		}
	}

	if (hard) return { kind: "destructive" };
	const [rev] = operands;
	if (operands.length === 1 && !indexOnly && rev !== "HEAD" && rev !== "@") {
		return { kind: "resetTo", rev: rev! };
	}
	return { kind: "allow" };
}

/**
 * `checkout`, `switch`, and `restore` rewrite working-tree files or switch
 * branches — except `restore --staged` without `--worktree`, which only
 * unstages, and a bare `checkout`, which only reports.
 */
function classifyTreeWrite(sub: Sub, scanned: Arg[]): Verdict {
	if (sub === "checkout" && scanned.length === 0) return { kind: "allow" };

	let staged = false;
	let worktree = false;
	let forced = false;
	let wholeTree = false;

	for (const arg of scanned) {
		if (arg.kind === "short") {
			if ((sub === "checkout" || sub === "switch") && arg.flag === "f") forced = true;
			if (sub === "restore" && arg.flag === "S") staged = true;
			if (sub === "restore" && arg.flag === "W") worktree = true;
		} else if (arg.kind === "long") {
			if ((sub === "checkout" || sub === "switch") && arg.name === "force") forced = true;
			if (sub === "switch" && arg.name === "discard-changes") forced = true;
			if (sub === "restore" && arg.name === "staged") staged = true;
			if (sub === "restore" && arg.name === "worktree") worktree = true;
		} else if ((sub === "checkout" || sub === "restore") && isWholeTree(arg.value)) {
			wholeTree = true;
		}
	}

	if (staged && !worktree) return { kind: "allow" };
	if (forced || wholeTree) return { kind: "destructive" };
	return { kind: "conflictOnly" };
}

/**
 * Whether `spec` covers everything under the working tree: an empty path,
 * `.`, `*`, or a magic pathspec rooted at the repository or worktree top
 * (`:/`, `:(top)`).
 */
export function isWholeTree(spec: string): boolean {
	return (
		spec === "" ||
		spec === "." ||
		spec === "*" ||
		spec.startsWith(":/") ||
		spec.startsWith(":(top)")
	);
}

// ── repository reads ─────────────────────────────────────────────────────────

/** Environment variables that point git at a repository other than the cwd's. */
const REPO_LOCATION_VARS = new Set([
	"GIT_DIR",
	"GIT_WORK_TREE",
	"GIT_COMMON_DIR",
	"GIT_INDEX_FILE",
	"GIT_OBJECT_DIRECTORY",
	"GIT_ALTERNATE_OBJECT_DIRECTORIES",
]);

/** Git's own markers of an operation that a conflict exemption needs. */
const OPERATION_MARKERS = ["MERGE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD", "rebase-merge", "rebase-apply", "sequencer"];

type Git = ExtensionAPI["exec"];

async function gitDir(pi: ExtensionAPI, dir: string): Promise<string | undefined> {
	const { code, stdout } = await pi.exec("git", ["rev-parse", "--absolute-git-dir"], { cwd: dir });
	if (code !== 0) return undefined;
	const path = stdout.trim();
	return path === "" ? undefined : path;
}

/** Whether the repository at `dir` is mid-merge, -rebase, -cherry-pick, or -revert. */
async function midOperation(pi: ExtensionAPI, dir: string): Promise<boolean> {
	const root = await gitDir(pi, dir);
	if (root === undefined) return false;
	return OPERATION_MARKERS.some((marker) => existsSync(join(root, marker)));
}

/**
 * Whether `reset` to `rev` moves HEAD. A revision git cannot resolve is read as
 * a path, which only rewrites the index, so it is allowed.
 */
async function movesHead(pi: ExtensionAPI, dir: string, rev: string): Promise<boolean> {
	const target = await pi.exec("git", ["rev-parse", "--verify", "--quiet", `${rev}^{commit}`], { cwd: dir });
	if (target.code !== 0) return false;
	const head = await pi.exec("git", ["rev-parse", "--verify", "--quiet", "HEAD"], { cwd: dir });
	if (head.code !== 0) return true;
	return head.stdout.trim() !== target.stdout.trim();
}

// ── refusal messages ─────────────────────────────────────────────────────────

type Refusal = "stash" | "destructive" | "commitMove" | "outsideConflict" | "redirected";

function message(refusal: Refusal, sub: Sub): string {
	switch (refusal) {
		case "stash":
			return (
				"git stash is blocked by workspace policy — do not work around it.\n" +
				"This is a SHARED workspace; stash mutates the tree/index other concurrent agents rely on, silently trashing their work. " +
				"You cannot stash with unmerged paths anyway — resolve conflicts in place. Read-only `git stash list` and `git stash show` remain available.\n"
			);
		case "destructive":
			return (
				`git ${sub} is blocked: this form (--hard / --force / --discard-changes, or a whole-tree pathspec like \`.\`, \`:/\`, \`*\`) discards the working tree/index wholesale and would destroy other agents' uncommitted work — being mid-conflict does not make it safe.\n` +
				"Resolve conflicts with targeted forms instead: git checkout/restore --ours|--theirs <path>. " +
				"Unstage with git reset <path> or git restore --staged <path>.\n"
			);
		case "commitMove":
			return (
				"git reset to another commit is blocked: moving HEAD/the branch (e.g. `HEAD~1`, a sha, or a branch name) rewrites history other agents share.\n" +
				"Unstaging is allowed — drop the commit argument: git reset [-q] [--] <path> (or bare git reset to unstage everything), or git restore --staged <path>.\n"
			);
		case "outsideConflict":
			return (
				`git ${sub} is blocked by workspace policy — do not work around it.\n` +
				"This is a SHARED workspace; overwriting working-tree files or switching branches discards or strands uncommitted changes other concurrent agents rely on. " +
				"It is exempt only while a merge/rebase conflict is being resolved, and the repository is not in one.\n" +
				"Unstaging is always allowed: git reset [<path>] / git restore --staged <path>. To undo working-tree edits, edit forward; inspect history read-only with git diff/log/show.\n"
			);
		case "redirected":
			return (
				`git ${sub} is blocked: the conflict exemption checks the repository found from the working directory, and this command points git elsewhere ` +
				"(--git-dir / --work-tree / GIT_DIR / GIT_WORK_TREE / GIT_INDEX_FILE), so that repository's state cannot be verified.\n" +
				"Run it from inside the target checkout (cd or git -C) without overriding git's repository location.\n"
			);
	}
}

const GLOBAL_SETTINGS = join(homedir(), ".pi", "agent", "settings.json");

/** Read JSON, returning {} if missing or malformed. Cheap; re-read every call. */
function readJson(path: string): Record<string, unknown> {
	try {
		return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
	} catch {
		return {};
	}
}

/** Quote a JSON key, escaping any character the grammar requires. */
function jsonQuote(key: string): string {
	return `"${key.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** Render `value` as compact JSON for inline use. */
function jsonValue(value: unknown): string {
	return JSON.stringify(value);
}

/** Find the byte range of an existing `"key":` entry at top level, if any. */
function findKeyRange(text: string, key: string): { start: number; end: number; indent: string; trailing: string } | undefined {
	const quoted = jsonQuote(key);
	const re = new RegExp(`(^|\\n)([ \\t]*)${quoted}\\s*:`, "g");
	let match: RegExpExecArray | null;
	while ((match = re.exec(text)) !== null) {
		// Skip matches inside nested objects/arrays by counting braces from start of value onward.
		const valueStart = match.index + match[0].length - match[1].length;
		const depth = depthAt(text, valueStart);
		if (depth === 1) {
			const lineStart = match.index + (match[1] === "" ? 0 : match[1].length);
			const lineEnd = text.indexOf("\n", lineStart);
			const end = lineEnd === -1 ? text.length : lineEnd;
			const line = text.slice(lineStart, end);
			const trailingMatch = /,?\s*$/.exec(line);
			return {
				start: lineStart,
				end,
				indent: match[2],
				trailing: trailingMatch ? trailingMatch[0] : "",
			};
		}
	}
	return undefined;
}

/** Track brace/bracket depth through `text[0..i]` to tell whether the cursor is at top level (1). */
function depthAt(text: string, at: number): number {
	let depth = 0;
	for (let i = 0; i < at; i++) {
		const ch = text[i];
		if (ch === '"') {
			i = skipString(text, i);
			continue;
		}
		if (ch === "{" || ch === "[") depth++;
		else if (ch === "}" || ch === "]") depth--;
	}
	return depth;
}

/** Skip past a JSON string literal starting at index `i`. Returns the index of the closing quote. */
function skipString(text: string, i: number): number {
	let escaped = false;
	for (let j = i + 1; j < text.length; j++) {
		const ch = text[j];
		if (escaped) {
			escaped = false;
			continue;
		}
		if (ch === "\\") {
			escaped = true;
			continue;
		}
		if (ch === '"') return j;
	}
	return text.length - 1;
}

/** Detect the leading whitespace of the last content line before `}`, or `""` if none. */
function detectIndent(text: string, objectEnd: number): string {
	const lines = text.slice(0, objectEnd).split("\n");
	for (let i = lines.length - 1; i >= 0; i--) {
		const match = /^([ \t]+)\S/.exec(lines[i]!);
		if (match) return match[1]!;
	}
	return "\t";
}

/** True when the character just before `}` is not a comma or open brace. */
function needsCommaBefore(text: string, objectEnd: number): boolean {
	let i = objectEnd - 1;
	while (i >= 0) {
		const ch = text[i];
		if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
			i--;
			continue;
		}
		return ch !== "," && ch !== "{" && ch !== "[";
	}
	return true;
}

/** Set `key` to `value` in the JSON file at `path`, preserving formatting, comments, and key order. */
export function setKey(path: string, key: string, value: unknown): void {
	const text = existsSync(path) ? readFileSync(path, "utf8") : "{}\n";
	const entry = `${jsonQuote(key)}: ${jsonValue(value)}`;
	const existing = findKeyRange(text, key);
	let next: string;
	if (existing) {
		next = text.slice(0, existing.start) + existing.indent + entry + existing.trailing + text.slice(existing.end);
	} else {
		// File has only whitespace, no `}` yet, or is otherwise malformed JSON.
		const objectEnd = findObjectEnd(text);
		if (objectEnd === -1) {
			next = `{\n\t${entry}\n}\n`;
		} else {
			const indent = detectIndent(text, objectEnd);
			const comma = needsCommaBefore(text, objectEnd) ? "," : "";
			const head = text.slice(0, objectEnd).replace(/[ \t\n\r]+$/, "");
			next = `${head}${comma}\n${indent}${entry}\n${text.slice(objectEnd).replace(/^[ \t\n\r]+/, "")}`;
		}
	}
	writeFileSync(path, next);
}

/** Remove `key` from the JSON file at `path`, preserving formatting, comments, and key order. */
export function deleteKey(path: string, key: string): void {
	if (!existsSync(path)) return;
	const text = readFileSync(path, "utf8");
	const existing = findKeyRange(text, key);
	if (!existing) return;
	let next = text.slice(0, existing.start) + text.slice(existing.end).replace(/^[ \t]*(\r?\n)/, "");
	// If the deleted key was last, the previous key still carries a trailing comma.
	// Strip it so the file stays valid JSON.
	if (/,[ \t\n\r]*}/.test(next)) {
		next = next.replace(/,(?=[ \t\n\r]*\})/, "");
	}
	writeFileSync(path, next);
}

/** Find the index of the top-level closing `}`, or -1 if the file isn't a JSON object. */
function findObjectEnd(text: string): number {
	if (text.indexOf("{") !== 0) return -1;
	let depth = 0;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (ch === '"') {
			i = skipString(text, i);
			continue;
		}
		if (ch === "{") depth++;
		else if (ch === "}") {
			depth--;
			if (depth === 0) return i;
		}
	}
	return -1;
}

/** Where a project setting would live for `cwd`, or `undefined` if no cwd yet. */
function projectSettingsPath(cwd: string | undefined): string | undefined {
	return cwd ? join(cwd, ".pi", "settings.json") : undefined;
}

/**
 * Precedence (highest wins):
 *   1. `PI_GIT_GUARD` env: `0`/`false`/`off` → off, `1`/`true`/`on` → on.
 *   2. Top-level `gitGuard` boolean in `<cwd>/.pi/settings.json`.
 *   3. Same in `~/.pi/agent/settings.json`.
 *   4. Default on.
 */
function enabled(cwd: string | undefined): boolean {
	const envValue = process.env.PI_GIT_GUARD;
	if (envValue !== undefined) {
		const off = envValue === "" || envValue === "0" || envValue === "false" || envValue === "off";
		return !off;
	}
	const project = projectSettingsPath(cwd);
	if (project && existsSync(project)) {
		const value = readJson(project).gitGuard;
		if (typeof value === "boolean") return value;
	}
	if (existsSync(GLOBAL_SETTINGS)) {
		const value = readJson(GLOBAL_SETTINGS).gitGuard;
		if (typeof value === "boolean") return value;
	}
	return true;
}

/** The first refusal in `command`, with the wording to show the model. */
async function judge(pi: ExtensionAPI, command: string, cwd: string): Promise<string | undefined> {
	const redirectedByEnv = [...REPO_LOCATION_VARS].some((name) => process.env[name] !== undefined);

	for (const invocation of findInvocations(command, cwd)) {
		const parsed = parseInvocation(invocation.args);
		if (!parsed) continue;

		const dir = parsed.dirs.reduce((base, next) => (isAbsolute(next) ? next : resolve(base, expandHome(next))), invocation.cwd);
		const verdict = classify(parsed.sub, parsed.args);

		switch (verdict.kind) {
			case "allow":
				continue;
			case "stash":
				return message("stash", parsed.sub);
			case "destructive":
				return message("destructive", parsed.sub);
			case "resetTo":
				if (parsed.redirected || redirectedByEnv || (await movesHead(pi, dir, verdict.rev))) {
					return message("commitMove", parsed.sub);
				}
				continue;
			case "conflictOnly":
				if (parsed.redirected || redirectedByEnv) return message("redirected", parsed.sub);
				if (await midOperation(pi, dir)) continue;
				return message("outsideConflict", parsed.sub);
		}
	}
	return undefined;
}

function statusLine(cwd: string | undefined): string {
	const env = process.env.PI_GIT_GUARD;
	const projectPath = projectSettingsPath(cwd);
	const projectValue = projectPath && existsSync(projectPath) ? readJson(projectPath).gitGuard : undefined;
	const globalValue = existsSync(GLOBAL_SETTINGS) ? readJson(GLOBAL_SETTINGS).gitGuard : undefined;
	const isOn = enabled(cwd);
	return [
		`git-guard: ${isOn ? "on" : "off"} (effective)`,
		`PI_GIT_GUARD env: ${env === undefined ? "unset" : env}`,
		`project (${projectPath ?? "<no cwd>"}): ${projectValue === undefined ? "unset" : projectValue}`,
		`global (${GLOBAL_SETTINGS}): ${globalValue === undefined ? "unset" : globalValue}`,
	].join("\n");
}

function writeSetting(target: "global" | "project", cwd: string | undefined, value: boolean): { ok: true } | { ok: false; error: string } {
	const path = target === "global" ? GLOBAL_SETTINGS : projectSettingsPath(cwd);
	if (!path) return { ok: false, error: "no cwd to write project setting" };
	try {
		if (value) {
			// `true` is the default — remove the key rather than write a redundant entry.
			if (existsSync(path)) deleteKey(path, "gitGuard");
		} else {
			const dir = dirname(path);
			if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
			setKey(path, "gitGuard", false);
		}
		return { ok: true };
	} catch (e) {
		return { ok: false, error: String(e) };
	}
}

export default function (pi: ExtensionAPI) {
	pi.on("tool_call", async (event: ToolCallEvent, ctx: ExtensionContext): Promise<ToolCallEventResult | undefined> => {
		if (!enabled(ctx.cwd)) return undefined;
		if (event.toolName !== "bash") return undefined;
		const input = event.input as { command?: string } | undefined;
		const command = input?.command;
		if (!command || !command.includes("git")) return undefined;

		const reason = await judge(pi, command, ctx.cwd);
		if (!reason) return undefined;
		ctx.ui.notify("Git guard refused a command", "warning");
		return { block: true, reason };
	});

	pi.registerCommand("git-guard", {
		description: "Show or toggle the shared-checkout git guard (on | off | project-on | project-off | status)",
		handler: async (args: string, ctx) => {
			const subcommand = args.trim().split(/\s+/)[0]?.toLowerCase();
			switch (subcommand) {
				case "on": {
					const result = writeSetting("global", ctx.cwd, true);
					ctx.ui.notify(result.ok ? "git-guard: on (default restored globally)" : `failed: ${result.error}`, result.ok ? "info" : "error");
					return;
				}
				case "off": {
					const result = writeSetting("global", ctx.cwd, false);
					ctx.ui.notify(result.ok ? "git-guard: off globally (set globally)" : `failed: ${result.error}`, result.ok ? "info" : "error");
					return;
				}
				case "project-on": {
					const result = writeSetting("project", ctx.cwd, true);
					ctx.ui.notify(result.ok ? "git-guard: on for this project (key removed)" : `failed: ${result.error}`, result.ok ? "info" : "error");
					return;
				}
				case "project-off": {
					const result = writeSetting("project", ctx.cwd, false);
					ctx.ui.notify(result.ok ? "git-guard: off for this project" : `failed: ${result.error}`, result.ok ? "info" : "error");
					return;
				}
				case "status": {
					ctx.ui.notify(statusLine(ctx.cwd), "info");
					return;
				}
				default:
					ctx.ui.notify(`Usage: /git-guard on | off | project-on | project-off | status\n\n${statusLine(ctx.cwd)}`, "info");
			}
		},
	});
}
