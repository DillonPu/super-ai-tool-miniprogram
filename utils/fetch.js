//封装wx.request()网络模块
module.exports = (url, methods, datas) => {
  let p = new Promise((resolve, reject) => {
    let type;
    let data;
    let method;
    if (methods === 'POST_F') { // 表单提交，这里可以对请求的数据进行封装，普通post不需要这步操作
      type = 'multipart/form-data; boundary=XXX';
      let result = ''
      for (let name of Object.keys(datas)) {
        let value = datas[name];
        result +=
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
          '\r\n' +
          '\r\n' + value
      }
      result += '\r\n--XXX--'
      data = result;
      method = 'POST';
    } else {
      type = 'application/json';
      data = datas;
      method = methods;
    }
    wx.request({
      url,
      method,
      data,
      header: {
        Authorization:"Bearer "+wx.getStorageSync('token') || "",// 登录后获取的token
        'content-type': type // 默认值
      },
      success(res) {
        let result = res // 这里返回数据自定义返回需要的部分就可以了
        if (result.data.code === 401) { // 这里可以对请求的状态进行判断，做出相应的动作，登录过期，去登陆
          wx.removeStorageSync('token')
          wx.removeStorageSync('wxUserInfo')
          return wx.showModal({
            title: '温馨提示',
            content: '您当前还未登录或登录已过期，为了更好的体验请先授权登录',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                return wx.switchTab({
                  url: '/pages/my/my', // 点击确定去登陆
                })
              }
              if(res.cancel){
                wx.showToast({
                  title: '您未登录，为了更好的体验请先登录',
                  icon:"none"
                })
              }
            }
          })
        }else if(result.data.code===10001){
          wx.showModal({
            title: '温馨提示',
            content: '您当前积分余额不足，去个人中心赚取积分',
            complete: (res) => {
              if (res.confirm) {
                return wx.switchTab({
                  url: '/pages/my/my', 
                })
              }
            }
          })
        }else if(result.data.code===500){
          wx.showToast({
            title: result.data.msg,
            icon:"error"
          })
        }
        resolve(result.data)
      },
      fail(err) { // 请求失败后判断状态码，如果是登录问题就去登录
       wx.showToast({
         title: '网络异常，请求失败!',
       })
        reject(err)
      }
    })
  })
  return p;
}