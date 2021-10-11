import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';
import fs from 'fs';

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
                        {src:`./src/${current}/docs/index.html`, dest:`./docs/${current}/`},
                        {src:`./src/${current}/**/*.png`, dest:`./docs/${current}/`},
                        {src:`./src/${current}/**/*.jpg`, dest:`./docs/${current}/`},
                        {src:`./src/${current}/**/*.svg`, dest:`./docs/${current}/`},
                    ]
                })
            ]
        };
    }
});

export default demos;