#!/usr/bin/env node

const { buildSync } = require("esbuild");
const path = require("path");
const fs = require("fs");

const outfile = path.join(__dirname, ".cache", "test.cjs");
fs.mkdirSync(path.join(__dirname, ".cache"), { recursive: true });

buildSync({
  entryPoints: [path.join(__dirname, "sandbox.test.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "es2022",
  outfile,
  packages: "bundle",
  external: ["esbuild", "zx"],
  sourcemap: "inline",
  logLevel: "error",
});

require(outfile);
