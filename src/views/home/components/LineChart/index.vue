<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['className', 'height', 'width', 'autoResize', 'chartData']);
// echarts 实例
let chart = null;
// 绑定的DOM
const chartEl = ref(null);

onMounted(() => {
    nextTick(() => {
        initChart();
    })
})

// 监听用于显示的数据源
watch(
    () => props.chartData,
    (newQuestion) => {
        setOptions(newQuestion);
    }
)

// 初始化echarts实例
const initChart = () => {
    chart = echarts.init(chartEl.value);
    setOptions(props.chartData);
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 设置echarts配置项
const setOptions = ({ expectedData, actualData } = {}) => {
    chart.setOption({
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
                show: false
            }
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            padding: [5, 10]
        },
        yAxis: {
            axisTick: {
                show: false
            }
        },
        legend: {
            data: ['expected', 'actual']
        },
        series: [{
            name: 'expected', 
            itemStyle: {
                color: '#FF005A',
                lineStyle: {
                    color: '#FF005A',
                    width: 2
                }
            },
            smooth: true,
            type: 'line',
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
        },
        {
            name: 'actual',
            smooth: true,
            type: 'line',
            itemStyle: {
                color: '#3888fa',
                lineStyle: {
                    color: '#3888fa',
                    width: 2
                },
                areaStyle: {
                    color: '#f3f8ff'
                }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
        }]
    });
}
</script>

<template>
    <div ref="chartEl" id="el" class="line-chart-container" :class="props.className"
        :style="{ height: props.height, width: props.width }"></div>
</template>

<style lang="scss" scoped>
.line-chart-container {
    width: 400px;
    height: 350px;
}
</style>