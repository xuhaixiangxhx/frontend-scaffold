export const MENU_CONFIG = [
    // 用户管理
    {
        title: '用户管理',
        index: '/user',
        icon: 'iconfont icon-yonghuguanli',
        items: [
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
        icon: 'iconfont icon-chanpinguanli',
        subMenu: [
            // 电子产品
            {
                title: '电子产品',
                index: '/product/eletronic',
                icon: 'iconfont icon-dianzichanpin1-copy',
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
                icon: 'iconfont icon-ziyuan',
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