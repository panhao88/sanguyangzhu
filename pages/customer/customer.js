// pages/customer/customer.js
const app = getApp()
const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    arr: []
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 点击进入您的概况
  manager() {
    wx.navigateTo({
      url: '/pages/manager/manager',
    })
  },
  // 直推客户请求
  popularize() {
    api.popularize(this.data.id).then(res => {
      console.log(res);
      this.setData({
         // 邀请记录
      arr: res.data
      })
    }).catch(err => {})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
    // 顶部自定义标题
      navH: app.globalData.navHeight,
      id:wx.getStorageSync('uid')
    })
    this.popularize()
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
  onShareAppMessage: function () {

  }
})