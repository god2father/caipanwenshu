//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    menu:[
      {img:'../images/caipan_xingshi_btn_normal@2x.png',title:'刑事案件',link:'../list/list?CaseTypeId=30&title=刑事案件'},
      {img:'../images/caipan_minshi_btn_normal@2x.png',title:'民事案件',link:'../list/list?CaseTypeId=10&title=民事案件'},
      {img:'../images/caipan_xingzheng_btn_normal@2x.png',title:'行政案件',link:'../list/list?CaseTypeId=40&title=行政案件'},
      {img:'../images/caipan_peichang_btn_normal@2x.png',title:'赔偿案件',link:'../list/list?CaseTypeId=20&title=赔偿案件'},
      {img:'../images/caipan_zhixing_btn_normal@2x.png',title:'执行案件',link:'../list/list?CaseTypeId=50&title=执行案件'},
      {img:'../images/caipan_qidai_btn_normal@2x.png',title:'敬请期待',link:''}//link应该改为空
    ],
     
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindCardTap: function() {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  indexAjax:function(){
    var api = getApp().globalData.api; 
    var that = this
    wx.request({
      url: api+'Verdict/GetCaseType', 
      data: {
        code: '1' ,
        time: '1'
      },
      method: 'POST',
      header: {
         'Content-Type': 'application/json;charset=UTF-8;'
      },
      success: function(res) {
        that.setData({  
          indexData:res.data.CaseTypeList   
        })
      },
        fail: function(res) {  
        // fail  
        console.log('fail'+JSON.stringify(res))  
      },
    })
    console.log('onLoad')
   },
  onLoad: function () {
    var that = this
   this.indexAjax()
   wx.login({
     success: function (res) {
       if (res.code) {
         //发起网络请求
         wx.request({
           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx85c1b3a364a12d93&secret=f46cd5927573aacbd11b38fecf0e20d2&js_code=' + res.code + '&grant_type=authorization_code',
           method: "POST",
           success: function (res) {
             var openid = res.data.openid;
             console.log('判决书openid' + openid)
             that.setData({
               openid: openid
             })
             // that.md5(openid)
             // var openid1=res.data.openid
             var paySign = utilMd5.hexMD5('appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111').toUpperCase()
             console.log('md5==========' + paySign)
             that.setData({
               paySign: paySign
             })
           }
         })
       } else {
         console.log('获取用户登录态失败！' + res.errMsg)
       }
     }
   });
  },
  toSearch: function() {
    wx.hideKeyboard(),
    wx.navigateTo({
      url: '../search/search'
    })
  },
    onPullDownRefresh: function () {
        // do somthing
        wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this
        this.indexAjax()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh;
    },
})
 wx.setNavigationBarTitle({
  title: '裁判文书'
})
