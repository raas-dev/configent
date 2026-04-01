import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  BUILTIN_MODES,
  MODE_NAMES,
  isSafeBash,
  isEditableFile,
  modeHasOverride,
  type ModeDefinition,
  type ModeName,
} from "./modes.ts";

// ---------------------------------------------------------------------------
// Mode definitions
// ---------------------------------------------------------------------------

describe("MODE_NAMES", () => {
  it("contains all 5 modes", () => {
    assert.deepEqual(MODE_NAMES, ["code", "architect", "debug", "ask", "review"]);
  });

  it("has a matching BUILTIN_MODES entry for each name", () => {
    for (const name of MODE_NAMES) {
      assert.ok(BUILTIN_MODES[name], `missing built-in definition for "${name}"`);
    }
  });
});

describe("BUILTIN_MODES", () => {
  it("code has all tools and unrestricted bash", () => {
    const m = BUILTIN_MODES.code;
    assert.equal(m.tools, "all");
    assert.equal(m.bash, "all");
    assert.ok(m.prompt.includes("PI"));
    assert.equal(m.editableExtensions, undefined);
  });

  it("architect has restricted tools, bash, and editable extensions", () => {
    const m = BUILTIN_MODES.architect;
    assert.ok(Array.isArray(m.tools));
    assert.ok((m.tools as string[]).includes("read"));
    assert.ok((m.tools as string[]).includes("bash"));
    assert.ok((m.tools as string[]).includes("edit"));
    assert.ok((m.tools as string[]).includes("write"));
    assert.equal(m.bash, "restricted");
    assert.deepEqual(m.editableExtensions, [".md", ".mdx"]);
    assert.ok(m.prompt.includes("PI"));
  });

  it("debug has all tools and unrestricted bash", () => {
    const m = BUILTIN_MODES.debug;
    assert.equal(m.tools, "all");
    assert.equal(m.bash, "all");
    assert.ok(m.prompt.length > 0);
  });

  it("ask has read tools with restricted bash, no edit or write", () => {
    const m = BUILTIN_MODES.ask;
    assert.ok(Array.isArray(m.tools));
    assert.ok((m.tools as string[]).includes("read"));
    assert.ok((m.tools as string[]).includes("bash"));
    assert.ok(!(m.tools as string[]).includes("edit"));
    assert.ok(!(m.tools as string[]).includes("write"));
    assert.equal(m.bash, "restricted");
    assert.ok(m.prompt.length > 0);
  });

  it("review has read + bash tools and restricted bash", () => {
    const m = BUILTIN_MODES.review;
    assert.ok(Array.isArray(m.tools));
    assert.ok((m.tools as string[]).includes("read"));
    assert.ok((m.tools as string[]).includes("bash"));
    assert.ok(!(m.tools as string[]).includes("edit"));
    assert.ok(!(m.tools as string[]).includes("write"));
    assert.equal(m.bash, "restricted");
    assert.ok(m.prompt.length > 0);
  });
});

// ---------------------------------------------------------------------------
// isSafeBash - architect mode
// ---------------------------------------------------------------------------

describe("isSafeBash (architect)", () => {
  const mode: ModeName = "architect";

  const allowed = [
    "cat package.json",
    "head -20 src/index.ts",
    "tail -f logs/app.log",
    "grep -r TODO src/",
    "rg 'function main' .",
    "find . -name '*.ts'",
    "fd --extension ts",
    "ls -la",
    "tree src/",
    "wc -l src/index.ts",
    "sort file.txt",
    "diff a.txt b.txt",
    "file image.png",
    "stat README.md",
    "du -sh node_modules",
    "jq '.name' package.json",
    "git status",
    "git log --oneline -10",
    "git diff HEAD~1",
    "git show abc123",
    "git branch -a",
    "git remote -v",
    "npm list",
    "npm outdated",
    "bat src/index.ts",
  ];

  for (const cmd of allowed) {
    it(`allows: ${cmd}`, () => {
      assert.equal(isSafeBash(cmd, mode), true);
    });
  }

  const blocked = [
    "npm install express",
    "npm run build",
    "npm start",
    "yarn add lodash",
    "pnpm install",
    "git add .",
    "git commit -m 'test'",
    "git push origin main",
    "git reset --hard",
    "git checkout -b new-branch",
    "sudo apt-get update",
    "kill -9 1234",
    "vim file.ts",
    "echo hello > file.txt",
  ];

  for (const cmd of blocked) {
    it(`blocks: ${cmd}`, () => {
      assert.equal(isSafeBash(cmd, mode), false);
    });
  }
});

// ---------------------------------------------------------------------------
// isSafeBash - review mode (tighter allowlist)
// ---------------------------------------------------------------------------

describe("isSafeBash (review)", () => {
  const mode: ModeName = "review";

  const allowed = [
    "git diff HEAD~1",
    "git log --oneline -20",
    "git show abc123",
    "git blame src/index.ts",
    "git branch -a",
    "git status",
    "grep -r 'TODO' src/",
    "rg 'fixme' .",
    "cat src/utils.ts",
    "head -50 src/main.ts",
    "tail -20 src/main.ts",
    "wc -l src/*.ts",
    "find . -name '*.test.ts'",
    "ls -la src/",
    "diff a.ts b.ts",
  ];

  for (const cmd of allowed) {
    it(`allows: ${cmd}`, () => {
      assert.equal(isSafeBash(cmd, mode), true);
    });
  }

  const blocked = [
    "npm install express",
    "npm run test",
    "git add .",
    "git commit -m 'fix'",
    "git push",
    "git reset --hard HEAD",
    "node server.js",
    "echo 'hi' > file.txt",
  ];

  for (const cmd of blocked) {
    it(`blocks: ${cmd}`, () => {
      assert.equal(isSafeBash(cmd, mode), false);
    });
  }
});

// ---------------------------------------------------------------------------
// isEditableFile
// ---------------------------------------------------------------------------

describe("isSafeBash (piped and chained commands)", () => {
  it("allows safe pipe: cat | grep", () => {
    assert.equal(isSafeBash("cat file.txt | grep TODO", "architect"), true);
  });

  it("blocks pipe with destructive second command", () => {
    assert.equal(isSafeBash("cat file.txt | tee output.txt", "architect"), false);
  });

  it("blocks semicolon-chained destructive command", () => {
    assert.equal(isSafeBash("ls; npm install foo", "architect"), false);
  });

  it("blocks && chained destructive command", () => {
    assert.equal(isSafeBash("cat file.txt && git push", "architect"), false);
  });

  it("blocks || chained destructive command", () => {
    assert.equal(isSafeBash("grep foo bar.txt || rm something", "architect"), false);
  });

  it("allows safe pipe in review mode", () => {
    assert.equal(isSafeBash("git diff HEAD | grep TODO", "review"), true);
  });

  it("blocks destructive pipe in review mode", () => {
    assert.equal(isSafeBash("git log | tee log.txt", "review"), false);
  });
});

describe("isEditableFile", () => {
  it("allows .md files in architect mode", () => {
    assert.equal(isEditableFile("plan.md", BUILTIN_MODES.architect), true);
  });

  it("allows .mdx files in architect mode", () => {
    assert.equal(isEditableFile("notes.mdx", BUILTIN_MODES.architect), true);
  });

  it("is case-insensitive for extension matching", () => {
    assert.equal(isEditableFile("PLAN.MD", BUILTIN_MODES.architect), true);
    assert.equal(isEditableFile("notes.MDX", BUILTIN_MODES.architect), true);
  });

  it("allows nested path markdown files", () => {
    assert.equal(isEditableFile("docs/plan.md", BUILTIN_MODES.architect), true);
    assert.equal(isEditableFile("/absolute/path/to/notes.mdx", BUILTIN_MODES.architect), true);
  });

  it("blocks non-markdown files in architect mode", () => {
    assert.equal(isEditableFile("index.ts", BUILTIN_MODES.architect), false);
    assert.equal(isEditableFile("style.css", BUILTIN_MODES.architect), false);
    assert.equal(isEditableFile("config.json", BUILTIN_MODES.architect), false);
    assert.equal(isEditableFile("Makefile", BUILTIN_MODES.architect), false);
  });

  it("allows all files in code mode (no editableExtensions)", () => {
    assert.equal(isEditableFile("index.ts", BUILTIN_MODES.code), true);
    assert.equal(isEditableFile("style.css", BUILTIN_MODES.code), true);
    assert.equal(isEditableFile("plan.md", BUILTIN_MODES.code), true);
  });

  it("allows all files in debug mode (no editableExtensions)", () => {
    assert.equal(isEditableFile("index.ts", BUILTIN_MODES.debug), true);
  });
});

// ---------------------------------------------------------------------------
// modeHasOverride
// ---------------------------------------------------------------------------

describe("modeHasOverride", () => {
  it("returns false for built-in modes with no overrides", () => {
    for (const name of MODE_NAMES) {
      assert.equal(modeHasOverride(BUILTIN_MODES[name]), false);
    }
  });

  it("returns true when both provider and model are set", () => {
    const mode: ModeDefinition = {
      ...BUILTIN_MODES.debug,
      provider: "openai",
      model: "gpt-5.4",
    };
    assert.equal(modeHasOverride(mode), true);
  });

  it("returns true when thinkingLevel is set", () => {
    const mode: ModeDefinition = {
      ...BUILTIN_MODES.code,
      thinkingLevel: "high",
    };
    assert.equal(modeHasOverride(mode), true);
  });

  it("returns true when both model and thinkingLevel are set", () => {
    const mode: ModeDefinition = {
      ...BUILTIN_MODES.review,
      provider: "anthropic",
      model: "claude-sonnet-4-5",
      thinkingLevel: "medium",
    };
    assert.equal(modeHasOverride(mode), true);
  });

  it("returns false when only provider is set (no model)", () => {
    const mode: ModeDefinition = {
      ...BUILTIN_MODES.code,
      provider: "openai",
    };
    assert.equal(modeHasOverride(mode), false);
  });

  it("returns false when only model is set (no provider)", () => {
    const mode: ModeDefinition = {
      ...BUILTIN_MODES.code,
      model: "gpt-5.4",
    };
    assert.equal(modeHasOverride(mode), false);
  });
});
