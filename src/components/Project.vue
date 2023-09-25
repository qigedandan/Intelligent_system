<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Http from "../api/config";

const router = useRouter()
const route = useRoute()
//table
const tableData1 = ref([])
const tableData2 = ref([])
const f5 = async () => {
  const res = await Http.get("/api/selectALLProjects/", {
    params: {
    }
  });

  tableData1.value = res.data.data.reverse();
  tableData2.value = tableData1.value.slice(0, 12);
  tablePage.total = res.data.data.length;
}

onMounted(async () => {
  await f5()
})
const tablePage = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 12
})

const handlePageChange = ({ currentPage, pageSize }) => {
  tablePage.currentPage = currentPage
  tablePage.pageSize = pageSize
  tableData2.value = tableData1.value.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
}
//form
const form = reactive({ name: '', region: '', date1: '', date2: '', delivery: false, type: [], resource: '', desc: '', })

//
const editEvent = (row) => {
  localStorage.setItem('project_id', row.fields.project_id)
  router.push('/analyse/1')
}
const addpro = () => {
  localStorage.setItem('project_id', null)
  router.push('/analyse/1')
}
</script>
<template>
  <div class="bread">
    <el-breadcrumb :separator-icon="ArrowRight" size="large">
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- <div class="form">
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item label="项目编号">
        <el-input v-model="form.name" style="width:170px"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.name" style="width:170px"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="form.region" placeholder="--请选择--" style="width:170px">
          <el-option label="类型一" value="shanghai"></el-option>
          <el-option label="类型二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="送审单位">
        <el-input v-model="form.name" style="width:170px"></el-input>
      </el-form-item>

    </el-form>
    <el-form :inline="true" ref="form" :model="form" label-width="80px" style="margin-left: -100px;">
      <el-form-item label="送审状态">
        <el-select v-model="form.region" placeholder="--请选择--" style="width:170px;">
          <el-option label="类型一" value="shanghai"></el-option>
          <el-option label="类型二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目行业">
        <el-select v-model="form.region" placeholder="--请选择--" style="width:170px">
          <el-option label="类型一" value="shanghai"></el-option>
          <el-option label="类型二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 170px;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">~</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="结束日期" v-model="form.date2" style="width: 170px;"></el-time-picker>
        </el-col>
      </el-form-item>
    </el-form>
  </div> -->
  <!-- <div class="buttons">
    <div>
      <el-button type="warning" @click="addpro">新增</el-button>
      <el-button type="danger">删除</el-button>
    </div>

    <el-button type="success" style="align-self:;">查询</el-button>

  </div> -->
  <!-- <div class="table">

    <vxe-table stripe  :row-config="{isCurrent: true, isHover: true}" :data="tableData2" align="center" max-height="400">
      <vxe-column type="checkbox" width="80"></vxe-column>
      <vxe-column field="fields.project_id" title="项目编号"></vxe-column>
      <vxe-column field="fields.name" title="项目名称"></vxe-column>
      <vxe-column field="fields.type" title="项目类型"></vxe-column>
      <vxe-column field="fields.location" title="项目地区"></vxe-column>
      <vxe-column field="fields.industry" title="项目行业"></vxe-column>
      <vxe-column  title="已上传源码">
        <template #default="{ row }">
          {{row.fields.isHavaCode?'是':'否'}}
        </template>
      </vxe-column>
      <vxe-column title="操作" width="100" show-overflow>
        <template #default="{ row }">
          <el-button  @click="editEvent(row)" style="background-color: #1d8e8a;color: white;">详情</el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <vxe-pager v-model:current-page="tablePage.currentPage" v-model:page-size="tablePage.pageSize"
      :total="tablePage.total" @page-change="handlePageChange">
    </vxe-pager>
  </div> -->
  <div style="text-align: left;margin-inline: 6px;">
      <el-button type="warning" @click="addpro" style="margin-bottom: -10px;">新增</el-button>
    </div>
  <div>
    <el-row :gutter="20" style="margin-right: 15px;margin-left: -5px" type="flex" v-loading="loading">
      <el-col v-for="(item, index) in tableData2" :key="index" :span="6">
        <el-card class="box-card" shadow="hover" :body-style="{ padding: '20px' }">
          <template #header>
            <div style="display: flex;justify-content: space-between;">
              <span>{{ item.fields.project_id }}</span>
              <span>
                <span> <el-tag :class="{'green':item.fields.type=='已送审','orange':item.fields.type=='待送审','red':item.fields.type=='未送审'}" >{{ item.fields.type }}</el-tag></span>
                <span>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <svg t="1684988276554" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2582" width="28" height="28">
                        <path
                          d="M512 704c35.2 0 64 28.8 64 64s-28.8 64-64 64-64-28.8-64-64 28.8-64 64-64z m-64-192c0 35.2 28.8 64 64 64s64-28.8 64-64-28.8-64-64-64-64 28.8-64 64z m0-256c0 35.2 28.8 64 64 64s64-28.8 64-64-28.8-64-64-64-64 28.8-64 64z"
                          p-id="2583" fill="#707070"></path>
                      </svg> </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="editEvent(item)">编辑</el-dropdown-item>
                        <el-dropdown-item divided>删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </span>
              </span>
            </div>
          </template>
          <div class="card-content">



            <div style="font-size: 12px;">
              <div>
                <div class="card-label">项目名称</div><span>{{ item.fields.name }}</span>
              </div>
              <div>
                <div class="card-label">所属地区</div><span>{{ item.fields.location }}</span>
              </div>
              <div>
                <div class="card-label">行业</div><span>{{ item.fields.industry }}</span>
              </div>
              <div>
                <div class="card-label">上传代码</div><span>
                  
                  <el-tag style="margin-left: -5px;" :type="item.fields.isHavaCode ? 'success' : 'danger'">{{ item.fields.isHavaCode ? '已上传' : '未上传' }}</el-tag>

                </span>
              </div>
            </div>

          </div>

        </el-card>
      </el-col>
    </el-row>

    <vxe-pager v-model:current-page="tablePage.currentPage" v-model:page-size="tablePage.pageSize"
      :total="tablePage.total" @page-change="handlePageChange">
    </vxe-pager>
  </div>
</template>
<style scoped>
.green{
  background-color: #00a870;color: white;
}
.red{
  background-color: #f56c6c;color: white;
}
.orange{
  background-color: #409eff;color: white;
}

.box-card{
  margin-top: 10px;
}
.card-label {
  color: rgb(197, 197, 197);
  margin-right: 8px;
  width: 70px;
  display: inline-block;
  margin-bottom: 5px;
}

.card-content {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form {
  border: 1px solid #e8eaec;
  padding: 10px;
  padding-top: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;

}

.bread {
  margin-bottom: 10px;
}
</style>