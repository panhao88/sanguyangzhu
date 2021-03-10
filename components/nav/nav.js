// components/nav/nav.js
const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isReturn: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: ''
    },
    image: {
      type: String,
      value: 'changtu'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH: app.globalData.navHeight,
    navHX: 0,
    isBg: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    return () {
      wx.navigateBack({
        delta: 1
      })
    },
    touchEnd() {
      this.createSelectorQuery().select('#box').boundingClientRect((dom) => {
        if (this.data.isBg) {
          if (dom.top === 0) {
            this.setData({
              isBg: false,
              navHX: 0
            })
          }else{
            this.setData({
              isBg: true,
              navHX: this.data.navH
            })
          }
        } else {
          if (dom.top < (this.data.navH)) {
            this.setData({
              isBg: true,
              navHX: this.data.navH
            })
          }else{
            this.setData({
              isBg: false,
              navHX: 0
            })
          }
        }
      }).exec()
    },
  }
})