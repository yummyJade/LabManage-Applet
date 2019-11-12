// pages/appointForm/appointForm.js
import WxValidate from '../../utils/WxValidate.js';
const app = getApp();
let ip = app.globalData.ip;
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
    let that = this;

    // console.log(e);
      // 传入表单数据，调用验证方法
      if (!this.WxValidate.checkForm(params)) {
          const error = this.WxValidate.errorList[0]
          this.showModal(error)
          return false
      }

    wx.showLoading({
      title: '订单提交中',
    })

    let str = "";
    for(let i = 0, m = this.data.ids.length - 1; i < m; i++){
      str += this.data.ids[i] + ' ';
    }
    str += this.data.ids[this.data.ids.length - 1];
   
    wx.request({
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: ip +'/user/ApplyInstrument',
     
      data: {
        email: params.tel,
        text: params.verifycontent,
        name: params.name,
        instrument_id:str,
        openId:app.globalData.code,
        formId:e.detail.formId
      },
      success(res) {
          console.log(res)
      
        if(res.data.statu == 1){
          wx.hideLoading();
          wx.showToast({
            title: '预约提交成功!',
            icon: 'none',
            duration: 2000
          })
          
          let array3 = [];
          let promise = new Promise((resolve, reject) => {
            //操作对应的数组减去已经预约的仪器
            let array1 = app.globalData.insarray;
            let array2 = that.data.ids;
            
            array1.forEach((a) => {
              let c = array2.findIndex(b => a.id === b);
              if (c > -1) delete array2[c];
              else array3.push(a);
            });
            app.globalData.insarray = array3;
           
            resolve();
          })
          promise.then(() => {
            
            //回到上一页并传参
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            prevPage.setData({
              array: array3,
              CheckSum:0
            })
            // wx.navigateBack({
            //   delta: 1,
            // })
   
            //好的先不回上一页
            wx.redirectTo({
              url: '../successpage/successpage',
             
            })
            
          })
          .catch(() => {
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              image: '',
              duration: 0,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
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
    // email: {
    //   required: true,
    //     email: true
    // },
    // verifytitle: {
    //   required: false,
    //     minlength: 1
    // },

    // 不需要的rule
    const rules = {
      name: {
        required: true,
        rangelength: [2, 30]
      },
      tel: {
        required: true,
        tel: true,
      },

      
      verifycontent:{
        required:false,
        rangelength: [1, 300]
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名与申请单位',
        rangelength: '请输入姓名与申请单位',
      },
      email: {
        required: '请输入邮箱',
        email: '请输入正确的邮箱',
      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      verifytitle:{
        required:'请输入申请标题',
        minlength:'请输入申请标题'
      },
      verifycontent:{
        required: '请输入备注',
        rangelength: '请输入备注',
     
      }
  
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
    // console.log(e.detail.value)
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