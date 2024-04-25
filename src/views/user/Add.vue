<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, toRefs } from 'vue';
import { addUserHandler } from '../../api/user.js';

const data = reactive({
  userForm: {
    username: '',
    phone: '',
    address: ''
  }
})
const userFormRef = ref()
// 用于创建过程中加载效果显示
const loading = ref(false)
const { userForm } = toRefs(data)
// 定义表单校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
  ]
})
const emit = defineEmits(['closeAddDiag'])
const clear = () => {
  userFormRef.value.resetFields()
}
const addUser = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      addUserHandler(userForm).then((response) => {
        ElMessage({
          message: response.data.message,
          type: 'success'
        })
        loading.value = false
        // 添加成功后情况表单
        clear()
        // 关闭对话框
        emit('closeAddDiag')
      })
    } else {
      ElMessage({
        type: 'warning',
        message: '请完善信息'
      })
    }
  })
}
</script>
<template>
  <el-form ref="userFormRef" :model="userForm" class="userForm" v-loading="loading" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="userForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="userForm.phone" autocomplete="off" />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="userForm.address" autocomplete="off" />
    </el-form-item>
    <el-form-item class="center-button">
      <el-button @click="addUser()" type="primary">提交</el-button>
      <el-button @click="clear()">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.userForm {
  max-width: 600px;
  margin: 0 auto;
}

.center-button {
  display: block;
  margin-left: 35%;
}
</style>