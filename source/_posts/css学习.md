---
title: css学习
mathjax: true
toc: true
comments: true
date: 2017-9-18 15:27:55
updated:
tags: css
categories: 前端
---

对于css的学习,感谢[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS)与[W3school](http://www.w3school.com.cn/css/index.asp)提供的优秀资料
随着深入学习,此篇文章持续更新...


<!-- more -->
### 媒体查询-响应式开发

响应式设计就是一套 CSS 根据当前的分辨率选择不同的样式
媒体查询主要用来:
- 检测媒体的类型, 比如 screen, tv等
- 检测布局视口的特性, 比如视口的宽高分辨率等

```html
<style>
@media all and (min-width: 200px) and (max-width: 300px){
    body {
        background: red;
    }
}

/* 网易移动端字体设置 */
@media screen and (max-width: 321px) {
    body {
        font-size:16px
    }
}

@media screen and (min-width: 321px) and (max-width:400px) {
    body {
        font-size:17px
    }
}

@media screen and (min-width: 400px) {
    body {
        font-size:19px
    }
}
</style>
```

上面代码中, all 是媒体类型, 代表任何设备
and 是逻辑操作
意思是, 对于任何设备, 在宽度在 200-300 的范围内应用这个样式

---    
### [伪类](http://www.w3school.com.cn/css/css_pseudo_classes.asp)

```
a:link   { color: white; text-decoration: none; } /*未访问--去下划线*/
a:visited{ color: black; } /*已访问--去下划线*/
a:hover  { color: red; cursor: pointer; } /*悬停--鼠标样式*/
a:active { color: lightblue; } /*选定*/
a.class:visited {color: white;}    /* 独立伪类 */
```

---
### 定位 [position](http://www.w3school.com.cn/cssref/pr_class_position.asp)

|值|描述|
|:-|:-|
|static  |默认 `static`|
|relative|相对定位 可相对自身偏移|
|absolute|完全绝对定位, 忽略其他所有东西, 往上浮动到 非 static 的元素|
|fixed	 |基于 `window` 的绝对定位, 不随页面滚动改变|

**非 `static` 元素可以用 `top left bottom right` 属性来设置坐标**
**非 `static` 元素可以用 `z-index` 属性来设置显示层次**

- e.pageX——相对整个页面的坐标
- e.clientX——相对可视区域的坐标
- e.offsetX——相对当前坐标系的border左上角开始的坐标
