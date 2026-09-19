/**
 * Double-ESC to abort — requires a second Escape (within PI_DOUBLE_ESC_MS,
 * default 1500ms) before aborting a streaming run.
 *
 * While streaming:
 *   - 1st ESC: swallowed, shows "esc again to abort" hint on editor border
 *   - 2nd ESC within window: native abort
 *   - window expires or any other key: hint + state reset
 * While idle: ESC passes through untouched (native clear/tree behavior).
 *
 * Does NOT replace the editor: wraps whatever editor factory is (or will be)
 * installed — pi-open-tui & friends keep their editor, we only intercept
 * handleInput/render on the already-created instance.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { matchesKey, sliceByColumn, visibleWidth } from "@earendil-works/pi-tui";

const DEBOUNCE_MS = (() => {
  const env = process.env.PI_DOUBLE_ESC_MS;
  const n = env ? parseInt(env, 10) : NaN;
  return !isNaN(n) && n > 0 ? n : 1500;
})();

const HINT = " esc again to abort ";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", (_event, ctx) => {
    const ui = ctx.ui as any;

    // Wrap setEditorComponent itself: any factory registered later (open-tui,
    // pi-pretty, ...) gets its produced instance patched, not replaced.
    if (!ui.__doubleEscPatched) {
      ui.__doubleEscPatched = true;
      const origSet = ui.setEditorComponent.bind(ui);
      ui.setEditorComponent = (factory: any) => {
        if (!factory) return origSet(factory); // restore-default passthrough
        return origSet((tui: any, theme: any, kb: any) => {
          const editor = factory(tui, theme, kb);
          return patchEditor(editor, tui, ctx);
        });
      };
      // Already-registered factory (we loaded after open-tui): re-wrap it.
      const existing = ui.getEditorComponent();
      if (existing) ui.setEditorComponent(existing);
    }
  });
}

function patchEditor(editor: any, tui: any, ctx: any): any {
  if (editor?.__doubleEscPatched) return editor; // never double-wrap
  if (editor) editor.__doubleEscPatched = true;

  const origHandleInput = editor?.handleInput?.bind(editor);
  const origRender = editor?.render?.bind(editor);

  let hintActive = false;
  let escCount = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const reset = () => {
    hintActive = false;
    escCount = 0;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  editor.handleInput = (data: string) => {
    if (matchesKey(data, "escape")) {
      // Idle + no pending hint: native behavior immediately.
      if (!hintActive && ctx.isIdle()) {
        origHandleInput(data);
        return;
      }
      escCount++;
      if (escCount >= 2) {
        // Confirmed: forward to native handler (aborts the run).
        reset();
        origHandleInput(data);
        return;
      }
      hintActive = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        reset();
        tui.requestRender();
      }, DEBOUNCE_MS);
      tui.requestRender();
      return; // swallow 1st ESC
    }
    if (hintActive) {
      reset();
      tui.requestRender();
    }
    origHandleInput(data);
  };

  editor.render = (width: number): string[] => {
    const lines = origRender(width);
    if (!hintActive || !lines?.length) return lines;

    const styled = ctx.ui.theme.fg("dim", HINT);
    const last = lines.length - 1;
    const line = lines[last]!;
    const w = visibleWidth(line);
    // Hint starts just past the corner: "╰─".
    const lead = 4;
    if (w < HINT.length + lead + 1) return lines; // too narrow for hint
    lines[last] =
      sliceByColumn(line, 0, lead) +
      styled +
      sliceByColumn(line, lead + HINT.length, w - lead - HINT.length);
    return lines;
  };

  return editor;
}
