const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
require('dotenv').config();

process.env.APP_ENV === 'dev' ? process.env.NODE_ENV = 'development' : process.env.NODE_ENV = 'production';

console.log('Webpack run as ' + process.env.NODE_ENV);

const plugins = [
    new MiniCssExtractPlugin({
        filename: 'css/[name]' + (process.env.NODE_ENV !== 'development' ? '.[hash]' : '') + '.css',
    }),

    new HtmlWebpackPlugin({
        template: '!!raw-loader!./client/index.ejs',
        filename: path.resolve(__dirname, 'views/index.ejs'),
        inject: 'body'
    }),
    // Ignore Moment Locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WebpackPwaManifest({
        name: 'CBatmo',
        short_name: 'CBatmo',
        description: 'A Netatmo Weather Station Web-APP for Raspberry Pi and official Raspberry touchscreen',
        background_color: '#1E1E1E',
        crossorigin: null,
        display: 'standalone',
        orientation: 'landscape'
    })
];

if (process.env.NODE_ENV === 'development') {
    plugins.push(new WebpackShellPlugin({onBuildEnd: ['node server.js']}));
}

if (process.env.NODE_ENV === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        'bundle': './client/index.tsx',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        },
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        },
                    },
                ]
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
                                quality: [0.65, 0.90],
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
            { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' }, exclude: /node_modules/ },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
    plugins,

    devtool: process.env.NODE_ENV === 'development' && 'source-map',

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'public'),
        filename: '[name]' + (process.env.NODE_ENV !== "development" ? '.[hash]' : '') + '.js'
    }
};
