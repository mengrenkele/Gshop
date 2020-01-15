<template>
  <div>
    <div class="shopcart">
      <div class="content2">
        <div class="content-left">
          <div class="logo-wrapper">
            <div @click="toggleCartShow" class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-gouwuche1" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price highlight">￥{{totalPrice}}</div>
          <!-- 数据预处理:vue先解析结构,在解析js,这里的info.deliveryPrice先被解析,而info是在js中获取的,所以警告 info是undefined -->
          <!-- 解决:可以给标签添加是否展示属性;v-show只是隐藏标签,vue还是会去解析,v-if是卸载标签,使vue解析不到标签 -->
          <div class="desc" v-if="info">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payConTent}}</div>
        </div>
      </div>
      <transition name="sleep">
        <div class="shopcart-list" v-show="isShowCart">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- <div class="cartcontrol">
                  <div class="iconfont icon-remove_circle_outline"></div>
                  <div class="cart-count">1</div>
                  <div class="iconfont icon-add_circle"></div>
                  </div>-->
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" @click="isShowCart = false" v-show="isShowCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapState } from "vuex";
import { MessageBox } from "mint-ui";
import CartControl from "../CartControl/CartControl";
import { CLEAR_CARTFOODS } from "../../store/state_type";
export default {
  data() {
    return {
      isShowCart: false
    };
  },
  components: {
    CartControl
  },
  methods: {
    toggleCartShow() {
      this.totalCount && (this.isShowCart = !this.isShowCart);
    },
    clearCart() {
      MessageBox.confirm("确认清空吗?").then(
        // eslint-disable-next-line no-unused-vars
        actionAgree => this.$store.commit(CLEAR_CARTFOODS),
        actionReject => console.log(actionReject)
      );
    }
  },
  computed: {
    //mapGetters只能用数组的形式解包,无论是不是模块化的getters,它在vuex里是全局性的
    ...mapGetters(["totalCount", "totalPrice"]),
    ...mapState({
      info: state => state.shop.shopDatas.info,
      cartFoods: state => state.shop.cartFoods
    }),
    payConTent() {
      let { totalPrice, info } = this;
      if (!info) {
        return;
      }
      let text;
      if (totalPrice === 0) {
        text = `${info.minPrice}元起送`;
      } else if (totalPrice > 0 && totalPrice < info.minPrice) {
        text = `差${info.minPrice - totalPrice}元配送`;
      } else {
        text = "去结算";
      }
      return text;
    },
    payClass() {
      let { totalPrice, info } = this;
      if (!info) {
        return;
      }
      return totalPrice - info.minPrice >= 0 ? "enough" : "not-enough";
    }
  },
  watch: {
    cartFoods(newValue) {
      !newValue.length && (this.isShowCart = false);
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content2
    display flex
    background #141d27
    font-size 0
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background $green
          .icon-gouwuche1
            line-height 44px
            font-size 24px
            color #80858a
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 12px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 16px
        font-weight 700
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align top
        margin 12px 0 0 12px
        line-height 24px
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .shopcart-list
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    transform translateY(-100%)
    &.sleep-enter-active, &.sleep-leave-active
      transition all 0.4s
    &.sleep-enter, &.sleep-leave-to
      transform translateY(0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 13px
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  backdrop-filter blur(10px)
  opacity 1
  background rgba(7, 17, 27, 0.6)
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity 0
</style>
