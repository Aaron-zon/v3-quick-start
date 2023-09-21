<script setup>
import { ref, reactive } from 'vue'
import BasicUpload from '@/components/BasicUpload/index.vue'
const aaa = () => {
    console.log(fileInfos.value)
}
const bbb = () => {
    fileInfos.ref.submit();
}

const fileInfos = reactive({});
const url = 'http://localhost:9993/pino/testUpload';

</script>

<template>
    <div class="upload-container app-container">
        <div class="upload-wrapper">
            <!--  -->
            <!-- <div>
                <BasicUpload :fileInfos="fileInfos" :url="url" />
            </div> -->

            <div>
                <BasicUpload :mode="2" :fileInfos="fileInfos" :url="url" />
            </div>

            <div>
                <button @click="aaa">aaa</button>
                <button @click="bbb">bbb</button>
            </div>
            

        </div>
    </div>
</template>

<style lang="scss" scoped>
.upload-wrapper {
    min-height: calc(var(--v3-appmain-height) - 50px);
    background: #fff;
}
</style>