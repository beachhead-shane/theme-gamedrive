//@ts-check
import { context, build } from "esbuild";
import { exec } from "child_process";
import { getCommonOptions } from "./commonOptions.js";
import * as child from "child_process";

// eslint-disable-next-line no-undef
const proc = process;

var args = proc.argv.slice(2);

const dev = args.includes("-dev");
const sourcemap = args.includes("-sourcemap");
const serve = args.includes("-serve");

const regHotReload = () => {
  new EventSource("/esbuild").addEventListener("change", () => {
    location.reload();
  });
};

const commitHash = child.execSync("git rev-parse --short=8 HEAD").toString();

/**
 * @type import("esbuild").BuildOptions
 */
const appOptions = {
  ...getCommonOptions(!dev, sourcemap),
  logLevel: "info",
  outdir: "public/scripts",
  entryPoints: ["src/app.ts"], //Create separate bundles for polyfills
  external: [],
  footer: { js: dev ? `(${regHotReload.toString()})();` : "" },
  define: {
    __GIT_SHA__: `"${commitHash.substring(0, 8)}"`,
    __BUILD_TIME__: `"${new Date().toUTCString()}"`,
  },
};

if (!serve) {
  await build(appOptions);
  proc.exit(0);
}

const serveOptions = {
  servedir: "public",
  host: "localhost",
};
let buildCtx = await context(appOptions);
if (dev) {
  await buildCtx.watch();
}
let serveResult = await buildCtx.serve(serveOptions);

const start =
  proc.platform == "darwin"
    ? "open"
    : proc.platform == "win32"
    ? "start"
    : "xdg-open";
exec(start + " " + `http://${serveResult.host}:${serveResult.port}`);
