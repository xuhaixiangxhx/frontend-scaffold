<script setup>
import { reactive, ref, watch } from 'vue';
// 导入图标，配合prefix-icon属性使用
import { Lock, User } from '@element-plus/icons-vue';
// 导入login
import { login } from '../api/auth.js';
// 导入消息提示
import { ElMessage } from 'element-plus';
// 导入路由
import { useRouter } from 'vue-router';
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
let loginButtonDisabled = ref(true)
// 使用watch监听username和password的输入情况
// 方式一：对监听每一个表单字段，并且对每一个表单字段做判断，当表单数据非常多时
// watch([() => loginInfo.username, () => loginInfo.password], (newValue, oldValue)=>{
//     loginButtonDisabled.value = ( newValue[0] === '' && newValue[1] === '')
// })
// 方式二：监听表单数据对象，并且对表单的校验结果做判断(推荐使用)
const loginFormRef = ref()
watch(loginInfo, () => {
    loginFormRef.value.validate((valid) => {
        // valid为组件的校验结果
        loginButtonDisabled.value = !valid
    })
})
// 创建一个router
const router = useRouter()
// 登录调用后台
const submitForm = () => {
    login(loginInfo.username, loginInfo.password).then((response) => {
        console.log('登录response: ', response.data)
        if (response.data.status == 200) {
            const token = response.data.data.token
            window.localStorage.setItem('Authorization', token)
            ElMessage({
                message: '登录成功.',
                type: 'success',
            })
            // 登录成功, 跳转到首页
            router.replace('/')
        }
    })
}
</script>
<template>
    <div id="login">
        <el-card>
            <h3>后台管理系统</h3>
            <!-- rules:绑定校验规则，status-icon:校验不通过显示反馈图标 -->
            <!-- 添加ref属性，用于给组件注册一个引用信息 -->
            <el-form ref="loginFormRef" :model="loginInfo" :rules="rules" status-icon>
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
                <el-form-item style="display: block; margin-left: 40%;">
                    <el-button type="primary" :disabled="loginButtonDisabled" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>    
    </div>
</template>

<style scoped>
#login {
    width: 100vw;
}
.el-card {
    max-width: 360px;
    margin: 0 auto;
}

.el-form {
    max-width: 600px;
}
</style>