// pages/deal/deal.js
const {
  default: api
} = require("../../http/api")
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sect: 0,
    flags: 0,
    torder: [],
    id:1
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 进来默认是销售奖金
  bonus() {
    this.setData({
      sect: 0,
      flags: 0
    })
  },
  // 点击渠道
  judao() {
    this.setData({
      sect: 1,
      flags: 1
    })
  },
  // 点击销售奖金页面进入我的金猪页面
  Pig(){
    wx.navigateTo({
      url: '/pages/information/information',
    })
  },
  // 销售奖金
  achievement() {
    api.achievement(this.data.id).then(res => {
      console.log(res);
      // let ExpectedArrivalTime = res.torder.ExpectedArrivalTime
      // let payMoney = res.torder.payMoney
      // let userId = res.torder.userId
      // let payTime = res.torder.payTime
      // let state = res.torder.state
      // let name = res.torder.tgoods.name
      this.setData({
        torder:res.torder
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.achievement()
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
  onShareAppMessage: function () {

  }
})