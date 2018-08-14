<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <div class="comment" v-if="showAdd">
            <textarea v-model="comment" 
                    class="textarea" 
                    :maxlength="100"
                    placeholder="请输入图书短评"></textarea>
            <div class="location">
                地理位置：
                <switch color="#EA5149" :checked="locations" @change="getLocation"/>  
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号:
                <switch color="#EA5149" :checked="phone" @change="getPhone"/>  
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">
                评论
            </button>
        </div>
        <div v-else class="text-footer">
            未登录或已评论
        </div>
        <button class="btn" open-type="share">转发给好友</button>
    </div>
</template>
<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  data () {
    return {
      bookid: '',
      info: '',
      comment: '',
      location: '',
      phone: '',
      userinfo: {},
      comments: []
    }
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) {
        return false
      }
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  components: {
    BookInfo,
    CommentList
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.data.title
      })
      this.info = info.data
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.data.list || []
    },
    getLocation (e) {
      const ak = '1qUWcmu6RvokHzi195MdtO72ioYCqCiT'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                location: `${geo.latitude}, ${geo.longitude}`,
                output: 'json',
                ak
              },
              success: res => {
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
          // res.latitude res.longitude
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
        console.log(phoneInfo)
      } else {
        this.phone = ''
      }
    },
    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        location: this.location,
        phone: this.phone
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments()
      } catch (error) {
        showModal('失败', error)
      }
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    console.log(this.showAdd)
  }
}
</script>
<style lang="scss">
.comment{
    font-size: 14px;
    .textarea{
        margin-top: 10px;
        width: 730rpx;
        height: 220rpx;
        background-color: #eee;
        padding: 10px;
    }
    .location{
        margin-top: 10px;
    }
    .phone{
        margin-top: 10px;
    }
    .text-primary{
        color: #ea5149;
      
    }
}
</style>
