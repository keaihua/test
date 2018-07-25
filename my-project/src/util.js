//工具库
import config from './config'

function get(url, data) { 
    return new Promise(reject, reslove){
    wx.request({
        url: config.host + url,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
           if (res.data.code ==0){
               reslove(res.data)
           }else {
               reject(res.data)
           }
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
        }
    })
    }
}
export default get