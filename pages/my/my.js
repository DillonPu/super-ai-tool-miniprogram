// pages/my/my.js
const superAiApi = require('../../utils/superAiApi')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 是否启用修改头像
    enableEditAvatar: false,
    level: "---",
    wxUserInfo: {
      "userId": 0,
      "userName": "",
      "nickName": "",
      "createTime": "",
      "email": "",
      "phonenumber": "",
      "avatar": "",
      "totalMoney": "---",
      "totalPoint": "---",
      "level": "---",
      "daySign": false,
      "isLogin": false,
      "historyTotalPoint": "---"
    },
    showNicknameInput: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.getWxInfo(undefined, this);
  },

  // 请求授权登录
  submitLogin: function (e) {
    let that = this;
    wx.showModal({
      title: '授权登录',
      content: '自动无感登录',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '登录中...',
          })
          that.postLogin();
        } else if (res.cancel) {
          wx.showToast({
            title: '您当前还未登录，为了更好的体验请先登录',
          })
        }
      }
    })
  },

  // 调用登录接口
  postLogin() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          superAiApi.wxLoginOrRegister({
            "code": res.code
          }).then(result => {
            let token = result.token;
            wx.setStorageSync('token', token);
            wx.showToast({
              title: '登录成功',
            })
            wx.hideLoading();
            // 再调用获取刷新用户信息接口
            app.getWxInfo(undefined, that);
          });
        } else {
        }
      }
    })
  },

  //修改随机头像
  editRandomAvatar: function (e) {
    // 判断是否登录
    if (!this.data.wxUserInfo.isLogin) {
      return wx.showToast({
        title: '您未登录，为了更好的体验请先登录',
        icon: "none"
      })
    }

    let avatarImgNameIndex = this.randomNumBoth(1,36);
    let avatarUrl = "/images/avatar/"+avatarImgNameIndex+".png";
    let wxUserInfo = this.data.wxUserInfo;
    wxUserInfo.avatar = avatarUrl
    superAiApi.updateInfo({
      "avatar": avatarUrl
    }).then(result => {
      this.setData({
        wxUserInfo: wxUserInfo
      })
    })
  },

  // 产生包含范围边界的随机数
  randomNumBoth:function(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  },

  // 显示昵称修改输入框
  showEditNickname: function () {
    if (!this.data.wxUserInfo.isLogin) {
      return wx.showToast({
        title: '您未登录，为了更好的体验请先登录',
        icon: "none"
      })
    }
    this.setData({
      showNicknameInput: true
    })
  },

  //昵称输入框失去焦点
  editNickName: function (e) {
    let wxUserInfo = this.data.wxUserInfo;
    let nickname = e.detail.value;
    if (nickname == undefined || nickname.match(/^\s*$/)) {
      return wx.showToast({
        title: '昵称不能为空',
        icon: 'error'
      })
    }
    wxUserInfo.nickName = nickname
    superAiApi.updateInfo({
      "nickName": nickname
    }).then(result => {
      this.setData({
        wxUserInfo: wxUserInfo,
        showNicknameInput: false
      })
    })
  },

  // 轻触余额
  bindtapMoney:function(e){
    wx.showModal({
      title: '温馨提示',
      content: '充值余额功能暂未开放，请在【问题反馈】选择【充值】标签进行反馈，我们将联系您，可进行积分兑换'
    })
  },

  // 每日签到
  daySign: function (e) {
    let that = this
    let daySign = this.data.wxUserInfo.daySign;
    if (daySign) {
      return wx.showToast({
        title: '今日已签到',
      })
    }

    // 调用签到积分
    superAiApi.increasePointByDaySignPoint().then(result => {
      let point = result.data;
      if (point > 0) {
        // 再调用获取刷新用户信息接口
        app.getWxInfo(undefined, that);
        wx.showToast({
          title: "签到随机获得" + point + "积分",
        })
      }
    })
  },

  // 进入充值消费页面
  gotoMoneyLogView:function(e){
    wx.navigateTo({
      url: '../moneyLog/moneyLog',
    })
  },

  // 进入积分记录页面
  gotoLogListView: function (e) {
    wx.navigateTo({
      url: '../pointLog/pointLog',
    })
  },

  // 进入等级说明页面
  gotoLevelDescView: function (e) {
    let historyTotalPoint = this.data.wxUserInfo.historyTotalPoint;
    wx.navigateTo({
      url: '../levelLog/levelLog?historyTotalPoint=' + historyTotalPoint,
    })
  },

  // 进入AI聊天记录页面
  gotoAiChatLog: function (e) {
    wx.navigateTo({
      url: '../aichatLog/aichatLog',
    })
  },

  // 进入AI绘画记录页面
  gotoAiDrawLog: function (e) {
    wx.navigateTo({
      url: '../aidrawLog/aidrawLog',
    })
  },

  // 进入问题反馈列表页面 
  gotoFeedbackView: function (e) {
    wx.navigateTo({
      url: '../feedbackList/feedbackList',
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
    app.getWxInfo(undefined, this);
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