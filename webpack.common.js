const path = require('path');

module.exports = {
    entry: "./index.tsx",
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
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
              },
        ]
    },
    devtool: 'source-map',
    plugins: [
    ],
    resolve: {
        extensions: [
          '.tsx',
          '.ts',
          '.js'
        ]
      },
    output: {
        filename: "webgl_portfolio_bundle.js",
        path: path.resolve(__dirname, '/dist')        
    }
}