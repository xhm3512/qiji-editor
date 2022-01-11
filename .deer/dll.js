const Webpack = require('webpack');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-dom/server',
      'react-router',
      'react-router-dom',
      'lodash',
      'lodash-decorators',
      'moment',
      'redux',
      'redux-thunk',
      'react-redux',
      'axios',
      'antd',
      '@ant-design/icons',
    ],
  },
  output: {
    filename: '[name].dll.js',
    libraryTarget: 'var',
    library: '_dll_[name]_[hash]',
    path: path.join(__dirname, `../dll/`), //输出文件路径
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.join(__dirname, `../dll/[name].manifest.json`),
      name: '_dll_[name]_[hash]',
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'zh-cn'], // 移除除了这里列出的 locales 包
    }),
    new CompressionWebpackPlugin(),
  ],
};
