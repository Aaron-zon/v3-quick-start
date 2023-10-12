<script setup>
import { ref, onMounted } from 'vue';
import PanelGroup from './components/PanelGroup/index.vue';
import LineChart from './components/LineChart/index.vue';
import OperateServe from './components/OperateServe/index.vue';

// 点击卡片
const panelGroupActive = (key) => {
    // 切换数据源
    nowLineChartData.value = lineChartData[key];
};
// 全部卡片视图的数据源
const lineChartData = [
    {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145],
    },
    {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130],
    },
    {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130],
    },
    {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130],
    },
];
// 视图宽度
const lineChartWidth = '100%';
// 视图高度
const lineChartHeight = '300px';
// 当前卡片视图的数据源
const nowLineChartData = ref(lineChartData[0]);
</script>

<template>
    <div class="home-container app-container">
        <PanelGroup @active="panelGroupActive" />
        <LineChart
            :chartData="nowLineChartData"
            :width="lineChartWidth"
            :height="lineChartHeight" />
        <OperateServe />
    </div>
</template>

<style lang="scss" scoped>
.home-container {
}
</style>
