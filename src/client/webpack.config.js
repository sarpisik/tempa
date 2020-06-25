const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';
const { generatePageReducer } = require('./config/page');
console.log(generatePageReducer);
const pageReducer = generatePageReducer(isProd);

const config = {
    mode,
    devtool: 'inline-source-map',
    entry: ['home', 'about'].reduce(pageReducer, {}),
    output: {
        path: path.resolve(__dirname, '..', 'server', 'public'),
        filename: isProd ? 'scripts/[name].[chunkhash].bundle.js' : '[name].js',
        publicPath: '/',
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: isProd ? 'stylesheets/[name].[hash].css' : '[name].css',
            chunkFilename: isProd ? 'stylesheets/[id].[hash].css' : '[id].css',
        }),
        isProd && new ManifestPlugin(),
        !isProd && new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
    ].filter(Boolean),
};

if (isProd) {
    config.optimization = {
        minimize: isProd,
        minimizer: [
            new UglifyJsPlugin({ parallel: true }),
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsPlugin(),
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
