# 路由和侧边栏

项目默认采用侧边栏的方式，和路由配合达到动态菜单的效果。

在`@/router/index.js`下配置对应路由，即可在侧边栏显示。减轻手动重复编辑侧边栏的工作量。

## 配置项

```javascript
    // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    hidden: true // (默认 false)
    // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    name: 'router-name' 
    // 一些路由信息
    meta: {
        roles: ['admin', 'user'] // 设置该路由进入的权限，支持多个权限叠加
        title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
        elIcon: 'svg-name' // 设置该路由的图标使用的element的icon库
        svgIcon: 'svg-name' // 另一种设置icon的方式它的图标来自于 @/icons/svg
        breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
        affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
    }
```

## 路由

这里路由分为两种 `constantRoutes` 和 `asyncRoutes`。

**constantRoutes**：表示不需要动态判断权限的路由，这些画面在任何权限下都可以正常显示。
**asyncRoutes**：表示需要动态判断权限路由，根据用户权限通过addRoutes添加到真实路由中。

这两种路由的具体效果会体现在`权限验证`中。

## 添加路由

**1.添加一个一级路由** （如：login、404...）

```javascript
    // 登录
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true,
        },
        component: () => import('@/views/login/index.vue'),
    },
```

**2.添加一个二级路由** （一般为登陆后可见画面）

:::tip
layout是一级路由显示的组件，还需要再下面的children中添加子路由
:::

```javascript
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
                svgIcon: 'dashboard',
            },
        },
    ],
},
```

**3.children中添加多个子路由**

:::tip
children中可以添加多个路由，这时再menu中会有一个展开的箭头，表示这些子路由在一个分组中
:::

```javascript
    {
        path: "/form",
        meta: {
            title: "表单",
            elIcon: "Tickets"
        },
        children: [
            {
                path: 'comprehensiveForm', 
                component: () => import('@/views/form/comprehensiveForm/index.vue'),
                name: 'ComprehensiveForm',
                meta: {
                    title: '综合表单',
                    elIcon: 'Tickets',
                },
            },
            {
                path: 'stepForm',
                component: () => import('@/views/form/stepForm/index.vue'),
                name: 'StepForm',
                meta: {
                    title: '分步表单',
                    elIcon: 'Tickets',
                },
            }
        ]
    },
```

**4.多级路由**

如果路由是多级目录可参照`常用组件`中的`多级路由`

**5.嵌套路由**
如果你的路由是多级目录（多层的嵌套路由），需要特殊处理。**三次路由嵌套时，需要在二级目录跟文件（二级路由画面）下添加**`<router-view>`

```javascript
// 二级路由
<template>
    <div>
        <router-view />
    </div>
</template>
```
如果多层嵌套中有不希望显示在侧边栏菜单的可以在路由表中设置目标的`meta.hidden = true`

例子：

```javascript
{
    path: 'user',
    component: () => import('@/views/user.vue'),
    name: 'User',
    meta: {
        title: '员工管理', // 二级路由
    },
    children: [
        {
            path: 'userList',
            component: () => import('@/views/userList.vue'),
            name: 'UserList',
            meta: {
                title: '员工一览', // 三级路由
            },
        },
        {
            path: 'userAdd',
            component: () => import('@/views/userAdd.vue'),
            name: 'UserAdd',
            meta: {
                title: '添加员工', // 三级路由
                hidden: true, // 因为添加员工是通过员工一览进入因此不用显示在菜单栏
            },
        },
    ]
},
```

**6.外链**

:::tip
在子路由的path中写入外链的链接
:::

```javascript
    {
        path: "/link",
        meta: {
            title: "外链",
            svgIcon: "link"
        },
        children: [
            {
                path: "https://cn.vuejs.org/guide/introduction.html",
                component: () => { },
                name: "Link1",
                meta: {
                    title: "Vue文档"
                }
            }
        ]
    },

```

## 默认侧边栏展开

通过设置`@/store/modules/app.js`的`sidebar.opened`来设置菜单的默认收放。

**opened: true** 侧边栏默认打开。

**opened: false** 侧边栏默认收起。