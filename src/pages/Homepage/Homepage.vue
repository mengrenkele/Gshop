<template>
   <!--首页外卖-->
    <div class="on">
      <section class="msite">
        <GshopHeader :title="address.name?address.name:'定位中...'">
          <template v-slot:left>
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          </template>
          <template v-slot:right>
            <span class="header_login">
              <span class="header_login_text">登录|注册</span>
            </span>
          </template>
        </GshopHeader>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(category, index) in newCateGroys" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(categoryItem, index) in category" :key="index">
                  <div class="food_container">
                    <img :src="`https://fuss10.elemecdn.com/${categoryItem.image_url}`">
                  </div>
                  <span>{{categoryItem.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <shopList/>
      </section>
    </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import _ from 'lodash'
  import {mapState} from 'vuex'

import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    components:{
      ShopList
    },
    mounted(){
      // let result = await getAddress(40.10038,116.36867)
      // console.log(result)
      // this.$store.commit('save_address')
      this.$store.dispatch('getAddressAction')
      this.$store.dispatch('getCategorysAction',()=>{
        //$nextTick是vm对象上的一个方法,作用是保证下一次组件加载完成时调用
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
              pagination: {
              el: '.swiper-pagination',
            },
            loop : true,
          })
        })
      })
      
     //如果你初始化时没有定义Swiper实例，后面也可以通过Swiper的HTML元素来获取该实例
      // new Swiper('.swiper-container',{
      //   pagination: {
      //       el: '.swiper-pagination',
      //   },
      //   loop : true,
      // })
    },
    methods: {
      _chunk(target,size){
        let result = [];
        if (!Array.isArray(target) || size<=0) {
          return target
        }
        while (target.length > size) {
          result.push(target.splice(0,size))
        }
        !!target.length<=size && result.push(target)
        return result
      }
    },
    computed:{
      ...mapState({
        address: state => state.address,
        categorys: state => state.categorys,
       
      }),
      newCateGroys() {
        // console.log('haha',this.categorys)
        // return this._chunk(this.categorys,8)
        return _.chunk(this.categorys,8)
      }
    },
    watch:{
      // categorys(){
      //   //$nextTick是vm对象上的一个方法,作用是保证下一次组件加载完成时调用
      //   this.$nextTick(()=>{
      //     new Swiper('.swiper-container',{
      //         pagination: {
      //         el: '.swiper-pagination',
      //       },
      //       loop : true,
      //     })
      //   })
      // }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
  .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  height 100%
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              /deep/.swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
</style>
