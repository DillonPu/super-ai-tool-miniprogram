var MD5 = require('../../utils/md5');
import {
  Base64
} from '../../utils/Base64';
// var Base64 = require('../../utils/md5');
const superAiApi = require('../../utils/superAiApi')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 输入的快递编号
    expressOrderCode: "",
    codeIndex: 0,
    expressCompanyNameList:[],
    expressCompanyList: [{
      "name": "请选择快递公司",
      "code": ""
    },
      {
        "name": "申通快递",
        "code": "STO"
      },
      {
        "name": "圆通速递",
        "code": "YTO"
      },
      {
        "name": "百世快递",
        "code": "HTKY"
      }
    ],
    expressResult: {}
  //   expressResult:{
  //     "success": "true",
  //     "reason": null,
  //     "traces": [
  //         {
  //             "AcceptTime": "2023-03-01 20:25:32",
  //             "AcceptStation": "【广东省佛山市禅城公司】 已揽收 取件人: 欧阳永杰 (15917639370)"
  //         },
  //         {
  //             "AcceptTime": "2023-03-01 20:48:21",
  //             "AcceptStation": "【广东省佛山市禅城公司】 已打包"
  //         },
  //         {
  //             "AcceptTime": "2023-03-01 21:07:29",
  //             "AcceptStation": "【广东省佛山市禅城】 已发出 下一站 【佛山转运中心公司】"
  //         }
  //     ]
  // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化快递公司名称列表
    let tempExpressCompanyNameList = [];
    this.data.expressCompanyList.forEach(item => {
      tempExpressCompanyNameList.push(item.name);
    });
    tempExpressCompanyNameList.shift();
    this.setData({
      expressCompanyNameList: tempExpressCompanyNameList
    })
  },

  // 选择要查询的快递公司
  selectExpressCompany: function (e) {
    this.setData({
      codeIndex: ++e.detail.value
    })
  },

  // 获取输入框里面的输入值
  bindExpressOrderInput: function (e) {
    this.setData({
      expressOrderCode: e.detail.value
    })
  },

  // 搜索快递结果
  searchExpressPath: function (e) {
    let that = this;

    let expressCompanyCode = that.data.expressCompanyList[that.data.codeIndex].code
    if (expressCompanyCode.match(/^\s*$/)) {
      return wx.showToast({
        title: '请选择快递公司',
        icon: 'error'
      })
    }

    let expressCode = this.data.expressOrderCode;
    if (expressCode.match(/^\s*$/)) {
      return wx.showToast({
        title: '请输入快递单号',
        icon: 'error'
      })
    }

    // 请求单号数据
    let requestData = {
      "logisticCode": expressCode,
      "shipperCode": expressCompanyCode
    }

    wx.showLoading({
      title: '快递查询中',
    })

    // 调用后台快递查询
    superAiApi.lookExpress(requestData).then(result => {
      if (result != null && result.data.Success != undefined) {
        that.setData({
          expressResult: {
            "success": result.data.Success,
            "reason": result.data.Reason,
            "traces": result.data.Traces
          }
        })
        wx.hideLoading();
      }
    })
  },

  getKdniaoDataSign: function (RequestData) {
    let beforeMd5 = JSON.stringify(RequestData) + kdNaioApiKey;
    let md5Str = MD5.MD5(beforeMd5);
    let encode = Base64.encode(md5Str);
    return encodeURI(encode);
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