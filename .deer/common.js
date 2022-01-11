const webpack = require('webpack');
const path = require('path');
const dirName = path.resolve(__dirname);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取到分离的 CSS 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //再次打包清楚dist
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //打包进度条
const WebpackMd5Hash = require('webpack-md5-hash'); //打包后的文件夹添加hash，清楚缓存
const MomentLocalesPlugin = require('moment-locales-webpack-plugin'); //删除未使用的语言包
const { getThemeVariables } = require('antd/dist/theme');
const env = process.env.NODE_ENV; //获取当前环境
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); //打包速度分析
const CopyPlugin = require('copy-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const { proxy, theme, isDark, isCompact, port = 9091 } = require('../config');
const host='sss.qijizuopin.com'
console.log(5,host);
module.exports = smp.wrap(function () {
  let config = {
    // 入口文件
    entry: `${dirName}/../src/index.jsx`,
    output: {
      //配置输出
      filename: `js/[name]-[hash].js`, //输出文件名，[name]表示入口文件js名
      // publicPath: publicPath || '/', //文件拆分的资源路径
      path: path.join(__dirname, `../dist/`), //输出文件路径
      libraryTarget: 'umd',
      // chunkFilename: 'js/[name]-[hash].js`',
    },
    devServer: {
      contentBase: path.join(__dirname, '../dist'),
      compress: true,
      disableHostCheck: true,
      port,
      open: true, //启动服务后，自动打开浏览器
      inline: true, //打包后加入一个websocket客户端
      hot: true, //热加载，hot为false，html才能更新，不知道为什么
      host, //主机地址
      // https: false,
      historyApiFallback: true,
      overlay: true, //在页面看eslint报错
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
      },
      // proxy: {
      //   '/authorapi': {
      //     target: url,
      //     changeOrigin: true,
      //     bypass: function (req, res, proxyOptions) {
      //       req.headers['origin'] = url;
      //       req.headers['host'] = url;
      //       req.headers['referer'] = url;
      //     },
      //   },
      //   // '/ajax': {
      //   //   target: urlDev,
      //   //   changeOrigin: true,
      //   //   bypass: function (req, res, proxyOptions) {
      //   //     req.headers['origin'] = urlDev;
      //   //     req.headers['host'] = urlDev;
      //   //     req.headers['referer'] = urlDev;
      //   //   },
      //   // },
      // },
      before(app) {
        app.use((req, res, next) => {
          // set cros for all served files
          res.set('Access-Control-Allow-Origin', '*');
          next();
        });
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'async', // 异步加载chunk
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~', // 文件名中chunk分隔符
        name: true,
        cacheGroups: {
          vendors: {
            name: 'vendors',
            chunks: 'all',
            test: /[/]node_modules[/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[/]/,
            priority: -10,
          },
          antdesigns: {
            name: 'antdesigns',
            chunks: 'all',
            test: /[/]node_modules[/](@ant-design|antd)[/]/,
            priority: -12,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            priority: -11,
            enforce: true,
          },
          less: {
            name: 'less',
            test: /\.(sa|sc|le)ss$/,
            chunks: 'all',
            priority: -10,
            enforce: true,
          },
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      // 对应的插件
      new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, '../dll/vendor.manifest.json'),
      }),
      // new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/index.[contentHash:8].css',
      }),
      new CleanWebpackPlugin(), //每次打包清楚dist
      new ProgressBarPlugin(), //打包进度条
      new WebpackMd5Hash(),
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'zh-cn'], // 移除除了这里列出的 locales 包
      }),
      new webpack.DefinePlugin({
        //定义全局变量
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          // BASE_IP:baseIp
        },
      }),
      new CopyPlugin([
        {
          from: `${dirName}/../src/public`,
          to: './public',
        },
      ]),
    ],
    module: {
      rules: [
        {
          //图片处理
          test: /\.(?:png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: 'url-loader', //file-loader
              options: {
                outputPath: './images/', //   ./是相对于dist目录而言
                name: '[name].[hash:7].[ext]',
                publicPath: '../images/', //最终css路径，会是：publicPath+name
                limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
              },
            },
            // {
            //   loader: 'file-loader',
            //   options: {
            //     outputPath: './images/', //   ./是相对于dist目录而言 //最终导出的文件路径
            //     publicPath: '../images/', //最终css引用路径
            //     name: '[name].[hash:7].[ext]',
            //   },
            // },
            // {
            //   loader: 'image-webpack-loader',
            //   options: {
            //     mozjpeg: {
            //       progressive: true,
            //       quality: 50,
            //     },
            //     optipng: {
            //       enabled: true,
            //     },
            //     pngquant: {
            //       quality: [0.5, 0.65],
            //       speed: 4,
            //     },
            //     gifsicle: {
            //       interlaced: false,
            //     },
            //     webp: {
            //       // 不支持WEBP就不要写这一项
            //       quality: 75,
            //     },
            //   },
            // },
          ],
        },
        {
          test: /\.js|jsx$/,
          // exclude: /node_modules/,
          include: [path.resolve(__dirname, '../src')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
              },
            },
            {
              loader: "eslint-loader",
              options: {
                  cache: true
              }
          }
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          // exclude: /node_modules/, //表示node_modules中的tsx文件不做处理
          include: [path.resolve(__dirname, '../src')],
          //   use: [
          //     {
          //         loader: "ts-loader",
          //     },
          //     {
          //         loader: "awesome-typescript-loader",
          //         options: {
          //             // transpileOnly: true,
          //             // happyPackMode: true,
          //             configFile: path.resolve(__dirname, "../tsconfig.json"),
          //         },
          //     },
          // ],
        },
        /**
         * 注意：
          1、多个loader需要用[]
          2、css-loader作用是接续@import语法，即连接css文件之间的引用
          3、style-loader作用是将css代码插入到head标签里
          4、loader特点：作用单一性
          5、loader执行顺序，默认从右到左执行，从下到上执行
          6、loader可以写成对象格式，以便加入option参数
         */
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
            'css-hot-loader',
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'less-loader', // translates CSS into CommonJS
              options: {
                lessOptions: {
                  // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                  modifyVars:
                    isDark || isCompact
                      ? getThemeVariables({
                          dark: isDark || false, // 开启暗黑模式
                          compact: isCompact || false, // 开启紧凑模式
                          ...theme,
                        })
                      : theme,
                  javascriptEnabled: true,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [require('postcss-preset-env')()],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
            'css-hot-loader',
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [require('postcss-preset-env')()],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      //下面后缀的文件导入时可以省略文件名，js必须要有，否则会react.js文件会无法被解析
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.less'],
      alias: {
        '@': path.join(__dirname, '../src/'),
        '@/page': path.join(__dirname, '../src/page/'),
      },
      modules: ['node_modules'],
    },
  };

  if (process.env.NODE_ENV ==='development' && proxy) {
    config.devServer.proxy=proxy
  }
  return config;
});
