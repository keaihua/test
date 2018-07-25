<template>
    <div>
        图书列表页 搜也
    </div>
</template>
<script>
    import {get} from '../../util';
    export default {
        async created() {
            const a = await get(demo)
            console.log(a)
        }
    }
</script>
<style>

</style>
