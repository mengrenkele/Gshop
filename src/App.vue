<template>
  <div id="appContainer">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {SAVE_USER} from './store/state_type.js' 
export default {
  name: 'app',
  components: {
    FooterGuide,
  },
  async mounted() {
    let result = await this.$API.autoLogin()
    //存到vuex中
    this.$store.commit(SAVE_USER,result.data)
  },
}
</script>

<style lang="stylus">
  // #appContainer
  //   width 100%
  //   height 100%
</style>
