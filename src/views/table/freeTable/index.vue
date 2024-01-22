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
        width: 500
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

for (let i = 3; i < 13; i++) {
    dataSource.push({
        key: i,
        name: `Edrward ${i}`,
        money: i + 1,
        address: `London Park no. ${i}`,
    });
}

// const scroll = {y: 400, x: 1800};
const scroll = {y: 400};
// const scroll = null;

</script>

<template>
    <el-card>
        <FTable :data-source="dataSource" :columns="columns" :scroll="scroll"></FTable>
    </el-card>
</template>

<style lang="scss" scoped>

</style>