// pages/names/names.js
const app = getApp()
const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "", //实时输入的手机号
    // show1:false,
    show: false,
    msg: "发送验证码",
    current: 1,
    size: 40,

    province_list: null,
    province_name: null,
    city_list: null,
    city_name: null,
    area_list: null,
    area_name: null,
    addressCity: null,
    multiArray: [], // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标,
    selectProvinceId: null,
    selectCityId: null,
    selectAreaId: null,

    idCardFace: '',
    idCardNational: '',
    identityState:''
  },
  // 点击返回键返回上一级
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ipnut 双向绑定
  mobileInput(e) {
    this.setData({
      phone: e.detail.value
    })
    // console.log(e.detail.value);
  },
  // 点击验证码发送请求
  send() {
    let that = this
    //  手机号输入判断提示  正则判断
    let pho = this.data.phone //声明变量赋值实时输入手机号
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (pho === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
      })
      return false;
    } else if (pho.length != 11) {
      console.log(pho.length);
      wx.showToast({
        title: '手机号长度有误!',
        icon: 'none',
      })
      return false;
    } else if (!myreg.test(pho)) {
      wx.showToast({
        title: '手机号有误!',
        icon: 'none',
      })
      return false;
    } else {
      api.sendMessage(pho).then(res => {
        console.log(res);
        wx.showToast({
          title: 'res.msg',
          icon: 'none'
        })
      }).catch(err => {})
      // 定时器倒计时
      let sec = 60
      let setinter = setInterval(function () {
        sec--
        let message = `${sec}秒后重新发送`
        that.setData({
          msg: message
        })
        if (sec <= 0) {
          clearInterval(setinter)
          that.setData({
            msg: "发送验证码"
          })
        }
        // console.log(message)
      }, 1000);
    }
  },
  //获取省份列表
  tProvinces() {
    let that = this
    api.tProvinces(this.data.current, this.data.size).then(res => {
      let provinceList = [...res.data.records] //放到一个数组里面
      let provinceArr = res.data.records.map((item) => {
        return item.province
      }) //获取名称
      that.setData({
        multiArray: [provinceArr, [],
          []
        ], //更新三维数组  更新完为[['广东','北京'],[],[]]
        province_list: provinceList, //省级原始数据
        province_name: provinceArr, //省级全部名称
      })
      let defaultCode = that.data.province_list[0].provinceid //使用第一项当作参数获取市级数据
      if (defaultCode) {
        that.setData({
          currnetProvinceId: defaultCode //保存当前省份id
        })
        that.getCity(defaultCode) //获取市区数据
      }
    }).catch(err => {})
  },
  getCity(provinceid) {
    let that = this
    api.getCity(provinceid).then(res => {
      if(res.data.citiesList.length > 0){
        let cityArr = res.data.citiesList.map((item) => {
          return item.city
        }) //返回城市名称
        let cityList = [...res.data.citiesList]
        that.setData({
          multiArray: [that.data.province_name, cityArr, []], //更新后[['广东','北京'],['潮州'，'汕头','揭阳'],[]]
          city_list: cityList, //保持市级数据
          city_name: cityArr //市级名称
        })
      }
      let defaultCode = that.data.city_list[0].cityid //获取第一个市的区级数据
      if (defaultCode) {
        that.setData({
          currentCityId: defaultCode //保存当下市id
        })
        that.getArea(defaultCode) //获取区域数据
      }
    })
  },
  //获取区域
  getArea(cityid) {
    let that = this
    api.getArea(cityid).then(res => {
      let areaList = [...res.data.areasList]
      let areaArr = res.data.areasList.map((item) => {
        return item.area
      }) //区域名
      that.setData({
        multiArray: [that.data.province_name, that.data.city_name, areaArr],
        area_list: areaList, //区列表
        area_name: areaArr //区名字
      })
    })
  },
  //picker确认选择地区
  bindRegionChange: function (e) {
    // 因为在获取省中 北京只有一个选项，导致获取不了北京》北京》第一个
    if (e.detail.value[1] == null || e.detail.value[2] == null) { //如果只滚动了第一列则选取第一列的第一数据
      this.setData({
        multiIndex: e.detail.value, //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].province, this.data.city_list[0].city, this.data.area_list[0].area],
        selectProvinceId: this.data.province_list[e.detail.value[0]].province,
        selectCityId: this.data.city_list[0].provinceid,
        selectAreaId: this.data.area_list[0].cityid
      })
    } else {
      this.setData({
        multiIndex: e.detail.value, //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].province, this.data.city_list[e.detail.value[1]].city, this.data.area_list[e.detail.value[2]].area],
        selectProvinceId: this.data.province_list[e.detail.value[0]].province,
        selectCityId: this.data.city_list[e.detail.value[1]].provinceid,
        selectAreaId: this.data.area_list[e.detail.value[2]].cityid
      })
    }
    // console.log(this.data.selectProvinceId,this.data.selectCityId,this.data.selectAreaId)
  },
  //滑动地区组件
  bindRegionColumnChange: function (e) {
    // console.log(e.detail.column,e.detail.value)
    let that = this
    let column = e.detail.column //当前改变的列
    let data = {
      multiIndex: JSON.parse(JSON.stringify(that.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(that.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value //第几列改变了就是对应multiIndex的第几个，更新他
    switch (column) {
      case 0: //第一列改变，省级改变
        let currentProvinceId = that.data.province_list[e.detail.value].provinceid
        if (currentProvinceId != that.data.currentProvinceId) { //判断当前id是不是更新了
          that.getCity(currentProvinceId) //获取当前id下的市级数据
        }
        data.multiIndex[1] = 0 //将市默认选择第一个
        break
      case 1: //第二列改变，市级改变
        let currentCityId = that.data.city_list[e.detail.value].cityid
        if (currentCityId != that.data.currentCityId) {
          that.getArea(currentCityId) //获取区域
        }
        data.multiIndex[2] = 0 //区域默认第一个
        break
    }
    that.setData(data) //更新数据
  },

  // 确认按钮
  confirm(e) {
    console.log(e);
  },
  // 取消按钮
  cancel(e) {
    console.log(e);
  },
  //上传身份证
  uploadFace() {
    var that = this
    wx.chooseImage({
      count: 1,
      // sizeType:original,
      success(res) {
        // console.log(res);
        // console.log(res.tempFiles[0].path);
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: 'https://api-mini.sangupig.top/api/aliyun/oss/policy',
          // url: 'http://192.168.101.2:8081/api/aliyun/oss/policy',

          header: {
            'X-Authorization': wx.getStorageSync('token'),
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            console.log(res.data);
            that.setData({
              idCardFace: res.data
            })
          }
        })
      }
    })
  },
  uploadNational() {
    var that = this
    wx.chooseImage({
      count: 1,
      // sizeType:original,
      success(res) {
        // console.log(res);
        // console.log(res.tempFiles[0].path);
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: 'https://api-mini.sangupig.top/api/aliyun/oss/policy',
          // url: 'http://192.168.101.2:8081/api/aliyun/oss/policy',

          header: {
            // 'X-Authorization': 1,
            'X-Authorization': wx.getStorageSync('token'),
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            console.log(res.data);
            that.setData({
              idCardNational: res.data
            })
          }
        })
      }
    })
  },
  // 点击提交审核
  formSubmit(e) {
    console.log(e.detail.value);
    let phone = e.detail.value.phone
    let code = e.detail.value.code
    let area = this.data.addressCity[0] + '/' + this.data.addressCity[1] + '/' + this.data.addressCity[2]
    let idCard = e.detail.value.idcode
    let idCardFace = this.data.idCardFace
    let idCardNational = this.data.idCardNational
    let name = e.detail.value.realName
    // let data = {
    //   "area": area,
    //   "idCard": idCard,
    //   "idCardFace": idCardFace,
    //   "idCardNational": idCardNational,
    //   "name": name
    // }
    api.tIdentity(phone, code, name, area, idCard, idCardFace, idCardNational, wx.getStorageSync('uid')).then(res => {
      console.log(res);
      this.setData({
        identityState:res.data
      })
      if(res.code === 200){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
          let set = setTimeout(function() {
             wx.reLaunch({
               url: `/pages/my/my?datas=${res.data}`,
             })
             clearTimeout(set)
            }, 2000);
          }
        })
      }else {
        wx.showToast({
          title: '提交失败',
          icon: 'error',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 顶部自定义标题
    this.setData({
      navH: app.globalData.navHeight
    })
    this.tProvinces()
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