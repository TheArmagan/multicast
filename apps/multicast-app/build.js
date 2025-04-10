const { build } = require("esbuild");

console.time("Build time");
build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/multicast.js",
  minify: true,
  external: [
    "electron",
  ]
}).then(() => {
  console.timeEnd("Build time");
});