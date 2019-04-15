// pages/truelabs/truelabs.js
//获取应用实例
const app = getApp()
let page = 1;
let ip = 'http://47.100.178.113:3389';
Page({
  data: {
    IsSearchData: true,
    labName: "",
    array: [
     

    ]
  },
  //事件处理函数
  labClick: function (e) {
    let id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../labs/labs?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //输入实验室名字触发
  labInput: function (e) {
    this.setData({
      labName: e.detail.value
    })
  },
  //搜索功能触发
  searchClick: function (e) {
    let that = this;
    let content = this.data.labName;
    //获得结果
    wx.request({
      url: ip + '/user/FindLabWithName?name=' + content, // 仅为示例，并非真实的接口地址
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
          len = res.data.result.length;

          wx.showLoading({
            title: '玩命加载中',
          })

          for (let i = 0; i < len; i++) {
            obj = {
              id: res.data.result[i].id,
              title: res.data.result[i].name,
              description: res.data.result[i].department_id

            }
            array_list.push(obj);
          }
          //无数据
          if (len == 0) {
            that.setData({
              IsSearchData: false
            })
          } else {
            that.setData({
              IsSearchData: true
            })
          }
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
  getLabList: function ({ head_id, number, id }) {
    let that = this;
    wx.request({
      url: ip + '/user/LabList?head_id=' + head_id + '&' + 'number=' + number + '&id=' + id, // 仅为示例，并非真实的接口地址
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
          wx.showLoading({
            title: '玩命加载中',
          })
          for (let i = 0, len = res.data.labs.length; i < len; i++) {
            obj = {
              id: res.data.labs[i].id,
              title: res.data.labs[i].name,
              description: res.data.labs[i].department_id

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
      }
    })
  },
  onLoad: function (configs) {
    let id = configs.id;


    //前面都是什么
    let number = 5;
    let head_id = (page - 1) * number + 0;
    //初始化实验室情况
    let obj = {
      head_id: head_id,
      number: number,
      id: id
    }
    this.getLabList(obj);



  },
  /**
* 生命周期函数--监听页面隐藏
*/
  onHide: function () {
    getApp().globalData.pass_id = '';

  },
  onReachBottom: function () {
    page = page + 1;
    let number = 5;
    let head_id = (page - 1) * number + 0;
    // let that = this;

    //初始化实验室情况
    let obj = {
      head_id: head_id,
      number: number
    }
    this.getLabList(obj);

  },

  onPullDownRefresh: function () {
    page = 1;
    // wx.showToast({
    //   title: '已经是最新啦',
    //   icon: 'none',
    //   duration: 2000
    // })
    let number = 5;
    let head_id = (page - 1) * number + 0;

    //初始化实验室情况
    let obj = {
      head_id: head_id,
      number: number
    }
    this.getLabList(obj);

  }
})
