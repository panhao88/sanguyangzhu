const Fly = require("../lib/fly/wx")
const fly = new Fly()
// 配置基础路径
//线上路径
fly.config.baseURL = 'https://api-mini.sangupig.top/api'
//本地路径
// fly.config.baseURL = 'http://192.168.101.2:8081/api'

//添加请求拦截器
fly.interceptors.request.use((config, promise) => {
  //给所有请求添加自定义header
  let Token = wx.getStorageSync('token')
  // console.log(Token);
  config.headers["X-Authorization"] = Token;
  // config.headers["X-Authorization"] = 1;
  //可以通过promise.reject／resolve直接中止请求
  //promise.resolve("fake data")
  return config;
})
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err, promise) => {
    //发生网络错误后会走到这里
    //promise.resolve("ssss")
  })
module.exports = fly