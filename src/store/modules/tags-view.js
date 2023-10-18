import { ref } from "vue"
import { defineStore } from "pinia"


export const useTagsViewStore = defineStore('tags-view', () => {
    const visitedViews = ref([
        {
            path: '/table/simpleTable',
            meta: {
                title: '简单表格'
            }
        }
    ])
    return {
        visitedViews
    };
});

/** 在 setup 外使用 */
export function useTagsViewStoreHook() {
    return useTagsViewStore(store)
}