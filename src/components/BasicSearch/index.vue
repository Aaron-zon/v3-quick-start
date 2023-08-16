<script setup>
import { ref } from 'vue'
import BasicForm from '@/components/BasicForm/index.vue'
const props = defineProps(['formData'])
const mockFormData = ref([
    {
        type: 'text',
        name: '姓名',
        model: 'name'
    },
    {
        type: 'number',
        name: '年龄',
        model: 'age'

    }
])
const mockToolData = ref([
    {
        name: '重置'
    },
    {
        'type': 'query',
        name: '检索'
    }, 
    
])
const mockModel = ref({
    name: '周周',
    age: 20
})
</script>

<template>
    <div class="basic-search-container">
        <el-card shadow="never" class="search-wrapper">
            <BasicForm :queryData="mockFormData" :toolData="mockToolData" :modelData="mockModel"/>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.basic-search-container {

    .search-wrapper {
        margin-bottom: 20px
    }
    
}
</style>