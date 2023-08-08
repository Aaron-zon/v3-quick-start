import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePermissionStore } from "./permission"
import router, { resetRouter } from '@/router'
import { loginApi, getUserInfoApi } from "@/api/login"
import { getToken, removeToken, setToken } from '@/utils/cache/cookies'
import asyncRouteSettings from '@/config/async-route'

export const useUserStore = defineStore('user', () => {
    const username = ref(getToken() || '')
    const token = ref('')
    const roles = ref([])

    const permissionStore = usePermissionStore()

    const login = async ({ username, password, code }) => {
        const { data } = await loginApi({ username, password, code })
        setToken(data.token)
        token.value = data.token
    }

    /** 获取用户详细信息 */
    const getInfo = async () => {
        const { data } = await getUserInfoApi()
        username.value = data.username
        // 检查返回的roles是否为空数组，如果是设置为默认角色
        roles.value = data.roles?.length > 0 ? data.roles : asyncRouteSettings.defaultRoles
    }

    /** 切换角色 */
    const changeRoles = async (role) => {
        const newToken = "token-" + role
        token.value = newToken
        setToken(newToken)
        await getInfo()
        // 路由设定 TODO
        permissionStore.setRoutes(roles.value)
        resetRouter()

        
    }

    /** 设置权限 */
    const setRoles = (value) => {
        roles.value = value
    }

    /** 设置用户名称 */
    const setUserName = (name) => {
        username.value = name
    }

    /** 登出 */
    const logout = () => {
        // 清除cookie中的token
        removeToken();
        // 清除vuex中的token
        token.value = ''
        // 清除vuex中的权限
        roles.value = []
        // 重置路由
        resetRouter()
    }
    
    /** 重置Token */
    const resetToken = () => {
        removeToken();
        token.value = ''
        roles.value = []
    }

    return { token, roles, username, setToken, setUserName, login, logout, resetToken, setRoles }
})