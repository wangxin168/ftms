// pages/fanli_detail/fanli_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['进行中','已完成'],
    shopitem:'进行中',
    status:'1',
    word1:'',
    lst:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      word1:options.word1
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
  },
  bindshop:function(event){
    // console.log(event)
    var classify = event.currentTarget.dataset.classify;
    var that = this;
 
    // console.log(classify)  //输出的结果就是你点击的
    if(classify=='进行中'){
      that.setData({
        status:'1'
      })
      that.onShow()
    }else if(classify=='已完成'){
      that.setData({
        status:'2'
      })
      that.onShow()
    }
    this.setData({
      shopitem: classify,  //更新
    })
    
  },
  jindu:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../hexiao_jindu/hexiao_jindu?lst_id='+e.currentTarget.dataset.lst_id,
    })
  },
  fanli_look:function(e){
    wx.navigateTo({
      url: '../fanli_look/fanli_look?lst_id='+e.currentTarget.dataset.lst_id+'&name='+e.currentTarget.dataset.name,
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
      url: getApp().globalData.url + '/api.php/home/index/show_lst',
      data: {
        account_id: wx.getStorageSync('account_id'),
        status:that.data.status,
        word1:that.data.word1
      },
      success: res => {
        console.log(res)
        that.setData({
          lst:res.data.data.lst
        })
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