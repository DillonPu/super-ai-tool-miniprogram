// components/chatComponent/chatComponent.js
const superAiApi = require('../../utils/superAiApi')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msgAnswerType: {
      type: String,
      value: ""
    },
    defaultFirstMsg: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //图标路径
    imgs: {
      icon_yy: "/images/common/default_head.png",
      icon_gdgn: "/images/common/super-ai.jpg",
      ht: "/images/common/super-ai.jpg",
      sb: "/images/common/super-ai.jpg",
      xjp: "/images/common/super-ai.jpg",
      yyxx: "/images/common/super-ai.jpg",
      voiceCancel: "/images/common/super-ai.jpg",
      sb_c: "sb_c.png"
    },
    //对方头像，可从上个页面获取过来
    head_img: "/images/common/super-ai.jpg",
    //输入
    inputVal: '',
    //下拉加载状态
    triggered: true,
    //记录前一条信息的时间戳-用于时间转换
    prevFirst: '',
    //记录当前信息列表的第一条信息的时间戳，用于下次查询
    curTopTimeStamp: '',

    //一次查询几条信息
    pagenum: 10,
    //触发上拉操作+1
    index: 0,

    msgList: [],

    //---高度信息----
    scrollHeight: 'calc(100vh - 60px)',
    inputBottom: 0,
    keyHeight: 0,
    windowHeight: 0,
    windowWidth: 0,
    //功能框高度
    featureHeight: 0,

    toView: '',

    //点击加号
    camera: false,
    //点击语音
    voice: false,
    //是否正在说话
    isSpeaking: false,
    recorderManager: null, //manager
    innerAudioContext: null, //音频播放manager
    sendtip: '松 开 发 送', // 录音过程中提示
    //播放语音中
    isPlaying: false,
    palyingMsgData: null, //记录正在播放的音频对象
    //遮罩层
    mask: false,
    //定义录音是否发送
    isClock: true,
    //需要取消（但是还没有取消）
    needCancel: false,

    //记录“取消发送”图标坐标位置，用于判断是否想要取消发送
    top: '',
    left: '',
    right: '',
    bottom: '',

    // 功能 -图标集合
    feature: [{
      src: 'camera.png',
      name: '相册'
    }],
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getMsgList();
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //调用接口查询信息列表
    getMsgList: function () {
      //根据自己需要写取信息的逻辑，此处先使用默认消息
      var msgList = this.data.msgList;
      msgList.push({
        msgid: '001',
        //发送方id
        jid: 'server',
        //接收方
        tojid: 'customer',
        timestamp: Date.now(),
        msg: this.properties.defaultFirstMsg,
        type: '1',
        isread: '1',
      })
      this.dealMsg(msgList)
    },

    //处理信息并保存渲染
    dealMsg: function (msgList) {
      const that = this;
      //需要对信息集合进行处理-时间的显示与否
      for (var i = 0; i < msgList.length; i++) {
        let list = msgList[i];
        let showTime = this.msgTimeFormat(list.timestamp, i);
        list['showTime'] = showTime;
      }
      that.setData({
        msgList: msgList,
        toView: 'msg-' + (that.data.msgList.length - 1),
      })
    },

    //获取聚焦
    focus: function (e) {
      const that = this;
      let keyHeight = e.detail.height;
      that.setData({
        camera: false,
        scrollHeight: (that.data.windowHeight - keyHeight - 60) + 'px',
        keyHeight: keyHeight
      });
      that.setData({
        toView: 'msg-' + (that.data.msgList.length - 1),
        inputBottom: keyHeight
      })
    },

    //失去聚焦(软键盘消失)
    blur: function (e) {
      const that = this;
      that.setData({
        scrollHeight: 'calc(100vh - 60px)',
        inputBottom: 0
      })
      that.setData({
        toView: 'msg-' + (that.data.msgList.length - 1)
      })
    },

    //获取输入内容
    getInputVal: function (e) {
      console.log("e.detail.value:"+e.detail.value)
      this.setData({
        inputVal: e.detail.value
      })
    },

    //发送点击监听
    sendClick: function (e) {
      const that = this;
      let value = that.data.inputVal;
      let msgList = that.data.msgList;
      if (value && value.replace(/\s+/g, '').length != 0) {
        //限制输入，为空或空格时不发送
        // 塞时间
        let timestamp = Date.parse(new Date());
        let showTime = this.msgTimeFormat(timestamp, that.data.msgList.length)
        msgList.push({
          msgid: '010',
          //发送方
          jid: 'customer',
          //接收方
          tojid: 'server',
          timestamp: timestamp,
          msg: value,
          type: '1',
          isread: '1',
          showTime: showTime
        })
        that.setData({
          msgList: msgList,
          inputVal: '',
          toView: 'msg-' + (that.data.msgList.length - 1),
        });

        let msgAnswerType = that.properties.msgAnswerType;
        superAiApi.getAiChatAnswer({
          "msg": value,
          "msgAnswerType": msgAnswerType
        }).then(result => {
          msgList.push(result.data);
          that.setData({
            msgList: msgList,
            inputVal: '',
            toView: 'msg-' + (that.data.msgList.length - 1),
          });
        })

      } else {
        //提示
        wx.showToast({
          title: '发送消息为空！',
          icon: 'none'
        })
      }
      
    },

    /**
     * 聊天时间 格式化
     * 规则：
     *  1. 每五分钟为一个跨度
     *  2. 今天显示，小时:分钟，例如：11:12
     *  3. 昨天显示，昨天 小时:分钟 例如：昨天 11:12
     *  4. 日期差大于一天显示，年月日 小时:分钟 例如：2021年9月30日 11:12
     * @param timestamp,index 
     * @returns {string|null}
     */
    msgTimeFormat: function (timestamp, index) {
      const that = this;
      //时间戳转变为时间
      let date = timestamp.toString().length == 13 ? new Date(parseInt(timestamp)) : new Date(parseInt(timestamp * 1000));
      let time = '';
      //第一条消息
      if (0 == index) {
        that.setData({
          prevFirst: timestamp
        })
        let prev = new Date(date);
        let next = new Date();
        let day = next.getDate() - prev.getDate();
        day = day >= 0 ? day : -(day);
        if (day > 1) {
          //时间间隔大于一天，显示YYYY年MM月DD日 HH：mm
          time = this.dateFormatChina(new Date(that.data.prevFirst.toString().length == 13 ? new Date(parseInt(that.data.prevFirst)) : new Date(parseInt(that.data.prevFirst * 1000))));
        } else if (day === 1) {
          time = '昨天 ' + prev.getHours() + ":" + this.timeAppendZero(prev);
        } else {
          time = prev.getHours() + ":" + this.timeAppendZero(prev);
        }
        return time;
      }

      let prev = new Date(that.data.prevFirst.toString().length == 13 ? new Date(parseInt(that.data.prevFirst)) : new Date(parseInt(that.data.prevFirst * 1000)));
      let next = new Date(date);

      let day = Math.floor((next - prev) / (24 * 60 * 60 * 1000));
      let minutes = Math.floor((next - prev) / (1000 * 60));
      let dayT = new Date().getDate() - next.getDate();
      let yesterdayFlag = dayT === 1 || dayT === -1;
      let todayFlag = dayT === 0;

      /*
        下标越界标志
        未越界且分钟差大于5，将当前消息日期作为比较值并替换prevFirst，并根据规则格式化
        越界则表示下标走到了最后一位，将其作为要显示的日期赋值给prev，并根据规则格式化
       */
      let indexOutFlag = that.data.msgList.length !== (index + 1);
      if (indexOutFlag && minutes > 5) {
        that.setData({
          prevFirst: timestamp
        })
        if (!todayFlag && !yesterdayFlag) {
          return this.dateFormatChina(next);
        } else {
          prev = new Date(date);
          if (yesterdayFlag) {
            return '昨天 ' + prev.getHours() + ":" + this.timeAppendZero(prev);
          }
        }
      } else {
        prev = new Date(date);
      }

      if (yesterdayFlag && minutes >= 5) {
        return '昨天 ' + prev.getHours() + ":" + this.timeAppendZero(prev);
      } else if (todayFlag && minutes >= 5) {
        return prev.getHours() + ":" + this.timeAppendZero(prev);
      }
      return null;
    },
    dateFormatChina: function (date) {
      return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + this.timeAppendZero(date);
    },
    timeAppendZero: function (time) {
      return time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes();
    },

    /**
     * 点击看大图
     */
    picture: function (e) {
      let src = e.currentTarget.dataset.src;
      wx.previewImage({
        current: src,
        urls: [src]
      })
    },
  }
})