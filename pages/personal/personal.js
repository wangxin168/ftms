// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    account_id:wx.getStorageSync('account_id'),
    status:1,
    mobile:'',
    shop_code:'',
    // 是否登录
    login_type:0,
    login_is:''
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
                  // 如果等于0就是没有登录
                  if(wx.getStorageSync('login_is')==0){
                    // 让登录框显示
                    that.setData({
                      login_type:1
                    })
                  }else{
                    that.setData({
                      status:2
                    })
                    that.onShow()
                  }
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
      account_id: wx.getStorageSync('account_id'),
      login_is:wx.getStorageSync('login_is')
    })
    if(that.data.account_id!=''){
      that.setData({
        status:2
      })
      console.log(wx.getStorageSync('login_is'))
      if(wx.getStorageSync('login_is')==0){
        // 让登录框显示
        that.setData({
          login_type:1
        })
      }
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
  phone:function(e){
    var that=this;
    that.setData({
      mobile:e.detail.value
    })
  },
  shop_code:function(e){
    var that=this;
    that.setData({
      shop_code:e.detail.value
    })
  },
  login:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/user_login',
      data: {
        account_id: wx.getStorageSync('account_id'),
        mobile:that.data.mobile,
        shop_code:that.data.shop_code
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title:res.data.msg,
          icon:'none'
        })
        if (res.data.code == 1) {
          wx.setStorageSync('login_is', 1);
          wx.setStorageSync('phone', that.data.mobile);
          wx.setStorageSync('shop_code', that.data.shop_code);
          that.onShow();
          that.setData({
            login_type:0,
          })
          
        }
      }
    });
  },
  denglu:function(){
    var that=this;
    that.setData({
      login_type:1
    })
  },
  close:function(){
    var that=this;
    that.setData({
      login_type:0,
      status:5
    })
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
  tuichu:function(){
    var that=this;
    wx.removeStorageSync('login_is');
    wx.showToast({
      title: '退出当前账号成功',
      icon:'none'
    })
    that.onShow();
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