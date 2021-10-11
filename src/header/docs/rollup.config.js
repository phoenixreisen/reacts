import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import url from '@rollup/plugin-url';

export const Demo = {
    input: `./docs/index.tsx`,
    output: {
        name: 'bundle',
        format: 'iife',
        sourcemap: true,
        file: `../../docs/header/demo.min.js`,
    },
    plugins: [
        css(),
        typescript({
            sourceMap: true,
            tsconfig: '../../tsconfig.json'
        }),
        commonjs(),
        resolve(),
        url({limit: 0}),
        copy({
            targets: [
                {src:`./docs/index.html`, dest:`../../docs/header/demo.min.js`},
            ]
        })
    ],
};

export default Demo;