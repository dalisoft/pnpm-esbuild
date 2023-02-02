import { build } from "esbuild";

const outDir = "build";
const outfile = "index.js";
const target = "es2015";

/** @type {BuildOptions} */
export const config = {
  outfile: outDir + "/" + outfile,
  bundle: true,
  treeShaking: true,
  jsxSideEffects: false,
  jsxDev: false,
  // splitting: true,
  format: "esm",
  assetNames: "assets/[name]",
  entryPoints: ["src/index.js"],
  loader: {
    ".svg": "text",
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".js": "jsx",
    ".jsx": "jsx",
    ".json": "json",
  },
  target,
};

const result = await build(config);

console.log(
  `Build succesfully with ${result.errors.length} errors and ${result.warnings.length} warnings`
);
