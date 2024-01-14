# svg-icon

本项目提供3类svg的icon：`本地svg`、`Font Awesome`、`element icons`。

## 本地Svg

本地svg图片存储在`@/icons/svg`，可以根据需要向文件夹中加入`svg`图片

**使用**
```javascript
<SvgIcon :icon="item"></SvgIcon>

```

## Font Awesome

项目中对font awesome进行了二次封装。通过SvgIcon可以使用font awesome提供的icon

**使用**

```javascript
// solid 写法
<SvgIcon icon="home"></SvgIcon>

// regular 写法 type设置为far
<SvgIcon type="far" icon="user"></SvgIcon>

// brands 写法 type设置为fab
<SvgIcon type="fab" icon="monero"></SvgIcon>

```

**solid全部可用icon：** https://fontawesome.com/search?o=r&m=free&s=solid

**regular全部可用icon：** https://fontawesome.com/search?o=r&m=free&s=regular

**brands全部可用icon：** https://fontawesome.com/search?o=r&m=free&f=brands

## element icons

来自于element plus的icon：https://element-plus.org/zh-CN/component/icon.html

使用方法和element plus文档中一致

**使用**

```javascript
<el-icon><Search /></el-icon>
```