import esbuild from "esbuild"

esbuild.build({
    bundle: true,
    entryPoints: ["./src/index.ts"],
    outdir: "dist",
    format: "cjs",
    platform: "node",
    color: true,
    logLevel: "info",
    minify: true,
}).catch(() => {
    process.exit(1)
})