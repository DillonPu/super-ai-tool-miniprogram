function formatDate(value = Date.now(), format = "Y-M-D") {
  const formatNumber = n => `0${n}`.slice(-2);
  const date = new Date(value);
  const formatList = ["Y", "M", "D", "h", "m", "s"];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}

// 获取当前日期的上一个月
function getlastMonth() {
  let now = new Date();
  // 当前月的日期
  let nowDate = now.getDate();
  let lastMonth = new Date(now.getTime());
  // 设置上一个月（这里不需要减1）
  lastMonth.setMonth(lastMonth.getMonth());
  // 设置为0，默认为当前月的最后一天
  lastMonth.setDate(0);
  // 上一个月的天数
  let daysOflastMonth = lastMonth.getDate();
  // 设置上一个月的日期，如果当前月的日期大于上个月的总天数，则为最后一天 
  lastMonth.setDate(nowDate > daysOflastMonth ? daysOflastMonth : nowDate);
  return this.formatDate(lastMonth);
}

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
 function msgTimeFormat(timestamp, index,that) {
  // const that = this;
  //时间戳转变为时间
  let date = timestamp.toString().length == 13 ? new Date(parseInt(timestamp)) : new Date(parseInt(timestamp * 1000));
  let time = '';
  //第一条消息
  if (0 == index){
      that.setData({
        prevFirst : timestamp
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

  let day = Math.floor( (next-prev) / (24*60*60*1000) );
  let minutes = Math.floor((next-prev) / (1000 * 60));
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
      prevFirst : timestamp
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
}

function dateFormatChina(date) {
  return date.getFullYear() + "年" + (date.getMonth()+1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + this.timeAppendZero(date);
}

function timeAppendZero(time) {
  return time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes();
}

module.exports = {
  formatDate: formatDate,
  getlastMonth: getlastMonth,
  timeAppendZero:timeAppendZero,
  dateFormatChina:dateFormatChina,
  msgTimeFormat:msgTimeFormat
}