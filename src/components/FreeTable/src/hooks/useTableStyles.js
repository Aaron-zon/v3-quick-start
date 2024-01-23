import { computed } from 'vue';
import { checkNumberOrString } from './utils';
import { freeTableWidth } from './useResize';

export const useTableStyles = (props) => {

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
                customWidthNum++;
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

    return {
        calculateColumnWidths,
        tableCenterStyles,
        tableBodyStyles,
        tableCellBoxClass,
        columnStyles
    }
}