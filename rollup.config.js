/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const babelOptions = {
  extensions: [".js", ".ts"],
};

const terserOptions = { output: { comments: "some" } };

export default [
  {
    input: "src/index.ts",
    plugins: [
      typescript({ tsconfig: "./tsconfig.json", declarationDir: "./" }),

      commonjs(),
      babel(babelOptions),
      nodeResolve(),
      terser(terserOptions),
    ],
    external: ["three"],
    output: [
      {
        file: "dist/index.umd.js",
        format: "umd",
        sourcemap: false,
        name: "google.maps.plugins.three",
        globals: {
          three: "THREE",
        },
      },
      {
        file: "dist/index.min.js",
        format: "iife",
        sourcemap: false,
        name: "google.maps.plugins.three",
        globals: {
          three: "THREE",
        },
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [
      typescript({ tsconfig: "./tsconfig.json", declarationDir: "./" }),

      commonjs(),
      babel(babelOptions),
      nodeResolve(),
      terser(terserOptions),
    ],
    external: ["three"],
    output: {
      file: "dist/index.dev.js",
      format: "iife",
      sourcemap: true,
      name: "google.maps.plugins.three",
      globals: {
        three: "THREE",
      },
    },
  },
  {
    input: "src/index.ts",
    plugins: [
      typescript({ tsconfig: "./tsconfig.json", declarationDir: "./" }),
      babel({
        presets: ["@babel/preset-modules"],
        babelrc: false,
        extensions: [".js", ".ts"],
      }),
      terser(terserOptions),
    ],
    output: {
      file: "dist/index.esm.js",
      format: "esm",
    },
  },
];
