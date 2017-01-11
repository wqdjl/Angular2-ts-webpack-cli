let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlPlugin = require('html-webpack-plugin');

let dllConfig = {
    entry: {
        lib: [path.resolve(__dirname, '../src/polyfills.ts'),path.resolve(__dirname, '../src/vendors.ts')],
    },
    output: {
        path: path.resolve(__dirname, '../build/dll'),
        filename: '[name].[hash].js',
        library: '[name]'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loaders: ['raw-loader', 'style-loader', 'css-loader'],
                include: path.resolve(__dirname, '../src/app')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                exclude: path.resolve(__dirname, '../src/app')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'url?limit=8192&name=assets/[name].[hash].[ext]'
            }

        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify:false,
            comments: false,
            compress: {
                warning:false,
                drop_console:true,
                collapse_vars:true,
                reduce_vars:true
            },
            mangle: true,
           
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: path.resolve(__dirname, '../temp/index.html'),
            inject: "head"
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../temp/manifest.json'),
            name: '[name]',
            context: __dirname
        }),
    ]
}

module.exports=dllConfig;