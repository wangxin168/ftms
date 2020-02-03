// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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