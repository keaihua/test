<template>
    <div class="comment-list">
        <div class="page-title" v-if="comments.length">
            评论
        </div>
        <div class="comment" 
                v-for="comment in comments" 
                :key="comment.id" 
                @click="handleClick(comment)">
            <div class="user">
                <div class="inline">
                    <img :src="comment.image" mode="aspectFit" class="avatar">
                    {{comment.title}}
                </div>
                <div class="right">
                    {{comment.location || '未知地点'}}
                    <span class="text-primary">
                        --
                    </span>
                    <div class="phone000">{{comment.phone || '未知型号'}}</div>
                </div>
            </div>
            <div class="content">
                {{comment.comment}}
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
  props: ['comments','type'],
  methods: {
      handleClick(comment){
          console.log(this.type)
          if (this.type === 'user'){
              wx.navigateTo({
                  url: '/pages/detail/main?id=' + comment.bookid
              })
          }
      }
  }
}
</script>
<style lang="scss">
.comment-list{
    background: #eee;
    font-size: 14px;
    .page-title{
        border-bottom: 1px solid #e3e3e3;
    }
    .comment{
        background: #fff;
        margin-bottom: 10px;
        padding: 5px 20px;
        .user{
            .inline{
                display: inline-block;
                .avatar{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
            .right{
                color:#444;
                .phone000{
                    display: inline-block;
                    max-width: 200px;
                    line-height:100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
			        white-space:nowrap;
                    vertical-align: middle;
                }
            }
        }
        .content{
            margin: 10px 0;
            width: 335px;
        }
    }
}

</style>
