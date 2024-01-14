# 权限验证

## 页面权限

该项目中的权限验证方式是通过当权用户的权限，去对比路由表中设置的权限，生成当前用户可以访问的路由表，通过`router.addRoutes`动态挂载到`router`上。

```javascript
export const asyncRoutes = [
    {
        path: '/roleManage',
        component: markRaw(layout),
        name: 'RoleManage',
        meta: {
            title: '权限处理',
            elIcon: 'CopyDocument',
        },
        children: [
            {
                path: 'adminPage',
                component: () => import('@/views/classicCase/usersManage/adminPage.vue'),
                name: 'AdminPage',
                meta: {
                    title: '管理员权限画面',
                    elIcon: 'UserFilled',
                    roles: ['admin']
                },
            },
            {
                path: 'userPage',
                component: () => import('@/views/classicCase/usersManage/userPage.vue'),
                name: 'UserPage',
                meta: {
                    title: '用户权限画面',
                    elIcon: 'UserFilled',
                    roles: ['admin', 'user']
                },
            },
        ],
    }
];
```

**权限动态配置**

在一些场合下需要权限动态配置，而不是在路由中写死。但其实原理相同。

可以将路由结构存储在后端，在登录后获取用户的`roles`，前端根据`roles`向后端请求可访问的路由表，从而生成可访问页面。

再由`router.addRoutes`动态挂载到`router`上。

```javascript
const map={
    login:require('login/index').default // 同步的方式
    login:()=>import('login/index')      // 异步的方式
}

const serviceMap = [
    { path: '/login', component: 'login', hidden: true }
];

//之后遍历这个map，动态生成asyncRoutes
// 并将 component 替换为 map[component]
```

## 指令权限

在画面中某些按钮、或组件在不同权限下会不显示。

指令权限`v-permission`可以快速的实现这种判断。

```javascript
<template>
  <!-- Admin 权限可以看到这个组件 -->
  <el-tag v-permission="['admin']">admin</el-tag>

  <!-- user 权限可以看到这个组件 -->
  <el-tag v-permission="['user']">user</el-tag>

  <!-- admin和user 权限可以看到这个组件 -->
  <el-tag v-permission="['admin','user']">admin和user</el-tag>
</template>
```
