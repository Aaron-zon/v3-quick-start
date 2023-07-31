import { createRouter, createWebHashHistory } from 'vue-router'
import { layout } from '@/layout/index.js'
// 常驻路由
export const constantRoutes = [
    {
        path: '/', 
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/views/test/index.vue'),
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard'
                }
            }
        ]
    },
    {
        path: '/a', 
        component: layout,
        children: [
            {
                path: 'b',
                component: () => import('@/views/test/index.vue'),
                meta: {
                    title: '首页2',
                    svgIcon: 'dashboard'
                }
            }
        ]
    }
]

export const asyncRoutes = [
    {
        path: "/permission", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
        component: layout,
        children: [
            {
                path: 'test2',
                component: () => import('@/views/test2/index.vue'),
                meta: {
                    title: 'test2',
                    svgIcon: 'unocss'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router