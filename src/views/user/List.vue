<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeMount, reactive, ref, toRefs } from 'vue';
import { delUserHandler, getUserListHandler } from '../../api/user.js';
import Add from './Add.vue';
const data = reactive({
    items: [],
    // 向子组件传递userForm对象
    userForm: {
        username: '',
        phone: '',
        address: ''
    }
})
const loading = ref(true)
// 添加用户对话框是否显示
const addUserDialog = ref(false)
// 向子组件传递数据，是add还是update类型操作
let operation = ref()
const addUser = () => {
    // 向子组件传入空的userForm
    operation.value = 'add'
    data.userForm = {}
    addUserDialog.value = true
}
const updateUser = (row) => {
    operation.value = 'update'
    data.userForm = row
    addUserDialog.value = true
}
// emit事件回调函数
const callback = () => {
    // 关闭对话框
    addUserDialog.value = false
    // 刷新用户列表
    getUserList()
}
// 获取用户列表
const getUserList = () => {
    getUserListHandler().then(
        (response) => {
            data.items = response.data.data.items
            // 完成数据加载
            loading.value = false
        }
    )
}
// 自动获取用户列表
onBeforeMount(
    () => {
        getUserList()
    }
)
// 删除用户
const deleteUser = (row) => {
    ElMessageBox.confirm(
        '确定要删除用户: '+ row.username,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        }
    ).then(() => {
        loading.value = true
        delUserHandler(row.id).then(
            (response) => {
                ElMessage({
                    message: response.data.message,
                    type: 'success'
                })
                // 删除后自动更新用户列表
                getUserList()
            }
        )        
    }).catch(() => {
        return
    })
}

const { items, userForm } = toRefs(data)

</script>
<template>
    <!-- 添加数据加载样式 -->
    <el-card v-loading="loading" element-loading-text="努力加载中">
        <template #header>
            <div class="card-header">
                <span>用户列表</span>
                <!-- 点击显示用户添加对话框 -->
                <el-button text @click="addUser()">添加</el-button>
            </div>
        </template>
        <!-- border:添加边框，stripe：斑马纹，height：设置表格高度 -->
        <el-table :data="items" border stripe height="360">
            <!-- sortable：设置可排序，fixed：设置列固定，prop：对应获取到的字段，label：表头 -->
            <el-table-column sortable fixed prop="id" label="ID" width="150" />
            <el-table-column sortable prop="username" label="用户姓名" width="150" />
            <el-table-column sortable prop="phone" label="电话号码" width="150" />
            <el-table-column sortable prop="address" label="家庭地址" />
            <el-table-column fixed="right" label="用户操作" width="150">
                <!-- scope包含了当前行的数据以及一些其他信息 -->
                <template #default="scope">
                    <el-button @click="updateUser(scope.row)" link type="primary" size="small">编辑</el-button>
                    <!-- scope.row同城包含当前行的完整数据对象 -->
                    <el-button @click="deleteUser(scope.row)" link type="warning" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 用户添加对话框 -->
    <!-- destroy-on-close关闭对话框清除数据 -->
    <el-dialog destroy-on-close v-model="addUserDialog" :title="operation=='add'?'用户添加':'用户更新'" width="360">
        <!-- 监听事件 -->
        <Add @close-add-diag="callback" :operation="operation" :user-form="userForm"></Add>
    </el-dialog>
</template>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-button {
    outline: none;
}

.el-table {
    width: 100%;
}
</style>