const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    resolve: {
        modules: ['src/js', 'node_modules'],
        descriptionFiles: ['package.json'],
        alias: {
            i18n: 'jquery-i18n-properties'
        }
    },
    resolveLoader: {
        alias: {
            text: 'raw-loader'
        }
    },
    context: __dirname + '/src/js',
    entry: [
        'Library.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'index.js'
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: __dirname,
                exclude: /(node_modules)/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    }
};