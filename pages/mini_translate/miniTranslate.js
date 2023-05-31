// pages/mini_translate/miniTranslate.js
// 百度翻译appid和密钥
var baiduTranslateAppId = '替换自己的';
var baiduTranslateAppKey = '替换自己的';

var MD5 = require('../../utils/md5');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //待翻译的文本和翻译结果
    translateFromTxt:"",
    translateToTxt:"",
    // 源语言和目标语言选择索引
    fromLanguageIndex:0,
    toLanguageIndex:0,
    // 中文显示语言数组
    languageZhArray:[],
    // 可以翻译的语言配置
    languageArray:[
      {"zh":"自动识别","en":"auto"},
      {"zh":"中文","en":"zh"},
      {"zh":"英语","en":"en"},
      {"zh":"粤语","en":"yue"},
      {"zh":"文言文","en":"wyw"},
      {"zh":"日语","en":"jp"},
      {"zh":"韩语","en":"kor"},
      {"zh":"法语","en":"fra"},
      {"zh":"西班牙语","en":"spa"},
      {"zh":"泰语","en":"th"},
      {"zh":"阿拉伯语","en":"ara"},
      {"zh":"俄语","en":"ru"},
      {"zh":"葡萄牙语","en":"pt"},
      {"zh":"德语","en":"de"},
      {"zh":"意大利语","en":"it"},
      {"zh":"希腊语","en":"el"},
      {"zh":"荷兰语","en":"nl"},
      {"zh":"波兰语","en":"pl"},
      {"zh":"保加利亚语","en":"bul"},
      {"zh":"爱沙尼亚语","en":"est"},
      {"zh":"丹麦语","en":"dan"},
      {"zh":"芬兰语","en":"fin"},
      {"zh":"捷克语","en":"cs"},
      {"zh":"罗马尼亚语","en":"rom"},
      {"zh":"斯洛文尼亚语","en":"slo"},
      {"zh":"瑞典语","en":"swe"},
      {"zh":"匈牙利语","en":"hu"},
      {"zh":"繁体中文","en":"cht"},
      {"zh":"越南语","en":"vie"}
    ]
  },
  
  // 源语言文本输入框变化
  bindFromTranslateTXtAreaInput:function(e){
    this.setData({
      translateFromTxt:e.detail.value
    })
  },
  // 选择源语言
  fromBindPickerChange: function(e) {
    this.setData({
      fromLanguageIndex: e.detail.value
      // languageFromZhArray: tempLanguageFromZhArray
    })

  },

  // 选择目标语言
  toBindPickerChange: function(e) {
    // 初始化可以翻译的列表数据，右边可以选择的列表边去掉【自动识别】和左边选择的
    this.setData({
      toLanguageIndex: e.detail.value
      // languageToZhArray: tempLanguageToZhArray
    })
  },

  // 切换元语言和目标语言 
  bindChangeSelectLanguage:function(e){
    let tempIndex = this.data.fromLanguageIndex;
    // 当源语言是自动检测时，不允许切换
    if(tempIndex==0)return;
    this.setData({
      fromLanguageIndex: this.data.toLanguageIndex,
      toLanguageIndex: tempIndex
    })
  },

  // 翻译按钮
  bindTranslate: function(e){

    let translateFromTxt = this.data.translateFromTxt;
    if (translateFromTxt.match(/^\s*$/)) {
      return wx.showToast({
         title: '请输入待翻译的文本',
         icon: 'error'
       })
     }
     
    let that = this;
    // 获取要翻译的源语言和目标语言的语言代码
    let from = this.data.languageArray[this.data.fromLanguageIndex].en;
    let to = this.data.languageArray[this.data.toLanguageIndex].en;
    let salt = (new Date).getTime();
    
    // 存储翻译结果
    let signOrigin = baiduTranslateAppId+translateFromTxt+salt+baiduTranslateAppKey;
    let sign = MD5.MD5(signOrigin);

    // 请求百度api
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      method:'get',
      data:{
        "q": translateFromTxt,
        "appid": baiduTranslateAppId,
        "salt": salt,
        "from": from,
        "to": to,
        "sign": sign
      },
      success (res){
        let result = "";
        let transResultArr = res.data.trans_result;
        transResultArr.forEach(item=>{
          result = result.concat("\n"+item.dst+"\n")
        });
        
        // 返回翻译结果
        that.setData({
          translateToTxt: result
        })
      }

    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化源语言列表
    let tempLanguageZhArray = [];
    this.data.languageArray.forEach(item => {
      tempLanguageZhArray.push(item.zh);
    });
    // tempLanguageToZhArray.shift();
    this.setData({
      languageZhArray:tempLanguageZhArray
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