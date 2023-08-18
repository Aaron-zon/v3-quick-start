<script setup>
import BasicForm from '@/components/BasicForm/index.vue'
const props = defineProps(['layouts', 'toolData', 'modelData'])
console.log(props.layouts)
</script>

<template>
    <div class="basic-search-container">
        <el-card shadow="never" class="search-wrapper">
            <BasicForm 
                :layouts="props.layouts" 
                :toolData="props.toolData" 
                :modelData="props.modelData"
            />
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