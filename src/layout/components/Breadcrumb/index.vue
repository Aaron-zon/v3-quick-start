<template>
    <div class="breadcrumb-container">
        <el-breadcrumb>
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
                <!-- title -->
                <span class="no-redirect">{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute} from 'vue-router'
const route = useRoute()

const breadcrumbs = ref([])

const getBreadcrumb = () => {
    breadcrumbs.value = route.matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
    console.log(breadcrumbs.value)
}

watch(
    () => route.path,
    (path) => {
        if (path.startsWith("/redirect/")) {
            return
        }
        getBreadcrumb()
    }
)
getBreadcrumb()
</script>

<style lang="scss" scoped>
.breadcrumb-container {
    margin-left: 8px;

    .el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: var(--v3-navigationbar-height);
        margin-left: 8px;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }

    .el-breadcrumb__inner,
    .el-breadcrumb__inner a {
        font-weight: 700 !important;
        cursor: pointer !important;
        color: rgb(48, 49, 51) !important;

        &:hover {
            color: rgb(64, 158, 255) !important;
        }
    }
    
}
</style>