<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Http from "../api/config";
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
onMounted(async () => {
    const res = await Http.get("/api/selectProject/", {
        params: {
            "project_id": localStorage.getItem('project_id'),
        }
    });

    if (res.data.status == 0) {
        formInline.value = res.data.data[0].fields
    } else {
        ElMessage.error(res.data.message)
    }


    const res2 = await Http.get("/api/selectALLSubsystems/", {
        params: {
            "project_id": localStorage.getItem('project_id'),
        }
    });

    tableData1.value = res2.data.data;
}


)

const formInline = ref({
    "project_id": "",
    "name": "",
    "commissioning_unit": "",
    "submit_unit": "",
    "estimatedAmount": 0,
    "submitAmount": 0,
    "contractAmount": 0,
    "type": "",
    "periodic": 0,
    "location": "",
    "personNumber": 0,
    "review_time": "",
    "industry": "",
})
const submit = async () => {
    console.log('数据：', formInline.value);
    const res = await Http.post('/api/addProject/', formInline.value);
    if (res.data.status == 0) {
        localStorage.setItem('project_id', formInline.value.project_id)
        ElMessage.success(res.data.message)
    } else {
        ElMessage.error(res.data.message)
    }
    const res2 = await Http.get("/api/selectALLSubsystems/", {
        params: {
            "project_id": localStorage.getItem('project_id'),
        }
    });

    tableData1.value = res2.data.data;

}

const tableData1 = ref([])
const dialogVisible = ref(false)
const dialogData = ref('')
const showContent = (row) => {
    dialogData.value = row.fields.document
    dialogVisible.value = true
}
const showFun = (row) => {
    localStorage.setItem('subName', row.fields.name);
    router.push({ name: 'list' })
}
</script>
<template>
    <div class="con">
        <div class="left-card">
            <h2 style="margin-top: 8%;">基本信息</h2>

            <div class="left-n">


            <div class="form">
                <div>
                    <el-form :model="formInline" class="demo-form-inline" label-width="120px">
                        <el-form-item label="项目编号">
                            <el-input v-model="formInline.project_id"></el-input>
                        </el-form-item>
                        <el-form-item label="项目行业">
                            <el-select v-model="formInline.industry" placeholder="--请选择--">
                                <el-option label="计算机" value="计算机"></el-option>
                                <el-option label="金融" value="金融"></el-option>
                                <el-option label="土木" value="土木"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目名称">
                            <el-input v-model="formInline.name"></el-input>
                        </el-form-item>

                        <el-form-item label="项目类型">
                            <el-select v-model="formInline.type" placeholder="--请选择--">
                                <el-option label="待送审" value="待送审"></el-option>
                                <el-option label="已送审" value="已送审"></el-option>
                                <el-option label="未送审" value="未送审"></el-option>
                            </el-select> </el-form-item>
                        <el-form-item label="地区">
                            <el-select v-model="formInline.location" placeholder="--请选择--">
                                <el-option label="上海" value="上海"></el-option>
                                <el-option label="北京" value="北京"></el-option>
                            </el-select> </el-form-item>

                        <el-form-item label="备注">
                            <el-input v-model="beizhu"></el-input>

                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div style="margin-top: 20%;">
        <el-button style="background-color: #1d8e8a;color: white;" @click="submit">保存</el-button>
        <el-button @click="router.push('/home/project')">返回</el-button>
        <!-- <el-button  style="background-color: #1d8e8a;color: white;" @click="router.push('/analyse/3')">下一步</el-button> -->
    </div>
        
    </div>
        <div class="container" style="height: 90%;">
            <el-card style="height: 90%;">
                <div class="upup">
                <el-dialog v-model="dialogVisible" title="需求详情" width="60%" align-center="true">
                    <div style="height:500px;overflow:auto;background:#EEEEEE;">
                        {{ dialogData }}
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                        </span>
                    </template>
                </el-dialog>
                <h2>子系统列表</h2>
                <div style="margin-bottom: 20px;">
                    <el-button @click="router.push('/analyse/22')"
                        style="background-color: #ffb34b;color: white;">新增</el-button>
                    <el-button style="background-color: #1f9088;color: white;">工时计算</el-button>
                </div>
                <div>
                    <vxe-table stripe :row-config="{ isCurrent: true, isHover: true }" max-height="490" align="center"
                        :data="tableData1">
                        <vxe-column field="fields.name" title="子系统名称"></vxe-column>
                        <vxe-column field="fields.developmentEffort_noadjusted" title="未调整工作量(UE)/p·h"></vxe-column>
                        <vxe-column field="fields.state" title="解析状态"></vxe-column>
                        <vxe-column field="fields.developmentEffort_adjusted" title="已调整开发工作量"></vxe-column>
                        <vxe-column field="fields.operationsEffort_adjusted" title="已调整运维工作量"></vxe-column>
                        <vxe-column title="操作" show-overflow width="300">
                            <template #default="{ row }">
                                <el-button @click="showContent(row)">需求详情</el-button>
                                <el-button @click="showFun(row)"
                                    style="background-color: #1d8e8a;color: white;">功能点</el-button>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </vxe-column>
                    </vxe-table>
                </div>
            </div>
            </el-card>


        </div>
    </div>

</template>
<style scoped>
.con {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.left-card {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.left-n{
    margin-top: 10%;
    width: 60%;
}
.container {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.upup {
    text-align: start;
    height: 570px;
}
</style>