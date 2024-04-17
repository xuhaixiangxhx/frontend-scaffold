<script setup>
import { reactive } from 'vue';
// 导入图标，配合prefix-icon属性使用
import { Lock, User } from '@element-plus/icons-vue';
// 定义响应式表单数据
const loginInfo = reactive({
    username: '',
    password: ''
})
// 定义表单校验规则
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})
</script>
<template>
    <el-card class="box-card">
        <h3>后台管理系统</h3>
        <!-- rules:绑定校验规则，status-icon:校验不通过显示反馈图标 -->
        <el-form :model="loginInfo" class="login-form" :rules="rules" status-icon>
            <!-- prop：配合rules实现表单校验，名称需与rules中保持一致 -->
            <el-form-item prop="username">
                <!-- prefix-icon：在输入框前添加图标，clearable：是否显示清除按钮 -->
                <el-input placeholder="请输入用户名" v-model="loginInfo.username" :prefix-icon="User" clearable />
            </el-form-item>
            <el-form-item prop="password">
                <!-- show-password：是否显示切换密码图标 -->
                <el-input placeholder="请输入密码" v-model="loginInfo.password" type="password" autocomplete="off"
                    :prefix-icon="Lock" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped>
.box-card {
    max-width: 480px;
}

.login-form {
    max-width: 600px;
}
</style>