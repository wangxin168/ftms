// pages/fanli/fanli.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: '',
    total_money: '',
    array:[],
    index:'',
    usertype:'',
    select:false,
    types:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindPickerChange: function(e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      year:that.data.array[e.detail.value]
    })
    that.xuanran();
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
      usertype:e.currentTarget.dataset.con,
      select:false
    })
    that.xuanran();
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var DATE = date.getFullYear();
    that.setData({
      year: date.getFullYear()
    })
    that.xuanran();
  },
  xuanran:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/my_fanli',
      data: {
        account_id: wx.getStorageSync('account_id'),
        year: that.data.year,
        user_type: that.data.usertype
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            total_money: res.data.data.total_money,
            array:res.data.data.yy,
            types:res.data.data.types
          })
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