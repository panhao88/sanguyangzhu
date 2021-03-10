// pages/market/market.js
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';
import api from '../../http/api';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    // title: {
    //   text: '测试下面legend的红色区域不应被裁剪',
    //   left: 'center'
    // },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: falses
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:10,
    market:[], //全部
    goldPig:[], // 金猪
    type:"金猪",
    types:"黑猪",
    ptype:"白猪",
    blackPig:[],  // 黑猪
    whitePig:[],  // 白猪
    ec: {
      onInit: initChart
    },
    flag: 0,
    pig: 0,
    show: false,
    round: false
  },
  // 点击详情进入详情信息
  details(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/information/information?id=${id}`,
    })
  },
  // 点击购买弹框
  purchase() {
    this.setData({
      show: true
    })
  },
  // 点击按钮关闭
  onClose() {
    this.setData({
      show: false
    });
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 一进来默认是全部
  all() {
    this.setData({
      flag: 0,
      pig: 0
    })
  },
  // 点击金猪
  goldenpig() {
    this.setData({
      flag: 1,
      pig: 1
    })
    api.getSalePig(this.data.current,this.data.size,this.data.type).then(res=>{
      // console.log(res);
      this.setData({
        goldPig:res.records
      })
    })
  },
  // 点击黑猪
  blackpig() {
    this.setData({
      flag: 2,
      pig: 2
    })
    api.getSalePig(this.data.current,this.data.size,this.data.types).then(res=>{
      // console.log(res);
      this.setData({
        blackPig:res.records
      })
    })
  },
  // 点击白猪
  whitepig() {
    this.setData({
      flag: 3,
      pig: 3
    })
    api.getSalePig(this.data.current,this.data.size,this.data.ptype).then(res=>{
      // console.log(res);
      this.setData({
        whitePig:res.records
      })
    })
  },
  // 市场全部的猪
  tSalePig(){
    api.tSalePig(this.data.current,this.data.size).then(res=>{
      console.log(res);
      this.setData({
        market:res.records
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tSalePig()
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