<script setup>
import { reactive } from 'vue';
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import Http from '../api/config';
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router';


const name = ref('')
const router = useRouter()

const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')


const toolbarConfig = {}
const editorConfig = { placeholder: '请输入需求文本...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
let mode = 'simple'
const textarea = ref('')
const submit = async () => {
  if(!(name.value)){
    ElMessage.error('未填写文档名称')
    return
  }
  const res = await Http.post('/api/addSubsystem/', {
    name: name.value,
    "project_id": localStorage.getItem('project_id'),
    "state": "待分析",
    document: textarea.value,
  })
  if (res.data.status == 0) {
    ElMessage.success('文档上传成功')
    router.push('/analyse/23')

  } else {
    ElMessage.error('文档名称重复')
  }
}

</script>
<template>
  <div class="container">

    <div class="upup">
      <h2>上传需求文档</h2>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="文档名称" required>
          <el-input v-model="name" placeholder=""></el-input>
        </el-form-item>

      </el-form>
      <div>
        <el-input v-model="textarea" :rows="22" type="textarea" placeholder="在这里粘贴需求文档内容" />
      </div>
    </div>

    <div style="align-self: center;">
      <el-button @click="router.push('/analyse/1')">上一步</el-button>
      <el-button style="background-color: #1d8e8a;color: white;" @click="submit">下一步</el-button>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.upup{
  width: 80%;
    text-align: start;
}
</style>