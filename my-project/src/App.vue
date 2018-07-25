<script>
    import {get} from '../../util';
    export default {
        async created() {
            const a = await get('/weapp/demo')
        }
    }
</script>
<style>

</style>
