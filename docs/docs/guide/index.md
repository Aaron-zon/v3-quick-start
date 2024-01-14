# 介绍

`v3-quick-start`是一个后台管理系统的前端开发模板，它基于`vue3`和`element plus`实现。

## 依赖

- Vue3
- Element Plus
- Vite
- Pinia
- Vue Router
- Scss
- Axios

## 功能
- 登录 / 登出
- 权限管理
  - 页面权限
  - 指令权限
  - 配置权限 x
- 多环境
  - 开发环境
  - 生产环境
- 多布局
  - 左边导航布局
  - 顶部导航布局
- 多主题
  - 默认
  - 黑色 x
- 其他内置功能
  - SVG
  - 动态侧边栏
  - 标签页导航
  - 遮罩
  - 日历
  - 表格
  - 拖拽
  - 错误页面
  - 编辑器 x
    - 富文本
    - Markdown
  - 文档 x
    - 导出excel
    - 导入excel
    - 前端可视化excel
    - 导出zip
    - word转PDF
    - 脑图绘制

## 目录

```
|—— doc                     # 文档
|—— public                  # 静态资源
|   └── vite.svg            # favicon图标
|—— src                     # 源代码
|   |—— api                 # 请求代码
|   |—— assets              # 静态资源
|   |—— components          # 组件
|   |—— config              # 配置文件
|   |—— constants           # 常量
|   |—— icons               # icons文件夹
|   |—— layout              # 全局布局代码
|   |—— plugins             # 导入插件代码
|   |—— router              # 路由
|   |—— store               # 全局状态管理
|   |—— style               # 全局样式
|   |—— utils               # 全局工具函数
|   |—— views               # 视图
|   |—— App.vue             # 入口页面
|   └── main.js             # 入口文件
|—— .env.development        # 开发环境
|—— .env.production         # 生产环境
|—— index.html              # html
|—— jsconfig.json           # javascript配置文件
|—— package.json            # package.json
|—— vite.config.js          # vite 配置文件
```

## 开发

```shell
# 进入项目目录
cd v3-quick-start

# 安装依赖
pnpm i

# 启动项目
pnpm dev
```

# 主要插件

1.Vue Router：Vue的官方路由 https://router.vuejs.org/zh/

2.Pinia：Vue状态管理库 https://pinia.vuejs.org/zh/

3.Element Plus：基于Vue3的UI组件库 https://element-plus.gitee.io/zh-CN/