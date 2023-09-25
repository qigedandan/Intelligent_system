<script setup>
import { ref,reactive,onMounted } from 'vue';

import { toRefs, defineProps } from 'vue'
import { useRoute,useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const props = defineProps({
  //子组件接收父组件传递过来的值
  msg:{
    type: Object,
    default: {}
  }
})

const {msg} =toRefs(props)
// tableData.value = (msg.filename_list).slice(0,10)
// tablePage.total=msg.filename_list.length
console.log(msg.value.filename_list);


const tableData = ref((msg.value.filename_list).slice(0,10))
const tablePage = reactive({
    total: msg.value.filename_list.length,
    currentPage: 1,
    pageSize: 10
})

const handlePageChange = ({ currentPage, pageSize }) => {
    tablePage.currentPage = currentPage
    tablePage.pageSize = pageSize
    tableData.value = msg.value.filename_list.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize)
}
</script>
<template>
        <el-breadcrumb :separator-icon="ArrowRight" size="large" style="margin-bottom: 10px;">
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>文件分布信息</el-breadcrumb-item>
        </el-breadcrumb>
    <div class="table">
        <vxe-table stripe :row-config="{isCurrent: true, isHover: true}" :data="tableData" align="center">
            <vxe-column field="path" title="文件包路径" width="700"></vxe-column>
            <vxe-column field="linecount" title="代码行数"></vxe-column>
            <vxe-column field="filename" title="文件名称" width="300"></vxe-column>
            <vxe-column title="操作" show-overflow>
                <template #default="{ row }">
                    <el-button style="background-color: #1d8e8a;color: white;" @click="editEvent(row)">详情</el-button>
                </template>
            </vxe-column>
        </vxe-table>
        <vxe-pager v-model:current-page="tablePage.currentPage" v-model:page-size="tablePage.pageSize"
            :total="tablePage.total" @page-change="handlePageChange">
        </vxe-pager>
    </div>
<div>
    <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/origin/5')">下一步</el-button>
    <el-button @click="router.push('/home/code')">返回</el-button>
</div>
</template>
<style scoped>

</style>