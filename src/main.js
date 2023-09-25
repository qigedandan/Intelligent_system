import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import router from './router/index'
// import * as echarts from 'echarts'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'animate.css';



const app = createApp(App)
app.use(VXETable)
app.use(ElementPlus)
app.use(router)
// app.config.globalProperties.$echarts = echarts
app.use(hljsVuePlugin)
app.mount('#app')
