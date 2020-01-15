import Vue from 'vue'

import {
    getShopDatas,
} from '../../api'

import {
    SAVE_SHOPDATAS,
    ADD_FOOD_COUNT,
    DEL_FOOD_COUNT,
    CLEAR_CARTFOODS,
    SAVE_CARTFOODS
} from '../state_type'

const state = {
    initTest: '测试store的shop模块',
    shopDatas: {},//商品数据
    cartFoods: [],//购物车food
}
//页面刷新数据丢失问题:页面一刷新,页面会重新加载(释放内存,再重新分配内存),而数据存在vuex中,刷新页面,vuex也会重新加载,所以数据也会丢失.
//解决:当只存用户身份(token)时,可以放在localStorage中(最多能放5M,关闭应用/浏览器,数据不会丢失);当存放页面数据时,可以放在Session Storage
//Session Storage能放一些大的数据,应用/浏览器关闭,存放的数据会被释放,但是刷新并不会丢失数据,存放的数据格式是json格式的对象或者数组
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
        if (food.count > 0) {//如果food有count并且count大于0时
            food.count++
        } else {
            Vue.set(food, 'count', 1)//设置food.count,并设count=1
            //然后把food存进cartFoods中(因为food.count为1了,所以存)
            state.cartFoods.push(food)
        }
    },
    [DEL_FOOD_COUNT](state, { food }) {
        if (food.count > 0) {
            food.count--
            if (food.count === 0) {//当count等于0时,从购物车中删除这个food
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEAR_CARTFOODS](state) {
        state.cartFoods.forEach(food => food.count = 0);
        state.cartFoods = []
    },
    [SAVE_CARTFOODS](state, cartFoods) {
        state.cartFoods = cartFoods
    }
}

const getters = {
    //计算一个数组,得到所有包含food.count的food
    // cartShops(state) {//此方法虽能得到需要的foods,但是性能太差(food.count每改变一次,这个方法就遍历一次goods)
    //     state.shopDatas.goods.reduce((pre, good) => {//reduce
    //         // let foods = good.foods.filter(food => food.count > 0)
    //         // pre.push(...foods)
    //         pre.push(...good.foods.filter(food => food.count > 0))//filter
    //         return pre
    //     }, [])
    // }
    totalCount(state) {
        return state.cartFoods.reduce((pre, food) => {
            return pre += food.count
        }, 0)
    },
    totalPrice(state) {
        return state.cartFoods.reduce((pre, food) => {
            return pre += food.count * food.price
        }, 0)
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
