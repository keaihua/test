const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        openid,
        bookid,
        comment,
        location,
        phone
    } = ctx.request.body
    try {
        await mysql('comments').insert({openid, bookid, comment, location, phone})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (error) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败' + error.message
            }
        }
    }
}
