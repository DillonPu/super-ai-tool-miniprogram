// pages/pinyin/pinyin.js
const superAiApi = require('../../utils/superAiApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originTxt:"",
    pinyinInfo:{
      "origin":"",
      "markPinYin":"",
      "numberPinYin":"",
      "tonePinYin":"",
      "shortPinYin":"",
      "traditional":"",
      "simplified":"",
      "originAndPinyin":""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

   // 汉字文本输入框变化
   bindFromTranslateTXtAreaInput:function(e){
    this.setData({
      originTxt:e.detail.value
    })
  },

  // 显示拼音结果
  bindPinyin:function(e){
    let that = this;
    let originTxt = that.data.originTxt;
    if (originTxt.match(/^\s*$/)) {
      return wx.showToast({
         title: '请输入待转拼音的文本',
         icon: 'error'
       })
     }

     // 调用接口进行转换
     superAiApi.getPinyin({"origin":originTxt}).then(result=>{
        let pinyinInfo = result.data;
        that.setData({
          pinyinInfo:pinyinInfo
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})