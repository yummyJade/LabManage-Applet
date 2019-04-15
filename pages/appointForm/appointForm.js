// pages/appointForm/appointForm.js
import WxValidate from '../../utils/WxValidate.js';
let ip = 'http://47.100.178.113:3389';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids:[],
    applicant:'',
    email:'',
    title:'',
    reason:''
    
  },
  formSubmit:function(e){
    const params = e.detail.value

      console.log(params)

      // 传入表单数据，调用验证方法
      if (!this.WxValidate.checkForm(params)) {
          const error = this.WxValidate.errorList[0]
          this.showModal(error)
          return false
      }



    let str;
    for(let i = 0, m = this.data.ids.length; i < m; i++){
      str += this.data.ids[i] + ' ';
    }
    wx.request({
      url: ip +'/user/ApplyInstrument',
      method:'POST',
      data: {
        email: this.data.email,
        title: this.data.title,
        text: this.data.text,
        instrument_id:''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.status == 1){

          wx.showToast({
            title: '预约提交成功!',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate:function(){

    /**
     * 4-2(配置规则)
     */
    const rules = {
      name: {
        required: true,
        rangelength: [2, 4]
      },
      email:{
        required:true,
        email: true
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4个汉字',
      },
      email: {
        required: '请输入邮箱',
        email: '请输入正确的邮箱',
      },
  
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
    /**
     * 也可以自定义验证规则
     */
    this.WxValidate.addMethod('verifytitle', (value, param) => {
      return (value.length >= 1 && value.length <= 20)
    }, '请输入申请标题')
    this.WxValidate.addMethod('verifycontent', (value, param) => {
      return (value.length >= 1 && value.length <= 20)
    }, '请输入申请内容')

   
  },
  handleNameChange:function(e){
    this.setData({
      applicant:e.detail.value
    })
  },
  handleChatChange: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  handleTitleChange: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  handleReasonChange: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ids : JSON.parse(options.id)
    })
    this.initValidate();
  


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})