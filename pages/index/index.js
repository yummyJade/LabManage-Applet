//index.js
//获取应用实例
const app = getApp()
let page = 1;
let ip = 'http://47.100.178.113:3389';
Page({
  data: {
   
  },
  handleSchoolClick:function(){
    wx.navigateTo({
      url: '../schools/schools',
    })
  },
  handleLabClick:function(){
    wx.navigateTo({
      url: '../truelabs/truelabs',
    })
  },
  handleInstrumentClick:function(){
    wx.navigateTo({
      url: '../labs/labs',
    })
  },
  onLoad: function () {


    },
  /**
* 生命周期函数--监听页面隐藏
*/
  onHide: function () {
  
  },
  onReachBottom: function () {
  
    
  },


})
