// pages/instruwithid/instruwithid.js
let page = 1;
let ip = 'http://47.100.178.113:3389';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CheckSum: 0,
    instrumentName: "",
    IsSearchData: true,
    array: [


    ],
    IsChecked: [

    ]

  },

  getInstrumentList: function ({ id }) {
    let that = this;
    //初始化实验室情况
    wx.request({
      url: ip + '/user/InstrumentList?id=' + id, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let array_list = [];
        let obj;

        wx.showLoading({
          title: '玩命加载中',
        })


        let result;
        for (let i = 0, len = res.data.result.length; i < len; i++) {
          result = res.data.result[i];
          obj = {
            "id": result.id,
            "number": result.number,
            "name": result.name,
            "model_number": result.model_number,
            "maker": result.maker,
            "type": result.type,
            "lab_id": result.lab_id,
            "is_lend": result.is_lend,
            "checked": false

          }
          array_list.push(obj);
        }
        // 设置数据
        that.setData({
          array: array_list
        })
        // 隐藏加载框
        wx.hideLoading();

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id;
    // console.log(id);

    //前面都是什么
    let number = 5;
    let head_id = (page - 1) * number + 0;

    //初始化实验室情况
    let obj = {
      id: id
    }
    this.getInstrumentList(obj);




  },
  //输入实验室名字触发
  instrumentInput: function (e) {
    this.setData({
      instrumentName: e.detail.value
    })
  },
  //搜索功能触发
  searchClick: function (e) {
    let that = this;
    let content = this.data.instrumentName;
    //获得结果
    wx.request({
      url: ip + '/user/FindInstrumentWithName?name=' + content, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.statu == 1) {
          let array_list = [];
          let obj;
          let len;
          let result;
          len = res.data.result.length;

          wx.showLoading({
            title: '玩命加载中',
          })

          for (let i = 0; i < len; i++) {
            result = res.data.result[i];
            obj = {
              "id": result.id,
              "number": result.number,
              "name": result.name,
              "model_number": result.model_number,
              "maker": result.maker,
              "type": result.type,
              "lab_id": result.lab_id,
              "is_lend": result.is_lend,
              "checked": false
            }
            array_list.push(obj);
          }

          if (len == 0) {
            that.setData({
              IsSearchData: false
            })
          } else {
            that.setData({
              IsSearchData: true
            })
          }
          console.log(that.data.IsSearchData);
          // 设置数据
          that.setData({
            array: array_list

          })

          // 隐藏加载框
          wx.hideLoading();
        }
      }
    })

  },
  chooseInstruments: function () {

    let array = this.data.array;
    let sum = this.data.CheckSum;
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
      console.log(Ischecked)
      let str = JSON.stringify(Ischecked);

      wx.navigateTo({
        url: '../appointForm/appointForm?id=' + str,
      })
    }

  },
  instrumentboxChange: function (e) {

    let that = this;
    let values = e.detail.value;
    let order = this.data.array;
    for (let i = 0, m = order.length; i < m; i++) { //将所有checkbox赋值为false
      order[i].checked = false;
    }
    this.setData({
      CheckSum: 0
    })
    for (let i = 0, m = values.length; i < m; i++) {
      let value = values[i] - 1;
      order[value].checked = true;
      let temp = this.data.CheckSum + 1
      this.setData({
        CheckSum: temp
      })

    }
    // console.log(this.data.array);





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
    getApp().globalData.pass_id = '';

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
    // page = 1;
    // //前面都是什么
    // let number = 5;
    // let head_id = (page - 1) * number + 0;

    // //初始化实验室情况
    // let obj = {
    //   head_id: head_id,
    //   number: number
    // }
    // this.getInstrumentList(obj);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // page = page + 1;
    // let number = 5;
    // let head_id = (page - 1) * number + 0;
    // // let that = this;

    // //初始化实验室情况
    // let obj = {
    //   head_id: head_id,
    //   number: number
    // }
    // this.getInstrumentList(obj);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})