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
    }
});

const freeTableRef = ref(null);
const freeTableWidth = ref(0);

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
    freeTableWidth.value = freeTableRef.value.offsetWidth;
    console.log(freeTableWidth.value);
}

/**
 * 计算每列的宽度
 */
const calculateColumnWidths = computed(() => {
    let width = freeTableWidth.value;
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

    if (props?.scroll?.x && totalColumnWidth > props.scroll.x) {
        freeTableRef.value.style.overflowX = 'auto';
    }

    return columnWidths;
})

function checkNumberOrString(input) {
    if (typeof input === 'number' || (!isNaN(input) && typeof input !== 'boolean')) {
        return 'Number';
    } else if (typeof input === 'string') {
        return 'String';
    } else {
        return 'Not a valid number or string';
    }
}

const tableCenterStyles = computed(() => {
    let width = freeTableWidth.value;
    if (props?.scroll?.x) {
        width = props?.scroll?.x;
    }
    return {
        width: `${width}px`
    }
})

const columnStyles = (col) => {
    return {
        width: `${calculateColumnWidths.value[col['dataIndex']]}px`
    }
}
</script>

<template>
    <div class="free-table-container" ref="freeTableRef">
        <div class="free-table-loading">
            <!-- Header -->
            <div class="free-table-header">
                <div class="free-table-center-viewport">
                    <div class="free-table-fix-left"></div>
                    <div class="free-table-center">
                        <div class="free-table-center-container" :style="tableCenterStyles">
                            <div class="free-table-cell" 
                                v-for="(col, idx) in columns" 
                                :key="idx" 
                                :style="[columnStyles(col)]"
                            >
                                <span class="free-table-column-title">
                                    <div class="free-table-header-cell-title">
                                        <div class="free-table-header-cell-title-inner">
                                            {{ col.title }}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="free-table-fix-right"></div>
                </div>
            </div>
            <!-- body -->
            <div class="free-table-body">
                <div class="free-table-body-viewport-container">
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
                                            <!-- {{ calculateColumnWidths[col['dataIndex']] }} -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="free-table-fix-right"></div>
                </div>
            </div>
            <!-- pagination -->
            <div>

            </div>
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
    border: 1px solid var(--table-black);

    .free-table-loading {
        position: relative;
        box-sizing: border-box;

        .free-table-header {
            box-sizing: border-box;
            flex-grow: 0;
            flex-shrink: 0;
            height: auto;
            overflow-x: auto;
            overflow-y: hidden;
            background-color: var(--free-table-background-color);
            transition: background-color 0.3s ease;
            border-radius: 6px 6px 0 0;

            .free-table-center-viewport {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                overflow: auto;
                display: flex;

                position: relative;
                flex: 1 1 auto;
                min-width: 0;
                min-height: 100%;

                .free-table-center {
                    box-sizing: border-box;
                    flex-shrink: 0;
                    flex-grow: 0;
                    position: relative;
                    flex: 1 1 auto;
                    min-width: 0;
                    min-height: 100%;

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
                                .free-table-column-title::before {
                                    background-color: transparent;
                                }
                            }

                            .free-table-column-title {
                                box-sizing: border-box;
                                width: 100%;
                                padding: 0 16px;
                                position: relative;
                                // TODO
                                left: 0px;

                                &:before {
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
        }

        .free-table-body {
            box-sizing: border-box;
            display: flex;
            position: relative;
            height: 100%;
            width: 100%;
            flex: 1 1 auto;
            flex-direction: row;

            .free-table-body-viewport-container {
                
                .free-table-center {
                    box-sizing: border-box;
                    flex-shrink: 0;
                    flex-grow: 0;
                    position: relative;
                    flex: 1 1 auto;
                    min-width: 0;
                    min-height: 100%;
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
    }
}
</style>