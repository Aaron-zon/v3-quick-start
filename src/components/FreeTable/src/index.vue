<script setup>
import { ref, onMounted, computed } from 'vue'
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

// 表格宽度
const freeTableWidth = ref(0);
// 滚动条尺寸设置
// const scrollMeasure = ref(17);

onMounted(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(freeTableRef.value);

    return () => {
        resizeObserver.disconnect();
    };
})

/**
 * 当浏览器尺寸变化时监控freeTable的尺寸变化
 */
const handleResize = () => {
    freeTableWidth.value = freeTableRef?.value?.offsetWidth || 0;
}

/**
 * 计算每列的宽度
 */
const calculateColumnWidths = computed(() => {
    let width = freeTableWidth.value;
    if (props?.scroll?.x && props.scroll.x > width) {
        width = props?.scroll?.x;
    }
    if (props?.scroll?.y && props?.scroll?.y > 0) {
        width = width - props.scrollMeasure;
    }
    // 自定义宽度的列的个数
    let customWidthNum = 0;
    // 列设定
    const columns = props.columns;
    // 每列的宽度
    const columnWidths = {};
    // 对自定义宽度的列进行处理
    let totalColumnWidth = 0;

    columns.forEach((column) => {
        const checkResult = checkNumberOrString(column?.width);
        if (checkResult === 'Number' || checkResult == 'String') {
            width -= column.width;
            column.customWidth = true;
            customWidthNum ++;
        }
    })

    // 为每列设置宽度
    columns.forEach((column) => {
        if (column.customWidth) {
            columnWidths[column.dataIndex] = column.width;
        } else {
            columnWidths[column.dataIndex] = width / (columns.length - customWidthNum);
        }
        totalColumnWidth += columnWidths[column.dataIndex];
    })
    
    return columnWidths;
})

/**
 * 判断传入参数是否是number或string类型
 * @param {*} input 
 */
function checkNumberOrString(input) {
    if (typeof input === 'number' || (!isNaN(input) && typeof input !== 'boolean')) {
        return 'Number';
    } else if (typeof input === 'string') {
        return 'String';
    } else {
        return 'Not a valid number or string';
    }
}

/**
 * 计算free-table-center-container的样式
 */
const tableCenterStyles = computed(() => {
    let width = freeTableWidth.value;
    if (props?.scroll?.x && props.scroll.x > width) {
        width = props?.scroll?.x;
    }
    if (props?.scroll?.y && props?.scroll?.y > 0) {
        width = width - props.scrollMeasure;
    }
    return {
        width: `${width}px`
    }
})

/**
 * 计算free-table-body的样式
 */
const tableBodyStyles = computed(() => {
    let styles = {};
    if (props?.scroll?.y) {
        styles['max-height'] = `${props.scroll.y}px`
    }

    return styles;

})

/**
 * 设置表头列的class
 * @param {*} idx 
 */
const tableCellBoxClass = (idx) => {
    let className = 'free-table-cell-box';
    if (idx == props.columns.length - 1 && !props?.scroll?.y) {
        className = '';
    }
    return className;
}

/**
 * 表头列样式
 * @param {*} col 
 */
const columnStyles = (col) => {
    return {
        width: `${calculateColumnWidths.value[col['dataIndex']]}px`
    }
}


// Y轴滚动条容器样式
const bodyVerticalScrollRef = ref(null);

/**
 * X轴滚动条滚动时
 */
const horizontalScroll = () => {
    freeTableHeaderRef.value.scrollLeft = horizontalScrollRef.value.scrollLeft;
    freeTableBodyRef.value.scrollLeft = horizontalScrollRef.value.scrollLeft;
}

/**
 * X轴滚动条容器样式
 */
const horizontalScrollViewportStyles = computed(() => {
    let styles = {
        'overflow-x': 'hidden'
    };
    let width = freeTableWidth.value;
    if (props?.scroll?.x && width < props.scroll.x && width != 0) {
        styles['overflow-x'] = 'scroll';
    }

    return styles;
})

/**
 * X轴滚动条内容部分样式
 */
const horizontalScrollStyles = computed(() => {
    let width = freeTableWidth.value;
    if (props?.scroll?.x && props.scroll.x > width) {
        width = props?.scroll?.x;
    }
    if (props?.scroll?.y && props?.scroll?.y > 0) {
        width = width - props.scrollMeasure;
    }
    return {
        'width': `${width}px`,
        'min-width': `${width}px`,
        'max-width': `${width}px`,
        'height': `${props.scrollMeasure}px`,
        'min-height': `${props.scrollMeasure}px`,
        'max-height': `${props.scrollMeasure}px`,
    }
})

/**
 * Y轴滚动条滚动时
 */
const bodyVerticalScroll = () => {
    freeTableBodyRef.value.scrollTop = bodyVerticalScrollRef.value.scrollTop;
}
/**
 * Y轴滚动条容器样式
 */
const bodyVerticalScrollViewportStyle = computed(() => {
    let styles = {
        'overflow-y': 'hidden'
    };
    if (props?.scroll?.y) {
        const height = props.scroll.y + props.scrollMeasure;
        styles['height'] = `${height}px`
        styles['overflow-y'] = 'scroll';
    }
    return styles;
})

/**
 * Y轴滚动条内容部分样式
 */
const bodyScrollStyles = computed(() => {
    let styles = {};
    if (props?.scroll?.y && props.scroll.y > 0) {
        const height = props.rowHeight * props.dataSource.length + props.scrollMeasure + 1;
        styles['height'] = `${height}px`;
        styles['min-height'] = `${height}px`;
        styles['max-height'] = `${height}px`;

        styles['width'] = `${props.scrollMeasure}px`;
        styles['min-width'] = `${props.scrollMeasure}px`;
        styles['max-width'] = `${props.scrollMeasure}px`;
    }
    return styles;
})
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
                <div class="free-table-body-viewport-container" ref="freeTableBodyRef">
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
.free-table-container {
    --free-table-primary-color: #1677ff;
    --free-table-primary-color-1: #e6f4ff;
    --free-table-primary-color-2: #bae0ff;
    --free-table-primary-color-3: #91caff;
    --free-table-primary-color-4: #69b1ff;
    --free-table-primary-color-5: #4096ff;
    --free-table-primary-color-6: #1677ff;
    --free-table-primary-color-7: #0958d9;
    --free-table-primary-color-8: #4096ff;
    --free-table-primary-color-9: #1677ff;
    --free-table-primary-color-10: #0958d9;
    --free-table-white: #fff;
    --free-table-black: #000;
    --free-table-bg: #fff;
    --free-table-row-bg: #fff;
    --free-table-row-hover-bg: #fafafa;
    --free-table-row-insert-bg: #fff1f0;
    --free-table-row-selected-bg: var(--free-table-primary-color-1);
    --free-table-row-selected-hover-bg: var(--free-table-primary-color-2);
    --free-table-expanded-row-bg: #fafafa;
    --free-table-component-background: #fff;
    --free-table-background-color: #fafafa;
    --free-table-background-color-selected: #fafafa;
    --free-table-background-color-summary: #fafafa;
    --free-table-header-drag-bg: #f2f2f2;
    --free-table-header-sort-active-bg: #f2f2f2;
    --free-table-header-filter-active-bg: rgba(0, 0, 0, 0.04);
    --free-table-header-cell-split-color: rgba(0, 0, 0, 0.06);
    --free-table-header-icon-color: rgba(0, 0, 0, 0.45);
    --free-table-header-color: rgba(0, 0, 0, 0.85);
    --free-table-header-icon-color-hover: rgba(0, 0, 0, 0.6);
    --free-table-header-sort-bg: #f5f5f5;
    --free-table-body-sort-bg: #fafafa;
    --free-table-border-color: #ebebeb;
    --free-table-border-color-base: #d9d9d9;
    --free-table-cell-focus-border-color: #1677ff;
    --free-table-disabled-color: rgba(0, 0, 0, 0.25);
    --free-table-disabled-bg: #f5f5f5;
    --free-table-text-color: rgba(0, 0, 0, 0.85);
    --free-table-text-color-secondary: rgba(0, 0, 0, 0.45);
    --free-table-ping-box-shadow-color: rgba(5, 5, 5, 0.06);
    --free-table-popup-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    --free-table-ghost-image-shadow-color: rgba(0, 0, 0, 0.15);
    --free-table-box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.free-table-container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;

    .free-table-loading {
        position: relative;
        box-sizing: border-box;
        height: 100%;

        .free-table-header {
            box-sizing: border-box;
            flex-grow: 0;
            flex-shrink: 0;
            height: auto;
            background-color: var(--free-table-background-color);
            transition: background-color 0.3s ease;
            border-radius: 6px 6px 0 0;
            display: flex;
            position: relative;
            overflow: hidden;

            .free-table-center-viewport {
                box-sizing: border-box;
                height: 55px;
                display: flex;
                flex: 1 1 auto;
                flex-shrink: 0;
                flex-grow: 0;
                position: relative;
                width: auto;

                .free-table-center {
                    box-sizing: border-box;
                    flex-shrink: 0;
                    flex-grow: 0;
                    position: relative;
                    min-width: 0;
                    min-height: 100%;
                    height: 100%;
                    width: auto;

                    .free-table-center-container {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        position: relative;

                        .free-table-cell {
                            box-sizing: border-box;
                            display: inline-flex;
                            padding: 0 !important;
                            align-items: center;
                            float: left;
                            color: var(--free-table-header-color);
                            font-weight: 500;
                            text-align: left;
                            overflow: visible;
                            background-color: var(--free-table-background-color);
                            transition: background-color 0.2s ease;
                            border-bottom: 1px solid var(--free-table-border-color);
                                                        
                            // TODO
                            height: 55px;

                            &:last-child {
                                .free-table-cell-box::before {
                                    background-color: transparent;
                                }
                            }
                            

                            .free-table-column-title {
                                box-sizing: border-box;
                                width: 100%;
                                padding: 0 16px;
                                position: relative;

                                &.free-table-cell-box {
                                    ::before {
                                        position: absolute;
                                        top: 50%;
                                        right: 1px;
                                        width: 1px;
                                        height: 1.6em;
                                        pointer-events: none;
                                        background-color: var(--free-table-header-cell-split-color);
                                        transform: translateY(-50%);
                                        transition: background-color 0.3s;
                                        content: '';
                                    }
                                }

                                .free-table-header-cell-title {
                                    box-sizing: border-box;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    flex: auto;
                                    max-width: 100%;

                                    .free-table-header-cell-title-inner {
                                        box-sizing: border-box;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        word-break: keep-all;
                                        overflow-wrap: break-word;
                                        flex-grow: 1;
                                        font-weight: 600;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 头部区域Y轴滚动条填充
            .free-table-header-scrollbar {
                box-sizing: border-box;
                display: inline-block;
                position: absolute; 
                top: 0;
                right: 0px;
                width: 17px; 
                height: 55px;
            }
        }

        // 内容区域
        .free-table-body {
            box-sizing: border-box;
            display: flex;
            position: relative;
            height: 100%;
            width: 100%;
            flex: 1 1 auto;
            flex-direction: row;
            
            // 数据
            .free-table-body-viewport-container {
                box-sizing: border-box;
                overflow-x: hidden;
                overflow-y: hidden;
                .free-table-center {
                    box-sizing: border-box;
                    flex-shrink: 0;
                    flex-grow: 0;
                    position: relative;
                    flex: 1 1 auto;
                    min-width: 0;
                    min-height: 100%;
                    position: relative;

                    .free-table-center-container {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        position: relative;

                        .free-table-row {
                            box-sizing: border-box;
                            color: var(--free-table-text-color);
                            background-color: var(--free-table-row-bg);
                            width: 100%;
                            display: flex;
                            align-items: center;
                            // position: absolute;
                            border-bottom: 1px solid var(--free-table-border-color);

                            .free-table-cell {
                                // position: absolute;
                                // top: 0;
                                height: 100%;
                                flex: none;
                                display: flex;
                                align-items: center;

                                // TODO
                                width: 188px;

                                .free-table-cell-inner {
                                    box-sizing: border-box;
                                    padding: 0 !important;
                                    margin: 0 !important;
                                    border: none !important;
                                    min-width: 1px;
                                    flex-grow: 1;
                                    flex-shrink: 1;
                                    display: inline-flex;
                                    align-items: center;

                                    .free-table-cell-content {
                                        padding: 16px 16px;
                                        width: 100%;
                                        overflow-wrap: break-word;
                                        -webkit-font-smoothing: subpixel-antialiased;
                                    }
                                }
                            }
                        }
                    }
                    

                }
            }

            // 内容区Y轴滚动条
            .free-table-vertical-scroll {
                box-sizing: border-box;
                outline: none;
                position: absolute;
                right: 0;
                display: flex;
                min-height: 0;
                z-index: 4;

                height: auto;
                max-width: 17px;
                min-width: 17px;
                width: 17px;
                .free-table-vertical-scroll-viewport {
                    width: 17px; 
                    min-width: 17px; 
                    max-width: 17px; 
                }
            }
        }
        
        
    }

    // X轴滚动条
    .free-table-horizontal-scroll {
        box-sizing: border-box;
        outline: none;
        position: relative;
        display: flex;
        min-width: 0;
        z-index: 4;

        width: 100%;
        max-height: 17px;
        min-height: 17px;
        height: 17px;

        .free-table-horizontal-scroll-viewport {
            height: 17px; 
            min-height: 17px; 
            max-height: 17px; 
            width: 100%;
        }

        .free-table-horizontal-scroll-fill {
            width: 17px; 
            height: 100%; 
            overflow-x: hidden;
            position: absolute;
            right: 0;
            background-color: #fff;
        }
    }
}
</style>