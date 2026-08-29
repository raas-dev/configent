import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import extension, { loadConfig, writeConfig } from "../src/caveman-mode";

interface BeforeAgentStartEvent {
	systemPrompt: string;
}
interface UiCtx {
	ui: {
		notify: (msg: string, type?: string) => void;
		setStatus: (key: string, text: string | undefined) => void;
	};
}
type BeforeAgentStartHandler = (event: BeforeAgentStartEvent, ctx: UiCtx) => Promise<{ systemPrompt: string } | void>;
type StatusCall = [key: string, text: string | undefined];
interface CommandRegistration {
	description?: string;
	handler: (args: string, ctx: UiCtx) => Promise<void>;
}

interface Mock {
	pi: {
		logger: { info: (msg: string) => void; warn: (msg: string) => void; debug: (msg: string) => void };
		setLabel: (label: string) => void;
		on: (event: string, handler: BeforeAgentStartHandler) => void;
		registerCommand: (name: string, options: CommandRegistration) => void;
	};
	logs: string[];
	statusCalls: StatusCall[];
	notifications: [msg: string, type?: string][];
	handlers: Record<string, BeforeAgentStartHandler>;
	commands: Record<string, CommandRegistration>;
}

function createMock(): Mock {
	const logs: string[] = [];
	const statusCalls: StatusCall[] = [];
	const notifications: [msg: string, type?: string][] = [];
	const handlers: Record<string, BeforeAgentStartHandler> = {};
	const commands: Record<string, CommandRegistration> = {};

	const pi: Mock["pi"] = {
		logger: {
			info: (msg: string) => logs.push(`info:${msg}`),
			warn: (msg: string) => logs.push(`warn:${msg}`),
			debug: (msg: string) => logs.push(`debug:${msg}`),
		},
		setLabel: (_label: string) => {},
		on: (event: string, handler: BeforeAgentStartHandler) => {
			handlers[event] = handler;
		},
		registerCommand: (name: string, options: CommandRegistration) => {
			commands[name] = options;
		},
	};

	return { pi, logs, statusCalls, notifications, handlers, commands };
}

function uiCtx(mock: Mock): UiCtx {
	return {
		ui: {
			notify: (msg: string, type?: string) => mock.notifications.push([msg, type]),
			setStatus: (key: string, text: string | undefined) => mock.statusCalls.push([key, text]),
		},
	};
}

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

async function inject(mock: Mock, basePrompt: string): Promise<string | null> {
	const handler = mock.handlers["before_agent_start"];
	assert(handler, "before_agent_start handler not registered");
	const result = await handler({ systemPrompt: basePrompt }, uiCtx(mock));
	return result?.systemPrompt ?? null;
}

async function run(mock: Mock, args: string): Promise<[string, string | undefined]> {
	const cmd = mock.commands["caveman"];
	assert(cmd, "caveman command not registered");
	await cmd.handler(args, uiCtx(mock));
	return mock.notifications.at(-1) ?? ["", undefined];
}

const OLD_SKILL = "---\nname: caveman\n---\nOLD CAVEMAN BODY\n";
const NEW_SKILL = "---\nname: caveman\n---\nNEW CAVEMAN BODY\n";

async function main() {
	const tmp = join(import.meta.dirname, ".test-caveman");
	const tmpConfig = join(tmp, "caveman.json");
	const tmpSkill = join(tmp, "skills", "caveman");
	mkdirSync(tmpSkill, { recursive: true });
	writeFileSync(join(tmpSkill, "SKILL.md"), OLD_SKILL);

	// loadConfig: defaultLevel + showStatus parsing
	for (const [value, expected] of [
		["ultra", "ultra"],
		["lite", "lite"],
		["off", null],
		["false", null],
		["0", null],
		["gibberish", "full"],
	] as const) {
		writeFileSync(tmpConfig, JSON.stringify({ defaultLevel: value }));
		assert(loadConfig(tmpConfig).defaultLevel === expected, `expected ${expected} for defaultLevel=${value}`);
	}
	writeFileSync(tmpConfig, "{}");
	assert(loadConfig(tmpConfig).defaultLevel === "full", "expected full for empty config");
	assert(loadConfig(tmpConfig).showStatus === false, "expected showStatus false for empty config");
	writeFileSync(tmpConfig, "{not json");
	assert(loadConfig(tmpConfig).defaultLevel === "full", "expected full for invalid JSON");
	writeFileSync(tmpConfig, JSON.stringify({ defaultLevel: null }));
	assert(loadConfig(tmpConfig).defaultLevel === null, "expected null to persist as off");
	writeFileSync(tmpConfig, JSON.stringify({ showStatus: "yes" }));
	assert(loadConfig(tmpConfig).showStatus === false, "expected showStatus false for non-true");

	// writeConfig round-trip
	writeConfig({ defaultLevel: "lite", showStatus: true }, tmpConfig);
	const roundTripped = loadConfig(tmpConfig);
	assert(roundTripped.defaultLevel === "lite" && roundTripped.showStatus === true, "writeConfig round-trip failed");

	// extension: per-turn injection, command, statusbar — all paths isolated in tmp
	writeConfig({ defaultLevel: "ultra", showStatus: true }, tmpConfig);
	const t = createMock();
	await extension(t.pi as never, { configPath: tmpConfig, skillDir: tmpSkill });
	assert(!t.logs.some(l => l.startsWith("warn:")), "expected no warns with skill present");
	const sessionStart = t.handlers["session_start"];
	assert(sessionStart, "session_start handler not registered");
	await sessionStart({}, uiCtx(t));
	assert(JSON.stringify(t.statusCalls.at(-1)) === JSON.stringify(["caveman", "caveman ultra"]), `status before first message: ${JSON.stringify(t.statusCalls.at(-1))}`);

	assert((await inject(t, "BASE"))?.startsWith("BASE\n\nCAVEMAN MODE ACTIVE — level: ultra\n\nOLD CAVEMAN BODY"), "first injection");
	assert(JSON.stringify(t.statusCalls.at(-1)) === JSON.stringify(["caveman", "caveman ultra"]), `status on first turn: ${JSON.stringify(t.statusCalls.at(-1))}`);
	assert((await inject(t, "SECOND"))?.startsWith("SECOND\n\nCAVEMAN MODE ACTIVE — level: ultra"), "per-turn injection");

	assert((await run(t, ""))[0] === "caveman ultra, status shown", "bare /caveman reports status");
	assert(t.statusCalls.at(-1)?.[1] === "caveman ultra", "bare /caveman refreshes statusbar");

	await run(t, "banana");
	assert(t.notifications.at(-1)?.[1] === "warning", "unknown level should warn");
	assert(loadConfig(tmpConfig).defaultLevel === "ultra", "unknown level must not change config");

assert((await run(t, "off"))[0] === "caveman off (session)", "off notify");
assert(loadConfig(tmpConfig).defaultLevel === "ultra", "off must not persist");
assert((await inject(t, "THIRD")) === null, "no injection when off");
assert(t.statusCalls.at(-1)?.[1] === undefined, "status cleared when off");

assert((await run(t, "lite"))[0] === "caveman lite (session)", "lite notify");
assert(loadConfig(tmpConfig).defaultLevel === "ultra", "level change must not persist");
assert((await inject(t, "FOURTH"))?.includes("level: lite"), "injection follows session level");
assert(t.statusCalls.at(-1)?.[1] === "caveman lite", "status follows session level");

	await run(t, "hide");
	assert(t.statusCalls.at(-1)?.[1] === undefined, "hide clears status");
	assert(loadConfig(tmpConfig).showStatus === false, "hide persisted");
	assert(loadConfig(tmpConfig).defaultLevel === "ultra", "hide must not touch defaultLevel");
	await run(t, "show");
	assert(t.statusCalls.at(-1)?.[1] === "caveman lite", "show restores status");
	assert(loadConfig(tmpConfig).showStatus === true, "show persisted");

	// /caveman update: fetch failure warns and keeps old skill
	const failing = createMock();
	const failFetcher = (async () => {
		throw new Error("network down");
	}) as typeof fetch;
	await extension(failing.pi as never, { configPath: tmpConfig, skillDir: tmpSkill, fetcher: failFetcher });
	await run(failing, "update");
	assert(failing.notifications.at(-1)?.[1] === "warning", "update failure should warn");
	assert(readFileSync(join(tmpSkill, "SKILL.md"), "utf-8") === OLD_SKILL, "failed update must not touch skill");

	// /caveman update: success rewrites skill and next injection uses it
	const okFetcher = (async () => new Response(NEW_SKILL)) as typeof fetch;
	const updating = createMock();
	await extension(updating.pi as never, { configPath: tmpConfig, skillDir: tmpSkill, fetcher: okFetcher });
	assert((await run(updating, "update"))[0] === "caveman skill updated", "update notify");
	assert(readFileSync(join(tmpSkill, "SKILL.md"), "utf-8") === NEW_SKILL, "update persisted to skill dir");
	assert((await inject(updating, "FIFTH"))?.includes("NEW CAVEMAN BODY"), "injection uses updated skill");

	// hidden statusbar: no status text on turns, injection still active
	writeConfig({ defaultLevel: "full", showStatus: false }, tmpConfig);
	const hiddenStart = createMock();
	writeConfig({ defaultLevel: "full", showStatus: false }, tmpConfig);
	await extension(hiddenStart.pi as never, { configPath: tmpConfig, skillDir: tmpSkill });
	await hiddenStart.handlers["session_start"]?.({}, uiCtx(hiddenStart));
	assert(hiddenStart.statusCalls.at(-1)?.[1] === undefined, "hidden statusbar cleared at session start");

	const hidden = createMock();
	await extension(hidden.pi as never, { configPath: tmpConfig, skillDir: tmpSkill });
	assert((await inject(hidden, "X"))?.includes("CAVEMAN MODE ACTIVE"), "injection independent of statusbar");
	assert(hidden.statusCalls.at(-1)?.[1] === undefined, "hidden statusbar stays cleared");

	rmSync(tmp, { recursive: true, force: true });
	console.log("smoke ok");
}

await main();
