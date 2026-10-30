/**
 * Hide omp's composer hints (the right-aligned "to change thinking effort" /
 * "to see N running agents" placeholder).
 *
 * omp shows a hint until the user performed its gesture `learnedAfter` times.
 * The count lives in agent.db's `hint_usage` table and is read once at startup,
 * so writing the counter there retires the hint without touching the keybinding
 * (Shift+Tab keeps working).
 */
import { Database } from "bun:sqlite";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/** Composer hint ids, see packages/tui/src/prompt/composer-hints.ts. */
const HINT_IDS = ["agents", "effort"];
/** omp hides a hint once its gesture was performed this many times. */
const RETIRE_AT = 3;

/** agent.db location, mirroring omp's dirs resolution (profile, XDG, agent-dir override). */
function agentDbPath(): string {
	const profile = process.env.OMP_PROFILE ?? process.env.PI_PROFILE;
	const root = join(homedir(), process.env.PI_CONFIG_DIR ?? ".omp");
	if (profile && profile !== "default") return join(root, "profiles", profile, "agent", "agent.db");
	const xdgData = process.env.XDG_DATA_HOME;
	if (xdgData && existsSync(join(xdgData, "omp"))) return join(xdgData, "omp", "agent.db");
	if (process.env.PI_CODING_AGENT_DIR) return join(process.env.PI_CODING_AGENT_DIR, "agent.db");
	return join(root, "agent", "agent.db");
}

export default function hideComposerHints(): void {
	const dbPath = agentDbPath();
	if (!existsSync(dbPath)) return;
	let db: Database | undefined;
	try {
		db = new Database(dbPath);
		db.run("PRAGMA busy_timeout = 5000");
		db.exec(`CREATE TABLE IF NOT EXISTS hint_usage (
			name TEXT PRIMARY KEY,
			count INTEGER NOT NULL DEFAULT 0,
			last_used_at INTEGER NOT NULL DEFAULT (CAST(strftime('%s','now') AS INTEGER))
		)`);
		const now = Math.floor(Date.now() / 1000);
		for (const id of HINT_IDS) {
			db.run(
				`INSERT INTO hint_usage(name, count, last_used_at) VALUES (?, ?, ?)
				 ON CONFLICT(name) DO UPDATE SET count = MAX(count, excluded.count), last_used_at = excluded.last_used_at`,
				id,
				RETIRE_AT,
				now,
			);
		}
	} catch {
		// A locked or unreadable counter db must not stop omp from starting.
	} finally {
		db?.close();
	}
}
