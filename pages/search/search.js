
//获取应用实例
var WxSearch = require('../wxSearch/wxSearch.js')
var key
var app = getApp()
Page({
  data: {
    wxSearchData:{
      view:{
        isShow: true
      }
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['刑事案件','民事案件','行政案件','赔偿案件','执行案件']);
    WxSearch.initMindKeys(['刑事案件','民事案件','行政案件','赔偿案件','执行案件']);
  },
  wxSearchFn: function(e){
    var that = this
    var keyWord = that.data.wxSearchData.value
    if(keyWord!=''){
     wx.redirectTo({
      url: '../list/list?key='+keyWord+'&title='+keyWord
    })
    }
   
    WxSearch.wxSearchAddHisKey(that);
    
  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    
    console.log(e.target.dataset.key)
    var keyWord = e.target.dataset.key
      if(keyWord!=''){
     wx.redirectTo({
      url: '../list/list?key='+keyWord+'&title='+keyWord
    })
    }
    WxSearch.wxSearchKeyTap(e,that);
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})