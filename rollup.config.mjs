import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/particle-cloud-card.js",
  output: {
    file: "dist/particle-cloud-card.js",
    format: "es",
    sourcemap: true
  },
  plugins: [resolve()]
};
