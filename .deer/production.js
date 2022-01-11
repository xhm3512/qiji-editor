const commonConfig = require('./common');
const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩js,在package.json配置--mode production，是否可以不配置
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html  //参数详解：http://www.manongjc.com/detail/10-yigcnrlmgejpxmj.html
const SpritesmithPlugin = require('webpack-spritesmith');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dirName = path.resolve(__dirname);
const { title } = require('../config');
module.exports = () => {
  const proDev = [
    new UglifyJsPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.[contentHash:8].css',
    }),
    new HtmlWebpackPlugin({
      title,
      inject: true,
      minify: {
        removeComments: true, //去除注释
        collapseWhitespace: true, //是否去除空格
        minimize: true,
        minifyCSS: true,
        minifyJS: true,
      },
      filename: `index.html`, //输出文件名
      template: `${dirName}/../src/index.html`, //公共的模板文件
    }),
  ];
  if (process.env.NODE_ANALYZE === 'analyze') {
    const BundleAnalyzerPlugin =
      require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    proDev.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info',
      }),
    );
  }
  return merge(commonConfig(), {
    // rules: [
    //   {
    //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //     use: [
    //       {
    //         loader: 'file-loader',
    //         options: {
    //           name: '[name].[hash:7].[ext]'
    //         },
    //       },
    //       {
    //         loader: 'image-webpack-loader',
    //         options: {
    //           mozjpeg: {
    //             progressive: true,
    //             quality: 50,
    //           },
    //           optipng: {
    //             enabled: true,
    //           },
    //           pngquant: {
    //             quality: [0.5, 0.65],
    //             speed: 4,
    //           },
    //           gifsicle: {
    //             interlaced: false,
    //           },
    //           webp: { // 不支持WEBP就不要写这一项
    //             quality: 75
    //           },
    //         },
    //       },
    //     ],
    //   },
    // ],
    plugins: [
      ...proDev,
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, '../src/icons'), // 多个图片所在的目录
          glob: '*.png', // 匹配图片的路径
        },
        target: {
          // 生成最终图片的路径
          image: path.resolve(__dirname, '../icons/sprite.png'),
          // 生成所需 SASS/LESS/Stylus mixins 代码，我们使用 Stylus 预处理器做例子
          css: path.resolve(__dirname, '../icons/sprite.css'),
        },
        apiOptions: {
          cssImageRef: '~sprite.png',
        },
      }),
    ],
    devtool: 'inline-source-map', // 加上对应的配置
  });
};
