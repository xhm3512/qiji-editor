const getauthorinfo = require('./mock/getauthorinfo'); //获取用户信息
const home = require('./mock/home'); //获取当前页面菜单


module.exports = {
  'GET /authorapi/getauthorinfo/': getauthorinfo,
  'GET /authorapi/home/': home,
  // 'POST /authorapi/createbook': createbook,

};
