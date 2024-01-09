import { useUserStore } from '@/store/modules/user';

export const permission = {
    mounted(el, binding) {
        let permissionFlg = false
        const { value } = binding
        const { roles } = useUserStore();
        if (value && value.length) {
            // 判断roles中是否有需要的权限
            for (let role of roles) {
                if (value.includes(role)) {
                    permissionFlg = true;
                    break;
                }
            }

            if (!permissionFlg) {
                el.parentNode?.removeChild(el)
            }
        } else {
            throw new Error(`need roles! Like v-permission="['admin','editor']"`)
        }
    }
}
