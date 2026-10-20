/**
 * Regression tests for git-guard: verdict classification, the on/off toggle,
 * and the `tool_call` block end to end.
 *
 * Run from etc/pi/: cd tests && node --experimental-strip-types ./git-guard.test.ts
 */

import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { Verdict } from "../extensions/git-guard.ts";

let failures = 0;
function check(label: string, actual: unknown, expected: unknown): void {
	if (actual === expected) return;
	failures++;
	console.log(`FAIL ${label}: ${String(actual)} != ${String(expected)}`);
}

function verdictKind(v: Verdict): string {
	return v.kind === "resetTo" ? `ResetTo(${v.rev})` : v.kind;
}

// HOME must move before the module loads: it captures the global settings path
// at module scope. A static import would freeze the real home instead.
const home = mkdtempSync(join(tmpdir(), "gg-home-"));
const repo = mkdtempSync(join(tmpdir(), "gg-repo-"));
mkdirSync(join(repo, ".git"), { recursive: true });
process.env.HOME = home;
delete process.env.PI_GIT_GUARD;

const { classify, default: install, setKey, deleteKey } = (await import("../extensions/git-guard.ts")) as typeof import("../extensions/git-guard.ts");

/** Guards the classifier without touching a repository. */
function guarded(command: string, expected: string): void {
	const args = command.split(" ").filter(Boolean);
	check(command, verdictKind(classify(args[0] as never, args.slice(1))), expected);
}

guarded("stash", "stash");
guarded("stash -p", "stash");
guarded("stash pop", "stash");
guarded("stash list", "allow");
guarded("stash show -p", "allow");
guarded("reset", "allow");
guarded("reset -q HEAD", "allow");
guarded("reset main tracked.txt", "allow");
guarded("reset -- main", "allow");
guarded("reset --hard", "destructive");
guarded("reset --hard HEAD~1", "destructive");
guarded("reset HEAD~1", "ResetTo(HEAD~1)");
guarded("reset --mixed HEAD~2", "ResetTo(HEAD~2)");
guarded("checkout", "allow");
guarded("checkout -f", "destructive");
guarded("checkout --force", "destructive");
guarded("checkout --force-with-lease", "conflictOnly");
guarded("checkout -- .", "destructive");
guarded("checkout -- :/", "destructive");
guarded("checkout -- *", "destructive");
guarded("checkout tracked.txt", "conflictOnly");
guarded("checkout -b feature", "conflictOnly");
guarded("switch -f main", "destructive");
guarded("switch --discard-changes main", "destructive");
guarded("switch main", "conflictOnly");
guarded("restore --staged .", "allow");
guarded("restore --staged tracked.txt", "allow");
guarded("restore -SW tracked.txt", "conflictOnly");
guarded("restore --source HEAD~1 tracked.txt", "conflictOnly");
guarded("restore --worktree --staged *", "destructive");
guarded("restore -W -- .", "destructive");

// ---------------------------------------------------------------- classifier

const cases = 32;
if (failures > 0) throw new Error(`${failures} classifier case(s) failed`);

// ---------------------------------------------------------------- formatting

// Existing settings files often carry 2-space indent and unrelated keys.
// Verify setKey / deleteKey edit in place rather than re-serializing through
// JSON.stringify (which would switch to tab indent and reorder keys).
{
	const fmtDir = mkdtempSync(join(tmpdir(), "gg-fmt-"));
	const fmtFile = join(fmtDir, "settings.json");
	const original = [
		"{",
		`  "defaultProvider": "occam/minimax",`,
		`  "theme": "dark",`,
		`  "doubleEscapeAction": "tree"`,
		"}",
		"",
	].join("\n");
	writeFileSync(fmtFile, original);

	setKey(fmtFile, "gitGuard", false);
	const afterAdd = readFileSync(fmtFile, "utf8");
	check("insert keeps existing 2-space indent", /^\s{2}"defaultProvider"/m.test(afterAdd), true);
	check("insert adds 2-space indented key", /^ {2}"gitGuard"/m.test(afterAdd), true);
	check("insert keeps trailing newline", afterAdd.endsWith("\n"), true);
	check("insert keeps key order", afterAdd.indexOf("defaultProvider") < afterAdd.indexOf("gitGuard"), true);
	check("insert parses", JSON.parse(afterAdd).gitGuard, false);

	// Idempotent replace: writing the same key updates the value in place.
	setKey(fmtFile, "gitGuard", false);
	check("idempotent replace parses", JSON.parse(readFileSync(fmtFile, "utf8")).gitGuard, false);

	// Removing the key restores the file byte-for-byte.
	deleteKey(fmtFile, "gitGuard");
	const afterRemove = readFileSync(fmtFile, "utf8");
	check("delete is byte-stable", afterRemove === original, true);
	check("delete is valid JSON", Object.keys(JSON.parse(afterRemove)).join(","), "defaultProvider,theme,doubleEscapeAction");

	// When the only key is being deleted, leave a valid empty object behind.
	const slimFile = join(fmtDir, "slim.json");
	writeFileSync(slimFile, "{\n  \"gitGuard\": false\n}\n");
	deleteKey(slimFile, "gitGuard");
	const afterSlim = readFileSync(slimFile, "utf8");
	check("delete leaves a valid empty object", Object.keys(JSON.parse(afterSlim)).length, 0);
}

// ---------------------------------------------------------------- toggle

let command: { handler(args: string, ctx: unknown): Promise<void> } | undefined;
install({ on() {}, registerCommand() { command = arguments[1]; } } as never);

const notes: string[] = [];
const ctx = {
	cwd: repo,
	hasUI: true,
	ui: {
		notify: (message: string) => notes.push(message),
		confirm: async () => true,
		select: async () => "",
		input: async () => "",
	},
};
const globalSettings = join(home, ".pi", "agent", "settings.json");
const projectSettings = join(repo, ".pi", "settings.json");
const read = (path: string): Record<string, unknown> | undefined =>
	existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : undefined;
const effective = async (): Promise<boolean> => {
	await command!.handler("status", ctx);
	return /^git-guard: on/m.test(notes.pop() ?? "");
};

await command!.handler("status", ctx);
check("default on", /^git-guard: on/m.test(notes.pop() ?? ""), true);

await command!.handler("off", ctx);
check("off writes false", read(globalSettings)?.gitGuard, false);
check("off effective", await effective(), false);

await command!.handler("on", ctx);
check("on removes key", read(globalSettings)?.gitGuard, undefined);
check("on effective", await effective(), true);

await command!.handler("project-off", ctx);
check("project-off writes project false", read(projectSettings)?.gitGuard, false);
check("project-off effective", await effective(), false);

await command!.handler("project-on", ctx);
check("project-on removes project key", read(projectSettings)?.gitGuard, undefined);
check("project-on effective", await effective(), true);

process.env.PI_GIT_GUARD = "0";
check("env 0 overrides project", await effective(), false);
process.env.PI_GIT_GUARD = "1";
check("env 1 overrides project", await effective(), true);
delete process.env.PI_GIT_GUARD;

// ------------------------------------------------------------- tool_call

let onToolCall: ((event: unknown, context: unknown) => Promise<unknown>) | undefined;
install({
	on(_event: string, handler: typeof onToolCall) { onToolCall = handler; },
	registerCommand() {},
	registerTool() {},
	exec: async () => ({ stdout: "true", stderr: "", code: 0, killed: false }),
} as never);

const blocked = async (bash: string): Promise<boolean> => {
	const result = (await onToolCall!(
		{ type: "tool_call", toolCallId: "1", toolName: "bash", input: { command: bash } },
		ctx,
	)) as { block?: boolean } | undefined;
	return result?.block === true;
};

check("git status allowed", await blocked("git status"), false);
check("git stash list allowed", await blocked("git stash list"), false);
check("git stash show allowed", await blocked("git stash show -p"), false);
check("git reset allowed", await blocked("git reset"), false);
check("git restore --staged allowed", await blocked("git restore --staged ."), false);
check("git stash blocked", await blocked("git stash"), true);
check("git stash pop blocked", await blocked("git stash pop"), true);
check("git stash -p blocked", await blocked("git stash -p"), true);
check("git reset --hard blocked", await blocked("git reset --hard"), true);
check("git checkout HEAD~1 blocked", await blocked("git checkout HEAD~1"), true);
check("git checkout tracked.txt blocked", await blocked("git checkout tracked.txt"), true);
check("git checkout -f blocked", await blocked("git checkout -f"), true);
check("git switch -f blocked", await blocked("git switch -f main"), true);
check("non-git allowed", await blocked("echo hi"), false);
check("gh is not git allowed", await blocked("gh repo view"), false);

rmSync(home, { recursive: true, force: true });
rmSync(repo, { recursive: true, force: true });

if (failures > 0) throw new Error(`${failures} case(s) failed`);
console.log(`git-guard: ${cases} classifier cases + toggle + tool_call pass`);
