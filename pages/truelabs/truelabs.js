// pages/truelabs/truelabs.js
//获取应用实例
const app = getApp()
let page = 1;
let ip = app.globalData.ip;
Page({
  data: {
    IsSearchData: true,
    array: [
     

    ],
    id:'',
    inputdata:'',
    IsAll:false
  },
  //点击弹出新窗口
  toSearchPage: function (e) {
    wx.navigateTo({
      url: '../search/search?inputName=' + this.data.inputdata
    })

    //有可能需要把现在输入框的内容再传递到搜索页

  },
  //事件处理函数
  labClick: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../instruwithid/instruwithid?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //搜索功能触发
  searchClick: function (e) {
    let that = this;
    let content = this.data.inputdata;
    //获得结果
    wx.request({
      url: ip + '/user/FindLabWithName?name=' + content, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.showLoading({
          title: '玩命加载中',
        })
        if (res.data.statu == 1) {
          let array_list = [];
          let obj;
          let len;
          len = res.data.result.length;

          

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

  //获取实验室默认列表
  getLabList: function ({ page:page }) {
    let that = this;
    wx.request({
      url: ip + '/user/LabPage?page=' + page + '&id=' + this.data.id, // 仅为示例，并非真实的接口地址
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
              description: res.data.result[i].department_id

            }
            array_list.push(obj);
          }
          // 设置数据
          that.setData({
            array: array_list
          })
          // 隐藏加载框
          wx.hideLoading();

        } else if (res.data.statu == 0 && res.data.msg == "该页内容为空") {
          that.setData({
            page: that.data.page - 1,
            IsAll: true
          })


      
        }
      }
    })
  },
  onLoad: function () {

    
    //初始化实验室情况

      let obj = {
        page: page
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


    //初始化实验室情况
    let obj = {
      page: page
    }
    this.getLabList(obj);

  },

  onPullDownRefresh: function () {
    page = 1;


    //初始化实验室情况
    let obj = {
      page:page
    }
    this.getLabList(obj);

  }
})
