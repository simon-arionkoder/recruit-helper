const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
const entries = {};

Object.keys(slsw.lib.entries).forEach(
    key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
);

module.exports = {
    mode: 'development',
    // mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: entries,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    externals: [
        nodeExternals({
            modulesFromFile: {
                fileName: './package.json',
                includeInBundle: 'dependencies',
                excludeFromBundle: 'devDependencies'
            },
        })
    ],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                },
            }
        ],
    },
    plugins: [
    ],
    node: {
        __dirname: true
    },
    optimization: {
        removeAvailableModules: true,
        removeEmptyChunks: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        concatenateModules: true
    }
};
