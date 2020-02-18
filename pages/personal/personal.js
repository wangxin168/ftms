// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
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
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/my_userinfo',
      data: {
        account_id:wx.getStorageSync('account_id'),
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            detail:res.data.data
          })
        }
      }
    });
  },
  huifu:function(){
    wx.navigateTo({
      url: '../huifu/huifu',
    })
  },
  fanli:function(){
    wx.navigateTo({
      url: '../fanli/fanli',
    })
  },
  know:function(){
    wx.navigateTo({
      url: '../know/know',
    })
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