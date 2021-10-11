import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';

export const Demo = {
    input: `./docs/index.tsx`,
    output: {
        name: 'bundle',
        format: 'iife',
        sourcemap: true,
        file: `./docs/example.min.js`,
    },
    plugins: [
        css(),
        typescript({
            sourceMap: true,
            tsconfig: '../../tsconfig.json'
        }),
        commonjs(),
        resolve(),
    ],
};

export default Demo;