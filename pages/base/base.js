const {
  default: api
} = require("../../http/api")

// pages/base/base.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
    size: '10',
    records: []
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  //养殖基地
  tPigFarmManage() {
    api.tPigFarmManage(this.data.current, this.data.size).then(res => {
      console.log(res);
      this.setData({
        records: res.data.records
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tPigFarmManage()
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