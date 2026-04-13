import extension from "../src/rtk-optimizer";

type CommandHandler = (args: string, ctx: { cwd: string; ui: { notify(message: string, type?: string): void } }) => Promise<void>;

type ToolCallHandler = (event: { toolName: string; input: Record<string, unknown> }) => unknown;

function createMockPi(versionOutput: string | null) {
	const commands = new Map<string, CommandHandler>();
	const toolCallHandlers: ToolCallHandler[] = [];
	const statuses: Array<{ key: string; text: string | undefined }> = [];
	const notifications: Array<{ message: string; type?: string }> = [];
	const logs: string[] = [];

	const pi = {
		logger: {
			info: (message: string) => logs.push(`info:${message}`),
			warn: (message: string) => logs.push(`warn:${message}`),
			debug: (message: string) => logs.push(`debug:${message}`),
		},
		pi: {
			isToolCallEventType: (toolName: string, event: { toolName: string }) => event.toolName === toolName,
		},
		setLabel: (_label: string) => {},
		exec: async (command: string, args: string[]) => {
			if (command === "rtk" && args[0] === "--version") {
				if (versionOutput === null) {
					throw new Error("rtk missing");
				}
				return { stdout: versionOutput, stderr: "", code: 0, killed: false };
			}
			if (command === "rtk" && args[0] === "gain") {
				return { stdout: "gain ok", stderr: "", code: 0, killed: false };
			}
			if (command === "rtk" && args[0] === "discover") {
				return { stdout: "discover ok", stderr: "", code: 0, killed: false };
			}
			return { stdout: "", stderr: `unexpected: ${command} ${args.join(" ")}`, code: 1, killed: false };
		},
		registerCommand: (name: string, options: { handler: CommandHandler }) => {
			commands.set(name, options.handler);
		},
		on: (event: string, handler: unknown) => {
			if (event === "tool_call") toolCallHandlers.push(handler as ToolCallHandler);
			if (event === "session_start") {
				void (handler as (event: unknown, ctx: unknown) => Promise<void>)(undefined, {
					ui: { setStatus: (key: string, text: string | undefined) => statuses.push({ key, text }) },
				});
			}
		},
	};

	return {
		pi,
		commands,
		toolCallHandlers,
		statuses,
		notifications,
		logs,
		ctx: {
			cwd: "/tmp/omp-rtk-extension",
			ui: {
				notify: (message: string, type?: string) => notifications.push({ message, type }),
			},
		},
	};
}

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

async function main() {
	delete process.env.PI_SHELL_PREFIX;
	delete process.env.CLAUDE_CODE_SHELL_PREFIX;

	const available = createMockPi("rtk 0.28.0");
	await extension(available.pi as never);
	assert(process.env.PI_SHELL_PREFIX === "rtk", "expected extension to set PI_SHELL_PREFIX");
	assert(available.commands.has("rtk-gain"), "expected /rtk-gain command registration");
	assert(available.commands.has("rtk-discover"), "expected /rtk-discover command registration");
	assert(available.commands.has("rtk-status"), "expected /rtk-status command registration");
	assert(available.logs.some(entry => /RTK \d+\.\d+\.\d+ detected/.test(entry)), "expected RTK detected log");

	delete process.env.PI_SHELL_PREFIX;
	process.env.CLAUDE_CODE_SHELL_PREFIX = "hyperfine";
	const fallback = createMockPi("rtk 0.28.0");
	await extension(fallback.pi as never);
	const bashEvent = { toolName: "bash", input: { command: "git status" } };
	for (const handler of fallback.toolCallHandlers) {
		await handler(bashEvent);
	}
	assert(bashEvent.input.command === "rtk git status", "expected fallback rewrite to prefix supported bash command");
	assert(fallback.logs.some(entry => /RTK \d+\.\d+\.\d+ detected/.test(entry)), "expected fallback RTK detected log");

	await fallback.commands.get("rtk-gain")!("", fallback.ctx);
	assert(fallback.notifications.some(entry => entry.message.includes("gain ok")), "expected /rtk-gain output");

	delete process.env.PI_SHELL_PREFIX;
	delete process.env.CLAUDE_CODE_SHELL_PREFIX;
	const unavailable = createMockPi(null);
	await extension(unavailable.pi as never);
	assert(process.env.PI_SHELL_PREFIX === undefined, "expected no prefix when RTK is unavailable");
	assert(unavailable.logs.some(entry => entry.includes("RTK unavailable")), "expected unavailable warning log");

	console.log("smoke ok");
}

await main();
