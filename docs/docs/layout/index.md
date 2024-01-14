# 布局

页面整体布局包括 导航、左侧栏、面包屑以及内容区等。

## Layout

::: info
对应代码 
`@/layout`
:::

`@` 代表src目录

大部分页面会基于这个layout，除了个别页面如：`login`, `404`等页面没有使用layout。
``` javascript
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
    // 首页
    {
        path: '/',
        component: layout, // 使用layout布局
        children: [
            {
                path: '',
                component: () => import('@/views/home/index.vue'),
                name: 'Home',
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard',
                    affix: true,
                },
            },
        ],
    },
```

`layout`本质上是一个嵌套路由

```
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

## app-main

::: info
对应代码 
`@/layout/components/AppMain`
:::

这里是二级路由内容的显示区域，默认是不会缓存组件的，如果想要对组件进行缓存可以在`component`外添加一层`keep-alive`。

如果想要添加页面切换动画，可以在`component`外添加`transition`设置动画效果。

## 多布局

**layout中目前提供两种**：左边栏菜单模式（默认），顶部菜单模式

可以通过修改`@/store/modules/settings.js`下的`layoutMode`来设置默认显示的`layout`。

``` javascript
export const useSettings = defineStore('settings', () => {
    // 布局模式 Top/Left
    const layoutMode = ref('Left');

    ...
});
```