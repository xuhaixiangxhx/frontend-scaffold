const userRoutes = {
    path: '/user',
    component: () => import('../views/layout/Layout.vue'),
    children: [
        {
            path: 'list',
            component: () => import('../views/user/List.vue')
        }
    ]
}

export default userRoutes