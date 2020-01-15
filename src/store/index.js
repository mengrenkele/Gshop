import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import shop from './modules/shop'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        shop
    },
    state,
    getters,
    actions,
    mutations
})

export default store
