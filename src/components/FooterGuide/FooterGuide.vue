<template>
  <div id="footerContainer">
    <div
      :class="{active: $route.path==='/homepage'}"
      @click="goPath('/homepage')"
      class="guideItem"
    >
      <i class="iconfont icon-shouye2"></i>
      <span>首页</span>
    </div>
    <div :class="{active: $route.path==='/search'}" @click="goPath('/search')" class="guideItem">
      <i class="iconfont icon-sousuo1"></i>
      <span>搜索</span>
    </div>
    <div :class="{active: $route.path==='/order'}" @click="goPath('/order')" class="guideItem">
      <i class="iconfont icon-dingdan"></i>
      <span>订单</span>
    </div>
    <div :class="{active: $route.path==='/profile'}" @click="goPath('/profile')" class="guideItem">
      <i class="iconfont icon-wode"></i>
      <span>我的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    goPath(path) {
      this.$route.path !== path && this.$router.push(path);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

#footerContainer {
  display: flex;
  top-border-1px(#eee);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;

  .guideItem {
    width: 25%;
    height: 50px;
    // line-height 50px
    text-align: center;
    display: flex;
    flex-direction: column;

    &.active {
      color: $green;
    }

    .iconfont {
      font-size: 22px;
      line-height: 30px;
    }
  }
}
</style>
