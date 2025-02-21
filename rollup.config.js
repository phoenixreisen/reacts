import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';

const demos = [
    'fuzzy-input',
    'tabs',
    'modal',
    'header',
    'footer',
    'loader',
    'slider',
    'webtext',
    'banners',
    'tooltip',
    'dropdown',
    'timeline',
    'accordion',
    'notification',
].map(current => {
    return {
        input: `./src/${current}/docs/index.tsx`,
        output: {
            name: 'bundle',
            format: 'iife',
            sourcemap: true,
            file: `./docs/${current}/demo.min.js`,
        },
        plugins: [
            scss(),
            css(),
            typescript({
                outDir: `./docs/${current}/`
            }),
            commonjs(),
            json(),
            resolve({
                preferBuiltins: false
            }),
            url({
                limit: 0
            }),
            copy({
                targets: [
                    {src:`./src/${current}/**/*.png`, dest:`./docs/${current}/`},
                    {src:`./src/${current}/**/*.jpg`, dest:`./docs/${current}/`},
                    {src:`./src/${current}/**/*.svg`, dest:`./docs/${current}/`},
                    {src:`./src/${current}/docs/index.html`, dest:`./docs/${current}/`},
                ]
            })
        ]
    };
});

export default demos;