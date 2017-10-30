var path = require('path');
var webpack = require('webpack');
var autoPrefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isPord = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif)$/i,
                loaders: [{
                        loader: 'file-loader',
                        options: {
                            limit: 1,
                            name: '[name].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false,
                            pngquant: {
                                floyd: 0.8,
                                speed: 2
                            }
                        }
                    }
                ]
            }
        ].concat(isPord ? [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: ExtractTextPlugin.extract({
                        allChunks: true,
                        fallback: 'vue-style-loader',
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' }
                        ]
                    })
                },
                postcss: {
                    plugins: [
                        autoPrefixer(['iOS >= 7', 'last 2 versions', 'Android >= 2', 'Firefox >= 4', 'Chrome >= 4', 'IE >= 7'])
                    ]
                }
            }
        }] : [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': 'vue-style-loader!css-loader!sass-loader'
                }
            }
        }])
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (isPord) {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new ExtractTextPlugin('main.css')
    ])
}