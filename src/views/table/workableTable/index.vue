<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 组件
import BasicSearch from '@/components/BasicSearch/index.vue';
import BasicTable from '@/components/BasicTable/index.vue';

// 方法
import { useSearch } from './hooks/search';
import { useTable } from './hooks/tableData';
const { searchLayouts, searchData, searchHandle, resetHandel } = useSearch();
const { tableModel, getTableModel, tableCol, tableSetting, tableToolData } =
    useTable();

const changePage = async () => {
    tableSetting.loading = true;
    await getTableModel(tableModel.value.currentPage + 1);
    tableSetting.loading = false;
};

// 点击操作中修改按钮
const editHandle = () => {
    // dialogProps.show = true;
};
// 点击操作中删除按钮
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
// 点击某元素
const cellClickHandle = (scope) => {
    console.log(scope);
};
onMounted(async () => {
    await getTableModel();
    tableSetting.loading = false;
});
</script>

<template>
    <div class="workable-table-container app-container">
        <BasicSearch
            :layouts="searchLayouts"
            :modelData="searchData"
            @search="searchHandle"
            @reset="resetHandel" />

        <el-card class="content-wrapper">
            <div class="table-wrapper">
                <BasicTable
                    :tableSetting="tableSetting"
                    :tableCol="tableCol"
                    :tableData="tableModel"
                    :toolData="tableToolData"
                    @changePage="changePage"
                    @edit="editHandle"
                    @delete="deleteHandle"
                    @cellClickHandle="cellClickHandle" />
            </div>
        </el-card>

        <!-- 弹窗 -->
        <!-- <BasicDialog
            ref="dialog"
            :dialogProps="dialogProps"
            :dialogData="dialogData"
            :layouts="dialogLayouts"
            :rules="dialogRules"
            @cancel="dialogCancel"
            @confirm="dialogConfirm" /> -->
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
