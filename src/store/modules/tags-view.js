import { ref } from 'vue';
import { defineStore } from 'pinia';

/**
 * tag配置
 */
export const useTagsViewStore = defineStore('tags-view', () => {
    const visitedViews = ref([]);

    const addVisitedViews = (route) => {
        const viewExistCheck = visitedViews.value.some((item, i) => {
            if (item.path === route.path) {
                return true;
            }
        });
        // 这个页面没有被打开过
        if (!viewExistCheck) {
            visitedViews.value.push(Object.assign({}, route));
        }
    };

    const removeVisitedView = (route) => {
        for (const i in visitedViews.value) {
            let item = visitedViews.value[i];
            if (item.path === route.path) {
                visitedViews.value.splice(i, 1);
                break;
            }
        }
    };

    const filterAffixTags = (routes) => {
        routes.filter((item) => {
            console.log(item);
        });
    };

    return {
        visitedViews,
        addVisitedViews,
        removeVisitedView,
        filterAffixTags,
    };
});

/** 在 setup 外使用 */
export function useTagsViewStoreHook() {
    return useTagsViewStore(store);
}
