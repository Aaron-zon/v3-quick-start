<script setup>
import { Layout } from './components/index.js'
const layouts = []
</script>

<template>
    <div class="basic-from-container">
        <el-form>
            <Layout :layouts="layouts"></Layout>

            <!-- <el-form-item prop="username" label="用户名">
                <el-input placeholder="请输入" />
            </el-form-item> -->
        </el-form>
    </div>
</template>

<style lang="scss" scoped>

</style>