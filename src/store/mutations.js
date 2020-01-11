import {
    SAVE_ADDRESS,
    SAVE_CATEGORYS,
    SAVE_SHOPLIST
} from './state_type'

export default {
    [SAVE_ADDRESS](state, address) {
        // let result = await getAddress(40.10038,116.36867)
        // console.log('mutation', result);
        // state.address = result.data
        //mutation处理不了异步数据,等待数据的请求交给action处理
        state.address = address
    },
    [SAVE_CATEGORYS](state, categorys) {
        state.categorys = categorys
    },
    [SAVE_SHOPLIST](state, shopList) {
        state.shopList = shopList
    },
}