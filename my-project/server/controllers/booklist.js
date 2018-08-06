const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  const {page} = ctx.request.query
  const size = 10
  const book = await mysql('books').select('books.*', 'csessioninfo.user_info')
                                .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
                                .limit(size)
                                .offset(Number(page) * size)
                                .orderBy('books.id', 'desc')
                                
  ctx.state.data = {
    list: book.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nikeName: info.nickName
        }
      })
    })
  }
}
