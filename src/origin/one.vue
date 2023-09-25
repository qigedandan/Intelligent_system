<script setup>
import { toRefs, defineProps,ref, onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import Http from "../api/config";
import { ElMessage } from 'element-plus'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
    CanvasRenderer,
    PieChart,
    BarChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);
const router = useRouter()
const route = useRoute()
onMounted(()=>{
    // mount2()
})
const mount2 = async()=>{
    const res = await Http.post("/api/codeAnalyzer/", {
            "project_id": localStorage.getItem('project_id'),
        }
    );

    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        const fileCount = res.data.file_types
        option.value.series[0].data=Object.keys(fileCount).map(key => ({
  value: fileCount[key],
  name: key.substring(1)
}))
    loading.value= false
    } else {
        ElMessage.error(res.data.message)
    }

}
const props = defineProps({
    //子组件接收父组件传递过来的值
    msg: {
        type: Object,
        default: {}
    }
})

const { msg } = toRefs(props)
const option = ref({
    title: {
        text: '文件类型占比',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [],
    },
    series: [
        {
            name: '工作量占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});
const loading = ref(true)
</script>
<template>
    <h3>子系统名称：{{ msg.name }}</h3>
    <div class="card">
        <el-card class="box-card">
            <el-form label-position="right" label-width="200px" style="max-width: 460px">
            <el-form-item label="项目编号：">{{ msg.project_id }}</el-form-item>
            <el-form-item label="子系统名称：">{{ msg.name }}</el-form-item>
            <el-form-item label="代码行数：">{{ msg.code_lines }}</el-form-item>
            <el-form-item label="原创代码行数：">{{ msg.original_code_lines }}</el-form-item>
            <el-form-item label="文件数量：">{{ msg.file_count }}</el-form-item>
            <el-form-item label="原创文件数量：">{{ msg.original_file_count }}</el-form-item>
        </el-form>
  </el-card>
  <el-card class="box-card"
  v-loading="loading"  >
    <v-chart class="chart" :option="option" autoresize />

  </el-card>

    


</div>
<div>
    <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/origin/4')">下一步</el-button>
    <el-button @click="router.push('/home/code')">返回</el-button>
</div>
</template>
<style scoped>
.card{
    display: flex;
    justify-content: center;
    align-items: center;
}
.box-card {
  width: 30%;
}
.chart {
  height: 300px;
}
</style>