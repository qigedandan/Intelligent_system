<template>
    <div id="home-page-traffic_chart" style="width: 600px; height: 280px"></div>
</template>
  
<script setup>
import { ref,inject,onMounted } from 'vue' 	// import the Vue 3 <template> tag to use in our page.

const echarts = inject('echarts')
onMounted(() => {
    const myChart = echarts.init(document.getElementById('home-page-traffic_chart'))
    // 绘制图表
    myChart.setOption({
        title: {
            text: '今日话务统计'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    })
    window.onresize = function () {
        myChart.resize()
    }
})

</script>
  