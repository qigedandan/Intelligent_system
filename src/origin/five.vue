<script setup>
import { ref, reactive, onMounted } from 'vue';

import { toRefs, defineProps } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import {codes} from '../store/store.js'
const router = useRouter()
const route = useRoute()

const props = defineProps({
    //子组件接收父组件传递过来的值
    msg: {
        type: Object,
        default: {}
    }
})

const { msg } = toRefs(props)

console.log(msg.value.codeSimList);

const tableData = ref((msg.value.codeSimList))
const tablePage = reactive({
    total: msg.value.codeSimList.length,
    currentPage: 1,
    pageSize: 10
})

const handlePageChange = ({ currentPage, pageSize }) => {
    tablePage.currentPage = currentPage
    tablePage.pageSize = pageSize
    tableData.value = msg.value.codeSimList.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
}

const editEvent = (row) => {
    codes.value = row
    router.push('/origin/6')
}
const dialogData = ref({})
const dialogVisible = ref(false)

</script>
<template>
        <el-breadcrumb :separator-icon="ArrowRight" size="large" style="margin-bottom: 10px;">
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>相似代码分析</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="table">
        <vxe-table  stripe :row-config="{isCurrent: true, isHover: true}" :data="tableData" align="center" max-height="620">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="path" title="路径"></vxe-column>
            <vxe-column field="sim_path" title="相似路径"></vxe-column>
            <vxe-column field="linecount" title="代码行数"></vxe-column>
            <vxe-column title="相似占比">
                <template #default="{ row }">
                    <div>{{ (row.sim_value*100).toFixed(2) }}%</div>
                </template>
            </vxe-column>
            <vxe-column title="操作" show-overflow>
                <template #default="{ row }">
                    <el-button style="background-color: #1d8e8a;color: white;" @click="editEvent(row)">详情</el-button>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
    <div style="margin-top: 20px;">
        <el-button  style="background-color: #1d8e8a;color: white;" @click="router.push('/home/code')">返回</el-button>
    </div>


</template>
<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.high{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>