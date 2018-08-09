<template>
    <div>
<<<<<<< HEAD
        <TopSwiper :tops="tops"></TopSwiper>
        <Card v-for='book in books' :key='book.id' :book='book'>
            {{book.title}}
        </Card>
        <p class="text-footer" v-if="!more">
            没有更多数据
        </p>
    </div>
</template>
<script>
import { get } from "@/util";
import Card from "@/components/Card";
import TopSwiper from "@/components/TopSwiper";

export default {
  components: {
    Card,
    TopSwiper
  },
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    };
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const book = await get("/weapp/booklist", {page: this.page});
      if (book.data.list.length < 10 && this.page > 0) {
        this.more = false;
      }
      if (init) {
        this.books = book.data.list;
        wx.stopPullDownRefresh();
      } else {
        this.books = this.books.concat(book.data.list);
      }
      wx.hideNavigationBarLoading();
    },
    async getTop(){
        const tops = await get('/weapp/top')
        this.tops = tops.data.list
    }

  },
  mounted() {
    this.getList(true);
    this.getTop()
  },
  onPullDownRefresh() {
    this.getList(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page = this.page + 1;
    this.getList();
    this.getTop()

  }
};
=======
        <Card v-for='book in books' :key='book.id' :book='book'>
            {{book.title}}
        </Card>
    </div>
</template>
<script>
import { get } from '@/util'
import Card from '@/components/Card'
export default {
    components: {
      Card  
    },
    data(){
        return {
            books: []
        }
    },
    methods: {
        async getList () {
            const book = await get('/weapp/booklist')
            this.books = book.data.list
        }
    },
    mounted() {
        this.getList()
    }
}
>>>>>>> 68ad6905fcaaaad74606e8613b53f96b25570334
</script>
<style lang="scss">
.text-footer {
  text-align: center;
  font-size: 12px;
}
</style>

