export const MENU_CONFIG = [
    // 用户管理
    {
        title: '用户管理',
        index: '/user',
        icon: '',
        items: [
            // 添加用户
            {
                title: '添加用户',
                index: '/user/add'
            },
            // 查看用户
            {
                title: '查看用户',
                index: '/user/list'
            }
        ]
    },
    // 产品管理
    {
        title: '产品管理',
        index: '/product',
        icon: '',
        subMenu: [
            // 电子产品
            {
                title: '电子产品',
                index: '/product/eletronic',
                icons: '',
                items: [
                    // 添加产品
                    {
                        title: '添加产品',
                        index: '/product/eletronic/add'
                    },
                    // 查看产品
                    {
                        title: '查看列表',
                        index: '/product/eletronic/list'
                    }
                ]
            },
            // 生鲜产品
            {
                title: '生鲜产品',
                index: '/product/fresh',
                icons: '',
                items: [
                    // 添加产品
                    {
                        title: '添加产品',
                        index: '/product/fresh/add'
                    },
                    // 查看产品
                    {
                        title: '查看列表',
                        index: '/product/fresh/list'
                    }                  
                ]
            }
        ]
    }

]