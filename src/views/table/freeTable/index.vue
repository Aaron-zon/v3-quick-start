<script setup>
import { ref, reactive} from 'vue'
import { FTable } from '@/components/FreeTable/index'

const dataSource = reactive([
    {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
]);
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        // width: 500
    },
    {
        title: 'Cash Assets',
        dataIndex: 'money',
        align: 'right',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        // width: 1000
    },
];
</script>

<template>
    <el-card>
        <FTable :data-source="dataSource" :columns="columns" :scroll="{y: 400, x: 1800}"></FTable>
    </el-card>
</template>

<style lang="scss" scoped>

</style>