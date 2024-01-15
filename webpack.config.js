const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const outputFilename = (format) => {
    return isDev ? `app.${format}` : `app.[hash].${format}`
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'assets/scripts/' + outputFilename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/images'),
                    to: path.resolve(__dirname, 'dist/assets/images')
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/' + outputFilename('css')
        })
    ],
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@scripts': path.resolve(__dirname, 'src/assets/scripts'),
            '@styles': path.resolve(__dirname, 'src/assets/styles')
        }
    }
};
