<script setup>
import { onMounted, reactive,ref } from 'vue'
import Http from "../api/config";
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

onMounted(async () => {
  const res = await Http.get("/api/selectProject/", {
    params: {
      "project_id": localStorage.getItem('project_id'),
    }
  });

  if (res.data.status == 0) {
    formInline.value = res.data.data[0].fields
  } else {
    ElMessage.error(res.data.message)
  }
})
const router = useRouter()
const route = useRoute()
const formInline = ref({
  "project_id": "",
  "name": "",
  "commissioning_unit": "",
  "submit_unit": "",
  "estimatedAmount": 0,
  "submitAmount": 0,
  "contractAmount": 0,
  "type": "",
  "periodic": 0,
  "location": "",
  "personNumber": 0,
  "review_time": "",
  "industry": "",
})
const submit = async () => {
  console.log('数据：',formInline.value);
  const res = await Http.post('/api/addProject/', formInline.value);
  if (res.data.status == 0) {
    localStorage.setItem('project_id', formInline.value.project_id)
    ElMessage.success(res.data.message)
  } else {
    ElMessage.error(res.data.message)
  }


}
const beizhu=ref('')
</script>
<template>
  <div class="container">
<el-card  style="width: 500px;height: 90%;">


      <h2>基本信息</h2>

      <div class="form">
                    <el-form :model="formInline" class="demo-form-inline" label-width="120px" size="large">
                        <el-form-item label="项目编号">
                            <el-input v-model="formInline.project_id"></el-input>
                        </el-form-item>
                        <el-form-item label="项目行业">
                            <el-select v-model="formInline.industry" placeholder="--请选择--">
                                <el-option label="计算机" value="计算机"></el-option>
                                <el-option label="金融" value="金融"></el-option>
                                <el-option label="土木" value="土木"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目名称">
                            <el-input v-model="formInline.name"></el-input>
                        </el-form-item>

                        <el-form-item label="项目类型">
                            <el-select v-model="formInline.type" placeholder="--请选择--">
                                <el-option label="待送审" value="待送审"></el-option>
                                <el-option label="已送审" value="已送审"></el-option>
                                <el-option label="未送审" value="未送审"></el-option>
                            </el-select> </el-form-item>
                        <el-form-item label="地区">
                            <el-select v-model="formInline.location" placeholder="--请选择--">
                                <el-option label="上海" value="上海"></el-option>
                                <el-option label="北京" value="北京"></el-option>
                            </el-select> </el-form-item>

                        <el-form-item label="备注">
                            <el-input v-model="beizhu"></el-input>

                        </el-form-item>
                    </el-form>
            </div>
          </el-card>
    <div>
      <el-button style="background-color: #1d8e8a;color: white;" @click="submit">保存</el-button>
      <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/analyse/22')">下一步</el-button>
      <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/analyse/23')">功能点列表</el-button>
      <el-button @click="router.push('/home/project')">返回</el-button>
    </div>
  </div>
</template>
<style scoped>
.form {
  display: flex;
  justify-content: center;
  flex-grow: 1;

}

.form>div {
  margin-inline: 40px;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.number {
  width: 220px;
}
</style>