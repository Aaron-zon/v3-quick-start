<script setup>
import { ref, onMounted, computed } from 'vue';
import { useScroll } from './hooks/useScroll';
import { useTableStyles } from './hooks/useTableStyles';
import { useResize } from './hooks/useResize';

defineOptions({
    name: 'FTable'
});

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    dataSource: {
        type: Array,
        required: true,
    },
    scroll: {
        type: Object,
    },
    // 行高
    rowHeight: {
        type: Number,
        default: 50,
    },
    // 滚动条尺寸设置
    scrollMeasure: {
        type: Number,
        default: 17,
    }
});

// Free Table
const freeTableRef = ref(null);
// Header
const freeTableHeaderRef = ref(null);
// Body
const freeTableBodyRef = ref(null);
// X轴滚动条
const horizontalScrollRef = ref(null);
// Y轴滚动条
const bodyVerticalScrollRef = ref(null);

onMounted(() => {
    resizeObserve(freeTableRef.value);

    return () => {
        resizeDisconnect();
    };
})

const { resizeObserve, resizeDisconnect } = useResize(freeTableRef);

const { 
    horizontalScroll, 
    horizontalScrollViewportStyles,
    horizontalScrollStyles,
    bodyVerticalScroll,
    bodyVerticalScrollViewportStyle,
    bodyScrollStyles,
    tableWheel
} = useScroll(props, freeTableHeaderRef, freeTableBodyRef, horizontalScrollRef, bodyVerticalScrollRef);

const {
    tableCenterStyles,
    tableBodyStyles,
    tableCellBoxClass,
    columnStyles
} = useTableStyles(props);

</script>

<template>
    <div class="free-table-container" ref="freeTableRef">
        <div class="free-table-loading">
            <!-- Header -->
            <div class="free-table-header" ref="freeTableHeaderRef">
                <div class="free-table-center-viewport">
                    <!-- <div class="free-table-fix-left"></div> -->

                    <div class="free-table-center">
                        <div class="free-table-center-container" :style="tableCenterStyles">
                            <div class="free-table-cell" 
                                v-for="(col, idx) in columns" 
                                :key="idx" 
                                :style="[columnStyles(col)]"
                            >
                                <span class="free-table-column-title" :class="[tableCellBoxClass(idx)]">
                                    <div class="free-table-header-cell-title">
                                        <div class="free-table-header-cell-title-inner">
                                            {{ col.title }}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- <div class="free-table-fix-right"></div> -->
                </div>
                <div class="free-table-header-scrollbar"></div>
            </div>
            <!-- body -->
            <div class="free-table-body" :style="tableBodyStyles">
                <div class="free-table-body-viewport-container" ref="freeTableBodyRef" @wheel="tableWheel">
                    <div class="free-table-fix-left"></div>

                    <div class="free-table-center">
                        <div class="free-table-center-container" :style="tableCenterStyles">
                            <div class="free-table-row" v-for="(row, rIdx) in props.dataSource" :key="rIdx">
                                <div class="free-table-cell" 
                                    v-for="(col, cIdx) in props.columns" 
                                    :key="cIdx" 
                                    :style="[columnStyles(col)]"
                                >
                                    <div class="free-table-cell-inner">
                                        <div class="free-table-cell-content">
                                            {{ row[col['dataIndex']] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="free-table-fix-right"></div>
                </div>
                <div class="free-table-vertical-scroll">
                    <div class="free-table-vertical-scroll-viewport"
                        ref="bodyVerticalScrollRef"
                        @scroll="bodyVerticalScroll"
                        :style="bodyVerticalScrollViewportStyle"
                    >
                        <div class="free-table-body-vertical-scroll-container" :style="bodyScrollStyles"></div>
                    </div>
                </div>
            </div>
            <!-- pagination -->
            <div>

            </div>
        </div>
        <div class="free-table-horizontal-scroll">
            <div class="free-table-horizontal-scroll-viewport" 
                ref="horizontalScrollRef" 
                :style="horizontalScrollViewportStyles"
                @scroll="horizontalScroll"
            >
                <div class="free-table-body-horizontal-scroll-container" :style="horizontalScrollStyles"></div>
            </div>
            <!-- 右侧填充 -->
            <div class="free-table-horizontal-scroll-fill"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>