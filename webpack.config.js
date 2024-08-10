const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 多特性啦
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js', // JS文件采用chunkhash
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 引入 js jsx文件时，引入路径不需携带文件后缀
    // 设置别名，@ 直接指向 src 目录
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/, // 匹配.ts和.tsx文件
        exclude: /node_modules/,
        use: 'ts-loader', // 使用ts-loader来处理TypeScript文件
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
      },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,

          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // CSS文件采用contenthash
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            //设置丑化相关的选项
            safari10: true,
          },
          compress: {
            //设置压缩相关的选项
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false, //底层变量是否进行转换
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true,
          },
        },
        parallel: true, //使用多进程并发运行提高构建速度
        extractComments: false, //是否将注释抽取到一个单独的文件中
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          //默认配置
          preset: 'default',
        },
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3456,
  },
};
