// const path = require('path');
// const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const autoprefixer = require('autoprefixer');
//
// module.exports = {
//     entry: [
//         '@babel/polyfill',
//         path.resolve(__dirname, 'app/index.js'),
//         path.resolve(__dirname, 'app/scss/style.scss')
//     ],
//     resolve: {
//         extensions: ['*', '.js', '.jsx']
//     },
//     output: {
//         filename: 'index.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader']
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     {
//                         loader: "css-loader"
//                     },
//                     {
//                         loader: "postcss-loader",
//                         options: {
//                             plugins: [
//                                 autoprefixer({
//                                     browsers:['ie >= 8', 'last 25 version']
//                                 })
//                             ],
//                             sourceMap: true
//                         }
//                     },
//                     {
//                         loader: "sass-loader"
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         // new webpack.HotModuleReplacementPlugin(),
//         new MiniCssExtractPlugin({
//             filename: 'styles.css',
//         }),
//         new OptimizeCssAssetsPlugin({
//             assetNameRegExp: /\.css$/g,
//             cssProcessor: require('cssnano'),
//             cssProcessorPluginOptions: {
//                 preset: ['default', {
//                     discardComments: {
//                         removeAll: true
//                     }
//                 }]
//             },
//             canPrint: true
//         })
//     ],
//     devServer: {
//         contentBase: './dist',
//         hot: true
//     }
// };
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'production',
    // mode: 'development',
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, 'app/index.js'),
        path.resolve(__dirname, 'app/scss/style.scss')
    ],
    resolve: {
        extensions: ['.js', '.json']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    'presets': ['@babel/preset-env']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 25 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            },
            canPrint: true
        }),
        new CopyWebpackPlugin([
            {
                from: 'app/index.html'
            }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3002,
        publicPath: '/',
    }
};