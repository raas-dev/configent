import extension from "../src/caveman-mode";

interface SentMessage {
	message: { role: string; content: string };
	options: Record<string, string>;
}

function createMockPi() {
	const logs: string[] = [];
	const commands = new Map<string, { description: string; handler: (args: string, ctx: { cwd: string; ui: { notify(msg: string, type?: string): void } }) => Promise<void> }>();
	const sentMessages: SentMessage[] = [];
	const sessionStartHandlers: Array<() => Promise<void>> = [];
	const notifications: Array<{ message: string; type?: string }> = [];

	const pi = {
		logger: {
			info: (msg: string) => logs.push(`info:${msg}`),
			warn: (msg: string) => logs.push(`warn:${msg}`),
			debug: (msg: string) => logs.push(`debug:${msg}`),
		},
		setLabel: (_label: string) => {},
		sendMessage: (message: { role: string; content: string }, options: Record<string, string>) => {
			sentMessages.push({ message, options });
		},
		registerCommand: (name: string, opts: { description: string; handler: (args: string, ctx: { cwd: string; ui: { notify(msg: string, type?: string): void } }) => Promise<void> }) => {
			commands.set(name, opts);
		},
		on: (event: string, handler: unknown) => {
			if (event === "session_start") {
				sessionStartHandlers.push(handler as () => Promise<void>);
			}
		},
	};

	const ctx = {
		cwd: "/tmp/omp-caveman-extension",
		ui: {
			notify: (message: string, type?: string) => notifications.push({ message, type }),
		},
	};

	return { pi, logs, commands, sentMessages, sessionStartHandlers, notifications, ctx };
}

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

async function main() {
	// Test 1: default (no env) → full on session_start
	delete process.env.OMP_CAVEMAN_LEVEL;
	const t1 = createMockPi();
	await extension(t1.pi as never);
	assert(t1.commands.has("caveman"), "expected /caveman registered");
	assert(t1.sessionStartHandlers.length === 1, "expected one session_start handler");
	await t1.sessionStartHandlers[0]!();
	assert(t1.sentMessages.length === 1, "expected one message on session_start");
	assert(t1.sentMessages[0]!.message.content === "/caveman full", "expected /caveman full as default");
	assert(t1.sentMessages[0]!.options.deliverAs === "steer", "expected steer delivery");

	// Test 2: OMP_CAVEMAN_LEVEL=ultra
	process.env.OMP_CAVEMAN_LEVEL = "ultra";
	const t2 = createMockPi();
	await extension(t2.pi as never);
	await t2.sessionStartHandlers[0]!();
	assert(t2.sentMessages[0]!.message.content === "/caveman ultra", "expected /caveman ultra from env");

	// Test 3: OMP_CAVEMAN_LEVEL=lite
	process.env.OMP_CAVEMAN_LEVEL = "lite";
	const t3 = createMockPi();
	await extension(t3.pi as never);
	await t3.sessionStartHandlers[0]!();
	assert(t3.sentMessages[0]!.message.content === "/caveman lite", "expected /caveman lite from env");

	// Test 4: OMP_CAVEMAN_LEVEL=off → no injection
	for (const val of ["off", "no", "false", "0"]) {
		process.env.OMP_CAVEMAN_LEVEL = val;
		const t = createMockPi();
		await extension(t.pi as never);
		await t.sessionStartHandlers[0]!();
		assert(t.sentMessages.length === 0, `expected no message when OMP_CAVEMAN_LEVEL=${val}`);
	}

	// Test 5: OMP_CAVEMAN_LEVEL=gibberish → fallback to full
	process.env.OMP_CAVEMAN_LEVEL = "gibberish";
	const t5 = createMockPi();
	await extension(t5.pi as never);
	await t5.sessionStartHandlers[0]!();
	assert(t5.sentMessages[0]!.message.content === "/caveman full", "expected fallback to full for invalid env");

	// Test 6: /caveman with no args → full
	delete process.env.OMP_CAVEMAN_LEVEL;
	const t6 = createMockPi();
	await extension(t6.pi as never);
	await t6.commands.get("caveman")!.handler("", t6.ctx);
	assert(t6.sentMessages[0]!.message.content === "/caveman full", "expected full for /caveman no-args");
	assert(t6.notifications.some(n => n.message.includes("full activated")), "expected activation notification");

	// Test 7: /caveman ultra → ultra
	const t7 = createMockPi();
	await extension(t7.pi as never);
	await t7.commands.get("caveman")!.handler("ultra", t7.ctx);
	assert(t7.sentMessages[0]!.message.content === "/caveman ultra", "expected ultra from /caveman ultra");

	// Test 8: /caveman off → deactivate
	const t8 = createMockPi();
	await extension(t8.pi as never);
	await t8.commands.get("caveman")!.handler("off", t8.ctx);
	assert(t8.sentMessages.some(m => m.message.content === "stop caveman"), "expected stop caveman on off");
	assert(t8.notifications.some(n => n.message.includes("deactivated")), "expected deactivation notification");

	// Test 9: /caveman unknown → warning
	const t9 = createMockPi();
	await extension(t9.pi as never);
	await t9.commands.get("caveman")!.handler("foobar", t9.ctx);
	assert(t9.notifications.some(n => n.type === "warning" && n.message.includes("Unknown level")), "expected warning for unknown level");

	// Test 10: /caveman no / false / 0 → deactivate
	for (const val of ["no", "false", "0"]) {
		const t = createMockPi();
		await extension(t.pi as never);
		await t.commands.get("caveman")!.handler(val, t.ctx);
		assert(t.sentMessages.some(m => m.message.content === "stop caveman"), `expected stop caveman on /caveman ${val}`);
	}

	delete process.env.OMP_CAVEMAN_LEVEL;
	console.log("smoke ok");
}

await main();
