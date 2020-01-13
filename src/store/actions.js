import {
    getAddress,
    getCategorys,
    getShopList
} from '../api'
import {
    SAVE_ADDRESS,
    SAVE_CATEGORYS,
    SAVE_SHOPLIST,
    SAVE_USER,
    SAVE_TOKEN
} from './state_type'

export default {
    async getAddressAction({ commit }) {
        let result = await getAddress(40.10038, 116.36867)
        // if(result.code === 0) {
        //     commit(SAVE_ADDRESS,result.data)
        // }
        //可以简写成下行代码
        !!(result.code === 0) && commit(SAVE_ADDRESS, result.data)

    },
    async getCategorysAction({ commit }, fn) {
        let result = await getCategorys()
        if (result.code === 0) {
            commit(SAVE_CATEGORYS, result.data)
            typeof fn === 'function' && fn()
        }
    },
    async getShopListAction({ commit }) {
        let result = await getShopList(40.10038, 116.36867)
        !!(result.code === 0) && commit(SAVE_SHOPLIST, result.data)
    },
    getUserInfoAction({ commit }, user) {
        //把token存到vuex中
        commit(SAVE_TOKEN, user.token)
        //报token存到localStorage中
        localStorage.setItem('token_key', user.token)
        //因为已经单独存过token了,所以在存用户数据的时候去掉它里面的token
        delete user.token
        //把用户数据存到vuex中
        commit(SAVE_USER, user)
    },
}
