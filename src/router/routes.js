import Homepage from '../pages/Homepage/Homepage.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Good from '../pages/Shop/Good/Good.vue'
import Info from '../pages/Shop/Info/Info.vue'
import Rating from '../pages/Shop/Rating/Rating.vue'


export default [
    {
        path: '/homepage',
        component: Homepage,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/shop',
        component: Shop,
        children: [
            {
                path: '/shop/good',
                component: Good,
            },
            {
                path: 'info',
                component: Info,
            },
            {
                path: 'rating',
                component: Rating,
            },
            {
                path: '/shop',
                redirect: '/shop/good'
            },
        ]
    },
    {
        path: '/',
        redirect: '/homepage'
    },
]

//另一种方式:当打开应用时,给重定向设立一个有无token的判断,有token去'/homepage',无token去'/login';但是在哪里加这个判断哦?
