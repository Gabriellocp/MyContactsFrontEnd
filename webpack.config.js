const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle[hash].js',
        clean: true
    },
    mode: 'development',
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({template: path.resolve(__dirname,'public','index.html')}),
    ],
    devServer:{
        port: 3001
    }
}