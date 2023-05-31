// pages/aidrawLog/aidrawLog.js
const timeUtil = require("../../utils/timeUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图标路径
    imgs:{
      icon_yy:"/images/common/default_head.png",
      icon_gdgn:"/images/common/super-ai.jpg",
      ht: "/images/common/super-ai.jpg",
      sb: "/images/common/super-ai.jpg",
      xjp:"/images/common/super-ai.jpg",
      yyxx:"/images/common/super-ai.jpg",
      voiceCancel:"/images/common/super-ai.jpg",
      sb_c:"sb_c.png"
    },
    //对方头像，可从上个页面获取过来
    head_img:"/images/common/super-ai.jpg",
    //下拉加载状态
    triggered: true,
    //一次查询几条信息
    pagenum:10,
    //触发上拉操作+1
    index:0,
    
    msgList : [{
        msgid:'001',
        //发送方id
        jid: 'server',
        //接收方
        tojid: 'customer',
        timestamp:Date.now(),
        msg: '暂未开放，请在【个人中心】【问题反馈】中选择AI绘画留言申请接入',
        type: '1',
        isread:'1',
      }
    ],
    //---高度信息----
    scrollHeight: 'calc(100vh - 60px)',
    toView : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this;
    that.setData({
        windowWidth:wx.getSystemInfoSync().windowWidth,
        windowHeight:wx.getSystemInfoSync().windowHeight,
        //对方账号
        tojid: 'server',
        //该页导航栏标题从上一页传递过来
        // name:decodeURIComponent(options.name),
        // name:"智能Ai绘画",
        //对方头像从上一页传递过来
        // head_img:decodeURIComponent(options.head_img),
        head_img:"/images/common/super-ai.jpg",
    },(res)=>{
      //页面切换，更换页面标题
      wx.setNavigationBarTitle({
        　title: that.data.name 
      });
      //后续考虑每次退出页面时，将信息存入缓存？记录最早一条的时间戳，下次查询从这个时间戳开始查询
      
      //此处可调用接口获取已有的信息。
      that.getMsgList();

    })
  },

  //调用接口查询信息列表
  getMsgList(){
	//根据自己需要写取信息的逻辑，此处先使用默认消息
	var msgList = this.data.msgList;
	this.dealMsg(msgList)
  },

  //处理信息并保存渲染
  dealMsg(msgList){
    const that = this;
    //需要对信息集合进行处理-时间的显示与否
    for (var i = 0; i < msgList.length; i++){
        let list = msgList[i];
        let showTime = timeUtil.msgTimeFormat(list.timestamp,i,that);
        list['showTime'] = showTime;
    }
    that.setData({
        msgList:msgList,
        toView:'msg-' + (that.data.msgList.length - 1),
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