import type { ExtensionContext, ToolDefinition } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import { executeCode, type ExecutionResult } from "./executor.js";

export interface RunCodeToolOptions {
  cwd: string;
  shellPrefix?: string;
  userPackages?: Record<string, unknown>;
  timeout?: number;
  maxOutputSize?: number;
  packageDescriptions?: string;
  typeDefs?: string;
}

export function createRunCodeTool(options: RunCodeToolOptions): ToolDefinition {
  const { cwd, shellPrefix, userPackages = {}, timeout, maxOutputSize, packageDescriptions, typeDefs } = options;

  const packageSection = packageDescriptions
    ? `\n\nConfigured npm packages (available as globals):\n${packageDescriptions}`
    : "";

  return {
    name: "run_code",
    label: "Run Code",
    description: `Execute TypeScript or JavaScript code in a Node.js context.

Use this tool when the user says "run code", "run_code", or asks to execute anything programmatic — computation, data processing, file operations via Node.js APIs (require("fs"), require("path"), etc.), or code evaluation.

Available in code:
- $ (zx shell) — run shell commands with template literals, e.g. const out = await $\`ls -la\`
- print(...) — output to include in result
- console.log/warn/error — captured output
- require(...) — import any Node.js module (fs, path, os, etc.)
- Any npm packages configured in .pi/pi-run-code.json${packageSection}

Only TS/JS syntax accepted. Return a value to include it in the result.`,

    parameters: Type.Object({
      code: Type.String({
        description: "TypeScript or JavaScript code only. Has $ (zx shell), print(), console, require(), and configured npm packages.",
      }),
    }),

    async execute(
      _toolCallId: string,
      params: { code: string },
      signal: AbortSignal | undefined,
      onUpdate: any,
      _ctx: ExtensionContext
    ) {
      const result: ExecutionResult = await executeCode(params.code, {
        cwd,
        timeout,
        maxOutputSize,
        signal,
        onUpdate,
        shellPrefix,
        userPackages,
        typeDefs,
      });

      if (!result.success) {
        const errorText = result.errors
          .map((e) => (e.line > 0 ? `Line ${e.line}: ${e.message}` : e.message))
          .join("\n");

        let text: string;
        if (result.errorKind === 'type') {
          text = `Type errors (code was NOT executed):\n${errorText}\n\nFix the type errors and try again.`;
        } else {
          text = `Runtime error:\n${errorText}\n\nThe code executed but threw an error.`;
        }

        if (result.logs.length > 0) {
          text = `Output before error:\n${result.logs.join("\n")}\n\n${text}`;
        }

        return {
          content: [{ type: "text" as const, text }],
          isError: true,
          details: {
            errors: result.errors,
            logs: result.logs,
            elapsedMs: result.elapsedMs,
          },
        };
      }

      const parts: string[] = [];
      if (result.logs.length > 0) {
        parts.push(result.logs.join("\n"));
      }
      if (result.returnValue !== undefined) {
        const formatted =
          typeof result.returnValue === "string"
            ? result.returnValue
            : JSON.stringify(result.returnValue, null, 2);
        parts.push(formatted);
      }
      const text = parts.join("\n\n") || "(no output)";

      return {
        content: [{ type: "text" as const, text }],
        details: {
          logs: result.logs,
          returnValue: result.returnValue,
          elapsedMs: result.elapsedMs,
        },
      };
    },

    renderCall(args: { code: string }, theme: any) {
      try {
        const { highlightCode } = require("@mariozechner/pi-coding-agent");
        const { Text } = require("@mariozechner/pi-tui");
        const highlighted = highlightCode(args.code.trim(), "typescript");
        const text = Array.isArray(highlighted) ? highlighted.join("\n") : String(highlighted);
        return new Text(text, 0, 0);
      } catch {
        const { Text } = require("@mariozechner/pi-tui");
        return new Text(String(args.code ?? ""), 0, 0);
      }
    },

    renderResult(
      result: any,
      options: { expanded: boolean; isPartial: boolean },
      theme: any
    ) {
      const { Text } = require("@mariozechner/pi-tui");
      const { isPartial, expanded } = options;

      if (isPartial) {
        const msg = result.details?.progress
          ? result.content?.[0]?.text ?? "Executing..."
          : "Executing...";
        return new Text(theme.fg("warning", msg), 0, 0);
      }

      const details = result.details ?? {};
      const isError = result.isError;
      const elapsed = details.elapsedMs
        ? ` ${theme.fg("dim", `(${Math.round(details.elapsedMs)}ms)`)}`
        : "";

      if (isError) {
        const errors = details.errors ?? [];
        const firstError = errors[0]?.message ?? "Unknown error";
        if (!expanded) {
          return new Text(theme.fg("error", `✗ ${firstError}`) + elapsed, 0, 0);
        }
        const lines = errors
          .map((e: any) =>
            theme.fg("error", e.line > 0 ? `Line ${e.line}: ` : "") + e.message
          )
          .join("\n");
        return new Text(lines + elapsed, 0, 0);
      }

      const text = (result.content?.[0]?.text ?? "(no output)").trim();
      const lineCount = text.split("\n").length;

      if (!expanded && lineCount > 5) {
        const preview = text.split("\n").slice(0, 3).join("\n");
        return new Text(
          theme.fg("success", "✓ ") +
            preview +
            theme.fg("dim", `\n... ${lineCount - 3} more lines`) +
            elapsed,
          0, 0
        );
      }

      return new Text(theme.fg("success", "✓ ") + text + elapsed, 0, 0);
    },
  } as unknown as ToolDefinition;
}
