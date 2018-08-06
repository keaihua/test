<template>
    <div class="container">
        <div class="userinfo" @click="login" >
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>    
        <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
    </div>
</template>
<script>
import YearProgress from '@/components/YearProgress/YearProgress'
import { showSuccess, post, showModal } from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'

export default {
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  components: {
    YearProgress
  },
  methods: {
    scanBook () {
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
            if (res.result) {
                this.addBook(res.result)
            }
        }
      })
    },
    async addBook (isbn) {
        const res = await post('/weapp/addbook', {
            isbn,
            openid: this.userinfo.openId
        })
        if (res.code == 0 && res.data.title){
            showModal('添加成功', `${res.data.title}添加成功`)
        }
    },
    login () {
      var user = wx.getStorageSync('userinfo')
      const self = this
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userinfo) {
            qcloud.request({
              url: config.userUrl,
              login: true,
              success (res) {
                wx.setStorageSync('userinfo', res.data.data)
                showSuccess('登录成功')
                self.userinfo = userinfo
              }
            })
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    }
  },
  created () {
     this.userinfo = wx.getStorageSync("userinfo");
  },
  onshow () {
    if (wx.getStorageSync('userinfo')) {
        this.userinfo = wx.getStorageSync('userinfo')
        console.log(this.userinfo)
    }
  }
}
</script>
<style lang="scss">
.container {
  padding: 0 30rpx;
  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
    }
  }
  YearProgress {
    height: 20px;
  }
}
</style>
