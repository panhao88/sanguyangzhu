const fly = require('./index')

export default {
  // 首页轮播图
  tBanner(current, size) {
    return fly.get(`/tBanner?current=${current}&size=${size}`)
  },
  // 首页分类信息
  tClassification(current, size) {
    return fly.get(`/tClassification?current=${current}&size=${size}`)
  },
  // 首页资讯
  tInformation(current, size) {
    return fly.get(`/tInformation?current=${current}&size=${size}`)
  },
  //养殖基地
  tPigFarmManage(current, size) {
    return fly.get(`/tPigFarmManage?current=${current}&size=${size}`)
  },
  // 授权登录请求 存在邀请码
  loginInCode(code, parentInCode) {
    return fly.get(`/login/getAccessToken/` + code + `?parentInCode=${parentInCode}`)
  },
  // 授权登录请求 不存在邀请码
  login(code) {
    return fly.get('/login/getAccessToken/' + code)
  },
  // 存在邀请码
  updateIncode(parentInCode, data) {
    return fly.put(`/tUser?parentInCode=${parentInCode}`, data)
  },
  // 不存在邀请码
  update(data) {
    return fly.put(`/tUser`, data)
  },
  // 获取用户信息
  userinfo() {
    return fly.get(`/tUser`)
  },
  // 邀请记录
  popularize(id) {
    return fly.get(`/popularize/getInviteDetail/{id}?id=${id}`)
  },
  // 推广首页
  getpopularize(id) {
    return fly.get(`/popularize/${id}`)
  },
  // 销售业绩
  getAchievement(id) {
    return fly.get(`/popularize/getAchievement/${id}`)
  },
  //获取商品列表
  tGoods(data) {
    if (data.id !== undefined) {
      return fly.get(`/tGoods?current=${data.current}&size=${data.size}&goodsTypeId=${data.id}`)
    } else {
      return fly.get(`/tGoods?current=${data.current}&size=${data.size}`)
    }
  },
  // 产品详情
  tGoodsDetail(id) {
    return fly.get(`/tGoodsDetail/${id}`)
  },
  // 个人中心 常见问题
  tQuestion(current, size) {
    return fly.get(`/tQuestion?current=${current}&size=${size}`)
  },
  // 个人中心  关于我们
  tAbout(id) {
    return fly.get(`/tAbout/${id}`)
  },
  //累计收益记录
  tTotalIncomeDetait(id, current, size) {
    return fly.get(`/tTotalIncome?userId=${id}&current=${current}&size=${size}`)
  },
  //养猪收益记录
  tPigIncome(id, current, size) {
    return fly.get(`/tPigIncome?userId=${id}&current=${current}&size=${size}`)
  },
  // 猪粮资产记录
  tIntegralAssets(id, current, size) {
    return fly.get(`/tIntegralAssets?userId=${id}&current=${current}&size=${size}`)
  },
  //销售奖金记录
  tSaleMoney(id, current, size) {
    return fly.get(`/tSaleMoney?userId=${id}&current=${current}&size=${size}`)
  },
  //提现记录
  tWithdrawalRecord(id, current, size) {
    return fly.get(`/tWithdrawalRecord?userId=${id}&current=${current}&size=${size}`)
  },
  // 我的钱包
  TotalIncome(id) {
    return fly.post(`tTotalIncome/myWallet?userId=${id}`)
  },
  // 围观伙伴
  tWatch(current, size, ppId) {
    return fly.get(`/tWatch?current=${current}&size=${size}&ppId=${ppId}`)
  },
  // 个人中心  消息中心
  tMessagePush(current, size, userId) {
    return fly.get(`/tMessagePush?current=${current}&size=${size}&userId=${userId}`)
  },
  // 验证码请求
  sendMessage(phone) {
    return fly.get(`/tIdentity/send?phone=${phone}`)
  },
  //  获取所有省的信息
  tProvinces(current, size) {
    return fly.get(`/tProvinces?current=${current}&size=${size}`)
  },
  //获取城市
  getCity(provinceid) {
    return fly.get(`/tCities/getCityOrArea?provinceid=${provinceid}`)
  },
  //获取城市
  getArea(cityid) {
    return fly.get(`/tCities/getCityOrArea?cityid=${cityid}`)
  },
  //获取用户身份位/tUser/selectUserIdentity
  getIdentity(userId) {
    return fly.get(`/tUser/selectUserIdentity?userId=${userId}`)
  },
  // 实名认证/tIdentity
  tIdentity(phone, code, name, area, idCard, idCardFace, idCardNational, userId) {
    return fly.post(`/tIdentity?phone=${phone}&code=${code}&name=${name}&area=${area}&idCard=${idCard}&idCardFace=${idCardFace}&idCardNational=${idCardNational}&userId=${userId}`)
  },
  // 获取销售奖金
  achievement(id) {
    return fly.get(`/tOrder/achievement?id=${id}`)
  },
  // 我的订单
  tOrder() {
    return fly.get(`/tOrder`)
  },
  //查询所有订单 findAll
  getOrder(current, size, userId) {
    return fly.get(`/tOrder/findAll?current=${current}&size=${size}&userId=${userId}`)
  },
  // 未支付
  tOrder(current, size, userId, state) {
    return fly.get(`/tOrder?current=${current}&size=${size}&userId=${userId}&state=${state}`)
  },
  // 认养订单
  adoptTOrder(current, size, userId, orderType) {
    return fly.get(`/tOrder?current=${current}&size=${size}&userId=${userId}&orderType=${orderType}`)
  },
  // 转让订单
  transfertOrder(current, size, userId, orderType) {
    return fly.get(`/tOrder?current=${current}&size=${size}&userId=${userId}&orderType=${orderType}`)
  },
  //订单详情
  orderDetail(goodsId, orderType, userId) {
    return fly.post(`/tOrder/orderDetail?goodsId=${goodsId}&userId=${userId}&orderType=${orderType}`)
  },
  // 首页系统消息推送
  tMessagePush(current, size, userId) {
    return fly.get(`/tMessagePush?current=${current}&size=${size}&userId=${userId}`)
  },
  // 产品价格
  tGoodsInfo(id) {
    return fly.get(`/tGoodsInfo/show?id=${id}`)
  },
  // 我的金猪
  pigtOrder(current, size, userId, ) {
    return fly.get(`/tOrder?current=${current}&size=${size}&userId=${userId}`)
  },
  // 产品类型
  tGoodsType(current, size) {
    return fly.get(`/tGoodsType?current=${current}&size=${size}`)
  },
  // 产品条件查询
  tGoodsFindAll(goodsTypeId) {
    return fly.get(`/tGoods/findAll?goodsTypeId=${goodsTypeId}`)
  },
  // 母猪信息
  tParentPig(id){
    return fly.get(`/tParentPig/${id}`)
  },
  // 按胎次查询
  tChildPig(ppId){
    return fly.get(`/tChildPig/count/${ppId}`)
  },
   // 根据胎次获得猪崽信息
   getTChilpigByParity(parity,ppId){
    return fly.get(`/tChildPig/getTChilpigByParity?parity=${parity}&ppId=${ppId}`)
   },
  //  消杀防疫
  tDisinfect(current,size){
    return fly.get(`/tDisinfect?current=${current}&size=${size}`)
  },
  // 市场全部的猪
  tSalePig(current,size){
    return fly.get(`/tSalePig?current=${current}&size=${size}`)
  },
    // 市场猪分类  金猪
    getSalePig(current,size,type){
      return fly.get(`/tSalePig?current=${current}&size=${size}&type=${type}`)
    },
}