const path = require('path'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './resources/assets/js/main.js',
    output: {
        path: path.resolve(__dirname, './public/'),
        publicPath: '/',
        filename: 'main-[hash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets:[ 'es2015', 'react', 'stage-0' ],
                        cacheDirectory: true,
                        plugins: ['react-hot-loader/babel'],
                    }
                }
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.otf($|\?)/,
                loader: 'url-loader'
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/',
        compress: false,
        port: 38080,
        disableHostCheck: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main-[hash:6].css'
        }),
        new CleanWebpackPlugin(['public/*.js', 'public/index.html', 'public/*.css']),
        new UglifyJSPlugin(),
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: './resources/assets/js/index.ejs'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};