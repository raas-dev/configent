import { loadUserPackages } from "../src/package-resolver.js";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";

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

function makeTmpDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "pi-pkg-resolver-test-"));
  mkdirSync(join(dir, ".pi"), { recursive: true });
  return dir;
}

function mkdirSync(...args: any[]) {
  const { mkdirSync: ms } = require("node:fs");
  return ms(...args);
}

console.log("\npackage-resolver: loadUserPackages");

async function main() {

await test("returns empty when no config exists", async () => {
  const dir = makeTmpDir();
  try {
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 0);
    assert.equal(result.warnings.length, 0);
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("installs string shorthand package", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "humanize-duration": "*" }
    }));
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 1);
    assert.equal(result.packages[0].varName, "humanizeDuration");
    assert.equal(result.packages[0].specifier, "humanize-duration");
    assert.equal(result.packages[0].scope, "project");
    assert.equal(typeof result.packages[0].module, "function");
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("installs object config with custom var name", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: {
        yaml: { version: "^2", as: "YAML", description: "YAML parser" }
      }
    }));
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 1);
    assert.equal(result.packages[0].varName, "YAML");
    assert.equal(result.packages[0].specifier, "yaml");
    assert.equal(result.packages[0].description, "YAML parser");
    assert.equal(typeof result.packages[0].module.parse, "function");
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("detects @types for installed package", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "humanize-duration": "*" }
    }));
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 1);
    assert.equal(result.packages[0].hasTypes, true);
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("skips reinstall when package.json unchanged", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "humanize-duration": "*" }
    }));
    loadUserPackages(dir);
    const pkgJsonPath = join(dir, ".pi", "pi-run-code", "package.json");
    assert.ok(existsSync(pkgJsonPath));
    const mtime1 = readFileSync(pkgJsonPath, "utf8");

    loadUserPackages(dir);
    const mtime2 = readFileSync(pkgJsonPath, "utf8");
    assert.equal(mtime1, mtime2);
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("reinstalls when config changes", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "humanize-duration": "*" }
    }));
    loadUserPackages(dir);

    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "yaml": "^2" }
    }));
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 1);
    assert.equal(result.packages[0].varName, "yaml");
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("description falls back to package.json", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "humanize-duration": "*" }
    }));
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 1);
    assert.ok(result.packages[0].description.length > 0);
    assert.ok(result.packages[0].description !== "humanize-duration");
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("warns on invalid package", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "nonexistent-pkg-xyz-999": "^99.99.99" }
    }));
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 0);
    assert.ok(result.warnings.length > 0);
    assert.ok(result.warnings[0].includes("nonexistent-pkg-xyz-999"));
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("converts scoped package to var name", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), JSON.stringify({
      packages: { "humanize-duration": "*" }
    }));
    const result = loadUserPackages(dir);
    const pkg = result.packages.find(p => p.specifier === "humanize-duration");
    assert.ok(pkg);
    assert.equal(pkg.varName, "humanizeDuration");
  } finally {
    rmSync(dir, { recursive: true });
  }
});

await test("handles invalid JSON config", async () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".pi", "pi-run-code.json"), "not valid json!!!");
    const result = loadUserPackages(dir);
    assert.equal(result.packages.length, 0);
    assert.ok(result.warnings.length > 0);
    assert.ok(result.warnings[0].includes("Failed to parse"));
  } finally {
    rmSync(dir, { recursive: true });
  }
});

summarize();

}

main().catch((e) => { console.error(e); process.exit(1); });
