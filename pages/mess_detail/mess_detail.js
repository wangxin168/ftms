// pages/mess_detail/mess_detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message_id:'',
    detail:{},
    label:[],
    qust:'',
    wen_da:[],
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      message_id:options.message_id
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
      url: getApp().globalData.url + '/api.php/home/index/message_detail',
      data: {
        message_id: that.data.message_id,
        account_id:wx.getStorageSync('account_id')
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          console.log(res.data.data.detail.links)
          if(res.data.data.detail.links==''){
            that.setData({
              detail:res.data.data.detail,
              label:res.data.data.label,
              wen_da:res.data.data.wen_da,
              images:res.data.data.detail.images
            })
            let contents = res.data.data.detail.contents
            WxParse.wxParse('contents', 'html', contents, that);
          }else {
            that.setData({
              links:res.data.data.detail.links
            })
          }
         
        }
      }
    });
  },
  label_click:function(e){
    wx.navigateTo({
      url: '../fast/fast?label_id='+e.currentTarget.dataset.label_id,
    })
  },
  //图片点击事件
  imgYu:function(event){
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  zan_click:function(e){
    // console.log(e.currentTarget.dataset.question_id)
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/add_zan_qx',
      data: {
        question_id: e.currentTarget.dataset.question_id,
        account_id:wx.getStorageSync('account_id'),
        type:e.currentTarget.dataset.type
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          if(e.currentTarget.dataset.type==1){
            wx.showToast({
              title: '点赞成功',
              icon:'none'
            })
          }else {
            wx.showToast({
              title: '取消点赞成功',
              icon:'none'
            })
          }
          
          that.onShow()

        }
      }
    });
  },
  qust:function(e){
    var that=this;
    that.setData({
      qust:e.detail.value
    })
  },
  fasong:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/add_question',
      data: {
        message_id: that.data.message_id,
        account_id:wx.getStorageSync('account_id'),
        question:that.data.qust
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '发送成功，请耐心等待后台答复',
            icon:'none',
            duration:2000
          })
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