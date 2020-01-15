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
import { mapState } from "vuex";
import ShopHeader from "../../components/ShopHeader/ShopHeader.vue";
import { SAVE_SHOPDATAS, SAVE_CARTFOODS } from "../../store/state_type";
export default {
  components: {
    ShopHeader
  },
  async mounted() {
    //提前从sessionStorage中读取数据,JSON.parse转化数据格式
    let shopDatas = JSON.parse(sessionStorage.getItem("shopDatas"));
    if (shopDatas) {
      //存到vuex中
      this.$store.commit(SAVE_SHOPDATAS, shopDatas); //存的是food列表的数据,跟购物车的数据不同源,还不能够联动,so根据它的shopDatas计算购物车的数据

      //计算购物车的数据,
      let cartFoods = shopDatas.goods.reduce((pre, good) => {
        pre.push(...good.foods.filter(food => food.count));
        return pre;
      }, []);
      //存到vuex中
      this.$store.commit(SAVE_CARTFOODS, cartFoods);
    } else {
      //上面如果有数据就不用发请求去获取数据,如果没有再通过发请求获取数据
      // let result = await this.$API.getShopDatas();
      this.$store.dispatch("getShopDatasActions");
    }

    //在大的数据组件里解决刷新丢失数据的问题,unload:在页面更新确定,但是还没执行更新时触发
    window.addEventListener("unload", () => {
      //将最新的刷新前的数据存到sessionStorage中,JSON格式,
      sessionStorage.setItem("shopDatas", JSON.stringify(this.shopDatas));
    });
  },
  beforeDestroy() {
    //当切换组件时,原组件会被销毁,新组建会替代,再切回原组件时,vuex和sessionStorage的数据也会被清除,
    //所以利用生命周期钩子beforeDestroy,在组件被销毁之前吧数据在sessionStorage中存一下,切回来时就能从sessionStorage读取了
    sessionStorage.setItem("shopDatas", JSON.stringify(this.shopDatas));
  },
  computed: {
    //模块化vuex时,应用映射对象,...map时只能用对象的形式
    ...mapState({
      initTest: state => state.shop.initTest,
      shopDatas: state => state.shop.shopDatas
    })
    // ...mapState(['shop.initTest'])
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
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
        // nav-link比link多一个class="active"的类名,而且是点击哪个nav-link哪个就有
        &.router-link-active
          color $green
          // 底部导航条,使用伪类实现,html在解析时不会解析伪类,这样在渲染页面时 少渲染一次标签
          &:after
            content ''
            background $green
            height 4px
            width 40px
            position absolute
            transform scaleY(0.5)
            bottom -1px
            left 50%
            margin-left -20px
</style>
