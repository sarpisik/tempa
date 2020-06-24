const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production';

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        home: path.resolve(__dirname, 'scripts/home.ts'),
        about: path.resolve(__dirname, 'scripts/about.ts'),
    },
    output: {
        path: path.resolve(__dirname, '..', 'server', 'public'),
        filename: isProd
            ? 'scripts/[name].[chunkhash].bundle.js'
            : 'scripts/[name].bundle.js',
    },
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProd,
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        isProd &&
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: isProd
                    ? 'stylesheets/[name].[hash].css'
                    : '[name].css',
                chunkFilename: isProd
                    ? 'stylesheets/[id].[hash].css'
                    : '[id].css',
            }),
        isProd && new ManifestPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
    ].filter(Boolean),
};

if (isProd) {
    config.mode = 'production';
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    };
}

module.exports = config;
