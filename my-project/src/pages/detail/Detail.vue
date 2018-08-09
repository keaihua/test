<template>
    <div>
        <BookInfo :info="info"></BookInfo>
    </div>
</template>
<script>
import {get} from "@/util"
import BookInfo from "@/components/BookInfo"

export default {
    data () {
        return {
            bookid: '',
            info: ''
        }
    },
   components: {
       BookInfo
   },
    methods: {
        async getDetail(){
            const info = await get('/weapp/bookdetail', {id: this.bookid})
            wx.setNavigationBarTitle({
                title: info.data.title
            })
            this.info = info.data
        }
    },
    mounted() {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
    }
}
</script>
<style lang="scss">

</style>
