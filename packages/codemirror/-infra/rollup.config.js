import { nodeResolve } from "@rollup/plugin-node-resolve";

export function make() {
  return {
    input: "./src/parser.js",
    output: [
      {
        format: "cjs",
        file: "./dist/index.cjs",
      },
      {
        format: "es",
        file: "./dist/index.es.js",
      },
    ],
    external(id) {
      return !/^[./]/.test(id);
    },
    plugins: [nodeResolve()],
  };
}
