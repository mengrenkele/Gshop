<template>
  <div id="shopContainer">
      <ShopHeader />
      <div class="tabs">
        <div class="tab-item">
          <router-link to="/shop/good">订餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/rating">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/info">商家</router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  export default {
      components:{
          ShopHeader
      }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
    @import "../../common/stylus/mixins.styl"
    #shopContainer
        .tabs
            display flex
            bottom-border-1px(#eee)
            .tab-item
                // flex 1
                // width 33.33%
                flex 1
                text-align center
                height 40px
                line-height 40px
                font-size 16px
                a
                    display block
                    position relative
                    //nav-link比link多一个class="active"的类名,而且是点击哪个nav-link哪个就有
                    &.router-link-active
                        color $green
                        //底部导航条,使用伪类实现,html在解析时不会解析伪类,这样在渲染页面时 少渲染一次标签
                        &:after
                            content:''
                            background $green
                            height 4px
                            width 40px
                            position absolute
                            transform scaleY(0.5)
                            bottom -1px
                            left 50%
                            margin-left -20px
</style>
