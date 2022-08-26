const { copy } = require('esbuild-plugin-copy');
const esbuildSassPlugin = require('esbuild-sass-plugin');

const sassPluginConfig = esbuildSassPlugin.sassPlugin({ type: 'css', basedir: 'dist/css' });
const inlineImage = require("esbuild-plugin-inline-image");

module.exports = {
    createBuildConfig: isDevelopment => ({
        entryPoints: ['src/index.js'],
        sourcemap: isDevelopment,
        target: 'es6',
        bundle: true,
        minify: !isDevelopment,
        loader: { '.js': 'jsx', '.jsx': 'jsx', '.ts': 'tsx', '.tsx': 'tsx' },
        entryNames: '/js/index',
        assetNames: '/[ext]/[name]',
        outdir: './dist',
        plugins: [
            copy({
                resolveFrom: 'cwd',
                assets: {
                    from: ['public/index.html'],
                    to: ['dist/index.html']
                },
                copyOnStart: isDevelopment
            }),
            sassPluginConfig,
            inlineImage({
                limit: -1
            })
        ]
    })
};
