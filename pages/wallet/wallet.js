const {
  default: api
} = require("../../http/api")

// pages/wallet/wallet.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    // 可用余额
    balance: '',
    // 猪头数
    countPig: '',
    // 猪粮资产
    integralAssets: '',
    // 养猪收益
    pigIncome: '',
    // 销售奖金
    saleMoney: '',
    // 累计收益
    totalIncom: ''
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 点击累计收益进入页面
  profit() {
    wx.navigateTo({
      url: '/pages/profit/profit',
    })
  },
  // 点击可用余额进入页面
  balance() {
    wx.navigateTo({
      url: '/pages/balance/balance',
    })
  },
  // 点击养猪收益进入页面
  raising() {
    wx.navigateTo({
      url: '/pages/raising/raising',
    })
  },
  // 点击猪粮资产进入页面
  assets() {
    wx.navigateTo({
      url: '/pages/assets/assets',
    })
  },
  // 点击销售奖金进入页面
  sale() {
    wx.navigateTo({
      url: '/pages/sale/sale',
    })
  },
  // 点击成交笔数进入页面
  deal() {
    wx.navigateTo({
      url: '/pages/deal/deal',
    })
  },
  // 钱包
  TotalIncome() {
    api.TotalIncome(this.data.id).then(res => {
      // console.log(res);
      this.setData({
        balance: res.data.balance = 'null' ? 0.0 : res.data.balance,
        countPig: res.data.countPig = 'null' ? 0 : res.data.balance,
        integralAssets: res.data.integralAssets = 'null' ? 0 : res.data.integralAssets,
        pigIncome: res.data.pigIncome ='null' ? 0.0 : res.data.pigIncome,
        saleMoney: res.data.saleMoney = 'null' ? 0.0 : res.data.saleMoney,
        totalIncom: res.data.totalIncom ='null' ? 0.0 : res.data.totalIncom
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 顶部自定义标题
    // console.log(app.globalData.navHeight)
    this.setData({
      navH: app.globalData.navHeight,
      id: wx.getStorageSync('uid')
    })
    this.TotalIncome()
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