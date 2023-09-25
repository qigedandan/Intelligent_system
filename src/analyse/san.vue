<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Http from "../api/config";
import { ElMessage } from 'element-plus'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
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

const name = 'test1'
let dialogVisible =ref(false)

onMounted(async() => {
    const res = await Http.get("/api/costAnalyzer/", {
        params: {
            "name": 'test1',
            "project_id": localStorage.getItem('project_id'),
        }

    });
    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        cost.value = res.data.cost
        cost.value.development*=2
        cost.value.operations*=10
        cost.value.totalCost=cost.value.development+cost.value.operations
    option2.value.series[0].data[0] = res.data.cost.development.toFixed(2)
    option2.value.series[0].data[1] = res.data.cost.operations.toFixed(2)
    option2.value.series[0].data[2] = res.data.cost.totalCost.toFixed(2)
    mount3()
    } else {
        dialogVisible.value=true
        ElMessage.error(res.data.message)
    }

}
)
// const mount1 = async () => {
//     // name = 'test1'
//     const res = await Http.get("/api/selectEffort_noadjusted/", {
//         params: {
//             "name": 'test1',
//             "project_id": localStorage.getItem('project_id'),
//         }
//     });
//     if (res.data.status == 0) {
//         ElMessage.success(res.data.message)
//         AE.developmentEffort = res.data.developmentEffort
//         AE.operationsEffort = res.data.developmentEffort
//     } else {
//         ElMessage.error(res.data.message)
//     }

// }
const mount2 = async () => {
    const res = await Http.get("/api/costAnalyzer/", {
        params: {
            "name": 'test1',
            "project_id": localStorage.getItem('project_id'),
        }

    });
    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        cost.value = res.data.cost
        cost.value.development*=2
        cost.value.operations*=10
        cost.value.totalCost=cost.value.development+cost.value.operations
    option2.value.series[0].data[0] = res.data.cost.development.toFixed(2)
    option2.value.series[0].data[1] = res.data.cost.operations.toFixed(2)
    option2.value.series[0].data[2] = res.data.cost.totalCost.toFixed(2)
    } else {
        dialogVisible.value=true
        un3=false
        ElMessage.error(res.data.message)
        
    }

}
let un3 = true
const mount3 = async () => {
    const res = await Http.get("/api/selectALLSubsystems/", {
        params: {
            "project_id": localStorage.getItem('project_id'),
        }

    });
    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        const list = res.data.data
        const name = 'test1'
        const obj = list.find(item => item.fields.name == name);
        option.value.series[0].data[0] = obj.fields.developmentEffort_adjusted.toFixed(2)
        option.value.series[0].data[1] = obj.fields.operationsEffort_adjusted.toFixed(2)
        option.value.series[0].data[2] = (obj.fields.developmentEffort_adjusted + obj.fields.operationsEffort_adjusted).toFixed(2)
    } else {
        ElMessage.error(res.data.message)
    }
}
const cost = ref({
    "development": 0,
    "operations": 0,
    "totalCost": 0
})
const save = async () => {
    
    const res = await Http.post('/api/adjustEffort/', {
        "name": 'test1',
        "project_id": localStorage.getItem('project_id'),
        "A": AE.A,
        "IL": AE.IL,
        "L": AE.L,
        "T": AE.T,
    });

    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        console.log(res.data.effort);
        effort.value = (res.data.effort)
        option.value.series[0].data[0] = effort.value.development.toFixed(2)
        option.value.series[0].data[1] = effort.value.operations.toFixed(2)
        option.value.series[0].data[2] = (effort.value.development + effort.value.operations).toFixed(2)
        mount2()
    } else {
        ElMessage.error(res.data.message)
    }
    
}
const router = useRouter()
const AE = reactive({
    developmentEffort: 50510.5,
    operationsEffort: 50510.5,
    A: null,
    IL: null,
    L: null,
    T: null
})
const effort = ref({
    "development": 0,
    "operations": 0,
    "totalEffort": 0
})

const option = ref({
    grid: {
        top: '20%',
        right: '5%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['开发', '运维', '总计'],
        axisLabel: {
            textStyle: {
                fontSize: 14,
                fontFamily: 'Microsoft YaHei'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            textStyle: {
                fontSize: 14,
                fontFamily: 'Microsoft YaHei'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    series: [
        {
            name: '工作量',
            type: 'bar',
            data: [200, 180, 250],
            barMaxWidth: 40,
            itemStyle: {
                normal: {
                    color: function (params) {
                        var colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6'];
                        return colors[params.dataIndex]
                    }
                }
            }
        }
    ]
});
const option2 = ref({
    grid: {
        top: '20%',
        right: '5%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['开发', '运维', '总计'],
        axisLabel: {
            textStyle: {
                fontSize: 14,
                fontFamily: 'Microsoft YaHei'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '万元', // 设置y轴的名称为万元
        axisLabel: {
            textStyle: {
                fontSize: 14,
                fontFamily: 'Microsoft YaHei'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    series: [
        {
            name: '成本',
            type: 'bar',
            data: [200, 180, 250],
            barMaxWidth: 40,
            itemStyle: {
                normal: {
                    color: function (params) {
                        var colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6'];
                        return colors[params.dataIndex]
                    }
                }
            }
        }
    ]
});
const cancel = ()=>{
    dialogVisible.value = false
}
const certain = ()=>{
    dialogVisible.value = false;
    save()
}
const parameter = ()=>{
    dialogVisible.value=true
}
</script>
<template>
    <el-dialog
  title="填写工作量计算参数"
  v-model="dialogVisible"
  width="30%"
  align-center="true" 
>
<div class="form">
            <div>
                <span>应用邻域调整因子(A)</span>
                <span><el-input class="bt" v-model="AE.A"></el-input></span>
                <span>取值范围(0.8~1.2)</span>
            </div>
            <div>
                <span>软件完整性级别(IL)</span>
                <span><el-input class="bt" v-model="AE.IL"></el-input></span>
                <span>取值范围(0.8~1.8)</span>
            </div>
            <div>
                <span>开发语言调整因子(L)</span>
                <span><el-input class="bt" v-model="AE.L"></el-input></span>
                <span>取值范围(0.8~1.2)</span>
            </div>
            <div>
                <span>最大团队规模调整因子(T)</span>
                <span><el-input class="bt" v-model="AE.T"></el-input></span>
                <span>取值范围(0.8~1.2)</span>
            </div>



        </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="certain">确 定</el-button>
    </span>
  </template>
</el-dialog>

    <div class="container">
        <div>
            <h2>工时/成本计算</h2>
            <div class="two">

                <div>

                    <h2>工作量分布</h2>
                    <div>功能点×行业软件开发生产率中值÷劳动时间×调整因子=调整后工作量</div>
                    <v-chart class="chart" :option="option" autoresize />
                    <h3>开发：{{ option.series[0].data[0] }}人月</h3>
                    <h3>运维：{{ option.series[0].data[1] }}人月</h3>
                    <h3>总计工作量：{{ option.series[0].data[2] }}人月</h3>
                </div>
                <div>
                    <h2>成本计算</h2>
                    <div>调整后工作量×地区人月费率=总费用</div>
                    <v-chart class="chart" :option="option2" autoresize />
                    <h3>开发：{{ (cost.development).toFixed(2) }}万元</h3>
                    <h3>运维：{{ (cost.operations).toFixed(2) }}万元</h3>
                    <h3>最终测算成本：{{ (cost.totalCost).toFixed(2) }}万元</h3>
                </div>


            </div>

        </div>

        <div>
            <el-button @click="router.push('/analyse/23')">上一步</el-button>
            <el-button @click="parameter">修改参数</el-button>
            <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/home/project')">完成</el-button>

        </div>
    </div>
</template>
<style scoped>
.form {
    display: flex;
    flex-direction: column;

}

.form>div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 5px;
}

.form>div>span {
    width: 200px;
}

.bt {
    width: 100px;
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.two {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.chart {
    height: 300px;
    width: 440px;

}
</style>