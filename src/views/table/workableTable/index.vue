<script setup>
import BasicSearch from '@/components/BasicSearch/index.vue'
import BasicDialog from '@/components/BasicDialog/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'
import BasicTable from '@/components/BasicTable/index.vue'

import { useWorkableTable, useTool } from './hooks/index.js'

const { tableSetting, currentPage, tableCol, tableData, toolbarData, tableToolData } = useWorkableTable();
const { searchLayouts, searchTool, searchData, dialogProps, dialogLayouts, dialogData, dialogTool } = useTool();

const confirm = () => {
    console.log('confirm')
}
const cancel = () => {
    console.log('cancel')
}
</script>

<template>
    <div class="workable-table-container app-container">
        <!-- 检索区域 -->
        <BasicSearch 
            :layouts="searchLayouts"
            :toolData="searchTool"
            :modelData="searchData"
        />

        <!-- table区域 -->
        <el-card >
            <div class="toolbar-wrapper">
                <BasicToolbar :toolData="toolbarData" />
            </div>

            <div class="table-wrapper">
                <BasicTable 
                    :tableSetting="tableSetting"
                    :tableCol="tableCol" 
                    :tableData="tableData" 
                    :toolData="tableToolData"
                />
            </div>
        </el-card>

        <!-- 弹窗 -->
        <BasicDialog :dialogProps="dialogProps" 
            :dialogData="dialogData" 
            :layouts="dialogLayouts" 
            @confirm="confirm"
            @cancel="cancel"
        />
    </div>
</template>

<style lang="scss" scoped>
.workable-table-container {
    .table-wrapper {
        margin-top: 20px;
    }
}
</style>