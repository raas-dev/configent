// type-checker.ts — TypeScript type checking via ts.createProgram with virtual FS.

import ts from "typescript";
import fsReal from "node:fs";
import pathReal from "node:path";

export interface TypeCheckError {
  line: number;
  col: number;
  message: string;
}

export interface TypeCheckResult {
  errors: TypeCheckError[];
}

let sourceFiles: Map<string, ts.SourceFile> | null = null;
let fileContent: Map<string, string> | null = null;
let directories: Set<string> | null = null;

const LIB_NAMES = [
  "lib.es5.d.ts",
  "lib.es2015.d.ts",
  "lib.es2015.promise.d.ts",
  "lib.es2015.iterable.d.ts",
  "lib.es2015.collection.d.ts",
  "lib.es2015.symbol.d.ts",
  "lib.es2015.symbol.wellknown.d.ts",
  "lib.es2015.core.d.ts",
  "lib.es2015.generator.d.ts",
  "lib.es2015.proxy.d.ts",
  "lib.es2015.reflect.d.ts",
  "lib.es2016.d.ts",
  "lib.es2016.array.include.d.ts",
  "lib.es2017.d.ts",
  "lib.es2017.string.d.ts",
  "lib.es2017.object.d.ts",
  "lib.es2017.sharedmemory.d.ts",
  "lib.es2017.intl.d.ts",
  "lib.es2017.typedarrays.d.ts",
  "lib.es2018.d.ts",
  "lib.es2018.asyncgenerator.d.ts",
  "lib.es2018.asynciterable.d.ts",
  "lib.es2018.intl.d.ts",
  "lib.es2018.promise.d.ts",
  "lib.es2018.regexp.d.ts",
  "lib.es2019.d.ts",
  "lib.es2019.array.d.ts",
  "lib.es2019.object.d.ts",
  "lib.es2019.string.d.ts",
  "lib.es2019.symbol.d.ts",
  "lib.es2019.intl.d.ts",
  "lib.es2020.d.ts",
  "lib.es2020.string.d.ts",
  "lib.es2020.symbol.wellknown.d.ts",
  "lib.es2020.bigint.d.ts",
  "lib.es2020.promise.d.ts",
  "lib.es2020.sharedmemory.d.ts",
  "lib.es2020.intl.d.ts",
  "lib.es2020.date.d.ts",
  "lib.es2020.number.d.ts",
  "lib.es2021.d.ts",
  "lib.es2021.promise.d.ts",
  "lib.es2021.string.d.ts",
  "lib.es2021.weakref.d.ts",
  "lib.es2021.intl.d.ts",
  "lib.es2022.d.ts",
  "lib.es2022.array.d.ts",
  "lib.es2022.error.d.ts",
  "lib.es2022.object.d.ts",
  "lib.es2022.string.d.ts",
  "lib.es2022.regexp.d.ts",
  "lib.es2022.intl.d.ts",
];

export function initTypeChecker(): void {
  if (sourceFiles) return;

  sourceFiles = new Map();
  fileContent = new Map();
  directories = new Set();

  const tsLibDir = pathReal.dirname(
    require.resolve("typescript/lib/lib.es2022.d.ts")
  );
  for (const name of LIB_NAMES) {
    const filePath = pathReal.join(tsLibDir, name);
    if (fsReal.existsSync(filePath)) {
      addFile(name, fsReal.readFileSync(filePath, "utf-8"));
    }
  }

  const ownNodeModules = pathReal.resolve(tsLibDir, "..", "..");

  const packagesToLoad = [
    { dir: "@types/node", prefix: "node_modules/@types/node" },
    { dir: "zx", prefix: "node_modules/zx" },
  ];

  for (const pkg of packagesToLoad) {
    const pkgDir = pathReal.join(ownNodeModules, pkg.dir);
    if (fsReal.existsSync(pkgDir)) {
      loadPackageDir(pkgDir, pkg.prefix);
    }
  }
}

export function loadPackageTypes(packages: Array<{
  specifier: string;
  packageDir: string;
  hasTypes: boolean;
}>): void {
  if (!sourceFiles) initTypeChecker();

  for (const pkg of packages) {
    if (!pkg.hasTypes) continue;

    const nodeModulesDir = pathReal.dirname(pkg.packageDir);

    const pkgJsonPath = pathReal.join(pkg.packageDir, "package.json");
    if (fsReal.existsSync(pkgJsonPath)) {
      try {
        const pkgJson = JSON.parse(fsReal.readFileSync(pkgJsonPath, "utf-8"));
        if (pkgJson.types || pkgJson.typings || pkgJson.exports?.["."]?.types) {
          const prefix = "node_modules/" + getPackageName(pkg.specifier);
          loadPackageDir(pkg.packageDir, prefix);
          continue;
        }
      } catch {}
    }

    const baseName = pkg.specifier.startsWith("@")
      ? pkg.specifier.replace("@", "").replace("/", "__")
      : pkg.specifier.split("/")[0];
    const typesDir = pathReal.join(nodeModulesDir, "@types", baseName);
    if (fsReal.existsSync(typesDir)) {
      const prefix = "node_modules/@types/" + baseName;
      loadPackageDir(typesDir, prefix);
    }
  }
}

function getPackageName(specifier: string): string {
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/");
    return parts.slice(0, 2).join("/");
  }
  return specifier.split("/")[0];
}

function addFile(virtualPath: string, content: string): void {
  fileContent!.set(virtualPath, content);
  sourceFiles!.set(
    virtualPath,
    ts.createSourceFile(virtualPath, content, ts.ScriptTarget.ESNext, true)
  );
  let dir = virtualPath;
  while (true) {
    const parent = dir.includes("/") ? dir.substring(0, dir.lastIndexOf("/")) : "";
    if (parent === dir) break;
    dir = parent;
    if (dir) directories!.add(dir);
  }
}

function loadPackageDir(realDir: string, virtualPrefix: string): void {
  for (const entry of fsReal.readdirSync(realDir, { withFileTypes: true })) {
    const virtualPath = virtualPrefix + "/" + entry.name;
    if (entry.isFile()) {
      if (entry.name.endsWith(".d.ts") || entry.name === "package.json") {
        addFile(virtualPath, fsReal.readFileSync(pathReal.join(realDir, entry.name), "utf-8"));
      }
    } else if (entry.isDirectory() && !entry.name.startsWith(".")) {
      loadPackageDir(pathReal.join(realDir, entry.name), virtualPath);
    }
  }
}

function normalizePath(p: string): string {
  return p.startsWith("/") ? p.slice(1) : p;
}

export function typeCheck(
  userCode: string,
  typeDefs: string
): TypeCheckResult {
  if (!sourceFiles) {
    initTypeChecker();
  }

  const typeDefLineCount = typeDefs.split("\n").length;
  const prefixLineCount = typeDefLineCount + 1;

  const fullSource =
    typeDefs + "\n(async () => {\n" + userCode + "\n})();\n";
  const fileName = "codemode.ts";
  const sourceFile = ts.createSourceFile(
    fileName,
    fullSource,
    ts.ScriptTarget.ESNext,
    true
  );

  const host: ts.CompilerHost = {
    getSourceFile: (name: string) => {
      if (name === fileName) return sourceFile;
      const normalized = normalizePath(name);
      return sourceFiles!.get(name) ?? sourceFiles!.get(normalized);
    },
    getDefaultLibFileName: () => "lib.es5.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (f: string) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (f: string) => {
      if (f === fileName) return true;
      const normalized = normalizePath(f);
      return fileContent!.has(f) || fileContent!.has(normalized);
    },
    readFile: (f: string) => {
      const normalized = normalizePath(f);
      return fileContent!.get(f) ?? fileContent!.get(normalized);
    },
    directoryExists: (dir: string) => {
      const normalized = normalizePath(dir);
      return directories!.has(dir) || directories!.has(normalized);
    },
    getDirectories: (dir: string) => {
      const normalized = normalizePath(dir);
      const prefix = normalized ? normalized + "/" : "";
      const subdirs = new Set<string>();
      for (const d of directories!) {
        if (d.startsWith(prefix) && d !== normalized) {
          const rest = d.slice(prefix.length);
          const firstSegment = rest.split("/")[0];
          if (firstSegment) subdirs.add(firstSegment);
        }
      }
      return [...subdirs];
    },
    realpath: (f: string) => f,
  };

  const program = ts.createProgram(
    [fileName, ...sourceFiles!.keys()],
    {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      strict: false,
      noEmit: true,
      skipLibCheck: true,
      typeRoots: ["node_modules/@types"],
      types: ["node"],
    },
    host
  );

  const syntaxDiags = program.getSyntacticDiagnostics(sourceFile);
  const semanticDiags = program.getSemanticDiagnostics(sourceFile);
  const allDiags = [...syntaxDiags, ...semanticDiags];

  const errors: TypeCheckError[] = allDiags.map((d) => {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (d.file && d.start !== undefined) {
      const pos = d.file.getLineAndCharacterOfPosition(d.start);
      const userLine = pos.line - prefixLineCount;
      return {
        line: Math.max(1, userLine + 1),
        col: pos.character + 1,
        message: msg,
      };
    }
    return { line: 0, col: 0, message: msg };
  });

  return { errors };
}
