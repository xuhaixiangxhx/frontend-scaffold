const userRoutes = {
    path: '/user',
    component: () => import('../views/layout/Layout.vue'),
    children: [
        {
            path: 'list',
            component: () => import('../views/user/List.vue')
        },
        {
            path: 'add',
            component: () => import('../views/user/Add.vue')
        }
    ]
}

export default userRoutes