const fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    autoPrefixer = require('autoprefixer'),
    isPord = process.env.NODE_ENV === 'production',
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    extractCSS = new ExtractTextPlugin('css/common.min.css'),
    extractScss = new ExtractTextPlugin('css/main.min.css');

fs.readFile('index.html', (err, data) => err ? console.log(err) : fs.writeFileSync('index.html', data.toString().replace(/\n(\t|\s+)<link rel="stylesheet" href="dist\/css\/\w+\.min\.css">/g, '')));

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/',
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loaders: {
                    loader: 'file-loader',
                    options: {
                        name: 'font/[name].[ext]'
                    }
                }
            }, {
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
                            name: 'images/[name].[ext]'
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
            test: /\.css$/,
            use: extractCSS.extract(['css-loader'])
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: extractScss.extract({
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
                        autoPrefixer(['iOS >= 7', 'last 2 versions', 'Android >= 2', 'Firefox >= 4', 'Chrome >= 4', 'IE >= 9'])
                    ]
                }
            }
        }] : [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
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
    module.exports.devtool = '#source-map';
    module.exports.output.publicPath = '../';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        extractCSS,
        extractScss,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: function(module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
        })
    ])
}