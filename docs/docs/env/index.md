# 多环境

## 环境变量

本项目中默认提供了两个环境变量文件，根据项目的差异可以添加新的符合要求的环境变量文件。

```shell
.env.development    # development环境中被载入
.env.production     # production环境中被载入
...
.env.[mode]         # 指定模式中被载入
```

环境变量中包含的了项目中使用到的配置，以【键=值】形式存在。

```shell
# 开发环境请求后端接口路径
VITE_BASE_API = '/api/v1'

# 开发环境入口地址前缀
VITE_PUBLIC_PATH = './'

# 代理路径
VITE_PROXY_API = 'https://mock.apifox.cn/m1/3139849-0-default/qweasdzxc'
```

根据项目需要可以在这里添加你需要用到的环境变量。

## 使用环境变量

在js环境下，可以利用import语法使用这些环境变量。

```javascript
let baseUrl = import.meta.env.VITE_BASE_API;

```

它将获取`.env`文件中`VITE_BASE_API`所对应的值。

## 构建相关

在项目构建时，有些环境变量需要在`vite.config.js`中使用。

可以使用`vite`提供的`loadEnv`和`mode`参数来获取当前环境下使用的环境变量

```javascript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const viteEnv = loadEnv(mode, process.cwd())
    const { VITE_PUBLIC_PATH, VITE_PROXY_API } = viteEnv
})
```