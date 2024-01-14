# 发送请求

项目中发送请求基于`Axios`。
:::info
    相关文件`@/utils/service.js`
:::

service.js中有两大部分内容:
- createService：用于创建`Axios`实例的，并且设置拦截器,可以对请求进行统一的错误处理、超时处理
- createRequest：通过`service`创建的实例发送请求

## 访问后端URL

`Axios`的`baseURL`设置在`createRequest`，默认值是 `import.meta.env.VITE_BASE_API`。

它表示根据当前环境使用指定配置文件的`VITE_BASE_API`路径。

- 在开发环境：它会使用根目录下 `.env.development` 中的 `VITE_BASE_API`。
- 在生产环境：它会使用根目录下 `.env.production` 中的 `VITE_BASE_API`。

可以通过修改以上配置文件中的`VITE_BASE_API`来重新设置`baseURL`。


## 前端交互流程

- 1.UI组件交互操作
- 2.调用统一管理的API(`@/api/**`)
- 3.使用封装好的`Request`(`@/utils/service`)
- 4.获取服务端返回
- 5.根据返回数据进行前端操作

为了方便管理，统一的请求处理都放在了`@/api`文件夹中，可以根据业务分组才分到不同的文件夹中

```
api/
    login
    table
    ...
```

## 调用统一管理的API示例

1.创建api文件：`@/api/login/index.js` 或 `@/api/login.js`

2.调用后端login接口

```javascript
// 引入request
import { request } from '@/utils/service';
/**
 * 创建Post请求
 * @param {*} params 参数
 */
export async function loginApi(params) {
    const { data } = await request({
        url: 'users/login', // 接口路径
        method: 'post', // 请求方式
        data: params,
    })

    return data;
}

/**
 * 创建Get请求
 * @param {*} data 参数
 */
export function getUserList(data) {
    return request({
        url: 'users/userList',
        method: 'get',
        data,
    });
}
```