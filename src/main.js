import Vue from 'vue'
import 'lib-flexible/flexible'
import './veeValidate'
import { Button } from 'mint-ui'
import './mock/mockServer'

import router from './router'
import store from './store'
import App from './App.vue'
import * as API from './api'
import GshopHeader from './components/GshopHeader/GshopHeader.vue'

Vue.component('GshopHeader', GshopHeader)
Vue.component(Button.name, Button)

Vue.prototype.$API = API
Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
