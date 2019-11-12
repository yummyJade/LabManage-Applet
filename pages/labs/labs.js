// pages/labs/labs.js
// let page = 1;
let app = getApp();
let ip = app.globalData.ip;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CheckSum: 0,    //查看现在选择了几项
    IsSearchData:true,
    array: [
  

    ],
    id:'',
    page:1,
    IsAll:false,
    inputdata: ''  //从search页面传来的和搜索内容有关的信息

  },
  //点击弹出新窗口
  toSearchPage: function (e) {
    wx.navigateTo({
      url: '../search/search?inputName='+ this.data.inputdata
    })

    //有可能需要把现在输入框的内容再传递到搜索页

  },

  //获取仪器列表
  getInstrumentList: function ({ page: page, id: id }){
    let that = this;
    //初始化实验室情况
    wx.request({
      url: ip + '/user/InstrumentPage?page=' + page + '&id=' + id, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
     
        if(res.data.statu == 1){
          let array_list;
          //加进现有数组或 ··· 
          if (that.data.page == 1) {
            array_list = [];
          } else {
            array_list = that.data.array.slice();
          }

          let obj;

          wx.showLoading({
            title: '玩命加载中',
          })


          let result;
          for (let i = 0, len = res.data.result.length; i < len; i++) {
            result = res.data.result[i];
            
            let nowarray = app.globalData.insarray;
            obj = {
              "index":i,
              "id": result.id,
              "number": result.number,
              "name": result.name,
              "model_number": result.model_number,
              "maker": result.maker,
              "type": result.type,
              "lab_id": result.lab_name,
              "is_lend": result.is_lend,
              "checked": false,
              "hasAdd":false

            }
            for (let j = 0, m = nowarray.length; j < m; j++) {
              if (nowarray[j].id == result.id) {
                obj.hasAdd = true;
                obj.checked = true;
                break;
              }
            }
            array_list.push(obj);
          }
          // 设置数据
          that.setData({
            array: array_list,
            IsAll: false
          })
          // 隐藏加载框
          wx.hideLoading();

        } else if (res.data.statu == 0 && res.data.msg == "该页内容为空") {
          that.setData({
            page: that.data.page - 1,
            IsAll:true
          })
         

        }
  
        }
    })
        
  },

  //搜索功能触发
  searchClick: function (e) {
    let that = this;
    let content = this.data.inputdata;
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
            //应该遍历一下已选择的项
            let nowarray = app.globalData.insarray;
            result = res.data.result[i];
            obj = {
              "index": i,
              "id": result.id,
              "number": result.number,
              "name": result.name,
              "model_number": result.model_number,
              "maker": result.maker,
              "type": result.type,
              "lab_id": result.lab_id,
              "is_lend": result.is_lend,
              "checked": false,
              "hasAdd": false
            }
            for (let j = 0, m = nowarray.length; j < m; j++) {
              if(nowarray[j].id == result.id){
                obj.hasAdd = true;
                break;
              }
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
    //只添加未加入购物车的

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

        if (array[i].checked && !array[i].hasAdd) {
          Ischecked.push(array[i]);
          array[i].hasAdd = true;
        
        }
      }


      //给全局变量赋值
      getApp().globalData.insarray.push(...Ischecked);

      wx.showToast({
        title: '添加进购物车成功!',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        inputdata:""
      })
      this.onLoad();
      
    }

  },
  instrumentboxChange: function (e) {
    //不可租借状态不可选择
    //已经选过的不可选择
    let that = this;
    // let values = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let order = this.data.array;
    
    // let order = app.globalData.insarray;
    let hasAdd = order[index].hasAdd;
    //如果已经加入购物车
   
    if(hasAdd){
      wx.showToast({
        title: '该设备已在购物车中，操作无效!',
        icon: 'none',
        duration: 1000
      })
      order[index].checked = true;
      that.setData({
        array:order
      })
      return;
    }
    //如果是不可租借的状态
    if (order[index].is_lend) {
      wx.showToast({
        title: '该设备无法租借，操作无效!',
        icon: 'none',
        duration: 1000
      })
    
      order[index].checked = false;
      that.setData({
        array: order
      })
      return
    }
    //选中的checked取反
    let checked = order[index].checked;
    order[index].checked = !checked;
    //修改选中数量
    let temp;
    if (!checked) {
      temp = this.data.CheckSum + 1
    } else {
      temp = this.data.CheckSum - 1

    }
    this.setData({
      CheckSum: temp
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(this.data.array)
    this.setData({
      CheckSum:0
    })
    //初始化实验室情况
      let obj = {
        page: this.data.page
      }
      this.getInstrumentList(obj);
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
    this.data.page = 1;
    //前面都是什么
    

    //初始化实验室情况
    let obj = {
      page: page,
      id: id
    }
    this.getInstrumentList(obj);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let temp = this.data.page + 1;
    let id = this.data.id;
    this.setData({
      page: temp
    })


    //初始化实验室情况
    let obj = {
      page: temp,
      id:id
    }
    this.getInstrumentList(obj);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})