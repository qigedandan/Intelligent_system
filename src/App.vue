<script setup>
import { onMounted, ref } from 'vue'
import { Edit, Setting, Stopwatch, ArrowRight } from '@element-plus/icons'
import { defineComponent, reactive } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import * as echarts from 'echarts'
import { provide } from 'vue'

const router = useRouter()
const route = useRoute()

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
provide('echarts',echarts)  

</script>

<template>
  <div class="container">
      <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
