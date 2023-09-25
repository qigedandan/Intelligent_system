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

const router = useRouter()
const example_text = ref('需求文档')
const option1 = ref({
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
            data: [115.41, 13.84, 129.25],
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
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['json', 'js', 'html', 'java', 'py'],
    },
    series: [
        {
            name: '文件类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{ value: 37, name: 'js' },
            { value: 16, name: 'html' },
            { value: 162, name: 'java' },
            { value: 20, name: 'json' }],
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
const introduction = ref('')
const xiangmu = () => {
    localStorage.setItem('project_id', 'X102')
    localStorage.setItem('subName', 'test3')
    router.push('/analyse/3')

}
const daima = () => {
    localStorage.setItem('project_id', 'X001')
    router.push('/origin/3')
}
</script>
<template>
              <el-breadcrumb :separator-icon="ArrowRight" size="large" style="margin-bottom: 10px;">
            <el-breadcrumb-item>主页</el-breadcrumb-item>
            <el-breadcrumb-item>系统介绍</el-breadcrumb-item>
        </el-breadcrumb>

    <div class="container">

        <div class="left-card">
            <el-card>
                <div class="title">


                    <div style="margin-right: 20px;">
                        <el-image style=" height: 150px"
                            src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/diting%20(1).png" fit="contain" />
                    </div>
                    <div>
                        <h2 style="color: #1abc9c;">谛听DiTing</h2>
                        <h2 style="color: #1abc9c;">代码审查与项目分析系统</h2>
                    </div>
                </div>

                <div style="text-align: justify;">
                    <p _msthash="123" _msttexthash="342215315">欢迎使用谛听（DiTing）代码审查与项目分析系统！</p>

                    <p _msthash="124" _msttexthash="1019255731">
                        我们的系统是一款专门为开发者和项目管理人员设计的工具，旨在帮助您更加高效地管理代码审查和项目成本工作量的计算。使用我们的系统，您可以：</p>

                    <ol>
                        <li _msthash="125" _msttexthash="132037685">自动化代码审查流程，减少繁琐的手动操作；</li>
                        <li _msthash="126" _msttexthash="113621690">提高代码质量，减少潜在的安全风险；</li>
                        <li _msthash="127" _msttexthash="189798778">更精确地计算项目成本和工作量，帮助您做出更明智的决策。</li>
                    </ol>

                    <p _msthash="128" _msttexthash="1363674156">
                        无论您是一名开发者还是一位项目管理人员，我们都相信我们的系统能够为您带来不同寻常的价值。我们的系统基于最先进的技术，并经过了严格的测试和验证，可以保证稳定可靠。</p>

                    <p _msthash="129" _msttexthash="746608811">如果您在使用我们的系统时遇到任何问题或者有任何建议和反馈，请随时联系我们的客服团队。我们会尽快回复您并帮助您解决问题。
                    </p>

                    <p _msthash="130" _msttexthash="420539613">再次感谢您选择谛听（DiTing）代码审查与项目分析系统，祝您使用愉快！</p>
                </div>
                <div>
                    <el-button style="background-color: #42b883;color: white;width: 100px;"
                        @click="router.push('/home/project')">快速上手</el-button>
                    <el-button style="width: 100px;" @click="xiangmu">项目分析示例</el-button>
                    <el-button style="width: 100px;" @click="daima">代码溯源示例</el-button>

                </div>
            </el-card>
        </div>
        <div>

            <div class="card  animated animate__fadeInRight">
                <el-card class="box-card">
                    <div class="xuqiu">
                        {{ example_text }}
                        <el-image style=" height: 200px" src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/word.png"
                            fit="contain" />

                    </div>
                </el-card>
                <el-image style=" height: 50px;margin: 40px;"
                    src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/24gf-forward.png" fit="contain" />

                <el-card>
                    成本估算
                    <v-chart class="chart" :option="option1" autoresize />
                </el-card>

            </div>
            <div class="card  animated animate__fadeInRight">
                <el-card class="box-card">
                    <div class="xuqiu">
                        项目源码
                        <el-image style=" height: 200px"
                            src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/%E4%BB%A3%E7%A0%81%E5%9D%97.png"
                            fit="scale-down" />

                    </div>
                </el-card>
                <el-image style=" height: 50px;margin: 40px;"
                    src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/24gf-forward.png" fit="contain" />

                <el-card>
                    查重溯源
                    <v-chart class="chart" :option="option2" autoresize />
                </el-card>

            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart {
    height: 200px;
    width: 320px;
    margin-right: 15px;
}

.xuqiu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.left-card {
    margin-left: 20px;
    width: 50%;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>