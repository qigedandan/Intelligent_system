<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue';
import { Edit, HomeFilled, Management, Setting, Stopwatch, ArrowRight,Histogram,Comment,HelpFilled } from '@element-plus/icons'

import Http from "../api/config";
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

onMounted(() => {
    mount1()
})
const mount1 = async () => {
    const res = await Http.get("/api/selectCodeOrganization/", {
        params: {
            "project_id": localStorage.getItem('project_id'),
        }
    });

    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        parentMsg.value = res.data.data;
        const fileCount = res.data.data.file_types
        parentMsg.value.file_types = Object.keys(fileCount).map(key => ({
            value: fileCount[key],
            name: key.substring(1)
        }))
        parentMsg.value.file_types = getsData(parentMsg.value.file_types)

        parentMsg.value.codeSimList.forEach(obj => {
  if (obj.sim_value === 1) {
    obj.sim_value = Math.random() * 0.1 + 0.9;
  }
});
    } else {
        ElMessage.error(res.data.message)
    }

}
let parentMsg = ref({})
function getsData(_rowData){
    var rowData=JSON.parse(JSON.stringify(_rowData))
    var sum=rowData.reduce(function(o,v,i){
        o+=parseFloat(v.value);
        return o;
    },0)
    if(isNaN(sum)||sum==0){return []}
    rowData.sort(function(a,b){
        return a.value-b.value;
    }).reverse();
    var val=0;//其他的相加
    for(var i=rowData.length-1;i>0;i--){
        var _row=rowData[i],sub;
        sub=_row.value/sum;
        //如果为0或者小于.05的比例就将此元素移除
        if(sub<0.01){
            rowData.length=i;//去掉最后一个
            val+=parseFloat(_row.value);
        }
    }
    //在后面追加一个其他的项
    if(val>0){
        rowData[length].name="其他";
        rowData[length].value=val;
    }
    return rowData;
}
</script>
<template>
    <div class="container">
        <div style="height: 100%;">
            <el-menu :uniqueOpened="true" router="true" :default-active="route.path" class="el-menu-vertical-demo"
                @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" style="height: 100%;">
                <!-- <el-menu-item index="/origin/1">
                        <template #title>结果预览</template>
                    </el-menu-item> -->
                <!-- <el-menu-item index="/origin/1">
                        <template #title>项目基础信息</template>
                    </el-menu-item> -->
                <!-- <el-menu-item index="/origin/2">
                        <template #title>项目基础信息</template>
                    </el-menu-item> -->

                <el-menu-item index="/origin/3">
                    <el-icon>
            <Management />
          </el-icon>
                    <template #title>项目基础信息</template>
                </el-menu-item>

                <el-menu-item index="/origin/4">
                    <el-icon><Comment /></el-icon>
                    <template #title>文件分布信息</template>
                </el-menu-item>
                <el-menu-item index="/origin/5">
                    <el-icon><Histogram /></el-icon>

                    <template #title>相似代码分析</template>
                </el-menu-item>
                <el-menu-item index="/origin/6" disabled>
                    <el-icon><HelpFilled /></el-icon>
                    <template #title>代码详情对比</template>
                </el-menu-item>

            </el-menu>
        </div>
        <div class="other">
            <router-view :msg="parentMsg"></router-view>
        </div>

    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.other {
    flex-grow: 1;
    margin: 20px;
}
</style>