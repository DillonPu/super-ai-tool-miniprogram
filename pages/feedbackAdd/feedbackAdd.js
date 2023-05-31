// pages/feedbackAdd/feedbackAdd.js
const superAiApi = require('../../utils/superAiApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: '',
    questionTitle: '',
    questionDesc: '',
    contact: '',
    activeIndex: -1,
    dictArray: []
  },

  // 标签选定
  selectTip: function (e) {
    let tempActiveIndex = e.currentTarget.dataset.activeIndex;
    let dictArray = this.data.dictArray;
    dictArray[tempActiveIndex].active = true;
    let activeIndex = this.data.activeIndex;
    if (activeIndex >= 0) {
      dictArray[activeIndex].active = false;
    }
    this.setData({
      activeIndex: tempActiveIndex,
      dictArray: dictArray
    })
  },

  formSubmit: function (e) {
    let _that = this;
    let activeIndex = _that.data.activeIndex;
    if(activeIndex==-1){
      return wx.showModal({
        title: '温馨提示',
        content: '请点击选择反馈标签!',
      })
    }
    let questionType = _that.data.dictArray[activeIndex].dictValue;
    let title = e.detail.value.title;
    let content = e.detail.value.opinion;
    let contact = e.detail.value.contact;
    let regPhone = /^1[3578]\d{9}$/;
    let regEmail = /^[a-z\d_\-\.]+@[a-z\d_\-]+\.[a-z\d_\-]+$/i;
    if (title.match(/^\s*$/)) {
      return wx.showModal({
        title: '温馨提示',
        content: '反馈标题不能为空!',
      })
    }
    if (content.match(/^\s*$/)) {
      return wx.showModal({
        title: '温馨提示',
        content: '反馈内容不能为空!',
      })
    }
    if (contact.match(/^\s*$/)) {
      return wx.showModal({
        title: '温馨提示',
        content: '手机号或者邮箱不能为空!',
      })
    }
    if ((!regPhone.test(contact) && !regEmail.test(contact)) || (regPhone.test(contact) && regEmail.test(contact))) { //验证手机号或者邮箱的其中一个对
      return wx.showModal({
        title: '温馨提示',
        content: '您输入的手机号或者邮箱有误!',
      })
    } else {
      this.setData({
        loading: true
      })

      // 调用后台增加反馈
      superAiApi.addFeedback({"questionTitle":title,"questionDesc":content,"questionType":questionType,"contact":contact}).then(result=>{
        if(result.code==200){
          wx.showModal({
            title: '蟹蟹',
            content: '蟹蟹您的宝贵反馈，我们将尽快回复!',
            showCancel:false,
            complete: (res) => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
      
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    superAiApi.getListByDictType({
      "dictType": "feedback_question_type"
    }).then(result => {
      that.setData({
        dictArray: result.data
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