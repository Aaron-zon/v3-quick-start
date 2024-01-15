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