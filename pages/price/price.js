// pages/price/price.js
const app = getApp()
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numers: 1,
    price: {} //产品价格
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 产品价格
  tGoodsInfo(id) {
    // console.log(id);
    api.tGoodsInfo(id).then(res => {
      console.log(res);
      this.setData({
        price:res.data
      })
    })
  },
  // 点击支付跳到支付成功页面
  payment() {
    wx.navigateTo({
      url: '/pages/payment/payment',
    })
  },
  // 加减数量点击事件
  onChange(e) {
    console.log(e.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = wx.getStorageSync('app')
    // console.log(id);
    this.tGoodsInfo(id)
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