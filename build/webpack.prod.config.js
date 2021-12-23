const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')


const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: []
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh-cn|ko/),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 70000
        }),

    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: "initial",
            minSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '.',
            name: true,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    reuseExistingChunk: true
                },
                tools: {
                    test: /[\\/]src[\\/]tools[\\/]/,
                    name: "tools"
                }
            }
        },
    },
    performance: {
        hints: false
    }
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}


module.exports = webpackConfig
