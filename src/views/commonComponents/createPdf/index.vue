<script setup>
import { jsPDF } from "jspdf";
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const createPDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
}
const createPDF2 = () => {
    var element = document.getElementById('el-to-pdf');
    html2pdf(element);
}
</script>

<template>
    <div>
        <el-button @click="createPDF">生成PDF</el-button>
        <el-button @click="createPDF2">生成PDF</el-button>
    </div>
    <div class="pdf-wrapper" id="el-to-pdf">
        div
    </div>
</template>

<style lang="scss" scoped>
.pdf-wrapper {
    border: 1px solid #ccc;
    margin: 10px;
    background-color: #fff;
}
</style>