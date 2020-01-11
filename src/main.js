import Vue from 'vue'
import 'lib-flexible/flexible'
import router from './router'
import store from './store'


import App from './App.vue'


Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
