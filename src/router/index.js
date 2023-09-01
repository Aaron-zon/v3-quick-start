import { createRouter, createWebHashHistory } from 'vue-router'
import { layout } from '@/layout/index.js'
// 常驻路由
export const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/', 
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/views/home/index.vue'),
                name: 'Home',
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard'
                }
            }
        ]
    },
    {
        path: "/table",
        component: layout,
        redirect: "/table/simpleTable",
        name: "Table",
        meta: {
            title: "表格",
            elIcon: "Grid"
        },
        children: [
            {
                path: "simpleTable",
                component: () => import('@/views/table/simpleTable/index.vue'),
                name: "SimpleTable",
                meta: {
                    title: "Simple Table",
                    keepAlive: true
                }
            },
            {
                path: "workableTable",
                component: () => import('@/views/table/workableTable/index.vue'),
                name: "WorkableTable",
                meta: {
                    title: "Workable Table",
                    keepAlive: true
                }
            },
            {
                path: "baseExampleTable",
                component: () => import('@/views/table/baseExampleTable/index.vue'),
                name: "baseExampleTable",
                meta: {
                    title: "baseExampleTable",
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: "/menu",
        component: layout,
        redirect: "/menu/menu1",
        name: "Menu",
        meta: {
          title: "多级菜单",
          svgIcon: "menu"
        },
        children: [
          {
            path: "menu1",
            redirect: "/menu/menu1/menu1-1",
            name: "Menu1",
            meta: {
              title: "menu1"
            },
            children: [
              {
                path: "menu1-1",
                component: () => import('@/views/test2/index.vue'),
                name: "Menu1-1",
                meta: {
                  title: "menu1-1"
                }
              },
              {
                path: "menu1-2",
                component: () => import('@/views/test2/index.vue'),
                redirect: "/menu/menu1/menu1-2/menu1-2-1",
                name: "Menu1-2",
                meta: {
                  title: "menu1-2"
                },
                children: [
                  {
                    path: "menu1-2-1",
                    component: () => import('@/views/test2/index.vue'),
                    name: "Menu1-2-1",
                    meta: {
                      title: "menu1-2-1"
                    }
                  },
                  {
                    path: "menu1-2-2",
                    component: () => import('@/views/test2/index.vue'),
                    name: "Menu1-2-2",
                    meta: {
                      title: "menu1-2-2"
                    }
                  }
                ]
              },
              {
                path: "menu1-3",
                component: () => import('@/views/test2/index.vue'),
                name: "Menu1-3",
                meta: {
                  title: "menu1-3"
                }
              }
            ]
          },
          {
            path: "menu2",
            component: () => import('@/views/test2/index.vue'),
            name: "Menu2",
            meta: {
              title: "menu2"
            }
          }
        ]
    },
];

export const asyncRoutes = [
    // {
    //     path: "/permission", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    //     component: layout,
    //     children: [
    //         {
    //             path: 'test2',
    //             component: () => import('@/views/test2/index.vue'),
    //             meta: {
    //                 title: 'test2',
    //                 svgIcon: 'unocss'
    //             }
    //         }
    //     ]
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach((route) => {
            const { name, meta } = route;
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name);
            }
        })
    } catch {
        window.location.reload();
    }
}


export default router