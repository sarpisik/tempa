const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        home: path.resolve(__dirname, 'pages/home.ts'),
    },
    output: {
        path: path.resolve(__dirname, '..', 'server', 'public', 'scripts'),
        filename: '[name].bundle.js',
    },
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
};

if (isProd) {
    config.mode = 'production';
    config.output.filename = '[name].[chunkhash].bundle.js';
    config.plugins.push(new ManifestPlugin());
    // config.optimization = {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             parallel: true,
    //         }),
    //     ],
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /node_modules/,
    //                 name: 'vendor',
    //                 chunks: 'all',
    //             },
    //         },
    //     },
    // };
}

module.exports = config;
