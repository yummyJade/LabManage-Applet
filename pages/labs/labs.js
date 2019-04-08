// pages/labs/labs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        title: "这是一个仪器",
        description: "这还是一个仪器",
        num:1
      },
      {
        title: "这是一个仪器",
        description: "这还是一个仪器",
        num:1
      }

    ]

  },
  leftArrowHandle:function(e){
    let index = e.currentTarget.dataset.index;
    let nownum = this.data.array[index].num;
    let array = this.data.array;
    let temp = "array[" + index + "].num";
    //判断是否大于0
    if(nownum > 1){
      this.setData ({
        [temp]: nownum - 1,
      
      })
    }
  

  },
  rightArrowHandle: function (e) {
    let index = e.currentTarget.dataset.index;
    let nownum = this.data.array[index].num;
    let array = this.data.array;
    let temp = "array[" + index + "].num";
    
    //判断是否大于0
   
      this.setData ({
        [temp] : nownum + 1,
      
    })
    


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  instrumentClick: function () {
    wx.navigateTo({
      url: '../appointForm/appointForm',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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