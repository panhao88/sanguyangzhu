//app.js
const {
  default: api
} = require("./http/api")
App({
  onLaunch: function (options) {
    // console.log("yaoqingma");
    // console.log(options.query.code);
    // 展示本地存储能力
    // this.getIdentity()
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (options.query.code) {
          api.loginInCode(res.code, options.query.code).then(res => {
            console.log(res);
            console.log(res.userInfo.id);
            wx.setStorageSync('token', res.token)
            wx.setStorageSync('uid', res.userInfo.id)
          })
        } else {
          api.login(res.code).then(res => {
            // console.log(res);
            wx.setStorageSync('token', res.token)
            wx.setStorageSync('uid', res.userInfo.id)
          })
        }

      }
    })

    // 获取用户信息
    wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      }),
      // 获取手机系统信息
      wx.getSystemInfo({
        success: res => {
          //导航高度
          this.globalData.navHeight = res.statusBarHeight + 46;
        },
        fail(err) {
          console.log(err);
        }
      })
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
    // console.log(this.globalData.userInfo);
  },
  // 获取认证信息
  // getIdentity() {
  //   //0 未认证 1 审核中   2 已拒绝  3认证成功
  //   api.getIdentity(wx.getStorageSync('uid')).then(res => {
  //     // console.log(res);
  //     // wx.setStorageSync('identityState', res.data.identityState)
  //   })
  // },
  globalData: {
    userInfo: null,
    navHeight: 0,
  }
})