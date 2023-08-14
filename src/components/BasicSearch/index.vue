<script setup>
import BasicForm from '@/components/BasicForm/index.vue'
</script>

<template>
    <div class="basic-search-container">
        basic-search-container
        <el-card shadow="never" class="search-wrapper">
            <BasicForm />
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