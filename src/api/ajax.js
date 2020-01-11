import axios from 'axios'
import qs from 'qs'

//1.生成ajax伪实例
const instance = axios.create({
    baseURL: '/api'
})

//2.请求拦截器
instance.interceptors.request.use(config => {
    //config是包含当前请求数据:method  url  data(参数)

    //将config的请求参数json格式 转换成url-ending格式
    config.data = qs.stringify(config.data)
    //必须return config
    return config
})

//3.相应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        alert('请求失败')
        console.log(error)
        return new Promise(() => { })
    }
)

export default instance
