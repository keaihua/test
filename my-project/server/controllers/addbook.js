const https = require('https')
//新增图书
// 1.获取豆瓣信息
// 2. 入库
module.exports = async (ctx) => {
  const {
    isbn,
    openid
  } = ctx.request.body
  console.log(ctx.request.body)
  if (isbn){
      let url = 'https://api.douban.com/v2/book/isbn/' + isbn
      const result = getJSON(url)
  }

}

function getJSON(url) {
  return new Promise((reslove, reject) => {
    https.get(url, res => { 
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
          reslove(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })
}
