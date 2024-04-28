<script setup>
import { ArrowLeft, ArrowRight, SwitchButton } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { CONFIG } from '../../../config/index.js';
const router = useRouter()
const logout = () => {
  ElMessageBox.confirm(
    '退出登录. 继续?',
    {
      confirmButtonText: '注销',
      cancelButtonText: '取消',
      center: true
    }
  ).then(() => {
      // 1 如果后端没有存储token，直接删除localstorage的token
      // 2 如果后端存储了token，需先调用后端退出接口，再删除localstorage中的token
      window.localStorage.removeItem(CONFIG.TOKEN_NAME)
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
      // 退出后返回登录页
      router.replace('/api/auth/login')
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出',
      })
    })
}
</script>

<template>
    <el-header>
        <el-button>
            <el-icon><ArrowLeft /></el-icon><el-icon><ArrowRight /></el-icon>
        </el-button>
        <el-button @click="logout()">
            <el-icon><SwitchButton /></el-icon>
        </el-button>
    </el-header>
</template>

<style scoped>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-button {
    margin-top: 25px;
    outline: 0px;
}
</style>