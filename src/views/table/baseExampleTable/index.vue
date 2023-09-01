<script setup>
import { ref, reactive } from 'vue'
import { QUERY_COMPONENT_KEY } from '@/components/BasicForm/constants/index.js'
import BasicSearch from '@/components/BasicSearch/index.vue'
import BasicDialog from '@/components/BasicDialog/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'
import BasicTable from '@/components/BasicTable/index.vue'

const layouts = [
    {
        type: QUERY_COMPONENT_KEY.input,
        name: '姓名:',
        model: 'name',
        props: {
            placeholder: '请输入名字'
        },
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
]
const modelData = ref({
    name: '',
    datePickerDaterange: ''
})

const search = () =>{   
    console.log('search', modelData.value)
}
const reset = () => {
    console.log('reset', modelData.value)
}


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

    },
])




const dialogProps = ref({
    show: false,
    props: {
        title: 'Table弹出框1231',
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

const dialogCancel = () => {
    
}
</script>

<template>
    <div class="base-example-table-container app-container">
        <BasicSearch :layouts="layouts" :modelData="modelData" @search="search" @reset="reset"/>
        <el-card >
            <div class="toolbar-wrapper">
                <BasicToolbar :toolData="toolbarData"/>
            </div>
        </el-card>

        <!-- 弹窗 -->
        <BasicDialog 
            :dialogProps="dialogProps" 
            :dialogData="dialogData" 
            :layouts="dialogLayouts"
            :rules="dialogRules"
            @cancel="dialogCancel"
            @confirm="dialogConfirm"
        />
    </div>
</template>

<style lang="scss" scoped>
</style>