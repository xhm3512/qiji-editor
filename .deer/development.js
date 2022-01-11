const commonConfig = require('./common');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html  //参数详解：http://www.manongjc.com/detail/10-yigcnrlmgejpxmj.html

const dirName = path.resolve(__dirname);
const { title } = require('../config');
module.exports = () => {
  return merge(commonConfig(), {
    plugins: [
      new HtmlWebpackPlugin({
        title,
        inject: true,
        filename: `index.html`, //输出文件名
        template: `${dirName}/../src/index.html`, //公共的模板文件
      }),
    ],
    devtool: 'cheap-module-eval-source-map', // 加上对应的配置
  });
};
