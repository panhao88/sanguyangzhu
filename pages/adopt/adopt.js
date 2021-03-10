// pages/adopt/adopt.js
const app = getApp()
const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alls: '全部', //全部
    app: [], //认养
    product: [], //产品类型
    current: 1,
    size: 10,
    identityState: '',
    flag: false,
    all: 0,
    fleg: 0
  },
  // 点击全部
  alls() {
    if (this.data.flag === false) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  // 产品类型
  tGoodsType() {
    api.tGoodsType(this.data.current, this.data.size).then(res => {
      // console.log(res);
      let arr = [];
      arr.push({
        name: '全部'
      })
      arr = arr.concat(res.data.records)
      // console.log(arr);
      this.setData({
        product: arr
      })
    })
  },
  // 一进来默认是全部
  bindtaps() {
    if (this.data.alls !== '全部') {
      this.setData({
        all: -1,
        fleg: -1,
        alls: '全部',
        flag: false
      })
    }
  },
  // 点击产品类型数据
  clickall(e) {
    // console.log(e);
    let obj = e.currentTarget.dataset
    if (this.data.alls !== obj.item.name) {
      if (obj.item.id) {
        this.tGoods({
          current: this.data.current,
          size: this.data.size,
          id: obj.item.id
        })
      } else {
        this.tGoods({
          current: this.data.current,
          size: this.data.size
        })
      }
      this.setData({
        all: obj.index,
        fleg: obj.index,
        alls: obj.item.name,
        flag: false
      })
    }
  },
  // 点击详情跳转到产品详情
  details(e) {
    // console.log(e);
    let goodsid = e.currentTarget.dataset.goodsid
    wx.navigateTo({
      url: '/pages/product/product?goodsid=' + goodsid,
    })
  },
  // 认养
  tGoods(data) {
    api.tGoods(data).then(res => {
      this.setData({
        app: res.data
      })
    })
  },
  // 点击认养跳转到合同页面
  adopt(e) {
    // console.log(e);
    // wx.getStorageSync('userInfo')
    wx.setStorageSync('app', e.currentTarget.dataset.goodsid)
    if (!wx.getStorageSync('userInfo')) {
      wx.showToast({
        title: '请先登录,完成实名认证',
        icon: 'none'
      })
    } else if (wx.getStorageSync('identityState') === 3) {
      wx.navigateTo({
        url: '/pages/contract/contract',
      })
    }else {
      wx.showToast({
        title: '请先完成实名认证',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tGoods({
        current: this.data.current,
        size: this.data.size
      }),
      this.tGoodsType()
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