import { executeCode } from "../src/executor.js";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

const cwd = process.cwd();
let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

function summarize() {
  const total = passed + failed;
  console.log(`\n${passed}/${total} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

console.log("\nexecutor: executeCode");

async function main() {

await test("returns value from simple expression", async () => {
  const result = await executeCode("return 1 + 1", { cwd });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, 2);
  assert.equal(result.errors.length, 0);
});

await test("captures console.log output", async () => {
  const result = await executeCode('console.log("hello"); return "ok";', { cwd });
  assert.equal(result.success, true);
  assert.deepEqual(result.logs, ["hello"]);
  assert.equal(result.returnValue, "ok");
});

await test("captures print() output", async () => {
  const result = await executeCode('print("from print"); return undefined;', { cwd });
  assert.equal(result.success, true);
  assert.ok(result.logs.includes("from print"));
});

await test("captures console.warn with prefix", async () => {
  const result = await executeCode('console.warn("careful");', { cwd });
  assert.equal(result.success, true);
  assert.ok(result.logs[0].includes("[warn]"));
});

await test("captures console.error with prefix", async () => {
  const result = await executeCode('console.error("boom");', { cwd });
  assert.equal(result.success, true);
  assert.ok(result.logs[0].includes("[error]"));
});

await test("strips TS types via esbuild (no type checking)", async () => {
  const result = await executeCode("const x: number = 1; return x;", { cwd });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, 1);
});

await test("returns transpile error for invalid syntax", async () => {
  const result = await executeCode("function (", { cwd });
  assert.equal(result.success, false);
  assert.ok(result.errors.length > 0);
});

await test("returns runtime error for thrown exception", async () => {
  const result = await executeCode('throw new Error("kaboom");', { cwd });
  assert.equal(result.success, false);
  assert.equal(result.errorKind, "runtime");
  assert.ok(result.errors[0].message.includes("kaboom"));
});

await test("supports async/await", async () => {
  const result = await executeCode(
    "const val = await Promise.resolve(42); return val;",
    { cwd }
  );
  assert.equal(result.success, true);
  assert.equal(result.returnValue, 42);
});

await test("supports zx $ for shell commands", async () => {
  const result = await executeCode(
    'const out = await $`echo hello`; return out.stdout.trim();',
    { cwd }
  );
  assert.equal(result.success, true);
  assert.equal(result.returnValue, "hello");
});

await test("supports TS types (interface, type alias)", async () => {
  const code = `
    interface Foo { x: number; y: string }
    const foo: Foo = { x: 1, y: "bar" };
    return foo.y;
  `;
  const result = await executeCode(code, { cwd });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, "bar");
});

await test("has require available", async () => {
  const result = await executeCode(
    'const path = require("path"); return path.sep;',
    { cwd }
  );
  assert.equal(result.success, true);
  assert.equal(result.returnValue, "/");
});

await test("elapsedMs is populated", async () => {
  const result = await executeCode("return 1", { cwd });
  assert.equal(result.success, true);
  assert.ok(result.elapsedMs >= 0);
});

await test("user packages injected as globals", async () => {
  const result = await executeCode(
    "return myPkg.value;",
    { cwd, userPackages: { myPkg: { value: 99 } } }
  );
  assert.equal(result.success, true);
  assert.equal(result.returnValue, 99);
});

await test("transpiles ESM import to CJS require", async () => {
  const code = `
    import { join } from "path";
    return join("a", "b");
  `;
  const result = await executeCode(code, { cwd });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, "a/b");
});

await test("transpiles ESM named import from Node built-in", async () => {
  const code = `
    import { readdirSync } from "fs";
    const files = readdirSync(process.cwd());
    return Array.isArray(files);
  `;
  const result = await executeCode(code, { cwd });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, true);
});

await test("transpiles ESM import with top-level await", async () => {
  const code = `
    import { basename } from "path";
    const name = basename(process.cwd());
    return name;
  `;
  const result = await executeCode(code, { cwd });
  assert.equal(result.success, true);
  assert.equal(typeof result.returnValue, "string");
  assert.ok(result.returnValue.length > 0);
});

await test("ESM imports pass type-check when typeDefs provided", async () => {
  const typeDefs = `
interface FileInfo { name: string; path: string }
declare const cwd: string;
`;
  const code = `
    import { join } from "path";
    import { readdirSync } from "fs";
    const files: string[] = readdirSync(process.cwd());
    return files.length > 0;
  `;
  const result = await executeCode(code, { cwd, typeDefs });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, true);
});

await test("truncates output when maxOutputSize exceeded", async () => {
  const bigStr = "x".repeat(2000);
  const result = await executeCode(
    `console.log("${bigStr}"); console.log("${bigStr}");`,
    { cwd, maxOutputSize: 1000 }
  );
  assert.equal(result.success, true);
  assert.ok(result.logs.length <= 2);
});

await test("zx $ respects cwd for shell commands", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "pi-run-code-test-"));
  try {
    writeFileSync(join(tmpDir, "test.txt"), "content");
    const result = await executeCode(
      'const out = await $`ls`; return out.stdout.trim();',
      { cwd: tmpDir }
    );
    assert.equal(result.success, true);
    assert.equal(result.returnValue, "test.txt");
  } finally {
    rmSync(tmpDir, { recursive: true });
  }
});

summarize();

}

main().catch((e) => { console.error(e); process.exit(1); });
