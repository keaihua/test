<template>
    <div class="book-card">
        <div class="thumb">
            <img :src="book.image" class="image" mode="aspectFit">
        </div>
        <div class="detail">
            <div class="row row-red">
                <div class="left">
                    {{book.title}}
                </div>
                <div class="right">
                    {{book.rate}} <Rate :value="book.rate"></Rate>
                </div>
            </div>
             <div class="row">
                <div class="left">
                    {{book.author}}
                </div>
                <div class="right">
                    浏览量：
                </div>
            </div>
             <div class="row">
                <div class="left">
                    {{book.publisher}}
                </div>
                <div class="right">
                    添加人
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Rate from "@/components/Rate";

export default {
  props: ["book"],
  components: {
    Rate
  }
};
</script>
<style lang="scss">
.book-card {
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  .thumb {
    width: 90px;
    height: 90px;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    margin-left: 100px;
    .row {
      display: flex;
      justify-content: space-between;
      line-height: 20px;
      .left {
      }
      .right {
        margin-right: 20px;
      }
    }
    .row-red{
          color: #EA5149;
      }
  }
}
</style>
