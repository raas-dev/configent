// yaml-hooks-stfu.ts — drop the console line "[pi-yaml-hooks] Loaded ..." only.
// Source: pi-yaml-hooks/dist/pi/runtime-registry.js:162 prints it unconditionally;
// no env gate exists. Hook awareness and everything else stay untouched.

type StfuConsole = typeof console & { __yamlHooksStfu?: boolean };
const con = console as StfuConsole;
if (!con.__yamlHooksStfu) {
  con.__yamlHooksStfu = true;
  for (const m of ["info", "log"] as const) {
    const orig = console[m].bind(console);
    console[m] = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].startsWith("[pi-yaml-hooks] Loaded")) return;
      orig(...args);
    };
  }
}

export default function yamlHooksStfu(_pi: any) {}
