import { ref, onMounted } from 'vue';
import { QUERY_COMPONENT_KEY } from '@/components/BasicForm/constants/index.js'
import { getSimpleTableApi } from '@/api/table'

/** 当前页数 */
const currentPage = ref(1);
/** 每次检索最大数据条数 */
const size = ref(10);
/** 表格数据源 */
const tableData = ref([]);
/** 表格功能键栏 */
const tableToolData = ref([])

const dialogProps = ref({
    show: false,
    props: {
        title: 'Table弹出框',
    },
    events: {
        close: () => {
            console.log('弹出框 关闭')
        }
    }
});

export const useSimpleTable = () => {


    /** 表格列设定 */
    const tableCol = ref([
        {
            is: 'name',
            label: '姓名',
        },
        {
            is: 'group',
            label: '分组',
        },
        {
            is: 'phone',
            label: '手机号',
        },
        {
            is: 'mail',
            label: '邮箱',
        },
        {
            is: 'startDate',
            label: '开始时间',
        },
        {
            is: 'endDate',
            label: '结束时间',
        }
    ])

    const getTableData = () => {
        getSimpleTableApi({
            currentPage: currentPage.value,
            size: size.value
        })
        .then(res => {
            if (res.code == 200) {
                tableData.value = res.data.list
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    onMounted(() => {
        getTableData();

        tableToolData.value = [
            {
                name: '新增',
                props: {
                    type: 'primary'
                }, 
                events: {
                    click: () => {
                        console.log('table 新增按钮按下')
                        dialogProps.value.show = true;
                    }
                }
        
            }
        ];
    })

    


    return {
        currentPage,
        size,
        tableCol,
        tableData,
        tableToolData
    }
}

export const useSimpleTableSearch = () => {
    /** 检索栏结构 */
    const searchlayouts = ref([
        {
            type: QUERY_COMPONENT_KEY.input,
            name: '姓名:',
            model: 'name',
            props: {
                placeholder: '请输入名字'
            },
            events: {
                input: (data, ref) => {
                    console.log(modelData.value)
                }
            }
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
    /** 检索栏按钮 */
    const searchTool = ref([
        {
            name: '重置',
            events: {
                click: () => {
                    console.log('query 重置')
                }
            }
    
        },
        {
            name: '检索',
            props: {
                type: 'primary'
            },
            events: {
                click: (a, b, c) => {
                    console.log('query 检索')
                }
            }
        }
    ])
    /** 检索栏数据 */
    const searchData = ref({
        name: '',
        autocomplete: '',
        datePickerDaterange: '',
        select: ''
    })

    return {
        searchlayouts,
        searchTool,
        searchData
    }
}

export const useDialog = () => {

    const dialogLayouts = ref([
        {
            type: QUERY_COMPONENT_KEY.input,
            name: '姓名:',
            model: 'name',
            props: {
                placeholder: '请输入名字'
            },
            events: {
                input: (data, ref) => {
                    console.log(modelData.value)
                }
            }
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

    const dialogTool = ref([
        {
            name: '确认',
            props: {
                type: 'primary'
            },
            events: {
                click: () => {
                    console.log('Modal 确认按钮按下')
                }
            }
        },
        {
            name: '取消',
            events: {
                click: () => {
                    console.log('Modal 取消按钮按下')
                }
            }
        }
    ])

    const dialogData = ref({
        name: '',
        autocomplete: '',
        datePickerDaterange: '',
        select: ''
    })

    return {
        dialogProps,
        dialogLayouts,
        dialogTool,
        dialogData
    }
}