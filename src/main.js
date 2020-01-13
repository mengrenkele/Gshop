import Vue from 'vue'
import 'lib-flexible/flexible'
import './veeValidate'

import router from './router'
import store from './store'
import App from './App.vue'
import * as API from './api'

Vue.prototype.$API = API
Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
