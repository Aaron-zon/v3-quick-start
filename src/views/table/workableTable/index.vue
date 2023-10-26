<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 组件
import BasicSearch from '@/components/BasicSearch/index.vue';
import BasicTable from '@/components/BasicTable/index.vue';

// 方法
import { useSearch } from '../hooks/search';
import { useTable } from '../hooks/tableData';
const { searchLayouts, searchData, searchHandle, resetHandel } = useSearch();
const { tableModel, getTableModel, tableCol, tableSetting, tableToolData } = useTable();

const changePage = async () => {
    tableSetting.loading = true;
    await getTableModel(tableModel.value.currentPage + 1);
    tableSetting.loading = false;
};

const editHandle = () => {
    // dialogProps.show = true;
};
const deleteHandle = () => {
    ElMessageBox.confirm('请确认是否删除该用户！', '消息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(() => {
        ElMessage({
            type: 'info',
            message: '用户删除成功！',
        });
    });
};
onMounted(async () => {
    await getTableModel();
    tableSetting.loading = false;
});
</script>

<template>
    <div class="workable-table-container app-container">
        <BasicSearch :layouts="searchLayouts" :modelData="searchData" @search="searchHandle" @reset="resetHandel" />

        <el-card class="content-wrapper">
            <div class="table-wrapper">
                <BasicTable
                    :tableSetting="tableSetting"
                    :tableCol="tableCol"
                    :tableData="tableModel"
                    :toolData="tableToolData"
                    @changePage="changePage"
                    @edit="editHandle"
                    @delete="deleteHandle" />
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.content-wrapper {
    // min-width: 1200px;
    overflow: auto;
    @extend %scrollbar;
    // @include minWidth();

    .table-wrapper {
    }
}
</style>