<script setup>
import { ref } from 'vue'
import { Edit, HomeFilled, Management, Setting, Stopwatch, ArrowRight } from '@element-plus/icons'
import { defineComponent, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const isCollapse = ref(true)
const handleSelect = (key, keyPath) => {
  console.log('key', key, typeof (key));
  if (key == '/home/project') {
    router.push({ path: '/home/project' })
  }
  if (key == '/home/code') {
    router.push({ path: '/home/code' })

  }
  if (key == '/home/index') {
    router.push({ path: '/home/index' })

  }
};
const enterfn = () => {
  isCollapse.value = false;
}
const leavefn = () => {
  isCollapse.value = true
}

</script>
<template>
  <div class="under">
    <div class="side">
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="height: 100%;"
        :default-active="route.path" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse"
        @mouseenter="enterfn" @mouseleave="leavefn">
        <el-menu-item index="0">
          <el-icon :size="30">
            <el-image style=" height: 60px"
              src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20230525110051-removebg-preview.png"
              fit="contain" />
          </el-icon>

          <template #title>谛听系统</template>
        </el-menu-item>
        <el-menu-item index="/home/index">
          <el-icon :size="20">
            <HomeFilled />
          </el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <el-menu-item index="/home/project"> <el-icon>
            <Edit />
          </el-icon>
          <template #title>项目管理</template></el-menu-item>
        <el-menu-item index="/home/code"> <el-icon>
            <Management />
          </el-icon>
          <template #title>源码管理</template></el-menu-item>

        <el-menu-item index="3">
          <el-icon>
            <Setting />
          </el-icon>
          <template #title>评审设置</template>
        </el-menu-item>

        <div class="tubiao">
          <el-image style=" height: 80px" src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/diting%20(1).png"
            fit="contain" />
          
        </div>
      </el-menu>
    </div>
    <div class="content">

      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.under {
  display: flex;
  height: 100%;
}


.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.tubiao {
  margin-top: 380px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
}
</style>