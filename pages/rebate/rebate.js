// pages/rebate/rebate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    select:false,
    statusBarHeight:'',
    hexiao:[],
    account_id:wx.getStorageSync('account_id'),
    status:1,
    types:[]
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
    that.onShow()
  },
  check_list:function(){
    var that=this;
    that.setData({
      select:!that.data.select
    })
  },
  kpi_detail:function(){
    wx.navigateTo({
      url: '../kpi_detail/kpi_detail',
    })
  },
  fanli_detail:function(e){
    // console.log(e)
    var that=this;
    if(that.data.content==''){
      // var user_type=that.data.types[0]
      var user_type=''
    }else{
      var user_type=that.data.content
    }
    wx.navigateTo({
      url: '../fanli_detail/fanli_detail?word1='+e.currentTarget.dataset.word1+'&name='+e.currentTarget.dataset.name+'&user_type='+user_type,
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
      url: getApp().globalData.url + '/api.php/home/index/my_hexiao',
      data: {
        account_id: wx.getStorageSync('account_id'),
        user_type:that.data.content
      },
      success: res => {
        console.log(res)
        that.setData({
          hexiao:res.data.data.dataarr,
          types:res.data.data.types
        })
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