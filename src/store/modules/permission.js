import { defineStore } from 'pinia'
import { ref } from 'vue'
import { constantRoutes, asyncRoutes } from "@/router"


const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => {
            if (route.meta?.roles !== undefined) {
                return route.meta.roles.includes(role)
            } else {
                return false
            }
        })
    } else {
        return true
    }
}

const filterAsyncRoutes = (routes, roles) => {
    const res = []
    routes.forEach((route) => {
        const r = { ...route }
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles)
            }
            res.push(r)
        }
    })
    return res
  }

export const usePermissionStore = defineStore('permission', () => {
    const routes = ref([])
    const dynamicRoutes = ref([])

    const setRoles = (roles) => {
        let accessedRoutes
        if (roles.includes('admin')) {
            accessedRoutes = asyncRoutes
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }

        routes.value = constantRoutes.concat(accessedRoutes)
        dynamicRoutes.value = accessedRoutes
    }

    return { routes, dynamicRoutes, setRoles }
})