const { default: api } = require("../../http/api")

// pages/news/news.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    current:1, 
    size:10,
    arr:[],  //消息中心
    currentIndex:-1
  },
  // 点击返回键返回上一级
  return (){
    wx.navigateBack({
      delta: 1
      })
  },
  // 点击按钮展示全部内容
  news(e){
    let index = e.currentTarget.dataset.index
    // console.log(index,this.data.currentIndex);
    if(this.data.currentIndex === index){
      this.setData({
        currentIndex:-1
      })
    }else {
      this.setData({
        currentIndex:index
      })
    }
  },
  // 消息中心
  tMessagePush(){
    api.tMessagePush(this.data.current,this.data.size,wx.getStorageSync('uid')).then(res=>{
      console.log(res);
      this.setData({
        arr:res.data.records
      })
    }).catch(err=>{})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tMessagePush()
    // 顶部自定义标题
    // console.log(app.globalData.navHeight)
    this.setData({
      navH: app.globalData.navHeight,
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