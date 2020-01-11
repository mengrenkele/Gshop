import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
