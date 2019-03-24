
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const VueMarkDownOptions = require('./vue-markdown-loader.config')

const config = require('./config')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    docs: './examples/entry.js',
    'vine-ui': './src/index.js'
  },
  output: {
    path: path.resolve(process.cwd(), './examples/vine/'),
    publicPath: '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    publicPath: '/',
    noInfo: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join('static', '[name].[hash:7].[ext]')
          }
        },
        exclude: [path.resolve(__dirname, '../examples/assets/svg')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        },
        include: [path.resolve(__dirname, '../examples/assets/svg')]
　    },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: VueMarkDownOptions
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.tpl',
      filename: './index.html',
      favicon: './examples/favicon.ico'
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: []
  }
}

if (isProd) {
  webpackConfig.externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  );
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
}

module.exports = webpackConfig
