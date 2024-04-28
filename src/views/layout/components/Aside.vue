<script setup>
import { Ship } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import '../../../assets/iconfont/iconfont.css';
import { MENU_CONFIG } from '../../../config/menu.js';
// 从pinia中获取折叠状态 
import { useCollapseStore } from '../../../store/index.js';
const { isCollapse } = storeToRefs(useCollapseStore())
</script>

<template>
    <el-aside :width="isCollapse?'65px':'240px'">
        <router-link to="/home">
            <div class="aside-logo" >
                <el-button text>
                    <el-icon><Ship /></el-icon>
                    <span v-show="!isCollapse">后台管理</span>
                </el-button>
            </div>
        </router-link>
        <!-- 关闭默认的折叠动画 -->
        <el-menu :default-active="$route.path" :collapse="isCollapse" :collapse-transition="false" class="el-menu-vertical" router>
            <el-sub-menu v-for="menu in MENU_CONFIG" :key="menu.index" :index="menu.index">
                <template #title>
                    <!-- 使用iconfont -->
                    <el-icon><span :class="menu.icon"></span></el-icon>
                    <span>{{ menu.title }}</span>
                </template>                
                <!-- 判断是否有子菜单 -->
                <template v-if="menu.subMenu">
                    <el-sub-menu v-for="subMenu in menu.subMenu" :key="subMenu.index" :index="subMenu.index">
                        <template #title>
                            <!-- 使用iconfont -->
                            <el-icon><span :class="subMenu.icon"></span></el-icon>
                            <span>{{ subMenu.title }}</span>
                        </template>
                        <el-menu-item v-for="item in subMenu.items" :key="item.index" :index="item.index">
                            {{ item.title }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.index">
                        {{ item.title }}
                    </el-menu-item>
                </template>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<style scoped>
.el-aside {
    border-right: 1px solid #cccccc;
    transition: width 0.2s ease;
    -webkit-transition: width 0.2s ease;
    -moz-transition: width 0.2s ease;
    -o-transition: width 0.2s ease;
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