let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let HtmlPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let commonConfig = require('./webpack.config.common.js');

let devConfig = {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dev')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                dev: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            file: '[name].js',
            minChunks: 2
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new ExtractTextPlugin('style.css')
    ]
}

module.exports = merge(commonConfig, devConfig);
