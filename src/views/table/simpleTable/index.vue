<script setup>
import { ref } from 'vue'
import BaseSearch from '@/components/BasicSearch/index.vue'
const formData = ref({
    toolData: [],
    modelData: {
        select: ''
    }
})

const layouts = ref([
        {
            is: 'text',
            name: '姓名:',
            model: 'name'
        },
        {
            is: 'number',
            name: '年龄:',
            model: 'age'
        },
        {
            is: 'autocomplete',
            name: '自动补全输入框:',
            model: 'autocomplete'
        }, 
        {
            is: 'datePicker',
            name: '日期选择器:',
            type: 'daterange',
            model: 'datePickerDaterange'
        }, 
        {
            is: 'cascader',
            name: '级联选择器:',
            model: 'cascader',
            options: [
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
            ]
        }, 
        {
            is: 'datePicker',
            name: '日期选择器:',
            model: 'datePicker',
            type: 'date'
        }, 
        {
            is: 'timePicker',
            name: '时间选择器:',
            model: 'timePicker'
        }, 
        {
            is: 'timeSelect',
            name: '时间选择:',
            model: 'timeSelect'
        }, 
        {
            is: 'select',
            name: 'select选择器:',
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
            model: 'select'
        },
        
])
const toolData = ref([])
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

</script>

<template>
    <div class="simple-table-container app-container">
        <BaseSearch 
            :layouts="layouts"
            :toolData="toolData"
            :modelData="modelData"
        />
    </div>
</template>

<style lang="scss" scoped>
</style>