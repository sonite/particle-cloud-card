import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/particle-cloud-card.js",
  output: {
    file: "particle-cloud-card.js",   // <- root output (what HA loads)
    format: "es",
    sourcemap: false,
    inlineDynamicImports: true
  },
  plugins: [
    resolve()
  ]
  // IMPORTANT: no "external: ['lit']" here
};
