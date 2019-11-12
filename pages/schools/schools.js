// pages/schools/schools.js
//获取应用实例
const app = getApp();
let page = 1;
let ip = app.globalData.ip;
Page({
  data: {
    IsSearchData: true,
    labName: "",
    array: [
  
    ],
    inputdata:''
  },
  //点击弹出新窗口
  toSearchPage:function(e){
    wx.navigateTo({
      url:'../search/search?inputName='+this.data.inputdata
    })
  },
  //事件处理函数
  schoolClick: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../labswithid/labswithid?id=' + id,
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
    let content = this.data.inputdata;
    //获得结果
    wx.request({
      url: ip + '/user/FindDepartmentWithName?name=' + content, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.showLoading({
          title: '玩命加载中',
        })
        if (res.data.statu == 1 && res.data.result.length != 0) {
          let array_list = [];
          let obj;
          let len;
          
       
         
          
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
        } else if (res.data.result.length == 0){
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
  getSchoolList: function ({ page:page }) {
    let that = this;
    wx.request({
      url: ip + '/user/DepartmentPage?page=' + page , // 仅为示例，并非真实的接口地址
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

        } else if (res.data.statu == 0 && res.data.msg == "该页内容为空") {
          that.setData({
            page: that.data.page - 1,
            IsAll: true,
            IsSearchData: true
          })
        }
      }
      })
   
  },
  onLoad: function () {

    //前面都是什么
    

    //初始化实验室情况
    let obj = {
      page: page
    }
    this.getSchoolList(obj);


  },
  onReachBottom: function () {
    page = page + 1;
    

    //初始化实验室情况
    let obj = {
      page: page
    }
    this.getSchoolList(obj);

  },

  onPullDownRefresh: function () {
    page = 1;
    // wx.showToast({
    //   title: '已经是最新啦',
    //   icon: 'none',
    //   duration: 2000
    // })

    //初始化实验室情况
    let obj = {
      page:page
    }
    this.getSchoolList(obj);

  }
})
