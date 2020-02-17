// pages/fanli_look/fanli_look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lst_id:'',
    lst:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      lst_id:options.lst_id
    })
    wx.setNavigationBarTitle({
      title: options.name
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
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/fanli_detail',
      data: {
        lst_id:that.data.lst_id
      },
      success: res => {
        console.log(res)
        that.setData({
          lst:res.data.data.lst,
          status:res.data.data.status
        })
      }
    });
  },
  kaipiao:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/do_kaipiao',
      data: {
        lst_id:that.data.lst_id
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code==1){
          that.onShow()
        }
      }
    });
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