const  {url,api}= {
  url: 'http://authorapi.qijizuopin.com',
  api:'/authorapi'
};
module.exports = {
  title: '奇迹editor',
  isDark: false, // 开启暗黑模式
  isCompact: false, // 开启紧凑模式
  host: 'sss1.qijizuopin.com', //主机地址
  port:9093,
  theme: {
    'primary-color': '#FA2800',
    // 'link-color': '#1DA57A',
    // 'border-radius-base': '2px',
  },
  publicPath: '',
  proxy: {
    '/authorapi': {
      target: url,
      changeOrigin: true,
      bypass: function (req, res, proxyOptions) {
        req.headers['origin'] = url;
        req.headers['host'] = url;
        req.headers['referer'] = url;
      },
    },
  },
 
};
