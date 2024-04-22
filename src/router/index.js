import { createRouter, createWebHashHistory } from 'vue-router'

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

export default router