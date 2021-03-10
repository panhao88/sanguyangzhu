// pages/assets/assets.js
const app = getApp()
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    current: 1,
    size: 10,
    app: [] //猪粮资产
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 获取猪粮资产
  tIntegralAssets() {
    api.tIntegralAssets(this.data.id, this.data.current, this.data.size).then(res => {
      console.log(res);
      this.setData({
        app:res.data.records
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 顶部自定义标题
    this.setData({
      navH: app.globalData.navHeight,
      id:wx.getStorageSync('uid')
    })
    this.tIntegralAssets()
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