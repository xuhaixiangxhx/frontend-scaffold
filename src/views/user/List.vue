<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeMount, reactive, ref, toRefs } from 'vue';
import { delUserHandler, getUserListHandler } from '../../api/user.js';
const data = reactive({
    items: []
})
const loading = ref(true)
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
            type: 'warning',
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

const { items } = toRefs(data)

</script>
<template>
    <!-- 添加数据加载样式 -->
    <el-card v-loading="loading" element-loading-text="努力加载中">
        <template #header>
            <div class="card-header">
                <span>用户列表</span>
                <el-button text>添加</el-button>
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
                    <el-button link type="primary" size="small">编辑</el-button>
                    <!-- scope.row同城包含当前行的完整数据对象 -->
                    <el-button @click="deleteUser(scope.row)" link type="warning" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

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