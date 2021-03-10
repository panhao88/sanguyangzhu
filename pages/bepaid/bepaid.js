const {
  default: api
} = require("../../http/api");

// pages/bepaid/bepaid.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    state:''
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  //订单详情
  orderDetail(ids,ordertypes) {
    // console.log(ids);
    api.orderDetail(ids,ordertypes, wx.getStorageSync('uid')).then(res => {
      console.log(res);
      this.setData({
        obj:res
      })
    }).catch(err => {})
  },
  // 点击支付跳转支付成功页面
  success(){
    wx.navigateTo({
      url: '/pages/successed/successed',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let ids = options.id
    let state = options.OrderState
    let ordertypes = options.ordertype
    this.setData({
      state:state
    })
    // console.log(this.data.state);
    this.orderDetail(ids,ordertypes)
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