<template>
  <div id="app">
    <h2>hello,web</h2>
    <div class="noAdaptiv">我不是适配</div>
    <div class="haveAdaptive">我不是适配</div>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="stylus">
@import './common/stylus/mixins.styl'
#app
  background $yellow
  font-size 30px
  .noAdaptiv
    width 750px
    height 100px
    background #8f7d6e
  .haveAdaptive
    width 10rem
    height 100px
    background $green
</style>
