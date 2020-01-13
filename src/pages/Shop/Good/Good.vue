<template>
  <div id="goodContainer">
      <div class="leftContainer">
        <ul class="navList">
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
          <li>嘻嘻哈哈们</li>
        </ul>
      </div>
    <div class="rightContainer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'
  export default {
    mounted() {
      new BScroll('.leftContainer',{
        scrollY: true,
        click: true,
        bounceTime: 2000,
      })
    },
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  #goodContainer
    display flex
    overflow hidden
    .leftContainer
      width 80px
      background #f3f5f7
      // calc可以动态地设置样式,在这里动态设置高度 是因为有的手机型号 屏宽一样 但高度不一致,会出现页面样式在不同机型的高度比例不一致,所以动态设高
      height calc(100vh - 224px)
      /* vh, vw 视口单位 1vh=1%视口高度 */

      .navList
        li
          width 100%
          height 50px
          text-align center
          line-height 50px
          position relative
          &:after
            content:''
            width 80%
            height 1px
            background rgba(7,17,27,0.1)
            position absolute
            bottom 0px
            left 10%
    .rightContainer  
      width 295px
      background gray     
  
</style>
