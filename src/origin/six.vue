<script setup>
import { codes } from '../store/store.js'
import { useRouter } from 'vue-router';

const router = useRouter() // because of vue-router's lack of support for dynamic segments, we need to use the internal method of the store to
</script>
<template>
            <el-breadcrumb :separator-icon="ArrowRight" size="large" style="margin-bottom: 10px;">
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>代码详情对比</el-breadcrumb-item>
        </el-breadcrumb>
    <div class="card-class">
        <el-card style="width: 50%;">
            <el-form label-position="right" label-width="100px">
                <el-form-item label="文件路径：" >
                    <div class="two-lines">
                        {{ codes.path }}
                    </div>
                </el-form-item>

                <el-form-item label="代码行数："> {{ codes.linecount }}

                </el-form-item>
                <el-form-item label="相似占比："> {{ ((codes.sim_value) * 100).toFixed(2) }}%

                </el-form-item>
                <highlightjs :code="codes.content" style="max-height: 400px;width: 620px;  overflow-y: scroll;margin-right: 5px;">
                </highlightjs>
            </el-form>
        </el-card>
        <el-card  style="width: 50%;">
            <el-form label-position="right" label-width="100px">

                <el-form-item label="相似路径："> 
                    <div class="two-lines">
                        {{ codes.sim_path }}
                    </div>

                </el-form-item>
                <el-form-item label="代码行数："> {{ codes.linecount }}

                </el-form-item>
                <el-form-item label="相似占比："> {{ ((codes.sim_value) * 100).toFixed(2) }}%

                </el-form-item>
                <highlightjs :code="codes.sim_content" style="max-height: 400px;width: 620px; overflow-y: scroll;">
                </highlightjs>
            </el-form>
        </el-card>
    </div>
    <el-button style="background-color: #1d8e8a;color: white;margin-top: 10px;" @click="router.back()">返回</el-button>

</template>
<style scoped>
.two-lines {
    display: inline-block;

  height: 60px; /* 设置一个固定的高度 */
  overflow: hidden; /* 隐藏超出高度的内容 */
}
.card-class{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>