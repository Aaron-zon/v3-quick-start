import { createRouter, createWebHashHistory } from 'vue-router'
import { layout } from '@/layout/index.js'
// 常驻路由
export const constantRoutes = [
  // 登录
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import('@/views/login/index.vue')
    },
    // 首页
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
    // 表格
    {
        path: '/table',
        component: layout,
        redirect: '/table/simpleTable',
        name: 'Table',
        meta: {
            title: '表格',
            elIcon: 'Grid'
        },
        children: [
            {
                path: 'simpleTable',
                component: () => import('@/views/table/simpleTable/index.vue'),
                name: 'SimpleTable',
                meta: {
                  title: '简单表格',
                  elIcon: 'Grid'
                }
            },
        ]
    },
    // 表单
    {
      path: '/form',
      component: layout,
      redirect: '/form/comprehensiveForm',
      name: 'Form',
      meta: {
          title: '表单',
          elIcon: 'Tickets'
      },
      children: [
        {
          path: 'comprehensiveForm',
          component: () => import('@/views/form/comprehensiveForm/index.vue'),
          name: 'ComprehensiveForm',
          meta: {
            title: '综合表单',
          }
        },
        {
          path: 'stepForm',
          component: () => import('@/views/form/stepForm/index.vue'),
          name: 'StepForm',
          meta: {
            title: '分步表单',
          }
        }
      ]
    },
    // 常用组件
    {
      path: '/commonComponents',
      component: layout,
      redirect: '/commonComponents/upload',
      name: 'CommonComponents',
      meta: {
          title: '常用组件',
          elIcon: 'Menu'
      },
      children: [
        // 上传文件
        {
          path: 'upload',
          component: () => import('@/views/commonComponents/upload/index.vue'),
          name: 'Upload',
          meta: {
            title: '上传',
            elIcon: 'UploadFilled'
          }
        },
        // 嵌套路由
        {
          path: "menu",
          name: "Menu",
          meta: {
            title: "menu"
          },
          children: [
            {
              path: "menu-1",
              component: () => import('@/views/test2/index.vue'),
              name: "Menu-1",
              meta: {
                title: "menu-1"
              }
            },
            {
              path: "menu-2",
              component: () => import('@/views/test2/index.vue'),
              name: "Menu-2",
              meta: {
                title: "menu-2"
              },
              children: [
                {
                  path: "menu-2-1",
                  component: () => import('@/views/test2/index.vue'),
                  name: "Menu-2-1",
                  meta: {
                    title: "menu-2-1"
                  }
                },
                {
                  path: "menu-2-2",
                  component: () => import('@/views/test2/index.vue'),
                  name: "Menu-2-2",
                  meta: {
                    title: "menu-2-2"
                  }
                }
              ]
            },
          ]
        },
      ]
    },
    {
      path: '/classicCase',
      component: layout,
      name: 'ClassicCase',
      meta: {
        title: '经典案例',
        elIcon: 'CopyDocument'
      },
      children: [
        {
          path: 'userManage',
          component: () => import('@/views/classicCase/usersManage/index.vue'),
          name: 'UserManage',
          meta: {
            title: '用户管理',
            elIcon: 'UserFilled'
          }
        },
        {
          path: 'personal',
          component: () => import('@/views/classicCase/personal/index.vue'),
          name: 'Personal',
          meta: {
            title: '个人设定',
            elIcon: 'Avatar',
          }
        }
      ]
    }
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