// type-generator.ts — Generate type defs for run_code globals + user packages.

export function generateBuiltinTypeDefs(): string {
  return `\
// --- Built-in globals ---

import type { $ as Shell, ProcessPromise, ProcessOutput } from 'zx';
import type { cd as CdFn, within as WithinFn, nothrow as NothrowFn, quiet as QuietFn } from 'zx';
import type { retry as RetryFn, sleep as SleepFn, chalk as ChalkInstance, which as WhichFn } from 'zx';
import type { quote as QuoteFn, glob as GlobFn } from 'zx';

/** zx shell command — execute shell commands with template literals. */
declare const $: typeof Shell;
/** Change working directory for subsequent $ commands. */
declare const cd: typeof CdFn;
/** Run callback in isolated zx context. */
declare const within: typeof WithinFn;
/** Suppress errors from a process — returns ProcessOutput even on non-zero exit. */
declare const nothrow: typeof NothrowFn;
/** Suppress stdout output from a process. */
declare const quiet: typeof QuietFn;
/** Retry a function with exponential backoff. */
declare const retry: typeof RetryFn;
/** Sleep for a given duration (ms or string like '5s'). */
declare const sleep: typeof SleepFn;
/** Terminal string styling. */
declare const chalk: typeof ChalkInstance;
/** Find the path of an executable. */
declare const which: typeof WhichFn;
/** Escape a string for safe shell use. */
declare const quote: typeof QuoteFn;
/** Find files using glob patterns. */
declare const glob: typeof GlobFn;

/** Output to include in the result. */
declare function print(...args: any[]): void;

/** Console with captured output. */
declare const console: {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
};

/** Node.js require. */
declare const require: NodeRequire;
/** Node.js process. */
declare const process: typeof import('process');
/** Node.js Buffer. */
declare const Buffer: typeof import('buffer').Buffer;

/** Node.js os module. */
declare const os: typeof import('os');
/** Node.js path module. */
declare const path: typeof import('path');
/** Node.js fs module. */
declare const fs: typeof import('fs');
`;
}

export function generatePackageTypeDefs(
  packages: Array<{ specifier: string; varName: string; hasTypes: boolean }>
): string {
  if (packages.length === 0) return "";

  const lines: string[] = [];
  lines.push("// --- User-configured packages ---");
  lines.push("");

  for (const pkg of packages) {
    if (pkg.hasTypes) {
      const importName = `_pkg_${sanitizeIdentifier(pkg.varName)}`;
      lines.push(`import type * as ${importName} from '${pkg.specifier}';`);
      lines.push(`declare const ${pkg.varName}: typeof ${importName};`);
    } else {
      lines.push(`declare const ${pkg.varName}: any;`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function sanitizeIdentifier(name: string): string {
  return name.replace(/[^a-zA-Z0-9_$]/g, "_");
}
