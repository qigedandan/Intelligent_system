<script setup>
import { onMounted, ref } from "vue";
import Http from "../api/config";
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    const res = await Http.get("/api/costAnalyzer/", {
        params:{
            "name": localStorage.getItem('subName'),
        "project_id": localStorage.getItem('project_id'),
        }

    });
    if(res.data.status==0){
    ElMessage.success(res.data.message)
  }else{
    ElMessage.error(res.data.message)
  }
    cost.value = res.data.cost
})
const cost = ref({
        "development": 0,
        "operations": 0,
        "totalCost": 0
    })
</script>
<template>
    <div class="container">
        <div>

            <h1>测算/实际成本</h1>
            <h2>项目名称：测算</h2>

            <h2>开发：{{ (cost.development).toFixed(3) }}万元</h2>
            <h2>运维：{{ (cost.operations).toFixed(3) }}万元</h2>
            <h2>最终测算成本：{{ (cost.totalCost).toFixed(3) }}万元</h2>

        </div>
        <div>
            <el-button  @click="router.push('/analyse/3')">上一步</el-button>
            <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/home/project')">完成</el-button>
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
</style>