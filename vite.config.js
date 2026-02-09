import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    lib: {
      entry: "src/particle-cloud-card.js",
      formats: ["es"],
      fileName: () => "particle-cloud-card.js"
    },
    rollupOptions: {
      // IMPORTANT: do NOT mark "lit" as external — we want it bundled
      output: {
        inlineDynamicImports: true
      }
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: true
  }
});
