const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    resolve: {
        modules: ['src/main/resources/public/js', 'node_modules', 'bower_components'],
        descriptionFiles: ['package.json', 'bower.json'],
        alias: {
            i18n: 'jquery-i18n-properties'
        }
    },
    resolveLoader: {
        alias: {
            text: 'raw-loader'
        }
    },
    context: __dirname + '/src/main/resources/public/js',
    entry: [
        'Library.js'
    ],
    output: {
        path: __dirname + '/dist/public',
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
    ]
};