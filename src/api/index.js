
import ajax from './ajax'

/* 根据经纬度获取位置详情 */
export const getAddress = (latitude, longitude) => ajax({
    url: `/position/${latitude},${longitude}`
})

/* 获取食品分类列表 */
// export const getCategorys = () => ajax({
//     url: `/index_category`
// })
export const getCategorys = () => ajax({
    url: `/index_category`
})

/*  根据经纬度获取商铺列表 */
export const getShopList = (latitude, longitude) => ajax({
    url: '/shops',
    params: {
        latitude,
        longitude
    }
})

// 传入用户手机号 获取验证码
export const sentCode = ({ phone }) => ajax({
    url: '/sendcode',
    params: {
        phone,
    }
})

//用户名密码登录请求
export const loginWithUserName = ({ username, psw, captcha }) => ajax({
    method: 'POST',
    url: '/login_pwd',
    data: {
        name: username,
        psw,
        captcha
    }
})

//手机号验证码登录
export const loginWithPhone = ({ phone, code }) => ajax({
    method: 'POST',
    url: '/login_sms',
    data: {
        phone,
        code
    }
})

// 自动登录
export const autoLogin = () => ajax({
    url: '/auto_login',
    headers: {
        needToken: true,
    }
})
