<script setup>
import { Ship } from '@element-plus/icons-vue';
</script>

<template>
    <el-aside>
        <div class="aside-logo">
            <el-button text><el-icon><Ship /></el-icon>后台管理</el-button>
        </div>
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
    margin-right : 5px;
}
</style>