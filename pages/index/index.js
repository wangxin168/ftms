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
    cate_id:'',
    currentTab:0,
    account_id:wx.getStorageSync('account_id'),
    status:1,
    statusBarHeight:''
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
  cate_check:function(e){
    var that=this;
    // console.log(e)
    that.setData({
      currentTab:e.currentTarget.dataset.index,
      cate_id:e.currentTarget.dataset.cate_id
    })
    that.xuanran();
  },
  check_list:function(){
    var that=this;
    that.setData({
      select:!that.data.select
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
  label_click:function(e){
    wx.navigateTo({
      url: '../fast/fast?label_id='+e.currentTarget.dataset.label_id,
    })
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
      account_id: wx.getStorageSync('account_id')
    })
    that.xuanran();
    that.setData({
      statusBarHeight:wx.getSystemInfoSync()['statusBarHeight']
    })
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
  xuanran(){
    var that=this;
    // console.log(that.data.account_id)
    if(that.data.account_id!=''){
      that.setData({
        status:2
      })
    }
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/shouye',
      data: {
        account_id: wx.getStorageSync('account_id'),
        jin_time:that.data.jin_time,
        cate_id:that.data.cate_id,
        start_time:that.data.date1,
        end_time:that.data.date2
        // activity_id: that.data.activity_id
      },
      success: res => {
        console.log(res)
        // console.log(that.data.account_id)
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
  more:function(){
    var that=this;
    wx.navigateTo({
      url: '../more_news/more_news'
    })
  },
  message_detail:function(e){
    var that=this;
    wx.navigateTo({
      url: '../mess_detail/mess_detail?message_id='+e.currentTarget.dataset.message_id
    })
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