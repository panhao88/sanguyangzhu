// pages/information/information.js
const app = getApp()
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    size: 10,
    parity: 1,
    piglets: {},
    parent: {},
    app: [], //消杀防疫
    parity: 1, //胎次
    open:false,
    paritys:[], //胎次
    ppId:''
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 点击保单信息进入页面
  policy() {
    wx.navigateTo({
      url: '/pages/policy/policy',
    })
  },
  // 点击视频监控进入页面
  detail() {
    wx.navigateTo({
      url: '/pages/monitor/monitor',
    })
  },
  // 点击第一胎
  first() {
    if(this.data.open === false){
      this.setData({
        open: true
      })
    }else {
      this.setData({
        open: false
      })
    }
  },
  bindParity(e) {
    // console.log(e);
    this.setData({
      open:false,
      parity:e.currentTarget.dataset.rn
    })
    this.getTChilpigByParity()
  },
  // 母猪信息请求
  tParentPig() {
    api.tParentPig(this.data.ppId).then(res => {
      console.log(res);
      this.setData({
        parent: res.data
      })
    })
  },
  // 按胎次查询
  tChildPig() {
    api.tChildPig(this.data.ppId).then(res => {
      console.log(res);
      this.setData({
        paritys:res.data
      })
      console.log(this.data.paritys);
    })
  },
  // 根据胎次获得猪崽信息
  getTChilpigByParity() {
    api.getTChilpigByParity(this.data.parity,this.data.ppId).then(res => {
      console.log(res);
      this.setData({
        piglets: res
      })
    })
  },
  //  消杀防疫
  tDisinfect() {
    api.tDisinfect(this.data.current, this.data.size).then(res => {
      console.log(res);
      this.setData({
        app: res.data.records
      })
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      ppId:options.id
    })
    this.tParentPig()
    this.tChildPig()
    this.getTChilpigByParity()
    this.tDisinfect()
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