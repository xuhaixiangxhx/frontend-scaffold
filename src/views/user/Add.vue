<script setup>
import { ElMessage } from 'element-plus';
import { defineProps, onMounted, reactive, ref, toRefs } from 'vue';
import { addUserHandler, updateUserHandler } from '../../api/user.js';

const data = reactive({
  userForm: {
    username: '',
    phone: '',
    address: ''
  }
})
const props = defineProps({
  // 用户操作类型
  operation: {
    type: String
  },
  // 用户数据
  userForm: {
    type: Object
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
  // 将数据重设
  userFormRef.value.resetFields()
}
const submit = () => {
  userFormRef.value.validate((valid) => {
    if (valid) { // 表单校验通过
      if (props.operation == 'add'){ // 用户添加
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
      } else { // 用户修改
        loading.value = true
        updateUserHandler(userForm).then((response) => {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          loading.value = false
          // 更新成功后情况表单
          clear()
          // 关闭对话框
          emit('closeAddDiag')
        })
      }
    } else { // 表单校验失败
      ElMessage({
        type: 'warning',
        message: '请完善信息'
      })
    }
  })
}
onMounted(() => {
  // data.userForm = props.userForm
  // 解决编辑时刷新真实数据问题
  data.userForm = JSON.parse(JSON.stringify(props.userForm))
})
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
      <el-button @click="submit()" type="primary">{{ props.operation == 'add'?'添加':'更新'}}</el-button>
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