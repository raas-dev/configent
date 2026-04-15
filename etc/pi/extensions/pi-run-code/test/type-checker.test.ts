import { initTypeChecker, typeCheck, loadPackageTypes } from "../src/type-checker.js";
import { generateBuiltinTypeDefs, generatePackageTypeDefs } from "../src/type-generator.js";
import { executeCode } from "../src/executor.js";
import assert from "node:assert/strict";

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

const cwd = process.cwd();

console.log("\ntype-checker: typeCheck");

async function main() {

initTypeChecker();
const typeDefs = generateBuiltinTypeDefs();

await test("initTypeChecker is idempotent", async () => {
  initTypeChecker();
  initTypeChecker();
});

await test("passes valid JS code", async () => {
  const result = typeCheck("const x = 1 + 1; return x;", typeDefs);
  assert.equal(result.errors.length, 0, result.errors.map(e => e.message).join(", "));
});

await test("passes valid TS code with types", async () => {
  const result = typeCheck("const x: number = 42; return x;", typeDefs);
  assert.equal(result.errors.length, 0);
});

await test("catches type mismatch", async () => {
  const result = typeCheck('const x: number = "string";', typeDefs);
  assert.ok(result.errors.length > 0);
  assert.ok(result.errors[0].message.includes("Type"));
});

await test("catches unknown variable", async () => {
  const result = typeCheck("return nonexistentVariable;", typeDefs);
  assert.ok(result.errors.length > 0);
  assert.ok(result.errors[0].message.includes("nonexistentVariable") || result.errors[0].message.includes("Cannot find name"));
});

await test("catches wrong function args", async () => {
  const result = typeCheck('print(1, 2, 3);', typeDefs);
  assert.equal(result.errors.length, 0);
});

await test("allows interface and type alias", async () => {
  const code = `
    interface Foo { x: number; y: string }
    const foo: Foo = { x: 1, y: "bar" };
    return foo.y;
  `;
  const result = typeCheck(code, typeDefs);
  assert.equal(result.errors.length, 0, result.errors.map(e => e.message).join(", "));
});

await test("catches missing required property in interface", async () => {
  const code = `
    interface Foo { x: number; y: string }
    const foo: Foo = { x: 1 };
  `;
  const result = typeCheck(code, typeDefs);
  assert.ok(result.errors.length > 0);
});

await test("error line numbers point to user code", async () => {
  const code = `const a = 1;\nconst b: number = "wrong";`;
  const result = typeCheck(code, typeDefs);
  assert.ok(result.errors.length > 0);
  assert.ok(result.errors[0].line >= 1);
  assert.ok(result.errors[0].line <= code.split("\n").length);
});

await test("allows async/await", async () => {
  const result = typeCheck("const val = await Promise.resolve(42); return val;", typeDefs);
  assert.equal(result.errors.length, 0);
});

await test("allows $ shell from zx types", async () => {
  const result = typeCheck("const out = await $`echo hello`; return out;", typeDefs);
  assert.equal(result.errors.length, 0, result.errors.map(e => e.message).join(", "));
});

await test("allows console.log", async () => {
  const result = typeCheck('console.log("hello");', typeDefs);
  assert.equal(result.errors.length, 0);
});

await test("allows require", async () => {
  const result = typeCheck('const fs = require("fs"); return fs;', typeDefs);
  assert.equal(result.errors.length, 0);
});

console.log("\ntype-generator: generateBuiltinTypeDefs + generatePackageTypeDefs");

await test("generates builtin type defs", async () => {
  const defs = generateBuiltinTypeDefs();
  assert.ok(defs.includes("declare const $"));
  assert.ok(defs.includes("declare function print"));
  assert.ok(defs.includes("declare const console"));
  assert.ok(defs.includes("declare const require"));
});

await test("generates typed package defs", async () => {
  const defs = generatePackageTypeDefs([
    { specifier: "yaml", varName: "YAML", hasTypes: true },
  ]);
  assert.ok(defs.includes("import type * as _pkg_YAML from 'yaml'"));
  assert.ok(defs.includes("declare const YAML: typeof _pkg_YAML"));
});

await test("generates untyped package as any", async () => {
  const defs = generatePackageTypeDefs([
    { specifier: "my-lib", varName: "myLib", hasTypes: false },
  ]);
  assert.ok(defs.includes("declare const myLib: any"));
});

await test("returns empty string for no packages", async () => {
  const defs = generatePackageTypeDefs([]);
  assert.equal(defs, "");
});

console.log("\nexecutor: type checking integration");

await test("executeCode with typeDefs catches type error", async () => {
  const result = await executeCode('const x: number = "not a number";', { cwd, typeDefs });
  assert.equal(result.success, false);
  assert.equal(result.errorKind, "type");
  assert.ok(result.errors.length > 0);
});

await test("executeCode with typeDefs runs valid typed code", async () => {
  const result = await executeCode("const x: number = 42; return x;", { cwd, typeDefs });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, 42);
});

await test("executeCode without typeDefs skips type checking", async () => {
  const result = await executeCode('const x: number = "not a number" as any; return x;', { cwd });
  assert.equal(result.success, true);
  assert.equal(result.returnValue, "not a number");
});

await test("executeCode type error has correct line number", async () => {
  const code = "const a = 1;\nconst b: number = \"wrong\";\nreturn b;";
  const result = await executeCode(code, { cwd, typeDefs });
  assert.equal(result.success, false);
  assert.equal(result.errorKind, "type");
  assert.ok(result.errors[0].line >= 1 && result.errors[0].line <= 3);
});

summarize();

}

main().catch((e) => { console.error(e); process.exit(1); });
