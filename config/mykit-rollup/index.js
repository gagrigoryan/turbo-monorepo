import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import sourceMaps from "rollup-plugin-sourcemaps";
import del from "rollup-plugin-delete";
import eslint from "@rollup/plugin-eslint";
import url from "@rollup/plugin-url";

const getRollupOptions = (props) => {
  const tsconfig = props?.tsconfigPath || "./tsconfig.json";
  return [
    {
      input: "src/index.ts",
      output: [
        {
          file: "dist/cjs/index.js",
          format: "cjs",
          sourcemap: true,
          exports: "auto",
        },
        {
          file: "dist/esm/index.js",
          format: "esm",
          sourcemap: true,
          exports: "auto",
        },
      ],
      watch: {
        include: "src/**",
      },
      plugins: [
        del({ targets: "dist/*" }),
        url(),
        postcss({
          plugins: [autoprefixer(), postcssImport()],
          use: ["sass"],
          modules: false,
          minimize: true,
          extract: true,
        }),
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig }),
        terser(),
        sourceMaps(),
        eslint({
          formatter: () => {},
          exclude: [
            "node_modules/**",
            "./package.json",
            "**.*.scss",
            "**.scss",
          ],
          throwOnWarning: false,
          throwOnError: true,
        }),
      ],
      external: ["react", "react-dom"],
    },
    {
      input: "dist/esm/types/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      plugins: [dts()],
      external: [/\.(sass|scss|css)$/],
    },
  ];
};

export default getRollupOptions;
