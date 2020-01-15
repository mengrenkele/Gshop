import axios from 'axios'
import qs from 'qs'
import router from '../router'

//1.生成ajax伪实例
const instance = axios.create({
    baseURL: '/api'
})

//2.请求拦截器
instance.interceptors.request.use(config => {
    //config是包含当前请求数据:method  url  data(参数)

    //将config的请求参数json格式 转换成url-ending格式
    config.data = qs.stringify(config.data)

    //请求时携带token的方式:cookie,请求参数(parmas),请求头[authorization]
    //先判断什么时候需要带token过去(登陆过,生成token之后,再来打开应用时)
    if (config.headers.needToken) {
        let token = localStorage.getItem('token_key')
        if (token) {
            //如果有token,就存到请求头中
            config.headers.authorization = token

        } else {
            throw Error('请先登录')
        }
    }

    //必须return config
    return config
})

//3.相应拦截器
instance.interceptors.response.use(
    response => {
        // router.replace('/profile')
        return response.data
    },
    error => {
        console.log(error.message)
        //如果没有错误响应对象,则在请求拦截器中报错
        if (!error.response) {
            alert(error.message)
            //跳转登陆页面
            if (router.currentRoute.path !== '/login') {
                router.replace('/login')
            }
        } else {//发送请求后获取错误的信息对象,根据不同的错误做出不同的提示
            if (error.response.status === 401) {
                alert('token过期,请重新登录')
                //跳转
                if (router.currentRoute.path !== '/login') {
                    router.replace('/login')
                }
            } else if (error.response.status === 404) {
                alert('访问资源不存在')
            } else {
                alert('请求错误')
            }

        }
        return new Promise(() => { })
    }
)

export default instance
