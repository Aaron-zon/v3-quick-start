import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

export default function useDefaultLayout() {

    const appStore = useAppStore();

    /** 计算当前应该显示的class，来控制sidebar的显示隐藏 */
    const classList = computed(() => {
        return {
            hideSidebar: !appStore.sidebar.opened,
            openSidebar: appStore.sidebar.opened,
        }
    })

    return {
        classList
    }
}