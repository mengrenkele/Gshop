import Vue from 'vue'

import {
    getShopDatas,
} from '../../api'

import {
    SAVE_SHOPDATAS,
    ADD_FOOD_COUNT,
    DEL_FOOD_COUNT
} from '../state_type'

const state = {
    initTest: '测试store的shop模块',
    shopDatas: {},//商品数据
}

const actions = {
    async getShopDatasActions({ commit }) {
        let result = await getShopDatas()
        if (result.code === 0) {
            commit(SAVE_SHOPDATAS, result.data)
        }
    },
    async changeFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(ADD_FOOD_COUNT, { food })
        } else {
            commit(DEL_FOOD_COUNT, { food })
        }
    }
}

const mutations = {
    [SAVE_SHOPDATAS](state, shopDatas) {
        state.shopDatas = shopDatas
    },
    [ADD_FOOD_COUNT](state, { food }) {
        // if (food.count >= 0) {
        //     food.count++
        // } else {
        //     Vue.set(food, 'count', 0)
        // }
        if (!food.count) {
            Vue.set(food, 'count', 1)
        } else {
            food.count++
        }
    },
    [DEL_FOOD_COUNT](state, { food }) {
        if (food.count > 0) {
            food.count--
        }
    },
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}
