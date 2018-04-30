const path = require('path'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

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
                    loader: 'babel-loader'
                }
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/',
        compress: false,
        port: 8080,
        disableHostCheck: true,
        host: '0.0.0.0'
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
        })

    ]
};

/*

+    devServer: {
+        contentBase: path.join(__dirname, 'public'),
+        publicPath: ['/', '/dist/'],
+        compress: true,
+        port: 8080,
+        disableHostCheck: true,
+        host: '0.0.0.0'
+    },


module.exports = {
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html?-minimize'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: '/tmp/babel_cache/',
                    presets: ['es2015']
                }
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
        ]
    }
};
*/