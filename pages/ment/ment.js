const {
  default: api
} = require("../../http/api")

// pages/ment/ment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id:1, // 销售业绩
    arr: [],
    flag: false
  },
  // 销售业绩
  getAchievement() {
    api.getAchievement(wx.getStorageSync('uid')).then(res => {
      console.log(res);
      this.setData({
        sales: res.data
      })
    }).catch(err => {})
  },
  // 点击成交笔数跳转页面
  deal() {
    wx.navigateTo({
      url: '/pages/deal/deal',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAchievement()
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