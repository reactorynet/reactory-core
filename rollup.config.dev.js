



import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import typescript from "@rollup/plugin-typescript";
const jsx = require('rollup-plugin-jsx');

const NODE_ENV = process.env.NODE_ENV || "development";

const outputFile = NODE_ENV === "production" ? "./lib/reactory.core.js" : "./lib/reactory.core.js";

export default {
  input: "./src/index.js",
  output: {
    file: outputFile,
    format: "umd",
    globals: ['React', 'window'],
    external: ['react', 'react-dom']
  },

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    typescript({ sourceMap: true }),
    babel({
      exclude: 'node_modules/**',
      include: ['./src/**/*.ts', './src/**/*.js', './src/**/*.tsx'],
      runtimeHelpers: true,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      babelrc: false,
      presets: [
        [
          "@babel/env",
          {
            modules: false,
          }
        ],

        [
          "@babel/react",
        ],

        [
          "@babel/typescript",
        ]
      ],
      plugins: ["@babel/plugin-proposal-class-properties"],
    }),
    jsx({ factory: 'React.createElement' }),
    resolve(),
  ],
};