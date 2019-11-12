// pages/shoppingcart/shoppingcart.js

//预约成功以后应该把全局变量里相关的项清空
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CheckSum: 0,  //查看现在选择了几项
    IsHasData:false,
    array: [


    ],
    selected:[

    ]

  },
  //选择购物车里的数据项
  chooseInstruments: function () {

    // let array = this.data.array;
    let sum = this.data.CheckSum;
    let array = app.globalData.insarray;
    if (sum == 0) {
      wx.showToast({
        title: '您还未选择任何选项!',
        icon: 'none',
        duration: 1000
      })
      return;

    } else {
      let Ischecked = [];
      for (let i = 0, m = array.length; i < m; i++) {
        if (array[i].checked) {
          Ischecked.push(array[i].id);
      

        }
      }
      let str = JSON.stringify(Ischecked);
     // console.log("str" + str);

      wx.navigateTo({
        url: '../appointForm/appointForm?id=' + str,
      })
     
    }

  },
  instrumentboxChange: function (e) {
    let that = this;
    // let values = e.detail.value;
    let index = e.currentTarget.dataset.index;
    // let order = this.data.array;
    let order = app.globalData.insarray;


    //选中的checked取反
    let checked = order[index].checked;
    order[index].checked = !checked;
    //修改选中数量
    let temp;
    if(!checked){
       temp = this.data.CheckSum + 1
    }else{
       temp = this.data.CheckSum - 1
   
    }
    this.setData({
      CheckSum: temp
    })
 


  },
  //删除选中的项目
  deleteInstruments:function(e){
    let index = e.currentTarget.dataset.index;
    let array = app.globalData.insarray;
    array.splice(index,1);
    //刷新
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let insarray = app.globalData.insarray;
    if(insarray.length != 0){  
      this.setData({ 
        IsHasData:true
      })
    }else{
      this.setData({
        IsHasData: false
      })
    }
    //让所有的项都默认选中
    insarray.forEach((a)=>{
      a.checked = true;
    })
    this.setData({
      array:insarray,
      CheckSum: insarray.length
    })
    

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
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () 
  {
    

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