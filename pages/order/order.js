// pages/order/order.js
const app = getApp()
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    size: 50,
    oreder: [],//全部订单
    flag:0,
    oreders:0,
    state:0, //未支付状态
    payment:[], //未支付初始值
    orderType:0, //认养订单状态
    adopt:[], //认养初始值
    orderTypes:2, //转让订单状态
    transfer:[], //转让订单初始值
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 进来默认是全部订单
  reg(){
    this.setData({
      flag:0,
    oreders:0,
    })
  },
  // 点击未支付
  payment(){
    this.setData({
      flag:1,
    oreders:1,
    })
  },
  // 点击认养订单
  bring(){
    this.setData({
      flag:2,
    oreders:2,
    })
  },
  // 点击转让
  transfers(){
    this.setData({
      flag:3,
    oreders:3,
    })
  },
  /**
   * 点击进入订单详情
   * state： 0未支付 1已支付  2猪苗采购中 3等待选号 4已完成 5已退款 
   */
  into(e) {
    // console.log(e);
    let OrderState = e.currentTarget.dataset.state
    let id = e.currentTarget.dataset.tgoodid
    let ordertype = e.currentTarget.dataset.ordertype
    if (OrderState === 0) {
      wx.navigateTo({
        url: `/pages/bepaid/bepaid?id=${id}&OrderState=${OrderState}&ordertype=${ordertype}`,
      })
    }else if(OrderState === 1){
      
    }else if(OrderState === 2){
      wx.navigateTo({
        url: `/pages/purchase/purchase?id=${id}&OrderState=${OrderState}&ordertype=${ordertype}`,
      })
    }else if(OrderState === 3){
      wx.navigateTo({
        url: `/pages/wait/wait?id=${id}&OrderState=${OrderState}&ordertype=${ordertype}`,
      })
    }else if(OrderState === 4){
      wx.navigateTo({
        url: `/pages/help/help?id=${id}&OrderState=${OrderState}&ordertype=${ordertype}`,
      })
    }
  },
  // 查询所有订单
  /**
   * orderType：0-认养，1-助力，2-转让，3-综合管理费
   * state：0未支付 1已支付  2猪苗采购中 3等待选号 4已完成 5已退款 
   */
  getOrder() {
    api.getOrder(this.data.current, this.data.size, wx.getStorageSync('uid')).then(res => {
      // console.log(res);
      this.setData({
        oreder: res.data.records
      })
    })
  },
  // 未支付
  tOrder(){
    api.tOrder(this.data.current, this.data.size, wx.getStorageSync('uid'),this.data.state).then(res => {
      // console.log(res);
      this.setData({
        payment: res.data.records
      })
    })
  },
  // 认养订单
  adoptTOrder(){
    api.adoptTOrder(this.data.current, this.data.size, wx.getStorageSync('uid'),this.data.orderType).then(res => {
      // console.log(res);
      this.setData({
        adopt: res.data.records
      })
    })
  },
   // 转让订单
   transfertOrder(){
    api.transfertOrder(this.data.current, this.data.size, wx.getStorageSync('uid'),this.data.orderTypes).then(res => {
      // console.log(res);
      this.setData({
        transfer: res.data.records
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder(),
    this.tOrder(),
    this.adoptTOrder(),
    this.transfertOrder()
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