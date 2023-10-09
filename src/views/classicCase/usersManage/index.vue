<script setup>
import { reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasicSearch from '@/components/BasicSearch/index.vue'
import BasicTable from '@/components/BasicTable/index.vue'
import BasicDialog from '@/components/BasicDialog/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'
import { QUERY_COMPONENT_KEY } from '@/components/BasicForm/constants/index.js'
import { getSimpleTableApi } from '@/api/table'

onMounted(() => {
    getTableData();
})

// 用户部门的数据项
const departmentOptions = [
    { label: '管理部', value: '1' },
    { label: '业务部', value: '2' },
    { label: '开发一部', value: '3' },
    { label: '开发二部', value: '4' },
    { label: '开发三部', value: '5' },
    { label: '其他', value: '9999' },

];
// 用户状态的数据项
const statusOptions = [
    { label: '在职', value: '1' },
    { label: '离职', value: '2' },
    { label: '待入职', value: '3' },
    { label: '休假', value: '4' },
    { label: '其他', value: '5' },
]

/** 检索部分 */
// 检索部分项目
const searchLayouts = reactive([
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '姓名:',
        model: 'name',
        props: {
            placeholder: '请输入名字'
        },
    },
    {
        type: QUERY_COMPONENT_KEY.select,
        name: '部门:',
        model: 'department',
        props: {
            placeholder: '请选择部门',
            options: departmentOptions,
        }
    },
    {
        type: QUERY_COMPONENT_KEY.select,
        name: '状态:',
        model: 'status',
        props: {
            placeholder: '请选择部门',
            options: statusOptions,
        }
    },
    {
        type: QUERY_COMPONENT_KEY.datePicker,
        name: '入职时间:',
        model: 'date',
        props: {
            placeholder: '请选择入职时间'
        }
        
    }
])
// 用户搜索部分各项目值
const searchData = reactive({
    name: '',
    department: '',
    status: '1',
    date: ''
})
/**
 * 点击检索
 */
const searchHandle = () => {
    // 各项目检查
    // 调用接口
    getTableData(1, searchData)
}

/** 工具栏设置 */
const toolbarData = [
    {
        name: '新增',
        props: {
            type: 'primary'
        }, 
        events: {
            // 按钮按下
            click: () => {
                dialogProps.show = true;
            }
        }
    }
]

/** 新增用户 */
const dialogProps = reactive({
    show: false,
    props: {
        title: 'Table弹出框',
    }
})
// 新增用户的项目
const dialogLayouts = [
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '姓名:',
        model: 'name',
        props: {
            placeholder: '请输入名字'
        },
    },
    {
        type: QUERY_COMPONENT_KEY.select,
        name: '部门:',
        model: 'department',
        props: {
            placeholder: '请选择部门',
            options: departmentOptions,
        }
    },
    {
        type: QUERY_COMPONENT_KEY.select,
        name: '状态:',
        model: 'status',
        props: {
            placeholder: '请选择部门',
            options: [
                { label: '在职', value: '1' },
                { label: '待入职', value: '3' },
                { label: '其他', value: '5' },
            ],
        }
    },
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '邮箱:',
        model: 'email',
        props: {
            placeholder: '请输入邮箱',
        }
    },
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '初始密码:',
        model: 'password',
        props: {
            placeholder: '请输入初始密码',
        }
    }
]
// 新增用户的验证规则
const dialogRules = {
    name: [
        {required: true, message: '请输入名称', trigger: 'blur' },
    ],
    department: [
        { required: true, message: '请输入部门', trigger: 'blur' }
    ],
    status: [
        { required: true, message: '请输入状态', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
};
// 新增用户弹出窗的数据
const dialogData = reactive({
    name: '',
    department: '',
    status: '',
    email: '',
    password: ''
})
// 点击取消按钮
const dialogCancel = () => {}
// 点击确定按钮
const dialogConfirm = () => {}

/** 表格 */
// 表格设置
const tableSetting = reactive({
    loading: true, // 表格加载状态
    events: {
        // 点击表格多选框
        'selection-change': (val) => {
            console.log(val)
        }
    }
});
// 行数据格式
const tableCol = [
    {
        type: 'index',
        label: 'No.',
        align: 'center'
    },
    {
        prop: 'name',
        label: '姓名',
        width: '120',
        align: 'center'
    },
    {
        prop: 'department',
        label: '部门',
    },
    {
        prop: 'position',
        label: '职位',
    },
    {
        prop: 'mail',
        label: '邮箱',
    },
    {
        prop: 'phone',
        label: '手机号',
    },
    {
        prop: 'startDate',
        label: '开始时间',
    },
    {
        prop: 'endDate',
        label: '结束时间',
    }
];
// 用于渲染表格的数据
const tableData = reactive({
    currentPage: 0,
    data: [],
    pageSize: 10,
    total: 0,
});

const tableToolData = reactive({
    show: true,
    editFlg: true,
    deleteFlg: true,
    /**
     * 点击修改按钮
     */
    handleEdit: () => {
        dialogProps.show = true;
    },
    /**
     * 点击删除按钮
     */
    handleDelete: () => {
        ElMessageBox.confirm('请确认是否删除该用户！', '消息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(() => {
            ElMessage({
                type: 'info',
                message: '用户删除成功！'
            });
        });
    }
})
/**
 * 查询表格数据
 * @param {*} currentPage 当前页数
 * @param {*} params 检索时参数
 */
const getTableData = async (currentPage = 1, params = null) => {
    tableSetting.loading = true;

    // 调用接口
    const res = await getSimpleTableApi({
        currentPage: currentPage,
        size: tableData.pageSize,
        ...params
    });

    // 数据渲染
    if (res.code == 200) {
        tableData.currentPage = currentPage;
        tableData.total = res.data.total
        tableData.data = res.data.list
    } 
    // 关闭loading
    tableSetting.loading = false;
    // 返回获取数据是否成功
    return res.code == 200
}

/**
 * 切换页
 * @param {*} page 当前选择的页数
 */
const changePage = (page) => {
    getTableData(page);
}
</script>

<template>
    <div class="user-manage-container app-container">
        <!-- 用户检索 -->
        <BasicSearch 
            :layouts="searchLayouts"
            :modelData="searchData"
            @search="searchHandle" 
        />
        <!-- 用户管理 -->
        <el-card >
            <!-- 工具栏 -->
            <div class="toolbar-wrapper">
                <BasicToolbar :toolData="toolbarData"/>
            </div>

            <div class="table-wrapper">
                <BasicTable 
                    :tableSetting="tableSetting"
                    :tableCol="tableCol" 
                    :tableData="tableData" 
                    :toolData="tableToolData"
                    @changePage="changePage"
                />
            </div>
        </el-card>

        <!-- 添加用户弹窗 -->
        <BasicDialog 
            :dialogProps="dialogProps" 
            :layouts="dialogLayouts"
            :dialogData="dialogData" 
            :rules="dialogRules"
            @cancel="dialogCancel"
            @confirm="dialogConfirm"
        />
    </div>

    
</template>

<style lang="scss" scoped>
.table-wrapper {
    margin-top: 20px;
}
</style>