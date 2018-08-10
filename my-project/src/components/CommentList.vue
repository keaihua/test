<template>
    <div class="comment-list">
        <div class="page-title" v-if="comments.length">
            评论
        </div>
        <div class="comment" v-for="comment in comments" :key="comment.id">
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
                    {{comment.phone || '未知型号'}}   
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
  props: ['comments']
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
        background: #eee;
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
            }
        }
        .content{
            margin: 10px 0;
        }
    }
}

</style>
