const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./plugins_for_admin_lte/fontawesome-free/webfonts/", to: "webfonts"},
                {from: "./plugins_for_admin_lte/fontawesome-free/css/all.min.css", to: "css"},
                {from: "./node_modules/admin-lte/dist/css/adminlte.min.css", to: "css"},
                {from: "./node_modules/admin-lte/dist/css/alt/adminlte.light.css", to: "css"},
                {from: "./node_modules/admin-lte/dist/css/alt/adminlte.core.css", to: "css"},
                {from: "./plugins_for_admin_lte/jquery/jquery-3.5.1.min.js", to: "js"},
                {from: "./node_modules/admin-lte/dist/js/adminlte.min.js", to: "js"},
            ],
        }),
    ],
};