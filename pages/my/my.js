// pages/my/my.js
const app = getApp()
import QRCode from '../../utils/ddd'
const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: '',
    show: false,
    shows: false,
    flag: 0,
    isShow: true,
    address: "", //地址
    nickName: "", //昵称
    avatar: "", // 头像
    gender: "", //性别
    id: "",
    phone: "",
    inCode: '',
    identityState: 0,
  },
  // 点击立即登录
  bindgetuserinfo(e) {
    let that = this;
    console.log(e)
    wx.getSetting({
      success(res) {
        console.log("res", res)
        let str = res.authSetting["scope.userInfo"]
        if (str) {
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              // console.log("获取用户信息成功", res)
              let rawData = JSON.parse(res.rawData)
              console.log(rawData)
              that.setData({
                nickName: rawData.nickName,
                avatar: rawData.avatarUrl,
                gender: rawData.gender,
                address: rawData.country + rawData.province + rawData.city,
                id: wx.getStorageSync('uid'),
                flag: 1,
              })
              if (str) {
                // 用户已经授权
                that.setData({
                  isShow: false
                })
              } else {
                // 用户未授权
                that.setData({
                  isShow: true
                })
              }
              let data = {
                'address': that.data.address,
                'avatar': that.data.avatar,
                'gender': that.data.gender,
                'id': wx.getStorageSync('uid'),
                'nickName': that.data.nickName,
                'phone': that.data.phone
              }
              let parentInCode = wx.getStorageSync('parentInCode')
              if (parentInCode !== "") {
                api.updateIncode(parentInCode, data).then(res => {
                  console.log(res);
                  wx.setStorageSync('userInfo', res.data.data)
                  wx.setStorageSync('identityState', res.data.data.identityState)
                  that.setData({
                    identityState:res.data.data.identityState
                  })
                })
              } else if (parentInCode === "") {
                api.update(data).then(res => {
                  console.log(res);
                  wx.setStorageSync('userInfo', res.data.data)
                  wx.setStorageSync('identityState', res.data.data.identityState)
                  that.setData({
                    identityState:res.data.data.identityState
                  })
                })
              }
              that.onLoad()
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        }
      },
      fail: function (res) {
        // console.log('登陆失败');
      },
      complete: function (res) {},
    })
  },
  // 点击昵称弹框
  onClickShow() {
    this.setData({
      show: true
    });
  },
  onClickHide() {
    this.setData({
      show: false
    });
  },
  // 点击二维码弹框
  onClickShows() {
    new QRCode('myQrcode', {
      text: 'https://qrcode.sangupig.top/invite.html?code=' + this.data.inCode,
      width: 213,
      height: 213,
      padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
      callback: (res) => {
        // console.log(res.path)
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
      }
    })
    this.setData({
      shows: true
    });
  },
  onClickHides() {
    this.setData({
      shows: false
    });
  },
  // 点击我的钱包进入页面
  wallet() {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
  // 点击我的金猪进入页面
  golden() {
    wx.navigateTo({
      url: '/pages/golden/golden',
    })
  },
  // 点击我的订单进入页面
  order() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  // 点击我的合同进入页面
  contract() {
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
  // 点击实名认证进入页面
  // 0-未认证  1-审核中  2-已拒绝  3-认证成功
  name() {
    // console.log(this.data.identityState);
    if (this.data.identityState === 0 || this.data.identityState === 2 || this.data.identityState !== undefined) {
      wx.navigateTo({
        url: '/pages/names/names',
      })
    }
  },
  // 点击推广中心进入页面
  extension() {
    wx.navigateTo({
      url: '/pages/extension/extension?id=' + wx.getStorageSync('uid'),
    })
  },
  // 点击消息中心进入页面
  news() {
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },
  // 点击常见问题进入页面
  problem() {
    wx.navigateTo({
      url: '/pages/problem/problem',
    })
  },
  // 点击关于我们进入页面
  my() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  // 判断是否登录
  register() {
    this.setData({
      flag: 0
    })
    wx.showToast({
      title: '请先登录',
      icon: 'none',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 顶部自定义标题
    // console.log(app.globalData.navHeight)
    this.setData({
      navH: app.globalData.navHeight,
      identityState: wx.getStorageSync('identityState')
    })
    if(options){
      this.setData({
        identityState:options.datas
      })
      // console.log(this.data.identityState);
    }
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        address: userInfo.address,
        avatar: userInfo.avatar,
        gender: userInfo.gender,
        id: wx.getStorageSync('uid'),
        nickName: userInfo.nickName,
        phone: userInfo.phone,
        inCode: userInfo.inCode,
        flag: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})