import { piRunCodeUnsandboxedAcknowledged } from "../src/pi-run-code-env.js";
import assert from "node:assert/strict";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
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

console.log("\npi-run-code-env: piRunCodeUnsandboxedAcknowledged");

test("undefined is false", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged(undefined), false);
});

test("empty string is false", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged(""), false);
});

test("whitespace-only is false", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("   "), false);
});

test("0 is false", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("0"), false);
});

test("false string is false", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("false"), false);
});

test("no is false", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("no"), false);
});

test("1 is true", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("1"), true);
});

test("true is true (any case)", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("true"), true);
  assert.equal(piRunCodeUnsandboxedAcknowledged("TRUE"), true);
  assert.equal(piRunCodeUnsandboxedAcknowledged("True"), true);
});

test("yes is true (any case)", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("yes"), true);
  assert.equal(piRunCodeUnsandboxedAcknowledged("YES"), true);
  assert.equal(piRunCodeUnsandboxedAcknowledged("Yes"), true);
});

test("leading/trailing space accepted for true values", () => {
  assert.equal(piRunCodeUnsandboxedAcknowledged("  true  "), true);
  assert.equal(piRunCodeUnsandboxedAcknowledged("\t1\n"), true);
  assert.equal(piRunCodeUnsandboxedAcknowledged(" yes "), true);
});

summarize();
