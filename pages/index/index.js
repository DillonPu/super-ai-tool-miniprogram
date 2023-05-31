// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tools:[
      {
        "label":"Ai对话",
        "icon":"/images/index_mini/icon_aiRobotChat.png",
        "url":"/pages/aiRobotChat/aiRobotChat",
        "openType":"navigate",
        "needPoint":0
      },
      {
        "label":"答非所问",
        "icon":"/images/index_mini/icon_aiRandomChat.png",
        "url":"/pages/aiRandomChat/aiRandomChat",
        "openType":"navigate",
        "needPoint":0
      },
      {
        "label":"汉字转拼音",
        "icon":"/images/index_mini/icon_pinyin.png",
        "url":"/pages/pinyin/pinyin",
        "openType":"navigate",
        "needPoint":0
      },
      {
        "label":"翻译",
        "icon":"/images/index_mini/icon_trans.png",
        "url":"/pages/mini_translate/miniTranslate",
        "openType":"navigate",
        "needPoint":0
      },
      {
        "label":"手持弹幕",
        "icon":"/images/index_mini/icon_handBarrage.png",
        "url":"/pages/mini_handBarrage/mini_handBarrage",
        "openType":"navigate",
        "needPoint":0
      },
      {
        "label":"Ai创作",
        "icon":"/images/index_mini/icon_aichat.png",
        "url":"/pages/aichat/aichat",
        "openType":"switchTab",
        "needPoint":5
      },
      {
        "label":"Ai绘画",
        "icon":"/images/index_mini/icon_aidraw.png",
        "url":"/pages/aidraw/aidraw",
        "openType":"switchTab",
        "needPoint":5
      },
      {
        "label":"快递查询",
        "icon":"/images/index_mini/icon_express.png",
        "url":"/pages/mini_express/miniExpress",
        "openType":"navigate",
        "needPoint":1
      },
      {
        "label":"果蔬识别",
        "icon":"/images/index_mini/icon_fruit.png",
        "url":"/pages/mini_lookFruitsAndVeg/miniLookFruitsAndVeg",
        "openType":"navigate",
        "needPoint":1
      },
      {
        "label":"植物识别",
        "icon":"/images/index_mini/icon_plant.png",
        "url":"/pages/mini_lookPlant/mini_lookPlant",
        "openType":"navigate",
        "needPoint":1
      },
      {
        "label":"动物识别",
        "icon":"/images/index_mini/icon_animal.png",
        "url":"/pages/mini_lookAnimal/mini_lookAnimal",
        "openType":"navigate",
        "needPoint":1
      }
    ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
