<script setup>
import { reactive } from 'vue';
import Template from './template.vue'
const data = reactive({
  baseInfo: {
    col1: '2023-12-29',
    col2: 'no.dsas6d4',
  }
})
const createPDF = () => {
    var element = document.getElementById('el-to-pdf');
    html2pdf(element);
}
</script>

<template>
    <div>
        <el-button @click="createPDF">生成PDF</el-button>
    </div>
    <Template :data="data"/>
</template>
