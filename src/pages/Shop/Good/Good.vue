/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div id="goodContainer">
    <div class="leftContainer">
      <ul class="navList" ref="leftUl">
        <li
          @click="changeNavIndex(index)"
          :class="{active: navIndex === index}"
          v-for="(good, index) in goods"
          :key="index"
        >{{good.name}}</li>
      </ul>
    </div>
    <div class="rightContainer">
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.image" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart />
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
import CartControl from "../../../components/CartControl/CartControl";
import ShopCart from "../../../components/ShopCart/ShopCart";
export default {
  data() {
    return {
      tops: [], //存放每个导航点距离当前顶部滑动的距离
      scrollY: 0 //页面滚动的距离
    };
  },
  components: {
    CartControl,
    ShopCart
  },
  mounted() {
    if (this.goods) {
      //如果goods请求回来了,那么创建Scroll实例,并动态地累加计算所有li的高度
      this._initScroll();
      this._initTops();
    }
    //响应式属性,是组件数据状态初始化的时候具有该属性,可以在页面动态的渲染
    //非响应式属性,组件数据状态初始化的时候没有该属性,不能在页面动态的渲染
  },
  computed: {
    ...mapState({
      goods: state => state.shop.shopDatas.goods
    }),
    navIndex() {
      //计算当前滚动完成时导航点对应的下标index
      let { tops, scrollY } = this;
      let index = tops.findIndex(
        (top, index) => scrollY >= tops[index] && scrollY < tops[index + 1]
      );
      //this.navIndex !== index;不要在计算属性内部调用计算属性本身,否则是死循环
      if (this.leftScroll && index !== this.index) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.index = index;
        // scrollToElement滚动到指定的元素
        this.leftScroll.scrollToElement(
          this.$refs.leftUl.children[index], //从$refs获取leftUl的li们组成的数组,用计算得到的index定位到对应的li
          1000
        );
      }
      return index;
    }
    //navIndex() {
    //   let { tops, scrollY } = this;
    //   let index = tops.findIndex(
    //     (top, index) => scrollY >= tops[index] && scrollY < tops[index + 1]
    //   );
    //   // this.navIndex !== index 不要在计算属性内部获取计算属性本身的值，死循环 *****
    //   if (this.leftScroll && index !== this.index) {
    //     console.log("滚动了");
    //     // scrollToElement滚动到指定的元素
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.index = index;
    //     this.leftScroll.scrollToElement(
    //       this.$refs.leftUl.children[index],
    //       1000
    //     );
    //   }
    //   // this.navIndex
    //   return index;
    // }
  },
  methods: {
    _initScroll() {
      if (this.leftScroll || this.rightScroll) {
        // 之前生成过BScroll的实例
        this.leftScroll.refresh(); // 重新刷新当前的实例, 重新计算content的高度/宽度
        this.rightScroll.refresh();
      } else {
        //创建BScroll实例的方法
        this.leftScroll = new BScroll(".leftContainer", {
          scrollY: true, //纵行滑动
          click: true //允许点击
        });
        this.rightScroll = new BScroll(".rightContainer", {
          scrollY: true,
          probeType: 2, //实时,惯性滑动不计算
          //probeType:1,//非实时
          //probeType:3,//实时,惯性滑动计算
          click: true
        });
      }

      //绑定scroll事件
      // eslint-disable-next-line no-unused-vars
      this.rightScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      //滑动结束时 获取y坐标的绝对值
      // eslint-disable-next-line no-unused-vars
      this.rightScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    // 动态计算所有li高度累加
    _initTops() {
      //Array.from
      let lis = Array.from(this.$refs.rightUl.children);
      let tops = [];
      let top = 0;
      tops.push(top); //使tops的值不为空,若为空,上面navIndex()使用tops时会报错,不能从undefined中读取top
      //遍历lis方式  for循环,  Array的reduce:只渲染一次
      // for (var i = 0; i < lis.length; i++) {
      //   top += lis[i].clientHeight; //clientHeight元素自身距离可视窗口的高度
      //   tops.push(top);
      // }
      // this.tops = tops;
      lis.reduce((pre, liItem) => {
        pre += liItem.clientHeight;
        tops.push(pre);
        return pre;
      }, top);
      // 只渲染一次，提高性能
      this.tops = tops;
    },
    changeNavIndex(index) {
      //根据下标实现跟随滑动
      this.scrollY = this.tops[index];
      //右侧区域滑动到对应的位置
      this.rightScroll.scrollTo(0, -this.scrollY, 1000);
    }
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../../common/stylus/mixins.styl'
#goodContainer
  display flex
  overflow hidden
  height calc(100vh - 224px)
  .leftContainer
    width 80px
    background #f3f5f7
    /* calc可以动态计算高度，宽度 */
    /* vh, vw 视口单位 1vh=1%视口高度 */
    /* position absolute */
    /* bottom 0 */
    /* top 224px */
    /* overflow hidden */
    .navList
      li
        width 100%
        height 50px
        text-align center
        line-height 50px
        position relative
        &.active
          background #ffffff
          color $green
        &:after
          content ''
          width 80%
          height 1px
          background rgba(7, 17, 27, 0.1)
          position absolute
          bottom 0
          left 10%
  .rightContainer
    width 295px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
