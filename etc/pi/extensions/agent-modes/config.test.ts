import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { loadModes } from "./config.ts";

const testDir = join(tmpdir(), `agent-modes-test-${Date.now()}`);
const projectDir = join(testDir, "project");
const projectPiDir = join(projectDir, ".pi");

describe("loadModes", () => {
  beforeEach(() => {
    mkdirSync(projectPiDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  it("returns built-in defaults when no config files exist", () => {
    const modes = loadModes("/nonexistent/path/that/has/no/pi/dir");

    assert.equal(modes.code.tools, "all");
    assert.equal(modes.code.bash, "all");
    assert.equal(modes.architect.bash, "restricted");
    assert.deepEqual(modes.architect.editableExtensions, [".md", ".mdx"]);
    assert.equal(modes.ask.bash, "restricted");
    assert.equal(modes.review.bash, "restricted");
    assert.equal(modes.debug.tools, "all");
  });

  it("preserves all 5 modes in output", () => {
    const modes = loadModes("/nonexistent");
    const names = Object.keys(modes).sort();
    assert.deepEqual(names, ["architect", "ask", "code", "debug", "review"]);
  });

  it("built-in code mode has a prompt", () => {
    const modes = loadModes("/nonexistent");
    assert.ok(modes.code.prompt.includes("PI"));
  });

  it("non-code built-in modes have non-empty prompts with PI persona", () => {
    const modes = loadModes("/nonexistent");
    for (const name of ["architect", "debug", "ask", "review"] as const) {
      assert.ok(modes[name].prompt.length > 0, `${name} should have a prompt`);
      assert.ok(modes[name].prompt.includes("PI"), `${name} should reference PI`);
    }
  });

  it("project config overrides specific fields only", () => {
    writeFileSync(
      join(projectPiDir, "agent-modes.json"),
      JSON.stringify({
        architect: {
          editableExtensions: [".md", ".mdx", ".sh"],
          thinkingLevel: "high",
        },
      }),
    );

    const modes = loadModes(projectDir);

    // Overridden
    assert.deepEqual(modes.architect.editableExtensions, [".md", ".mdx", ".sh"]);
    assert.equal(modes.architect.thinkingLevel, "high");

    // Untouched
    assert.equal(modes.architect.bash, "restricted");
    assert.ok(modes.architect.prompt.includes("PI"));
  });

  it("project config can set model per mode", () => {
    writeFileSync(
      join(projectPiDir, "agent-modes.json"),
      JSON.stringify({
        code: { provider: "anthropic", model: "claude-sonnet-4-5" },
      }),
    );

    const modes = loadModes(projectDir);
    assert.equal(modes.code.provider, "anthropic");
    assert.equal(modes.code.model, "claude-sonnet-4-5");
    assert.equal(modes.architect.provider, undefined);
  });

  it("ignores malformed config files gracefully", () => {
    writeFileSync(join(projectPiDir, "agent-modes.json"), "not valid json {{{");

    const modes = loadModes(projectDir);
    assert.equal(modes.code.tools, "all");
    assert.equal(modes.architect.bash, "restricted");
  });

  it("can override tools to 'all' for a restricted mode", () => {
    writeFileSync(
      join(projectPiDir, "agent-modes.json"),
      JSON.stringify({ ask: { tools: "all" } }),
    );

    const modes = loadModes(projectDir);
    assert.equal(modes.ask.tools, "all");
    // bash stays "restricted" since we didn't override it
    assert.equal(modes.ask.bash, "restricted");
  });

  it("can override prompt to a custom string", () => {
    writeFileSync(
      join(projectPiDir, "agent-modes.json"),
      JSON.stringify({ debug: { prompt: "Custom." } }),
    );

    const modes = loadModes(projectDir);
    assert.equal(modes.debug.prompt, "Custom.");
  });
});
