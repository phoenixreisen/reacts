import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';

export const Demo = {
    input: `./docs/index.tsx`,
    output: {
        name: 'bundle',
        format: 'iife',
        sourcemap: true,
        file:`../../docs/accordion/demo.min.js`,
    },
    plugins: [
        css(),
        typescript({
            sourceMap: true,
            tsconfig: '../../tsconfig.json'
        }),
        commonjs(),
        resolve(),
        copy({
            targets: [
                {src:`./docs/index.html`, dest:`../../docs/accordion/demo.min.js`},
            ]
        })
    ],
};

export default Demo;