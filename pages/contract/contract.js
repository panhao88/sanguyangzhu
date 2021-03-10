// pages/contract/contract.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false
  },
    // 点击返回键返回上一级
    return (){
      wx.navigateBack({
        delta: 1
        })
    },
    // 点击给个if判断
    dianji (){
      this.setData({
        flag:true
      })
    },
  // 点击确认签署协议跳转产品价格页面
  confirm(){
    wx.navigateTo({
      url: '/pages/price/price',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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