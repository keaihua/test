<template>
    <div class="progressbar">
        <progress :percent="percent" activeColor="#EA5A49" stroke-width="6"/>
        <p>{{year}}已经过去{{days}}天, {{percent}}%</p>     
    </div>    
</template>
<script>
    export default{
      methods: {
        isLeapYear () {
          const year = new Date().getFullYear()
          if (year % 400 === 0) {
            return true
          } else if (year % 4 === 0 & year % 100 !== 0) {
            return true
          } else {
            return false
          }
        },
        getDaysOfYear () {
          return this.isLeapYear() ? 366 : 365
        }
      },
      computed: {
        year () {
          return new Date().getFullYear()
        },
        days () {
          let start = new Date()
          start.setMonth(0)
          start.setDate(1)
          let offset = new Date().getTime() - start.getTime()
          console.log(offset)
          return parseInt(offset / 1000 / 60 / 60 / 24) + 1
        },
        percent () {
          return (this.days / this.getDaysOfYear() * 100).toFixed(1)
        }
      }
    }
</script>
<style lang="scss">
.progressbar{
    width: 100%;
    margin-top: 20px;
     margin-bottom: 40px;
    progress{
    }
    p{
        text-align: center;
    }
}
</style>
