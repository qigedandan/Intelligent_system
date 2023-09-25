<script setup>
import { onMounted,computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { Edit, Picture, UploadFilled,Histogram } from '@element-plus/icons-vue'


const router = useRouter()
const route = useRoute(()=>{

})

let page = computed(()=>{
    if(route.path=='/analyse/22')return 1;
    if(route.path=='/analyse/1')return 0;
    if(route.path=='/analyse/23')return 2;
    if(route.path=='/analyse/3')return 3;
    return 0

})

</script>
<template>
    <div class="container">
        <!-- <div>
            <el-menu :uniqueOpened="true" :default-active="route.path" router="true" class="el-menu-vertical-demo"
                @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" @select="handleSelect" style="height: 100%;">
                <el-menu-item index="/analyse/21">基本信息</el-menu-item>
            <el-menu-item index="/analyse/22">添加子系统</el-menu-item>
            <el-menu-item index="/analyse/23">功能点列表</el-menu-item>

                <el-menu-item index="/analyse/3">
                    <template #title>工时/成本计算</template>
                </el-menu-item>
            </el-menu>
        </div> -->
        <div>
            <el-steps :space="200" :active="page" simple>
                <el-step title="基本信息" :icon="Edit" />
                <el-step title="需求文档分析" :icon="UploadFilled" />
                <el-step title="功能点列表" :icon="Histogram" />

                <el-step title="工时/成本计算" :icon="Picture" />
            </el-steps>
        </div>
        <div class="other">
            <router-view></router-view>
        </div>

    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.other {
    flex-grow: 1;
    margin: 20px;
}
</style>