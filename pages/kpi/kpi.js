// pages/kpi/kpi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'金融类kpi',
    select:false,
    statusBarHeight:'',
    second:[],
    first:'',
    dis:false,
    account_id:wx.getStorageSync('account_id'),
    status:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onGotUserInfo: function (event) {
    var that = this;
    console.log(event)
    let allDatas = event.detail.userInfo
    wx.setStorageSync('userImg', allDatas.avatarUrl);
    wx.setStorageSync('userNames', allDatas.nickName);
    wx.login({
      success: res => {
        // 授权
        wx.request({
          url: getApp().globalData.url + '/api.php/home/api/get_openid_api',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.data.code == 1) {
              wx.setStorageSync('openids', res.data.data.openid);
              wx.setStorageSync('account_id', res.data.data.account_id);
              that.setData({
                openids: wx.getStorageSync('openids')
                
              })
              // 成功之后传头像昵称给后台
              wx.request({
                url: getApp().globalData.url + '/api.php/home/api/save_info',
                data: {
                  account_id: res.data.data.account_id,
                  avatar: allDatas.avatarUrl,
                  nickname: allDatas.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res)
                  that.setData({
                    status:2
                  })
                  that.onShow()
                }
              })
            }else if(res.data.code == 3){
              that.setData({
                status:3
              })
            }else if(res.data.code == 4){
              that.setData({
                status:3
              })
            }
          }
        })
      }
    })
  },
  hide:function(){
    var that=this;
    that.setData({
      select:false
    })
  },
  chuandi:function(e){
    // console.log(e)
    var that=this;
    // console.log(e.currentTarget.dataset.con)
    that.setData({
      content:e.currentTarget.dataset.con,
      select:false
    })
  },
  check_list:function(){
    var that=this;
    that.setData({
      select:!that.data.select
    })
  },
  kpi_detail:function(e){
    // console.log(e)
    wx.navigateTo({
      url: '../kpi_detail/kpi_detail?id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name,
    })
  },
  show:function(){
    var that=this;
    that.setData({
      dis:true
    })
  },
  hide:function(){
    var that=this;
    that.setData({
      dis:false
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
    var that=this;
    that.setData({
      account_id: wx.getStorageSync('account_id')
    })
    if(that.data.account_id!=''){
      that.setData({
        status:2
      })
    }
    that.setData({
      statusBarHeight:wx.getSystemInfoSync()['statusBarHeight']
    })
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/my_kpi',
      data: {
        account_id: wx.getStorageSync('account_id')
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            second:res.data.data.second,
            first:res.data.data.first
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that=this;
    that.setData({
      select:false
    })
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