var title = ''
var caseId =''
Page({
  data:{
    
  },
  onLoad:function(res){
    // 生命周期函数--监听页面加载
       showLoading()
       caseId = res.caseid
     console.log(caseId)
      var api = getApp().globalData.api;
      var that = this
      wx.request({
        url: api+'Verdict/GetCaseDetails', 
        data: {
          code: '1' ,
          time: '1',
          caseId:caseId,
        }, 
        method: 'POST',
        header: {
          'Content-Type': 'application/json;charset=UTF-8;'
        },
        success: function(res) {
          console.log(res.data)
          that.setData({  
            detailsData:res.data.Details,
            caseTime: res.data.Details.RefereeDate.substring(10,0),
           
          })

          // 设置内容
          var content =res.data.Details.DocContent
          if(content!==null&&content!==''){
              var arr = content.split('\r\n');
              arr.shift()
              arr = arr.join('\r\n')
              that.setData({
                 caseTitle:res.data.Details.DocContent.split('\r\n')[0],
                contentDetails:arr
              })
          }else{
            that.setData({
                contentDetails:'内容缺失'
              })
          }
         
           // 设置页面title
           title = res.data.Details.CaseName
            wx.setNavigationBarTitle({
              title:title,
              success: function(res) {
                // success
              }
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
 
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: title, // 分享标题
      desc: '裁判文书网分享', // 分享描述
      path: 'pages/details/details?caseid='+caseId // 分享路径
    }
  }
})
  function showLoading(){
        wx.showToast({
         title: '加载中',
         icon: 'loading'
        });
     }
function cancelLoading(){
        wx.hideToast();
    }