<script setup>
import { toRefs, defineProps, ref, onMounted, watchEffect, inject, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
  //子组件接收父组件传递过来的值
  msg: {
    type: Object,
    default: {}
  }
})
const { msg } = toRefs(props)
const echarts = inject('echarts')

const option = ref({
  title: {
    text: '克隆文件数量分布',
    left: 'center'
  },
  color:["#5ab1ef","#ffb980"],

  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 'bottom',

  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 1,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
});
const option2 = ref({
  title: {
    text: '克隆代码行数分布',
    left: 'center'
  },
  color:["#b6a2de","#2ec7c9"],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 'bottom',

  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 1,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
});
const option3 = ref({
  title: {
    text: '文件类型分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 'bottom',

  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 1,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
});
const tableData = ref([
  {
    title: '文件数量',
    yuan: 'Loading',
    clone: '',
    all: '',
    zhan: '',
  },
  {
    title: '代码行数',
    yuan: 'Loading',
    clone: '',
    all: '',
    zhan: '',
  },
])
watch(() => props.msg, (newValue, oldValue) => {
  // 监听数据变化并更新图表
  if (newValue) {
    option.value.series[0].data = [
      { value: newValue.userful_file_count - newValue.original_file_count, name: '克隆文件数量' },
      { value: newValue.original_file_count, name: '原创文件数量' },
    ]
    option2.value.series[0].data = [
      { value: newValue.userful_code_lines - newValue.original_code_lines, name: '克隆代码行数' },
      { value: newValue.original_code_lines, name: '原创代码行数' },
    ]
    option3.value.series[0].data = newValue.file_types
    tableData.value[0].useful = newValue.userful_file_count
    tableData.value[0].yuan = newValue.original_file_count
    tableData.value[0].clone = newValue.userful_file_count - newValue.original_file_count
    tableData.value[0].all = newValue.file_count
    tableData.value[0].zhan = ((tableData.value[0].clone / tableData.value[0].useful) * 100).toFixed(2) + "%"
    tableData.value[1].useful = newValue.userful_code_lines
    tableData.value[1].yuan = newValue.original_code_lines
    tableData.value[1].clone = newValue.userful_code_lines - newValue.original_code_lines
    tableData.value[1].all = newValue.code_lines
    tableData.value[1].zhan = ((tableData.value[1].clone / tableData.value[1].useful) * 100).toFixed(2) + "%"
  }
  initChart()
})
const loading = ref(false)


function initChart() {
  let chart1 = echarts.init(document.getElementById("chart1"));
  // 把配置和数据放这里
  chart1.setOption(option.value)
  window.onresize = function () {
    //自适应大小
    chart1.resize();
  };
  let chart2 = echarts.init(document.getElementById("chart2"));
  // 把配置和数据放这里
  chart2.setOption(option2.value)
  window.onresize = function () {
    //自适应大小
    chart2.resize();
  };
  let chart3 = echarts.init(document.getElementById("chart3"));
  // 把配置和数据放这里
  chart3.setOption(option3.value)
  window.onresize = function () {
    //自适应大小
    chart3.resize();
  };


}


onMounted(() => {
  if (msg.value) {
    option.value.series[0].data = [
      { value: msg.value.userful_file_count - msg.value.original_file_count, name: '克隆文件数量' },
      { value: msg.value.original_file_count, name: '原创文件数量' },

    ]
    option2.value.series[0].data = [
      { value: msg.value.userful_code_lines - msg.value.original_code_lines, name: '克隆代码行数' },
      { value: msg.value.original_code_lines, name: '原创代码行数' },

    ]
    option3.value.series[0].data = msg.value.file_types
    tableData.value[0].useful = msg.value.userful_file_count
    tableData.value[0].yuan = msg.value.original_file_count
    tableData.value[0].clone = msg.value.userful_file_count - msg.value.original_file_count
    tableData.value[0].all = msg.value.file_count
    tableData.value[0].zhan = ((tableData.value[0].clone / tableData.value[0].useful) * 100).toFixed(2) + "%"
    tableData.value[1].useful = msg.value.userful_code_lines
    tableData.value[1].yuan = msg.value.original_code_lines
    tableData.value[1].clone = msg.value.userful_code_lines - msg.value.original_code_lines
    tableData.value[1].all = msg.value.code_lines
    tableData.value[1].zhan = ((tableData.value[1].clone / tableData.value[1].useful) * 100).toFixed(2) + "%"
  }
  initChart()

  //生成图表应用的函数,给出的参数是一个列表的意义上的数据集合
});

watch(() => props.msg, (newValue, oldValue) => {
  // 监听数据变化并更新图表
  if (newValue) {
    option.value.series[0].data = [
      { value: newValue.userful_file_count - newValue.original_file_count, name: '克隆文件数量' },
      { value: newValue.original_file_count, name: '原创文件数量' },
    ]
    option2.value.series[0].data = [
      { value: newValue.userful_code_lines - newValue.original_code_lines, name: '克隆代码行数' },
      { value: newValue.original_code_lines, name: '原创代码行数' },
    ]
    option3.value.series[0].data = newValue.file_types
    tableData.value[0].useful = newValue.userful_file_count
    tableData.value[0].yuan = newValue.original_file_count
    tableData.value[0].clone = newValue.userful_file_count - newValue.original_file_count
    tableData.value[0].all = newValue.file_count
    tableData.value[0].zhan = ((tableData.value[0].clone / tableData.value[0].useful) * 100).toFixed(2) + "%"
    tableData.value[1].useful = newValue.userful_code_lines
    tableData.value[1].yuan = newValue.original_code_lines
    tableData.value[1].clone = newValue.userful_code_lines - newValue.original_code_lines
    tableData.value[1].all = newValue.code_lines
    tableData.value[1].zhan = ((tableData.value[1].clone / tableData.value[1].useful) * 100).toFixed(2) + "%"
  }
  initChart();
});

</script>
<template>
          <el-breadcrumb :separator-icon="ArrowRight" size="large" style="margin-bottom: 10px;">
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目基础信息</el-breadcrumb-item>
        </el-breadcrumb>
  <span style="font-size: larger;font-weight: bold;margin-right: 20px;">项目编号：{{ msg.project_id }}</span>
  <span style="font-size: larger;font-weight: bold;">项目名称：{{ msg.name }}</span>
  <div class="card">
    <div class="zhong">
      <el-table :data="tableData" border style="width: 80%;border: 5px solid #81858b;border" size="large">
        <el-table-column prop="title" label="-" />
        <el-table-column prop="useful" label="有效" />
        <el-table-column prop="yuan" label="原创" />
        <el-table-column prop="clone" label="克隆" />
        <el-table-column prop="all" label="总计" />
        <el-table-column prop="zhan" label="克隆占比" />
      </el-table>
    </div>
  </div>

  <div class="charts">
    <div>
      <div id="chart1" style="height:300px;"></div>

    </div>
    <div>
      <div id="chart2" style="height: 300px;"></div>

    </div>
    <div v-loading="loading">
      <div id="chart3" style="height: 300px;"></div>
    </div>
  </div>
  <div style="margin-top: 50px;">
    <el-button style="background-color: #1d8e8a;color: white;" @click="router.push('/origin/4')">下一步</el-button>
    <el-button @click="router.push('/home/code')">返回</el-button>
  </div>
</template>
<style scoped>
.el-row {
  margin-bottom: 2px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 2px;
  min-height: 36px;
}

.row-bg {
  padding: 2px 0;
  background-color: #f9fafc;
}

.chart {
  height: 300px;
}

.charts {
  display: flex;
  justify-content: center;
}

.charts>div {
  width: 30%;
}

.zhong {
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>