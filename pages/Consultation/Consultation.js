// pages/Consultation/Consultation.js
const app = getApp()
const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    current: '1',
    size: '10',
    arr:[] //资讯详情
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 资讯详情
  tInformation(id) {
    api.tInformation(this.data.current, this.data.size).then(res => {
      console.log(res);
      // this.setData({
      //   arr:res.data.records
      // })
      let data = res.data.records
      console.log(data);
      var content = data.filter(v => v.id == id)
      console.log(content);
      // console.log(content.content);
      // console.log(content[0].content);
      var regex = new RegExp('<img')
      console.log(regex);
      // content = content[0].content.replace(/\<img/gi, '<img class="rich-img" ')
      content = content[0].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;" ')
      this.setData({
        // content:content[0].content
        content:content
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 顶部自定义标题
    this.setData({
      navH: app.globalData.navHeight,
    })
    this.tInformation(options.id)
    // let content = JSON.parse(options.item)
    // console.log(content)
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