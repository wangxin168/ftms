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
    dis:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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