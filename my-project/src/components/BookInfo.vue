<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" :src="info.image" alt="" mode="aspectFill" >
            <img class="img" :src="info.image" alt="" mode="aspectFit" >
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}
                </div>
            </div>
        </div>
        <div class="detail">
            <image class="avator" :src="userinfo.image" mode="aspectFit" />
            {{userinfo.nickName}}
            <div class="right text-primary">
            {{info.rate}}分 <Rate :value="info.rate"></Rate>
            </div>      
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
            {{info.price}}
            </div>   
        </div>
    </div>
</template>
<script>
import Rate from "@/components/Rate"
export default {
  props: ["info"],
  computed: {
      userinfo(){
          return this.info.user_info || {}
      }
  },
  components: {
      Rate
  }
};
</script>
<style lang="scss">
.bookinfo {
    font-size: 14px;
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    .back {
      filter: blur(15px);
      width: 100%;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info {
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      color: #fff;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
  .detail{
      padding: 5px 10px;
      .right{
          float: right;
      }
      .avator{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          vertical-align: middle;
      }
      .text-primary{
          color: #EA5149;
      }
  }
}
</style>
