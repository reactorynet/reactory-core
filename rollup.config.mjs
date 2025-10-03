/* eslint-disable prettier/prettier */
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import copy from "./rollup/copy.js";
import jsx from 'rollup-plugin-jsx';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
// const jsx = require("rollup-plugin-jsx");

// Function to recursively find all .d.ts files
function findDtsFiles(dir, baseDir = dir) {
  const files = {};
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    // Remove the baseDir prefix and clean up the path
    const relativePath = fullPath.replace(baseDir.replace('./', ''), '').replace(/^\/+/, '');
    
    if (statSync(fullPath).isDirectory()) {
      Object.assign(files, findDtsFiles(fullPath, baseDir));
    } else if (item.endsWith('.d.ts')) {
      const targetPath = `./dist/types/${relativePath}`;
      files[fullPath] = targetPath;
    }
  }
  
  return files;
}

// Get all .d.ts files from the types directory
const dtsFiles = findDtsFiles('./src/types');

const options = {
  input: "./src/Reactory.ts",
  output: [
    {
      file: "dist/reactory.core.js",
      format: "umd",
      name: "ReactoryCore",
      sourcemap: true,
    },
    {
      file: "dist/reactory.core.esm.js",
      format: "esm",
      name: "ReactoryCore",
      sourcemap: true,
    },
  ],

  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    commonjs({
      include: "node_modules/**",
      exclude: [ "node_modules/process-es6/**" ],
    }),
    typescript({
      tsconfig: "tsconfig.json",
      sourceMap: true,
    }),
    babel({
      exclude: "node_modules/**",
      include: [ "./src/**/*.ts", "./src/**/*.js", "./src/**/*.tsx" ],
      babelHelpers: "inline",
      extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
      babelrc: false,
      presets: [
        [
          "@babel/env",
          {
            modules: false,
          },
        ],
        [ "@babel/react" ],
        [ "@babel/typescript" ],
      ],
    }),
    resolve(),
    jsx({ factory: "React.createElement" }),
    copy({
      "./src/types/global.d.ts": "./dist/types/global.d.ts",
      "./src/types/index.d.ts": "./dist/types/index.d.ts",
      ...dtsFiles,
    }),
  ],
};

export default options;
