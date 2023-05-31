const fetch=require("./fetch")  // 引入封装的wx,request请求
//确认开发环境
let baseURL='https://localhost:8080/miniai';  // 公共部分统一 上线时要替换成域名

function wxLoginOrRegister(data){//获取登录token
  return fetch(baseURL + '/weixin/auth/loginOrRegister', "POST", data)
}
function getWxUserInfo(){ // 获取用户信息
  return fetch(baseURL + '/weixin/auth/getInfo', "POST", {});
}
function increasePointByDaySignPoint(){ // 签到获取积分
  return fetch(baseURL + '/weixin/auth/increasePointByDaySignPoint', "POST", {});
}
function lookExpress(data){ // 快递查询api
  return fetch(baseURL + '/weixin/tool/lookExpress', "POST", data);
}
function getBaidubceToken(data){ // 百度智能云Token
  return fetch(baseURL + '/weixin/tool/getBaidubceToken', "POST", data);
}
function getPinyin(data){ // 获取拼音信息
  return fetch(baseURL + '/weixin/tool/getPinyin', "POST", data);
}
function getListMoneyLog(data){ // 获取充值消费记录
  return fetch(baseURL + '/weixin/auth/listMoneyLog', "POST", data);
}
function getListPointLog(data){ // 获取积分记录
  return fetch(baseURL + '/weixin/auth/listPointLog', "POST", data);
}
function getTotalPoint(data){ // 获取总积分
  return fetch(baseURL + '/weixin/auth/getTotalPoint', "POST", data);
}
function updateInfo(data){ // 修改昵称头像
  return fetch(baseURL + '/weixin/auth/updateInfo', "POST", data);
}
function addFeedback(data){ // 添加反馈
  return fetch(baseURL + '/weixin/auth/addFeedback', "POST", data);
}
function listFeedback(data){ // 查询反馈列表
  return fetch(baseURL + '/weixin/auth/listFeedback', "POST", data);
}
function getFeedbackDetail(data){ // 查询反馈详情
  return fetch(baseURL + '/weixin/auth/getFeedbackDetail', "POST", data);
}
function getListByDictType(data){ // 根据字典类型获取字典值列表
  return fetch(baseURL + '/system/dict/data/getListByDictType', "POST", data);
}

function getAiRandomAnswer(data){ // 获取答非所问
  return fetch(baseURL + '/weixin/tool/getAiRandomAnswer', "POST", data);
}
function getAiRobotChatAnswer(data){ // 获取AI机器人对话答案
  return fetch(baseURL + '/weixin/tool/getAiRobotChatAnswer', "POST", data);
}
function getAiChatAnswer(data){ // 获取AI创作答案
  return fetch(baseURL + '/weixin/tool/getAiChatAnswer', "POST", data);
}
function getAiDrawAnswer(data){ // 获取AI绘画答案
  return fetch(baseURL + '/weixin/tool/getAiDrawAnswer', "POST", data);
}


module.exports={
  wxLoginOrRegister,
  getWxUserInfo,
  increasePointByDaySignPoint,
  lookExpress,
  getBaidubceToken,
  getPinyin,
  getListMoneyLog,
  getListPointLog,
  getTotalPoint,
  updateInfo,
  addFeedback,
  listFeedback,
  getFeedbackDetail,
  getListByDictType,
  getAiRandomAnswer,
  getAiRobotChatAnswer,
  getAiChatAnswer,
  getAiDrawAnswer
}