import Mock from 'mockjs'
import shopDatas from './data.json'

//测试
Mock.mock('/api/lose', '小二郎')

//模拟数据接口
Mock.mock('/api/getShopDatas', { code: 0, data: shopDatas })
