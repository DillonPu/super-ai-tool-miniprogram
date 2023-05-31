// pages/feedbackList/feedbackList.js
const superAiApi = require('../../utils/superAiApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    pageSize:10,
    total:-1,
    feedbackList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getListFeedback();
  },

  // 获取最新反馈列表
  getListFeedback:function(e){
    let that = this;
    let total = that.data.total;
    let feedbackList = that.data.feedbackList;
    if(total===feedbackList.length){
      return;
    }
    let pageNum = that.data.pageNum;
    let pageSize = that.data.pageSize;
    superAiApi.listFeedback({"pageNum":pageNum,"pageSize":pageSize}).then(result=>{
      let pageDataList = result.rows;
      that.setData({
        feedbackList:feedbackList.concat(result.rows),
        total:result.total,
        pageNum:pageNum+1
      })
    })
  },

  // 获取反馈详情
  getFeedbackDetail:function(e){
    let feedbackIndex = e.currentTarget.dataset.feedbackIndex;
    let id = this.data.feedbackList[feedbackIndex].id;
    wx.navigateTo({
      url: '../feedbackDetail/feedbackDetail?id='+id
    })
  },

  // 进入反馈添加界面
  gotoAddFeedbackView:function(e){
    wx.navigateTo({
      url: '../feedbackAdd/feedbackAdd',
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
    this.getListFeedback();
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
    let that = this;
    let total = that.data.total;
    let feedbackList = that.data.feedbackList;
    if(total===feedbackList.length){
      return wx.showToast({
        title: '已显示全部数据',
        icon:"none"
      })
    }
    this.getListFeedback();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})