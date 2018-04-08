var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");
module.exports = {
    devServer: {
      historyApiFallback: true //report specific errors in console
    },
    // performance:{
    //     hints: 'warning', // the level of file, throw a warning if suprass limit
    //     maxEntrypointSize: 100000, //bytes, the maximum size of bundle.js
    //     maxAssetSize: 450000  //size of images, css...
    // },
    context: path.join(__dirname),
    // devtool: debug ? "inline-sourcemap" : null,
    devtool: "source-map",
    entry: {
        app: "./src/js/root.js",
        vendor: ['react']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }
            },
            //下面是使用ant-design和react上拉加载组件的配置文件
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    // plugins: debug ? [] : [
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.OccurenceOrderPlugin(),
    //     new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    //     new BabiliPlugin(),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor'
    //     })
    // ]
    plugins: [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]
};
