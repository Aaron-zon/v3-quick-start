<script setup>
import BaseSearch from '@/components/BasicSearch/index.vue'
import BasicModal from '@/components/BasicModal/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'
import BasicTable from '@/components/BasicTable/index.vue'

import { useSimpleTable, useSimpleTableSearch, useDialog } from './hooks/index.js'

const { currentPage, tableCol, tableData, tableToolData } = useSimpleTable();
const { searchlayouts, searchTool, searchData } = useSimpleTableSearch();
const { dialogProps, dialogLayouts, dialogTool, dialogData } = useDialog();

</script>

<template>
    <div class="simple-table-container app-container">
        <!-- 检索区域 -->
        <BaseSearch 
            :layouts="searchlayouts"
            :toolData="searchTool"
            :modelData="searchData"
        />

        <!-- table区域 -->
        <el-card >
            <div class="toolbar-wrapper">
                <BasicToolbar :toolData="tableToolData" />
            </div>

            <div class="table-wrapper">
                <BasicTable :tableCol="tableCol" :tableData="tableData"/>
            </div>
        </el-card>

        <!-- 弹窗 -->
        <BasicModal :dialogProps="dialogProps" :dialogData="dialogData" :layouts="dialogLayouts" :dialogTool="dialogTool"/>
    </div>
</template>

<style lang="scss" scoped>
.simple-table-container {
    .table-wrapper {
        margin-top: 20px;
    }
}
</style>