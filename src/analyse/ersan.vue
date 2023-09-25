<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

import Http from "../api/config";
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const res = await Http.get("/api/documentAnalyze/", {
    params: {
      "project_id": localStorage.getItem('project_id'),
      name: 'test1'
    }

  });
  console.log('11111')
  console.log(res)
  if (res.data.status == 0) {
    ElMessage.success(res.data.message)
  } else {
    ElMessage.error(res.data.message)
  }
  tableData1.value = res.data.data;
  tableData2.value = res.data.data.slice(0, 10);
  tablePage.total = res.data.data.length;
})
const tableData1 = ref([])
const tableData2 = ref([])
const dialogVisible = ref(false)
const dialogData = ref('')
const showContent = (row) => {
  dialogData.value = row.content
  dialogVisible.value = true
}

const tablePage = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

const handlePageChange = ({ currentPage, pageSize }) => {
  tablePage.currentPage = currentPage
  tablePage.pageSize = pageSize
  tableData2.value = tableData1.value.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
}
</script>
<template>
  <el-dialog v-model="dialogVisible" title="完整内容" width="35%" align-center="true">

    {{ dialogData }}

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="container">
    <div class="upup">
      <h2>功能点列表</h2>
      <div>
        <vxe-table stripe :row-config="{isCurrent: true, isHover: true}"  align="center" :data="tableData2">
          <vxe-column field="title" title="功能" show-overflow></vxe-column>
          <vxe-column field="type" title="数据功能"></vxe-column>
          <vxe-column field="content" title="内容" width="50%" show-overflow></vxe-column>
          <vxe-column title="操作" show-overflow>
            <template #default="{ row }">
              <el-button @click="showContent(row)" style="background-color: #1d8e8a;color: white;">查看文本</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </vxe-column>
        </vxe-table>
        <vxe-pager v-model:current-page="tablePage.currentPage" v-model:page-size="tablePage.pageSize"
          :total="tablePage.total" @page-change="handlePageChange">
        </vxe-pager>
      </div>
    </div>
    <div>
      <el-button @click="router.push('/analyse/1')">上一步</el-button>
      <el-button style="background-color: #1d8e8a;color: white;"
        @click="router.push('/analyse/3');">下一步(工时计算)</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.upup {
  text-align: start;
}
</style>