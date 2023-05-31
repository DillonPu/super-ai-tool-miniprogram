Page({

  data: {
    flyText: "请输入您要的文字",
    flyDuration: 8000,
    textColor: "rgb(255,255,255)", //255,0,155
    textShadow: "3px 0 20px rgb(255,0,155), -3px 0 20px rgb(255,0,155), 0 3px 20px rgb(255,0,155), 0 -3px 20px rgb(255,0,155), 3px 3px 20px rgb(255,0,155), -3px -3px 20px rgb(255,0,155), 3px -3px 20px rgb(255,0,155), -3px 3px 20px rgb(255,0,155);",
    isShowMenu: false,
    isShowMenu_style: "hidden",
    isShowChangeText: false,
    isShowChangeText_style: "hidden",
    isShowSetting_style: "hidden",
    isInputContentFocus: false,
    isShowText: true,
    rotate_value: "rotate(90deg)",
    textFontSize: "140px",
    backgroundColor: "#000",
    isShowHelper_style: "hidden",
    //定时器
    inter_id: null,
    textMarginBottom: '-60rpx',
    nowtime_id: null,
    num: "",
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    isShowDao_style: "hidden",
    dao_inter: null,
    selectedIndex: 0
  },
  onShareAppMessage: function (res) {

    return {

      title: '发现了一个超级好玩的小程序，手持弹幕',

      desc: this.data.flyText,

      path: '/page/dm?str=' + this.data.flyText,
      success: function (res) {}

    }

  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    if (options.str) {
      this.setData({
        flyText: options.str
      });
    }

    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenHeight: res.screenHeight
        });
      }
    });
  },

  onReady: function () {
    this.initBarrage(this.data.flyText);
  },
  show_menu: function () {
    if (this.data.isShowMenu) {
      this.setData({
        isShowMenu_style: "hidden",
        isShowMenu: false
      })
    } else {
      if (this.data.isShowChangeText_style != "visible" || this.data.isShowSetting_style != "visible" || this.data.isShowHelper_style != "visible" || this.data.isShowDao_style != "visible") {
        this.setData({
          isShowMenu_style: "visible",
          isShowMenu: true
        })
      }
    }
    //初始化
    this.setData({
      isShowChangeText_style: "hidden",
      isShowText: true,
      isShowSetting_style: "hidden",
      isShowHelper_style: "hidden",
      isShowDao_style: "hidden"
    })

  },
  //点击更改文字
  change_text: function (e) {
    let selectedIndex = e.currentTarget.dataset.selectedIndex;
    this.setData({
      isShowChangeText_style: "visible",
      isShowMenu_style: "hidden",
      isShowMenu: false,
      isShowText: false,
      selectedIndex: selectedIndex
    })
  },

  open_setting: function (e) {
    let selectedIndex = e.currentTarget.dataset.selectedIndex;
    this.setData({
      isShowSetting_style: "visible",
      isShowMenu_style: "hidden",
      isShowMenu: false,
      selectedIndex: selectedIndex
    })

  },

  change_direction: function (e) {
    if (e.target.dataset.type == "row") {
      this.setData({
        rotate_value: "rotate(90deg)"
      })
    }
    if (e.target.dataset.type == "col") {
      this.setData({
        rotate_value: "rotate(0deg)"
      })

    }
  },
  //改变移动速度
  change_speed: function (e) {
    if (e.target.dataset.type == "man") {
      this.setData({
        flyDuration: 12000
      })
    } else if (e.target.dataset.type == "nor") {
      this.setData({
        flyDuration: 8000
      })
    } else {
      this.setData({
        flyDuration: 4000
      })
    }
  },
  //改变字体大小
  change_fontSize: function (e) {
    if (e.target.dataset.type == "small") {
      this.setData({
        textFontSize: "100px"
      })
    } else if (e.target.dataset.type == "zhong") {
      this.setData({
        textFontSize: "120px"
      })
    } else if (e.target.dataset.type == "big") {
      this.setData({
        textFontSize: "130px"
      })
    } else if (e.target.dataset.type == "superbig") {
      this.setData({
        textFontSize: "160px"
      })
    }

  },
  //设置文字发光
  change_fontShadow: function (e) {
    if (e.target.dataset.type == "close") {
      this.setData({
        textShadow: ""
      })
    } else {
      var color = e.target.dataset.type;
      this.setData({
        textShadow: "3px 0 20px " + color + ", -3px 0 20px " + color + ", 0 3px 20px " + color + ", 0 -3px 20px " + color + ", 3px 3px 20px " + color + ", -3px -3px 20px " + color + ", 3px -3px 20px " + color + ", -3px 3px 20px " + color
      });
    }
  },
  change_fontColor: function (e) {
    this.setData({
      textColor: e.target.dataset.type
    });
  },
  change_backColor: function (e) {
    this.setData({
      backgroundColor: e.target.dataset.type
    });
  },
  //当前时间
  now_time: function (e) {
    let selectedIndex = e.currentTarget.dataset.selectedIndex;
    this.setData({
      selectedIndex: selectedIndex
    });
    //动画恢复到原位
    // if (this.animation) {
    //   this.animation.translateY(0).step();
    //   this.setData({
    //     //textArr: [], //文字清空的动画效果
    //     animationData: this.animation.export()
    //   });
    // }
    //清除定时器
    // clearInterval(this.data.inter_id);
    // clearInterval(this.data.dao_inter);
    if (this.data.nowtime_id == null) {
      var nowtime_id = setInterval(function () {
        //获取当前时间
        var myDate = new Date();
        myDate.getHours(); //获取当前小时数(0-23)
        myDate.getMinutes(); //获取当前分钟数(0-59)
        myDate.getSeconds(); //获取当前秒数(0-59)
        myDate.getMilliseconds(); //获取当前毫秒数(0-999)
        var str = myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()) + ":" + (myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()) + "." + parseInt(myDate.getMilliseconds() / 100);
        this.setData({
          textArr: str.split(""),
          flyText: str,
          textMarginBottom: '-160rpx'
        });

      }.bind(this), 1000 / 60);
      //设置定时器
      this.setData({
        nowtime_id: nowtime_id
      });

    } else {
      clearInterval(this.data.nowtime_id);
      var str = "请输入您要的文字";
      this.setData({
        nowtime_id: null,
        flyText: str,
        textMarginBottom: '-60rpx'
      });
    }



  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  // 开始闪星星
  beginFlashStar: function (e) {
    let that = this;
    let selectedIndex = e.currentTarget.dataset.selectedIndex;
    this.setData({
      selectedIndex: selectedIndex
    });

    const query = wx.createSelectorQuery()
    query.select('#starCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {

        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        // const dpr = wx.getSystemInfoSync().pixelRatio
       let width = wx.getSystemInfoSync().windowWidth;
       let height = wx.getSystemInfoSync().windowHeight;

        //随机颜色
        var colors = ["yellow", "red", "green", "blue", "white", "black"];

        //创建一个小星星对象
        var star = {
          x: 400, // 中心点x
          y: 400, // 中心点y
          n: 3, //几角
          radius: 100, //凹的顶点离中心距离
          len: 100, //凸的顶点两两之间中点离中心点的距离
          color: "yellow", //颜色
          draw: function () {
            ctx.beginPath();
            //设置是个顶点的坐标，根据顶点制定路径   
            var points = []; //凸出的顶点
            var vertexs = []; //中间临时点
            var points2 = []; // 凹出的顶点
            var offsetAngle = 2 * Math.PI / this.n; //每次偏移的角度
            var bigradius = this.radius + this.len;
            //根据中心点计算出正多边形的顶点
            for (var i = 0; i < this.n; i++) {
              var vertexX = this.x + this.radius * Math.cos(offsetAngle * i);
              var vertexY = this.y + this.radius * Math.sin(offsetAngle * i);
              points.push([vertexX, vertexY]);

              var vertexX2 = this.x + bigradius * Math.cos(offsetAngle * i);
              var vertexY2 = this.y + bigradius * Math.sin(offsetAngle * i);
              vertexs.push([vertexX2, vertexY2]);
            };

            //突出的顶点
            for (var i = 0; i < this.n; i++) {
              var j = i + 1;
              if (j == this.n) {
                j = 0;
              };
              points2.push([(vertexs[i][0] + vertexs[j][0]) / 2.0, (vertexs[i][1] + vertexs[j][1]) / 2.0]);
            };

            //绘制出多边形路径
            for (var i = 0; i < this.n; i++) {
              ctx.lineTo(points[i][0], points[i][1]);
              ctx.lineTo(points2[i][0], points2[i][1]);
            };
            ctx.closePath();
            ctx.lineWidth = "1";
            ctx.fillStyle = this.color //"#F6F152";    
            ctx.fill();
          }
        };

        var starInterId = setInterval(function () {
          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.fillRect(0,0,canvas.width,canvas.height);
          star.n = 5;
          for (var i = 0; i < 3; i++) {
            star.radius = that.randomNum(10, 15);
            star.len = that.randomNum(15, 20);
            star.color = colors[i];
            star.x = that.randomNum(0, height);
            star.y = that.randomNum(0, width);
            star.draw();
          }
        }.bind(this), 100);
      })
  },
  //生成从minNum到maxNum的随机数
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    };
  },
  open_dao: function (e) {
    if (this.data.dao_inter) {
      clearInterval(this.data.dao_inter);
      var str = "请输入您要的文字";
      this.setData({
        dao_inter: null,
        flyText: str,
        textMarginBottom: '-60rpx'
      });
    } else {
      this.setData({
        isShowDao_style: "visible",
        isShowMenu_style: "hidden",
        isShowMenu: false
      })
    }
  },
  start_dao: function () {
    //清除定时器
    //  clearInterval(this.data.nowtime_id);
    //  clearInterval(this.data.dao_inter);
    if (this.data.dao_inter == null) {
      var se = this.data.num * 60;
      var dao_inter = setInterval(function () {
        if (se <= 0) {
          clearInterval(this.data.dao_inter);
          this.setData({
            dao_inter: null,
            textMarginBottom: '-60rpx'
          });
        }
        var str = parseInt(se / (60 * 60)) + ":" + parseInt(se / (60)) + ":" + parseInt(se);
        this.setData({
          dao_inter: dao_inter,
          textArr: str.split(""),
          flyText: str,
          textMarginBottom: '-160rpx'
        });
        se--;
      }.bind(this), 1000)
    } else {
      clearInterval(this.data.dao_inter);
      this.setData({
        dao_inter: null,
        textMarginBottom: '-60rpx'
      });
    }


  },
  //初始化弹幕
  initBarrage: function (flyText) {
    var textArr = flyText.split("");
    var screenHeight = this.data.screenHeight * 1.3; //rpx计算调整位置
    var transYHeight = screenHeight * textArr.length / 5; //px 计算动画移动Y值


    this.setData({
      screenHeight: screenHeight,
      transYHeight: transYHeight,
      textArr: textArr,
    });

    //开始循环执行
    this.barrageAnimation();

    //定时执行
    var inter_id = setInterval(function () {
      this.barrageAnimation();
    }.bind(this), this.data.flyDuration);
    //设置定时器
    this.setData({
      inter_id: inter_id
    })
  },

  //定时器 让弹幕飞起来 
  barrageAnimation: function () {
    //开始弹幕滚动
    if (!this.animation) {
      this.animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'linear'
      });
    }

    //动画恢复到原位
    this.animation.translateY(this.data.screenHeight).step();
    this.setData({
      textArr: [], //文字清空的动画效果
      animationData: this.animation.export()
    });

    //延迟0.1s执行
    setTimeout(function () {
      this.animation.translateY(-this.data.transYHeight).step({
        duration: this.data.flyDuration
      });
      this.setData({
        textArr: this.data.flyText.split(""),
        animationData: this.animation.export()
      });
    }.bind(this), 100);

  },

  //设置弹幕
  formSubmit: function (e) {

    //清除定时器
    // clearInterval(this.data.nowtime_id);
    // clearInterval(this.data.dao_inter);
    var flyText = e.detail.value["flyText"];
    if (flyText) {
      var textArr = flyText.split("");
      var screenHeight = this.data.screenHeight * 1.3; //rpx计算调整位置
      var transYHeight = screenHeight * textArr.length / 5; //px 计算动画移动Y值

      this.setData({
        flyText: flyText,
        screenHeight: screenHeight,
        transYHeight: transYHeight,
        textArr: textArr,
      });

    }
  }

})