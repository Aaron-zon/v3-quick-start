import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'
import { constantRoutes, asyncRoutes } from '@/router'
import asyncRouteSettings from '@/config/async-route'

/**
 * check当前角色是否可以使用目标路由
 * @param {*} roles 
 * @param {*} route 
 * @returns 
 */
const hasPermission = (roles, route) => {

    if (route.meta && route.meta.roles) {// 当路由表有roles信息时
        // 循环roles
        return roles.some((role) => {
            
            if (route.meta?.roles !== undefined) { // 路由中存在roles信息
                // check当前脚色是否再路由角色列表中
                return route.meta.roles.includes(role)
            } else {
                // 路由中不存在roles信息
                return false
            }
        })
    } else {
        return true
    }
}

/**
 * 过滤动态路由，返回当前用户权限下可以使用的路由
 * 会对传入路由表中路由的子路由进行递归check
 * @param {*} routes 动态路由的路由表
 * @param {*} roles 角色权限信息
 * @returns 
 */
const filterAsyncRoutes = (routes, roles) => {
    const res = []
    // 对传入路由表进行循环
    routes.forEach((route) => {
        const r = { ...route }
        if (hasPermission(roles, r)) {
            // 当前路由存在子路由进行递归
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles)
            }
            // 如果没有子路由将当前路由信息存入res
            res.push(r)
        }
    })
    return res
}

export const usePermissionStore = defineStore('permission', () => {
    const routes = ref([])
    const dynamicRoutes = ref([])

    const setRoutes = (roles) => {
        // 判断动态路由模式是否开启，开启执行 filterAsyncRoutes根据roles显示路由，未开启获取route中所有动态路由并显示
        const accessedRoutes = asyncRouteSettings.open ? filterAsyncRoutes(asyncRoutes, roles) : asyncRoutes
        routes.value = constantRoutes.concat(accessedRoutes)
        dynamicRoutes.value = accessedRoutes
    }

    return { routes, dynamicRoutes, setRoutes }
})

export function usePermissionStoreHook() {
    return usePermissionStore(store)
}