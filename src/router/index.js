import { createRouter, createWebHashHistory } from 'vue-router'
import { CONFIG } from '../config'

const subRoutes = {}

const routes = [
    {
        path: '/',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        name: 'login'
    },
    subRoutes
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由前置守卫，处理登录逻辑
/*
    1 访问/login，没有携带token
    2 访问/login，携带了token
    3 访问非/login，没有携带token
    4 访问非/login，携带了token
*/
router.beforeEach(
    (to, from, next) => {
        // 获取访问路径
        const targetPath = to.path
        // 判断访问路径是否为/login
        const isLoginPath = targetPath.indexOf('/login')
        // 获取token
        const token = localStorage.getItem(CONFIG.TOKEN_NAME)
        if(isLoginPath == 0 && token != null ){
            // 登录页面，且携带token
            next('/')
        }else if(isLoginPath == 0 && token == null){
            // 登录页面，未携带token
            next()
        }else if (token != null){
            // 非登录页面，携带token
            next()
        }else {
            // 非登录页面，未携带token
            next('/login')
        }
    }
)

export default router