//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/',
        redirect: '/home',
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name: "Search",
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/shopCart',
        name: 'shopCart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: {
            show: true
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面必须从购物车来
            if (from.path == '/shopcart') {
                next()
            } else {
                //其他路由组件来停留在当前
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: PaySuccess,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/center',
        component: Center,
        meta: {
            show: true
        },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder',

            }
        ]
    }
]