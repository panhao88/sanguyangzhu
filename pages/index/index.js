const app = getApp()
const {
  default: api
} = require("../../http/api")
// var util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [], //轮播图
    stem: [], // 首页系统消息推送
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 800,
    circular: true,

    autoplay1: true,
    interval1: 4000,
    duration1: 2000,
    circular1: true,

    current: "1",
    size: "10",
    // userId:"1",
    // username: "sangu",
    // password: "123456",
    classification: [], //分类
    info: [], //资讯
    userInfo: {},
    isShow: false,
    address: "", //地址
    nickName: "", //昵称
    avatarUrl: "", // 头像
    gender: "", //性别
    userInfos: {},
    // id: "",
    phone: "",
    parentInCode: "2ALKXX8"
  },
  // 点击分类进入页面
  money(e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
    if (index === 0) {
      wx.switchTab({
        url: '/pages/adopt/adopt',
      })
    } else if (index === 1) {
      wx.navigateTo({
        url: '/pages/market/market',
      })
    } else {
      wx.navigateTo({
        url: '/pages/base/base',
      })
    }
  },
  // 点击首页资讯跳转资讯详情
  dianji(e) {
    // console.log(e)
    // let item = JSON.stringify(e.currentTarget.dataset.item)
    let id = e.currentTarget.dataset.item.id
    // console.log(id);
    wx.navigateTo({
      // url: `/pages/Consultation/Consultation?item=${item}`
      url: `/pages/Consultation/Consultation?id=${id}`
    })
  },
  //获取banner
  tBanner() {
    api.tBanner(this.data.current, this.data.size).then(res => {
      this.setData({
        swiper: res.data.records
      })
    })
  },
  // 首页系统消息推送
  tMessagePush() {
    api.tMessagePush(this.data.current, this.data.size, wx.getStorageSync('uid')).then(res => {
      console.log(res);
      let arr = []
      res.data.records.forEach(item => {
        if(item.typeId == 1){
          arr.push(item)
        }
      });
      console.log(arr);
      this.setData({
        stem:arr
      })
    }).catch(err => {})
  },
  //获取分类
  tClassification() {
    api.tClassification(this.data.current, this.data.size).then(res => {
      // console.log(res);
      this.setData({
        classification: res.data.records
      })
    })
  },
  // 获取资讯
  tInformation() {
    api.tInformation(this.data.current, this.data.size).then(res => {
      // console.log(res);
      this.setData({
        info: res.data.records
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tBanner()
    this.tMessagePush()
    this.tClassification()
    this.tInformation()

    if (options.code) {
      // console.log(options.code);
      wx.setStorageSync('parentInCode', options.code)
    } else if (options.q) {
      let parentInCode = options.q.substr(-7, 7)
      console.log(parentInCode);
      wx.setStorageSync('parentInCode', parentInCode)
    }
    this.setData({
      // 顶部自定义标题
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