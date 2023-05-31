// app.js
const superAiApi = require('./utils/superAiApi')
App({
  data:{
    levelDescList:[
      {level:1,startTotalPoint:1,endTotalPoint:9},
      {level:2,startTotalPoint:10,endTotalPoint:19},
      {level:3,startTotalPoint:20,endTotalPoint:29},
      {level:4,startTotalPoint:30,endTotalPoint:49},
      {level:5,startTotalPoint:50,endTotalPoint:79},
      {level:6,startTotalPoint:80,endTotalPoint:99},
      {level:7,startTotalPoint:100,endTotalPoint:129},
      {level:8,startTotalPoint:130,endTotalPoint:159},
      {level:9,startTotalPoint:160,endTotalPoint:199},
      {level:10,startTotalPoint:200,endTotalPoint:249},
      {level:11,startTotalPoint:250,endTotalPoint:299},
      {level:12,startTotalPoint:300,endTotalPoint:349},
      {level:13,startTotalPoint:350,endTotalPoint:399},
      {level:14,startTotalPoint:400,endTotalPoint:499},
      {level:15,startTotalPoint:500,endTotalPoint:599},
      {level:16,startTotalPoint:600,endTotalPoint:799},
      {level:17,startTotalPoint:800,endTotalPoint:999},
      {level:18,startTotalPoint:1000,endTotalPoint:1499},
      {level:19,startTotalPoint:1500,endTotalPoint:1999},
      {level:20,startTotalPoint:2000,endTotalPoint:2999},
    ]
  },
  getWxInfo:function(e,that){
    let _that = this;
    // 再调用获取用户信息接口
    superAiApi.getWxUserInfo().then(result=>{
      let wxUserInfo = result.data;
      let level = _that.getLevel(wxUserInfo.historyTotalPoint)
      wx.setStorageSync('wxUserInfo', wxUserInfo);
      that.setData({
        wxUserInfo:wxUserInfo,
        level:level
      })
    });
  },
  //获取总积分对应的等级
  getLevel:function(historyTotalPoint){
    let levelDescList = this.data.levelDescList;
    for (let index = 0; index < levelDescList.length; index++) {
      const element = levelDescList[index];
      if(historyTotalPoint>=element.startTotalPoint && historyTotalPoint<=element.endTotalPoint){
        return element.level;
      }
    }
  }
})
