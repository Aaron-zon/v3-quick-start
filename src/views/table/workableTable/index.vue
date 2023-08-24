<script setup>
import { ref } from 'vue'
import { QUERY_COMPONENT_KEY } from '@/components/BasicForm/constants/index.js'
import BaseSearch from '@/components/BasicSearch/index.vue'
import BasicModal from '@/components/BasicModal/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'

// 级联选择器 options
const cascaderOptions = ref([
    {
        value: 'guide',
        label: 'Guide',
        children: [
        {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
            {
                value: 'consistency',
                label: 'Consistency',
            },
            {
                value: 'feedback',
                label: 'Feedback',
            },
            {
                value: 'efficiency',
                label: 'Efficiency',
            },
            {
                value: 'controllability',
                label: 'Controllability',
            },
            ],
        },
        {
            value: 'navigation',
            label: 'Navigation',
            children: [
            {
                value: 'side nav',
                label: 'Side Navigation',
            },
            {
                value: 'top nav',
                label: 'Top Navigation',
            },
            ],
        },
        ],
    },
    {
        value: 'component',
        label: 'Component',
        children: [
        {
            value: 'basic',
            label: 'Basic',
            children: [
            {
                value: 'layout',
                label: 'Layout',
            },
            {
                value: 'color',
                label: 'Color',
            },
            {
                value: 'typography',
                label: 'Typography',
            },
            {
                value: 'icon',
                label: 'Icon',
            },
            {
                value: 'button',
                label: 'Button',
            },
            ],
        },
        {
            value: 'form',
            label: 'Form',
            children: [
            {
                value: 'radio',
                label: 'Radio',
            },
            {
                value: 'checkbox',
                label: 'Checkbox',
            },
            {
                value: 'input',
                label: 'Input',
            },
            {
                value: 'input-number',
                label: 'InputNumber',
            },
            {
                value: 'select',
                label: 'Select',
            },
            {
                value: 'cascader',
                label: 'Cascader',
            },
            {
                value: 'switch',
                label: 'Switch',
            },
            {
                value: 'slider',
                label: 'Slider',
            },
            {
                value: 'time-picker',
                label: 'TimePicker',
            },
            {
                value: 'date-picker',
                label: 'DatePicker',
            },
            {
                value: 'datetime-picker',
                label: 'DateTimePicker',
            },
            {
                value: 'upload',
                label: 'Upload',
            },
            {
                value: 'rate',
                label: 'Rate',
            },
            {
                value: 'form',
                label: 'Form',
            },
            ],
        },
        {
            value: 'data',
            label: 'Data',
            children: [
            {
                value: 'table',
                label: 'Table',
            },
            {
                value: 'tag',
                label: 'Tag',
            },
            {
                value: 'progress',
                label: 'Progress',
            },
            {
                value: 'tree',
                label: 'Tree',
            },
            {
                value: 'pagination',
                label: 'Pagination',
            },
            {
                value: 'badge',
                label: 'Badge',
            },
            ],
        },
        {
            value: 'notice',
            label: 'Notice',
            children: [
            {
                value: 'alert',
                label: 'Alert',
            },
            {
                value: 'loading',
                label: 'Loading',
            },
            {
                value: 'message',
                label: 'Message',
            },
            {
                value: 'message-box',
                label: 'MessageBox',
            },
            {
                value: 'notification',
                label: 'Notification',
            },
            ],
        },
        {
            value: 'navigation',
            label: 'Navigation',
            children: [
            {
                value: 'menu',
                label: 'Menu',
            },
            {
                value: 'tabs',
                label: 'Tabs',
            },
            {
                value: 'breadcrumb',
                label: 'Breadcrumb',
            },
            {
                value: 'dropdown',
                label: 'Dropdown',
            },
            {
                value: 'steps',
                label: 'Steps',
            },
            ],
        },
        {
            value: 'others',
            label: 'Others',
            children: [
            {
                value: 'dialog',
                label: 'Dialog',
            },
            {
                value: 'tooltip',
                label: 'Tooltip',
            },
            {
                value: 'popover',
                label: 'Popover',
            },
            {
                value: 'card',
                label: 'Card',
            },
            {
                value: 'carousel',
                label: 'Carousel',
            },
            {
                value: 'collapse',
                label: 'Collapse',
            },
            ],
        },
        ],
    },
    {
        value: 'resource',
        label: 'Resource',
        children: [
        {
            value: 'axure',
            label: 'Axure Components',
        },
        {
            value: 'sketch',
            label: 'Sketch Templates',
        },
        {
            value: 'docs',
            label: 'Design Documentation',
        },
        ],
    },
]);
// Search组件结构体
const layouts = ref([
        {
            type: QUERY_COMPONENT_KEY.input,
            name: '姓名:',
            model: 'name',
            props: {
                placeholder: '请输入名字'
            },
            events: {
                input: (data, ref) => {
                    console.log('data', data)
                }
            }
        },
        {
            type: QUERY_COMPONENT_KEY.inputNumber,
            name: '年龄:',
            model: 'age',
            props: {
                placeholder: '请输入年龄'
            }
        },
        {
            type: QUERY_COMPONENT_KEY.autocomplete,
            name: '自动补全输入框:',
            model: 'autocomplete',
            props: {
                placeholder: '自动补全输入框'
            }
        }, 
        {
            type: QUERY_COMPONENT_KEY.datePicker,
            name: '日期选择器:',
            model: 'datePickerDaterange',
            props: {
                placeholder: '请输入日期',
                type: 'daterange',
                'start-placeholder': "开始日期",
                'end-placeholder': "结束日期",
            }
        }, 
        {
            type: QUERY_COMPONENT_KEY.cascader,
            name: '级联选择器:',
            model: 'cascader',
            props: {
                placeholder: '级联选择器',
                options: cascaderOptions
            }
            
        }, 
        {
            type: QUERY_COMPONENT_KEY.datePicker,
            name: '日期选择器:',
            model: 'datePicker',
            props: {
                placeholder: '请输入日期',
                type: 'date',
            }
        }, 
        {
            type: QUERY_COMPONENT_KEY.timePicker,
            name: '时间选择器:',
            model: 'timePicker'
        }, 
        {
            type: QUERY_COMPONENT_KEY.timeSelect,
            name: '时间选择:',
            model: 'timeSelect'
        }, 
        {
            type: QUERY_COMPONENT_KEY.select,
            name: 'select选择器:',
            model: 'select',
            props: {
                options: [
                    {
                        value: 'Option1',
                        label: 'Option1',
                    },
                    {
                        value: 'Option2',
                        label: 'Option2',
                    },
                ],
            }
        },
        
])
// 查询工具栏
const queryTool = ref([
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
            click: () => {
                console.log('query 检索')
            }
        }
    }
])
// 查询绑定数据
const modelData = ref({
    name: '周周',
    age: '18',
    autocomplete: '',
    datePicker: '',
    cascader: '',
    datePickerDaterange: '',
    timePicker: '',
    timeSelect: '',
    select: 'Option2'
})
// 弹出框
const dialogData = ref({
    show: false
})
// table工具栏
const tableToolData = ref([
    {
        name: '新增',
        props: {
            type: 'primary'
        }, 
        events: {
            click: () => {
                console.log('table 新增按钮按下')
                addHandle()
            }
        }

    },
    {
        name: '取消',
        props: {
            type: 'danger'
        }, 
        events: {
            click: () => {
                console.log('table 取消按钮按下')
            }
        }
    }
])

// 打开新增弹出框
const addHandle = () => {
    dialogData.value.show = true
}
</script>

<template>
    <div class="workable-table-container app-container">
        <BaseSearch 
            :layouts="layouts"
            :modelData="modelData"
            :toolData="queryTool"
        />

        <el-card >
            <div class="toolbar-wrapper">
                <div>
                    <BasicToolbar :toolData="tableToolData" />
                </div>
            </div>

        </el-card>

        <BasicModal :dialogData="dialogData" :layouts="layouts" :modelData="modelData"/>
    </div>
</template>

<style lang="scss" scoped>
.workable-table-container {
}
</style>