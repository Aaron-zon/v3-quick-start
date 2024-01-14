# 错误处理

## 页面

:::info
文件位置`@/views/error/404.vue`
:::

当`url`中输入了路由表中不存在的路由就会跳转到这个页面，页面可以根据需要进行修改。

:::warning
用于重定向到404的路由一定要放在最后，如果放在前面，那么它之后的所有路由将被拦截并重定向到404.
:::

## 请求

项目中的所有请求都会走`@/utils/service.js`里面创建了`axios`的实例，通过拦截器可以输出请求的错误信息。

也可以在这里对后台定义的错误进行处理。

```javascript
service.interceptors.response.use(
    function (response) {
        const { code } = response.data;
        if (code != 10000) {

            // 50008: 非法token; 50014：token过期; ...
            if (code == 50008) {
                // 错误处理
            } else if (code == 50014) {
                // 错误处理
            } else ...

        } else {
            return response.data;
        }
    },
    function (error) {
        console.log('err' + error)
        return Promise.reject(error);
    },
);

```