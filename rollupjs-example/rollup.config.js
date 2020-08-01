// const html = require('@rollup/plugin-html');
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import html from 'rollup-plugin-html';
import css from 'rollup-plugin-css-only'


module.exports = {
    input: 'src/index.ts',
    output: {
        dir: 'build',
        // file: 'rollup/index.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        typescript(),
        html({ include: "**/*.html" }),
        css({ output: 'build/style-bundle.css' })
    ]
};
