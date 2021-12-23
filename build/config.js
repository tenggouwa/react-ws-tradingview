// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
    build: {
        env: 'production',
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: 'development',
        port: 8083,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                // target: 'http://exbgdev.yuchains.com',
                target: 'http://ts-cloud.bgkj.org',
                // target: 'http://192.168.1.162:8083', // 强强插入
                // target: 'http://192.168.1.112:8083', // 强强被插
                // target: 'http://116.62.199.156:9089/', // 日常地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    // '^/api': '/api' // 测试
                    // '^/api': '' // 本地
                    // 线上
                }
            },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
