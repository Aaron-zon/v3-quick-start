import { ref, onMounted, reactive } from 'vue';
import { QUERY_COMPONENT_KEY } from '@/components/BasicForm/constants/index.js'
import { getSimpleTableApi } from '@/api/table'

/** 1.检索区域 Start */
/** 检索栏结构 */
const searchLayouts = ref([
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '姓名:',
        model: 'name',
        props: {
            placeholder: '请输入名字'
        },
    },
    {
        type: QUERY_COMPONENT_KEY.autocomplete,
        name: '分组:',
        model: 'autocomplete',
        props: {
            placeholder: '输入/选择分组',
            options: [
                { value: 'vue', link: 'https://github.com/vuejs/vue' },
                { value: 'element', link: 'https://github.com/ElemeFE/element' },
                { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
                { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
                { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
                { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
                { value: 'babel', link: 'https://github.com/babel/babel' },
            ],
        }
    }, 
    {
        type: QUERY_COMPONENT_KEY.select,
        name: '科目:',
        model: 'select',
        props: {
            options: [
                {
                    value: '1',
                    label: '科目1',
                },
                {
                    value: '2',
                    label: '科目2',
                },
                {
                    value: '3',
                    label: '科目3',
                },
                {
                    value: '4',
                    label: '科目4',
                },
            ],
        }
    },
    {
        type: QUERY_COMPONENT_KEY.datePicker,
        name: '日期:',
        model: 'datePickerDaterange',
        props: {
            placeholder: '请输入日期',
            type: 'daterange',
            'start-placeholder': "开始日期",
            'end-placeholder': "结束日期",
        }
    }, 
]);
/** 检索栏数据 */
const searchData = ref({
    name: '',
    autocomplete: '',
    datePickerDaterange: '',
    select: ''
})
/** 检索区域 End */

/** 2.弹出框 Start */
/** 弹出框属性 */
const dialogProps = ref({
    show: false,
    props: {
        title: 'Table弹出框',
    }
});
/** 弹出框结构 */
const dialogLayouts = ref([
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '姓名:',
        model: 'name',
        props: {
            placeholder: '请输入名字'
        },
    },
    {
        type: QUERY_COMPONENT_KEY.autocomplete,
        name: '分组:',
        model: 'autocomplete',
        props: {
            placeholder: '输入/选择分组',
            options: [
                { value: 'vue', link: 'https://github.com/vuejs/vue' },
                { value: 'element', link: 'https://github.com/ElemeFE/element' },
                { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
                { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
                { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
                { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
                { value: 'babel', link: 'https://github.com/babel/babel' },
            ],
        }
    }, 
    {
        type: QUERY_COMPONENT_KEY.select,
        name: '科目:',
        model: 'select',
        props: {
            options: [
                {
                    value: '1',
                    label: '科目1',
                },
                {
                    value: '2',
                    label: '科目2',
                },
                {
                    value: '3',
                    label: '科目3',
                },
                {
                    value: '4',
                    label: '科目4',
                },
            ],
        }
    },
    {
        type: QUERY_COMPONENT_KEY.datePicker,
        name: '日期:',
        model: 'datePickerDaterange',
        props: {
            placeholder: '请输入日期',
            type: 'daterange',
            'start-placeholder': "开始日期",
            'end-placeholder': "结束日期",
        }
    }, 
])
/** 弹出框数据 */
const dialogData = ref({
    name: '',
    autocomplete: '',
    datePickerDaterange: '',
    select: ''
})
/** 弹出框 End */
const dialogRules = reactive({
    name: [
        {required: true, message: '请输入名称', trigger: 'blur'},
    ],
    select: [
        { required: true, message: '请输入科目', trigger: 'change'}
    ],
    datePickerDaterange: [
        { type: 'date', required: true, message: '请输入日期', trigger: 'change'}
    ]
});

/** 3.table Start */
/** 每次检索最大数据条数 */
const size = ref(10);
/** 表格数据源 */
const tableData = ref({
    total: 0,
    pageSize: 10,
    data: [],
    currentPage: 1,
    getTableData: null
});
/** 表格功能键栏 */
const toolbarData = ref([
    {
        name: '新增',
        props: {
            type: 'primary'
        }, 
        events: {
            click: () => {
                dialogProps.value.show = true;
            }
        }

    }
])
/** 表格设定 */
const tableSetting = ref({
    loading: true, // 表格加载状态
    events: {
        'selection-change': (val) => {
            console.log(val)
        }
    }
})
/** 表格列设定 */
const tableCol = ref([
    {
        type: 'selection'
    },
    {
        prop: 'name',
        label: '姓名',
    },
    {
        prop: 'group',
        label: '分组',
    },
    {
        prop: 'phone',
        label: '手机号',
    },
    {
        prop: 'mail',
        label: '邮箱',
    },
    {
        prop: 'startDate',
        label: '开始时间',
    },
    {
        prop: 'endDate',
        label: '结束时间',
    }
])
/** table End */

/** 表格模块 */
export const useSimpleTable = () => {
    onMounted(() => {
        getTableData();
        tableData.value.getTableData = getTableData;
    })

    /** 获取表格数据 */
    const getTableData = async (currentPage = 1) => {
        tableSetting.value.loading = true;

        const res = await getSimpleTableApi({
            currentPage: currentPage.value,
            size: size.value,
            currentPage
        });

        // 数据渲染
        if (res.code == 200) {
            tableData.value.total = res.data.total
            tableData.value.data = res.data.list
            tableData.value.currentPage = currentPage;
        } 
        // 关闭loading
        tableSetting.value.loading = false;
        // 返回获取数据是否成功
        return res.code == 200
    }

    return {
        size,
        tableSetting,
        tableCol,
        tableData,
        toolbarData,
        getTableData,
    }
}

/** 工具模块 */
export const useTool = (layouts, data) => {
    onMounted(() => {
        if (layouts) {
            searchLayouts.value = layouts;
        }
        if (data) {
            searchData.value = data;
        }
    })

    return {
        searchLayouts,
        searchData,
    }
}

/** 弹窗模块 */
export const useDialog = (layouts, data) => {

    onMounted(() => {
        if (layouts) {
            dialogLayouts.value = layouts;
        }

        if (data) {
            dialogData.value = data;
        }
    })

    return {
        dialogProps,
        dialogLayouts,
        dialogData,
        dialogRules
    }
}