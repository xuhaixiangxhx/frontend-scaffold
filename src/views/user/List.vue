<script setup>
import { onBeforeMount, reactive, toRefs } from 'vue';
import { getUserListHandler } from '../../api/user.js';

const data = reactive({
    items: []
})
// 自动获取用户列表
onBeforeMount(
    () => {
        getUserListHandler().then(
            (response) => {
                data.items = response.data.data.items
            }
        )
    }
)

const { items } = toRefs(data)

</script>
<template>
    <el-card>
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
            <el-table-column sortable prop="address" label="家庭地址" width="400"/>
            <el-table-column fixed="right" label="用户操作">
                <template #default>
                    <el-button link type="primary" size="small">编辑</el-button>
                    <el-button link type="warning" size="small">删除</el-button>
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