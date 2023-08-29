<script setup>
import { ref, onMounted } from 'vue'
import PanelGroup from './components/PanelGroup/index.vue'
import LineChart from './components/LineChart/index.vue'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
const lineChartWidth = '100%';
const lineChartHeight = '300px';
</script>

<template>
    <div class="home-container app-container">
        <PanelGroup />
        <LineChart :chartData="lineChartData" :width="lineChartWidth" :height="lineChartHeight" />
    </div>
</template>
  
<style lang="scss" scoped>
.home-container {
    
}
</style>