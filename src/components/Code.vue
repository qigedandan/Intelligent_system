<script setup>
import { ref, reactive, onMounted, inject, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Http from "../api/config";
import { ElMessage } from 'element-plus'
const echarts = inject('echarts')

const router = useRouter()
const route = useRoute()

const f5 = async () => {
    const res = await Http.get("/api/selectALLCodeOrganization/", {
        params: {
        }
    });

    if (res.data.status == 0) {
        ElMessage.success(res.data.message)
        tableData.value = res.data.data.reverse();
        tablePage.total = res.data.data.length;
        // init chart. 创建一个 echarts 实例，并展示数据。创建后就不执行继续
        initChart()
    } else {
        ElMessage.error(res.data.message)
    }
}
onMounted(() => {
    f5()
})

//table
const tableData = ref([])
const tablePage = reactive({
    total: 0,
    currentPage: 1,
    pageSize: 10
})

const handlePageChange = ({ currentPage, pageSize }) => {
    tablePage.currentPage = currentPage
    tablePage.pageSize = pageSize
    // f5() 这里是刷新重新获取
    initChart()
}
//form
const form = reactive({ name: '', region: '', date1: '', date2: '', delivery: false, type: [], resource: '', desc: '', })

const formInline = reactive({
    user: '',
    region: '',
})
//

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const upload = reactive({
    name: '',
    project_id: '',
})

const uploadFile = async (url) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
            // 更新进度
            progress.value = Math.round((event.loaded * 100) / event.total)
        },
    }

    try {
        const response = await Http.post(url, {
            project_id: upload.project_id,
            name: upload.name,
            code_zip: state.file
        }, config)

        if (response.data.status == 0) {
            ElMessage.success(response.data.message)
            dialogVisible.value = false
            dialogVisible2.value = false
            await Http.post('/api/codeAnalyzer/', {
                project_id: upload.project_id,
            })
            await f5()
        } else {
            ElMessage.error(response.data.message)
        }
    } catch (error) {
        console.error(error)
    }
}

const onFileSelected = ({ target: { files } }) => {
    if (files.length > 0) {
        state.file = files[0]
        state.uploading = true
        uploadFile('/api/addCodeOrganization/')
    }
}
const onFileSelected2 = ({ target: { files } }) => {
    if (files.length > 0) {
        state.file = files[0]
        state.uploading = true
        uploadFile('/api/updateCodeOrganization/')
    }
}
const state = reactive({
    file: null,
    uploading: false
})
const editEvent = (row) => {
    upload.project_id = row.project_id
    upload.name = row.name
    dialogVisible2.value = true
}
const lookResult = (row) => {
    // localStorage.setItem('project_id', row.project_id)
    localStorage.setItem('project_id', row.project_id)
    router.push({ path: '/origin/3' })
}
const progress = ref(0)


const initChart = () => {
    console.log('来过');
    var containers = document.querySelectorAll('.chart-container');
    console.log(containers);
    for (var i = 0; i < containers.length; i++) {
        console.log('来过' + i);
        var container = containers[i];
        var chart = echarts.init(container);
        // 在这里可以配置图表的各种属性和数据
        // ...
        chart.setOption({
            color: ["#266554", "#f9d379"],
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 1,
                        borderColor: '#fff',
                        borderWidth: 2
                    },

                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 15,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: tableData.value[i].code_lines - tableData.value[i].original_code_lines, name: '克隆代码比例' },
                        { value: tableData.value[i].original_code_lines, name: '原创代码比例' },
                    ]
                }
            ]
        })
        window.onresize = function () {
            chart.resize()
        }
    }
}
watchEffect(() => {
    if (tableData.value) {
        console.log("变了");
        setTimeout(initChart, 500)
    }
})
</script>
<template>
    <el-dialog v-model="dialogVisible" title="新增项目" width="35%" align-center="true">
        <el-form label-position="right" label-width="100px" style="max-width: 460px">
            <el-form-item label="项目编号：">
                <el-input v-model="upload.project_id" />
            </el-form-item>
            <el-form-item label="项目名称：">
                <el-input v-model="upload.name" />
            </el-form-item>
            <el-form-item label="上传压缩包：">
                <input type="file" @change="onFileSelected">
                <div v-if="progress > 0">{{ progress }}%</div>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button style="background-color: #1d8e8a;color: white;" :disabled="!state.uploading"
                    @click="uploadFile('/api/addCodeOrganization/')">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible2" title="更新代码" width="35%" align-center="true">
        <el-form label-position="right" label-width="100px" style="max-width: 460px">
            <el-form-item label="项目编号：">
                <el-input v-model="upload.project_id" disabled />
            </el-form-item>
            <el-form-item label="项目名称：">
                <el-input v-model="upload.name" disabled />
            </el-form-item>
            <el-form-item label="上传压缩包：">
                <input type="file" @change="onFileSelected2">
                <div v-if="progress > 0">{{ progress }}%</div>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button style="background-color: #1d8e8a;color: white;" :disabled="!state.uploading"
                    @click="dialogVisible2 = false">确定</el-button>
                <el-button @click="dialogVisible2 = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
    <div class="bread">
        <el-breadcrumb :separator-icon="ArrowRight" size="large">
            <el-breadcrumb-item>源码管理</el-breadcrumb-item>
            <el-breadcrumb-item>源码管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="buttons">
        <div>
            <el-button type="warning" @click="dialogVisible = true">新增</el-button>
            <el-button type="danger">删除</el-button>
        </div>


    </div>
    <div class="table">
        <vxe-table border max-height="620" stripe :row-config="{ isCurrent: true, isHover: true, height: 120 }"
            :data="tableData" align="center">
            <vxe-column type="checkbox" width="80"></vxe-column>
            <vxe-column field="project_id" title="项目编号"></vxe-column>
            <vxe-column field="name" title="项目名称"></vxe-column>
            <vxe-column field="code_lines" title="代码行数"></vxe-column>
            <vxe-column field="original_code_lines" title="原创代码行数"></vxe-column>
            <vxe-column field="file_count" title="文件数量"></vxe-column>
            <vxe-column field="original_file_count" title="原创文件数量"></vxe-column>
            <vxe-column title="原创比例" width="150" show-overflow>
                <template #default="{ row }">
                    <div class="chart-container" style="height:100px;"></div>
                </template>
            </vxe-column>
            <vxe-column title="操作" width="250" show-overflow>
                <template #default="{ row }">
                    <el-button link type="primary" @click="editEvent(row)">上传</el-button>
                    <el-button link @click="lookResult(row)">查看结果</el-button>
                </template>
            </vxe-column>
        </vxe-table>
        <vxe-pager v-model:current-page="tablePage.currentPage" v-model:page-size="tablePage.pageSize"
            :total="tablePage.total" @page-change="handlePageChange">
        </vxe-pager>
    </div>
</template>
<style scoped>
.form {
    border: 1px solid #e8eaec;
    padding: 10px;
    padding-top: 20px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

}

.bread {
    margin-bottom: 10px;
}
</style>