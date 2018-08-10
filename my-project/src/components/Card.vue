<template>
    <a :href="detailUrl">
    <div class="book-card">
        <div class="thumb" @click.stop="preview">
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
                    浏览量：{{book.count}}
                </div>
            </div>
             <div class="row">
                <div class="left">
                    {{book.publisher}}
                </div>
                <div class="right">
                    {{book.user_info.nikeName}}
                </div>
            </div>
        </div>
    </div>
    </a>
</template>
<script>
import Rate from '@/components/Rate'

export default {
  props: ['book'],
  components: {
    Rate
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  }
}
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
    .row-red {
      color: #ea5149;
    }
  }
}
</style>