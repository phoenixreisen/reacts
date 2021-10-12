import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';

const demos = [
    'tabs',
    'modal',
    'header',
    'footer',
    'loader',
    'dropdown',
    'accordion',
    'notification',
    // 'banners',
    // 'slider'
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
            css(),
            typescript({
                sourceMap: true
            }),
            commonjs(),
            resolve(),
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