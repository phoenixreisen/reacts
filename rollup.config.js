import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import url from '@rollup/plugin-url';
import fs from 'fs';

export const plugins = [
    css(),
    typescript({sourceMap: true}),
    commonjs(),
    resolve(),
    url({limit: 0}),
];

const demos = [
    'header',
    'footer',
    'loader',
    'accordion',
    // 'banners',
    // 'dropdown',
    // 'modal',
    // 'notification',
    // 'slider',
    // 'tabs'
].map(current => {
    if(fs.existsSync('docs')) {
        return {
            input: `./src/${current}/docs/index.tsx`,
            output: {
                name: 'bundle',
                format: 'iife',
                sourcemap: true,
                file: `./docs/${current}/demo.min.js`,
            },
            plugins
        };
    }
});

export default demos;