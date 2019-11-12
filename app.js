//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
    
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
         
          this.globalData.code = res.code;
          console.log("code"+res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
 
      }
    })
    
  },
  globalData: {
    code:'',
    // ip:'http://47.100.178.113:8081',
    // ip:'http://47.103.26.159',
    ip:'https://www.p-and-a.cn',
    userInfo: null,
    pass_id: '',
    insarray:[

    ],

  }
})