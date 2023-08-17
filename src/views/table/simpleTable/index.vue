<script setup>
import { ref } from 'vue'
import BaseSearch from '@/components/BasicSearch/index.vue'
const formData = ref({
    queryData: [
        {
            type: 'text',
            name: '姓名',
        },
        {
            type: 'number',
            name: '年龄'
        },
        {
            type: 'autocomplete',
            name: '自动补全输入框'
        }, 
        {
            type: 'cascader',
            name: '级联选择器'
        }, 
        {
            type: 'datePicker',
            name: '日期选择器'
        }, 
        {
            type: 'timePicker',
            name: '时间选择器'
        }, 
        {
            type: 'timeSelect',
            name: '时间选择'
        }, 
        // {
        //     type: 'select',
        //     name: 'select选择器'
        // }
    ],
    toolData: [],
    modelData: []
})
</script>

<template>
    <div class="simple-table-container app-container">
        <BaseSearch 
            :data="formData"
        />
        <!-- <BaseTable></BaseTable> -->
    </div>
</template>

<style lang="scss" scoped>
</style>