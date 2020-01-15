// pages/kpi/kpi.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:false,
    content:'金融信息',
    adv:[],
    date1:'',
    date2:'',
    time:['自定义','近1月','近3月','近半年'],
    index:'',
    jin_time:1,
    jin_con:'近1月',
    cate:[],
    message:[],
    cate_id:''
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
  check_list:function(){
    var that=this;
    that.setData({
      select:true
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
  bindDateChange1: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value,
      jin_time:0,
      jin_con:'自定义'
    })
    that.checkDate(that.data.date1,that.data.date2);
  },
  bindDateChange2: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value,
      jin_time:0,
      jin_con:'自定义'
    })
    that.checkDate(that.data.date1,that.data.date2);
  },
  checkDate: function (startTime, endTime) {
    var that=this;
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "-"));
    var end_date = new Date(endTime.replace(/-/g, "-"));
    //转成毫秒数，两个日期相减
    var ms = end_date.getTime() - start_date.getTime();
    //转换成天数
    var day = parseInt(ms / (1000 * 60 * 60 * 24));
    //do something
    console.log("day = ", day);
    if(day!=NaN&&day>=0){
      that.xuanran();
    }else if(day<0){
      wx.showToast({
        title: '请调整时间',
        icon:'none'
      })
    }
  },
  bindPickerChange: function(e) {
    var that=this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      jin_time:e.detail.value,
      date1:'',
      date2:''
    })
    that.xuanran();
  },
  cate_click:function(e){
    var that=this;
    that.setData({
      cate_id:e.currentTarget.dataset.cate_id
    })
    that.xuanran();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    var DATE = util.formDate(new Date());

    that.setData({
      date: DATE,
    });
    wx.setStorageSync('account_id', 1);
    that.xuanran();
  },
  xuanran(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/shouye',
      data: {
        account_id: wx.getStorageSync('account_id'),
        jin_time:that.data.jin_time,
        cate_id:that.data.cate_id
        // activity_id: that.data.activity_id
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            adv: res.data.data.adv,
            cate:res.data.data.cate,
            message:res.data.data.message
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