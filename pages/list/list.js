var page = '1'
var CaseTypeId=''
var key = ''
var list=[]
var moreList

Page({
  data: {

  },
  getList:function(CaseTypeId,page){//获得列表
      var api = getApp().globalData.api;
      var page = page
      var that = this
      var caseTypeId = CaseTypeId
      showLoading()
      wx.request({
        url: api+'Verdict/GetCaseList', 
        data: {
          code: '1' ,
          time: '1',
          caseTypeId:CaseTypeId,
          page:page,
          key:key
        }, 
        method: 'POST',
        header: {
          'Content-Type': 'application/json;charset=UTF-8;'
        },
        success: function(res) {
            console.log(res.data)
            list = res.data.CaseList
          //   for(var i=0;i<list.length;i++){
          //   list[i].RefereeDate = list[i].RefereeDateStr
          //   list[i].CaseName = list[i].CaseName
          //   list[i].CourtName = list[i].CourtName
          //   list[i].CaseNo = list[i].CaseNo
          // }
          that.setData({  
            listData:list  
          })
       cancelLoading()
        },
          fail: function(res) {  
          // fail  
           cancelLoading()
          console.log('fail'+JSON.stringify(res))  
        },
      })
  },
  getMoreList:function(CaseTypeId,page){//获得更多列表
     var api = getApp().globalData.api;
      var page = page
      var that = this
      var caseTypeId = CaseTypeId
       showLoading()
      wx.request({
        url: api+'Verdict/GetCaseList', 
        data: {
          code: '1' ,
          time: '1',
          caseTypeId:CaseTypeId,
          page:page,
           key:key
        }, 
        method: 'POST',
        header: {
          'Content-Type': 'application/json;charset=UTF-8;'
        },
        success: function(res) {
          console.log('列表数量'+res.data.CaseList.length)
          if(res.data.CaseList.length!==0){
             console.log(res.data)
             moreList = res.data.CaseList
             list = list.concat(moreList)
          //  console.log(JSON.stringify(list))
              that.setData({  
                 listData:list,
              })
          }else{
            wx.showToast({
              title: '没有更多了',
              icon: 'success',
              duration: 2000
            })
          }
           
        },
          fail: function(res) {  
          // fail  
           cancelLoading()
          console.log('fail'+JSON.stringify(res))  
        },
      })
  },
   onLoad: function (res) {
     var that = this
     
      CaseTypeId = res.CaseTypeId
      key = res.key
      console.log(key)
        wx.setNavigationBarTitle({ // 设置页面title
        title: res.title+'列表',
        success: function(res) {
          // success
        }
      })
      this.getList(CaseTypeId,page)
   
   },
     toSearch: function() {
       console.log('search')
     wx.hideKeyboard(),
     wx.navigateTo({
      url: '../search/search'
        })
      },
     onPullDownRefresh: function () {//下拉刷新
        // do somthing
        wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this
        page='1'
        // console.log(CaseTypeId)
        this.getList(CaseTypeId,page)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh;
    },
    // 上拉加载回调接口
    onReachBottom: function () {
        page++
        // 网络请求
        console.log('page==='+page)
        this.getMoreList(CaseTypeId,page)
    },
})
//时间戳转日期
function getLocalTime(data) {
    var date = new Date(data*1000);
    var Y = date.getFullYear() + '.';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate() ;
    var h = date.getHours()<10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes() ;
    var s = date.getSeconds();
    return date=Y+M+D;
}
  function showLoading(){
    var that = this
        wx.showToast({
         title: '加载中',
         icon: 'loading'
        });
         
     }
function cancelLoading(){
  var that = this
        wx.hideToast();
       
     }