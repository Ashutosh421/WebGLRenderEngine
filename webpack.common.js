const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: "./index.ts",
    module: {
        rules: [
            {
                test: /\.scss$/,    //CSS Loader setup
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,      //Image Loader setup
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                 test: /\.(tsx|ts)?$/,
                 loader: 'ts-loader' 
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'Ashutosh - WebGL Portfolio',
                template: 'index.html',
                inject: 'body'
            }
        ),
        new CleanWebpackPlugin(['dist'])
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json', '.scss']
    },
    output: {
        filename: "webgl_portfolio_bundle.js",
        path: path.resolve(__dirname, '/dist')        
    }
}