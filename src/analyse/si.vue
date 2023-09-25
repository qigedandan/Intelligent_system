<script setup>
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const tableData1 = ref([
    { area:'江苏/南京市',type:'需求分析师',level:'高级',time1:5,time2:1800.19,price1:null,price2:0.00 },
    { area:'江苏/南京市',type:'需求分析师',level:'高级',time1:5,time2:1800.19,price1:null,price2:0.00 },
    { area:'江苏/南京市',type:'需求分析师',level:'高级',time1:5,time2:1800.19,price1:null,price2:0.00 },
    { area:'江苏/南京市',type:'需求分析师',level:'高级',time1:5,time2:1800.19,price1:null,price2:0.00 },
    { area:'江苏/南京市',type:'需求分析师',level:'高级',time1:5,time2:1800.19,price1:null,price2:0.00 },
    { area:'江苏/南京市',type:'需求分析师',level:'高级',time1:5,time2:1800.19,price1:null,price2:0.00 },


])
</script>
<template>
    <div class="container">
<div class="upup">
    <h2>测算/工时分配</h2>
    <div class="data">
    <span>总工时：90,009.71p·h</span>
    <span>合计工时占比：100%</span>
    <span>人力成本总计：0.00元</span>
</div>
    <div style="margin-block: 15px;">
        <el-button style="background-color: #ffb34b;color: white;">新增</el-button>
    </div>
    <div>
        <vxe-table  stripe align="center" :data="tableData1">
            <vxe-column field="area" title="地区"></vxe-column>
            <vxe-column field="type" title="人员类型"></vxe-column>
            <vxe-column field="level" title="人员级别"></vxe-column>
            <vxe-column field="time1" title="工时占比(%)"></vxe-column>
            <vxe-column field="time2" title="工时(p.h)"></vxe-column>
            <vxe-column field="price1" title="工时成本(元/p.h)"></vxe-column>
            <vxe-column field="price2" title="人力成本(元)"></vxe-column>
            <vxe-column title="操作" show-overflow>
        <template #default="{ row }">
          <el-button type="danger">删除</el-button>
        </template>
      </vxe-column>
        </vxe-table>
    </div>
</div>
    <div>
        <el-button  @click="router.push('/analyse/3')">上一步</el-button>
        <el-button>保存</el-button>
        <el-button  style="background-color: #1d8e8a;color: white;" @click="router.push('/analyse/5')">下一步</el-button>
        <el-button>返回</el-button>
    </div>
</div>
</template>
<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.upup{
    text-align: start;
}
.data>span{
    margin-right:50px;
}
</style>