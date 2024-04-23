<script setup>
import { Ship } from '@element-plus/icons-vue';
import { MENU_CONFIG } from '../../../config/menu.js';
</script>

<template>
    <el-aside>
        <router-link to="/home">
            <div class="aside-logo">
                <el-button text><el-icon>
                        <Ship />
                    </el-icon>后台管理</el-button>
            </div>
        </router-link>
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-sub-menu v-for="menu in MENU_CONFIG" :key="menu.index" :index="menu.index">
                <template #title>
                    <span>{{ menu.title }}</span>
                </template>                
                <!-- 判断是否有子菜单 -->
                <template v-if="menu.subMenu">
                    <el-sub-menu v-for="subMenu in menu.subMenu" :key="subMenu.index" :index="subMenu.index">
                        <template #title>
                            <span>{{ subMenu.title }}</span>
                        </template>
                        <el-menu-item v-for="item in subMenu.items" :key="item.index" :index="item.index">{{ item.title }}</el-menu-item>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.index">{{ item.title }}</el-menu-item>
                </template>
            </el-sub-menu>
 
            <!-- <el-sub-menu index="/user">
                <template #title>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user/add">用户添加</el-menu-item>
                <el-menu-item index="/user/edit">用户修改</el-menu-item>
                <el-menu-item index="/user/query">用户查询</el-menu-item>
                <el-sub-menu index="/user/priviledge">
                    <template #title><span>用户权限</span></template>
                    <el-menu-item index="/user/priviledge/add">权限添加</el-menu-item>
                    <el-menu-item index="/user/priviledge/query">权限查询</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="/order">
                <template #title>
                    <span>订单管理</span>
                </template>
                <el-menu-item index="/order/edit">订单修改</el-menu-item>
                <el-menu-item index="/order/query">订单查询</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/product">
                <template #title>商品管理</template>
            </el-menu-item> -->
        </el-menu>
    </el-aside>
</template>

<style scoped>
.el-aside {
    width: 240px;
    border-right: 1px solid #cccccc;
}

.aside-logo {
    height: 50px;
}

.aside-logo .el-button {
    width: 100%;
    height: 100%;
    font-size: 20px;
    outline: none;
}

.el-icon {
    margin-right: 5px;
}
</style>