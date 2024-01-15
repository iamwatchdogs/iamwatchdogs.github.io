const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/scripts/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Meet Shamith',
            template: './src/index.html',
            filename: '../index.html',
        }),
    ],
};