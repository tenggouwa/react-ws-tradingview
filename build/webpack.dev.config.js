const path = require("path");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const webpack = require("webpack");

module.exports = merge(commonConfig, {
    mode: "development",
    entry: ["react-hot-loader/patch"],
    devtool: 'inline-cheap-module-source-map',
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
        // 文件名称
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                VUEP_BASE_URL: JSON.stringify('/')
            }
        })
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "../dist"),
        host: "0.0.0.0", // 可以使用手机访问
        port: 8010,
        historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
        proxy: {
          '/api': {
              // target: 'http://exbgdev.yuchains.com',
              // target: 'http://47.96.15.141:8000',
              // target: 'https://95319.tsex.io',
              // target: 'https://invite.cboex.com',
              // target: 'http://192.168.1.162:8083', // 强强插入
              // target: 'http://192.168.1.112:8083', // 强强被插
              // target: 'http://116.62.199.156:9089/', // 日常地址
              target: 'http://101.37.33.73:8000',
              // target: "http://192.168.101.14:8083/", // 郭儿
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                // '^/api': '/api' // 测试
                // '^/api': '' // 本地
                // 线上
              }
          },
          '/websocket/': {
            target: 'ws://101.37.33.73:8000', // 后台的websocket服务地址
            // target: 'wss://95319.tsex.io',
            changeOrigin: false,
            ws: true,
            secure: false,
            pathRewrite: {
              '^/websocket/': ''
            }
          },
      },
    }
});
