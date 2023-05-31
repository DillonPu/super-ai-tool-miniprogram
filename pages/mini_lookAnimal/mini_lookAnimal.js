import baidubceApi from '../../utils/baidubceApi';
const superAiApi = require('../../utils/superAiApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageTempUrl: "",
    lookResultArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 选择图片
  bindSelectImage: function (e) {
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        let tempFilePath = res.tempFiles[0].tempFilePath;
        that.setData({
          imageTempUrl: tempFilePath
        })
      }
    })
  },
  // 调用接口进行识别
  binBtnLook: function (e) {

    let imageUrl = this.data.imageTempUrl;
    if (imageUrl.match(/^\s*$/)) {
      return wx.showToast({
        title: '请上传图片',
        icon: 'error'
      })
    }
    // 调用 百度植物识别
    wx.showLoading({
      title: '图片智能识别中...'
    })
    superAiApi.getBaidubceToken({
      "code": "4"
    }).then(token => {
      this._lookAnimal(token.data);
    });
  },
  // 百度动物识别
  async _lookAnimal(token) {
    let imageUrl = this.data.imageTempUrl;
    // 图片转base64
    let base64 = wx.getFileSystemManager().readFileSync(imageUrl, "base64");
    let result = await baidubceApi._lookAnimal(token, base64);

    if (result.data.result) {
      this.setData({
        lookResultArr: result.data.result
      });
    }else{
      wx.showToast({
        title: '系统繁忙，稍后再吃',
        icon:"none"
      })
    }
    wx.hideLoading();
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