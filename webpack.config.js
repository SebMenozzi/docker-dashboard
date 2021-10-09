const path = require('path');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'app.min.js',
        publicPath: 'bundle/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg|ttf)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'file-loader'
            },
            // https://github.com/webpack/webpack/issues/11467
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    }
};

module.exports = config;
