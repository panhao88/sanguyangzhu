// pages/problem/problem.js
const app = getApp()
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:4,
    add:[], //常见问题
    flag:false
  },
  // 点击返回键返回上一级
  return (){
    wx.navigateBack({
      delta: 1
      })
  },
  //常见问题
  tQuestion(){
    api.tQuestion(this.data.current,this.data.size).then(res=>{
      console.log(res)
      this.setData({
        add:res.data.records
      })
    }).catch(err=>{})
  },
  // 点击图标展开
  than(e){
    // console.log(e);
    let index = e.currentTarget.dataset.index
   if(this.data.flag === index){
    this.setData({
      flag:false
    })
   }else {
    this.setData({
      flag:index
    })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tQuestion()
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