// pages/moneyLog/moneyLog.js
const superAiApi = require('../../utils/superAiApi')
const timeUtil = require("../../utils/timeUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logList: [],
    tag: "充值/消费",
    beginDate: "",
    endDate: "",
    today: "",
    pageNum: 1,
    pageSize: 10,
    total: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let today = timeUtil.formatDate(new Date());
    let lastMonth = timeUtil.getlastMonth();
    this.setData({
      beginDate: lastMonth,
      today: today,
      endDate: today
    })
  },

  // 选择开始日期
  selectBeginDate: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },

  // 选择结束日期
  selectEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getMoneyList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 下拉获取数据
    this.getMoneyList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 调用后台接口获取积分记录
  getMoneyList: function (e) {

    if (this.data.total === 0) {
      return wx.showToast({
        title: '暂无充值消费记录',
        icon: "none"
      });
    }

    if (this.data.total === this.data.logList.length) {
      return wx.showToast({
        title: '已获取全部数据',
        icon: "none"
      });
    }

    let that = this;
    let requestData = {
      "pageNum": that.data.pageNum,
      "pageSize": that.data.pageSize,
      "beginDate": that.data.beginDate,
      "endDate": that.data.endDate
    }
    superAiApi.getListMoneyLog(requestData).then(result => {
      let total = result.total;
      let rows = result.rows;
      let originList = that.data.logList;
      that.setData({
        logList: originList.concat(rows),
        total: total,
        pageNum: that.data.pageNum + 1
      })
    })
  }
})