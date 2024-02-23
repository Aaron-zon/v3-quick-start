标签：
table
table-summary-row
table-summary-cell


属性：
- columns：列设定
  - title：标题
  - dataIndex：对应数据源
  - fixed：对其
  - width：宽度
  - children：内嵌
  - tooltip：自定义提示
    - title：提示消息
    - color：颜色
    - placement：位置
  - filters：表头筛选菜单项
    - text
    - value
- dataSource：数据源
- scroll：表格是否可以滚动，指定滚动区域宽高
  - x
  - y
- pagination：分页器
- sticky：随页面滚动固定的表头
- height：固定表格整体高度
- bordered：边框
- stripe：斑马样式
- row-key：表格行key的取值，可以是字符串也可以是函数
- loading：loading
- auto-header-height：表头自适应
- showHeaderScrollbar：顶部滚动条

事件：
- change：分页、排序、筛选变化时触发

方法：
- scrollTo：滚动到自会顶位置
  
插槽：
- title：表头
- footer：表格尾部
- summary：描述
- tooltipTitle：提示

结构：
- surely-table-wrapper
  - ant-spin-nested-loading
    - ant-spin-container
      - surely-table
        - surely-table-header 表头区域
          - surely-table-center-viewport 表头
            - surely-table-fix-left
            - surely-table-center 显示的主要表头内容
              - surely-table-center-container 表头容器
                - surely-table-cell * n 每一列的表头
                  - surely-table-column-title 标题容器
                    - surely-table-header-cell-title 用来居中
                      - surely-table-header-cell-title-inner 存放文字信息
                        - text 文字信息
            - surely-table-fix-right
          - surely-table-header-scrollbar 表头滚动条
        - surely-table-body 内容区域
          - surely-table-body-container 容器
            - surely-table-fix-left 左侧固定
            - surely-table-center 主内容区
              - surely-table-center-container 容器
                - surely-table-row * n 行
                  - surely-table-cell * n 列
                    - surely-table-cell-inner 内部容器
                      - surely-table-cell-content 内容
                        - text 文字
            - surely-table-fix-right 右侧固定
      - ul ant-pagination 分页

功能：
## 基本表格
- 简单表格 ok
- scroll
  - x ok
  - y ok
- 固定列 wait
  - 左侧
  - 右侧
- 固定高度 
- 边框、页头、页脚 
- 斑马纹 
- tooltip自定义提示
- 自动表头高度
  
- 滚动到指定位置
- 顶部滚动条
- 服务端获取数据

- 表头单元格菜单
- 表头分组
- 总结栏
- 右键菜单

## 分页
- 基本分页 wait
- 分页配置
- 分页加载
- 自定义分页
  
## 拖拽
- 列宽拖拽
- 行拖拽
- 二次确认拖拽
- 自定义拖拽
- 树形拖拽

## 编辑
- 编辑单元格 wait
- 自定义编辑单元格

## 过滤和排序
- 多列排序 wait
- 可控筛选和排序
- 自定义筛选菜单

## 可选择
- 单选 wait
- 多选 wait
- 全选 wait
- 自定义选择 wait
  
## 树形、子表格
- 可展开
  - 默认不展开
  - 默认展开
- 树形数据显示
- 嵌套子表格

## 合并
- 合并列
- 合并行
- 合并表头
- 综合
- 表头分组


## 自定义样式
- 自定义背景色
- 指定行高
- 动态行高
- 自动行高
- 指定宽度
- 动画