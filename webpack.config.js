const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const helpers = require('./helpers')
const extractSass = new ExtractTextPlugin({
    filename: 'css/[name]' + (process.env.NODE_ENV !== 'development' ? '.[hash]' : '') + '.css'
})

console.log(process.env.NODE_ENV)

const plugins = [
    extractSass,

    new HtmlWebpackPlugin({
        template: '!!raw-loader!./client/index.ejs',
        filename: helpers.root('views/index.ejs'),
        inject: 'body'
    }),
    // Ignore Moment Locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]

if (process.env.NODE_ENV === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
    entry: {
        'bundle': './client/index.js',
        //'vendor': ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux', 'redux-thunk', 'moment', '@formatz/ckeditor5-build-inline', '@formatz/ckeditor5-react']
    },
    /*optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: 'vendor',
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },*/
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.(otf|eot|ttf|woff2?)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'fonts/',
                        publicPath: '/fonts'
                    }
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            outputPath: 'img/',
                            publicPath: '/img'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            optipng: {
                                progressive: true,
                                optimizationLevel: 7,
                                interlaced: false,
                            },
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins,

    devtool: process.env.NODE_ENV === 'development' && 'source-map',

    output: {
        publicPath: '/',
        path: helpers.root('public/'),
        filename: '[name]' + (process.env.NODE_ENV !== "development" ? '.[hash]' : '') + '.js',
        //chunkFilename: '[id]' + (process.env.NODE_ENV !== "development" ? '.[hash]' : '') + '.chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        contentBase: helpers.root('public/'),
        compress: false,
        port: 9000
    }
}