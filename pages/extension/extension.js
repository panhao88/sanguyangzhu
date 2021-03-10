const {
  default: api
} = require("../../http/api")
import QRCode from '../../utils/ddd'
// pages/extension/extension.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows: false,
    flag: 0,
    id:1,
    arr: {},
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 点击已邀请人数
  record() {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  Moments() {

  },
  // 点击销售员进入页面
  team() {
    wx.navigateTo({
      url: '/pages/customer/customer',
    })
  },
  // 点击销售业绩跳转页面
  ment() {
    wx.navigateTo({
      url: '/pages/ment/ment',
    })
  },
  // 分享推广请求
  getpopularize() {
    api.getpopularize(this.data.id).then(res => {
      console.log(res);
      this.setData({
        arr: res.data
      })
    }).catch(err => {})
  },
  // 点击二维码弹框
  onClickShows() {
    new QRCode('myQrcode', {
      text: 'https://qrcode.sangupig.top/invite.html?code=' + wx.getStorageSync('userInfo').inCode,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpopularize(options.id)
    // 顶部自定义标题
    // console.log(app.globalData.navHeight)
    this.setData({
      navH: app.globalData.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  onShareAppMessage: function (res) {
    // return {
    //   path: '/pages/index/index?code=' + wx.getStorageSync('userInfo').inCode
    // }
  }
})