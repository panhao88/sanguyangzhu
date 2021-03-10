// pages/golden/golden.js
const app = getApp()
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:10,
    show: false,
    pig:[], //我的金猪
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 点击我要卖猪弹框
  onClickShow() {
    this.setData({
      show: true
    });
  },
  onClickHide() {
    this.setData({
      show: false
    });
  },
  // 点击邀请围观进入页面
  watch() {
    wx.navigateTo({
      url: '/pages/watch/watch',
    })
  },
  // 我的金猪数据请求
  pigtOrder(){
    api.pigtOrder(this.data.current,this.data.size,wx.getStorageSync('uid')).then(res=>{
      console.log(res);
      this.setData({
        pig:res.data.records
      })
    })
  },
  // 点击  state： 0未支付 1已支付  2猪苗采购中 3等待选号 4已完成 5已退款 
  number(e){
    console.log(e);
    let id = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    if(state === 0){

    }else if(state === 1){

    }else if(state === 2){

    }else if(state === 3){
      wx.navigateTo({
        url: '/pages/label/label',
      })
    }else if(state === 4){
      wx.navigateTo({
        url: `/pages/information/information?id=${id}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pigtOrder()
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