import { ref } from 'vue';

// 表单宽度
export const freeTableWidth = ref(0);

export const useResize = (freeTableRef) => {
    /**
     * 当浏览器尺寸变化时监控freeTable的尺寸变化
     */
    const handleResize = () => {
        freeTableWidth.value = freeTableRef?.value?.offsetWidth || 0;
    }

    const resizeObserver = new ResizeObserver(handleResize);

    /**
     * 开始监听
     * @param {*} el 
     */
    const resizeObserve = (el) => {
        resizeObserver.observe(el);
    }

    /**
     * 结束监听
     */
    const resizeDisconnect = () => {
        resizeObserver.disconnect();
    }

    return {
        freeTableWidth,
        resizeObserve,
        resizeDisconnect
    };
}