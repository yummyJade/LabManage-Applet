// pages/schools/schools.js
//index.js
//获取应用实例
const app = getApp();
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
  schoolClick: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../truelabs/truelabs?id=' + id,
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
      url: ip + '/user/FindDepartmentWithName?name=' + content, // 仅为示例，并非真实的接口地址
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
          
          for (let i = 0, len = res.data.result.length; i < len; i++) {
       
            obj = {
              id: res.data.result[i].id,
              title: res.data.result[i].name,
             

            }
          
            array_list.push(obj);
          }
    
            that.setData({
              IsSearchData: true
            })
          
          // 设置数据
          that.setData({
            array: array_list
          })

          // 隐藏加载框
          wx.hideLoading();
        } else if (res.data.statu == 0 && res.data.msg == "查无此学院"){
          let array_list = [];
          that.setData({
            IsSearchData: false
          })
          // 设置数据
          that.setData({
            array: array_list
          })
        }
      }
    })

  },
  getLabList: function ({ head_id, number }) {
    let that = this;
    wx.request({
      url: ip + '/user/DepartmentList?head_id=' + head_id + '&' + 'number=' + number, // 仅为示例，并非真实的接口地址
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
          for (let i = 0, len = res.data.result.length; i < len; i++) {
            obj = {
              id: res.data.result[i].id,
              title: res.data.result[i].name,
              

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
  onLoad: function () {

    //前面都是什么
    let number = 5;
    let head_id = (page - 1) * number + 0;

    //初始化实验室情况
    let obj = {
      head_id: head_id,
      number: number
    }
    this.getLabList(obj);


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
