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

对于 css 的学习,感谢[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS)与[W3school](http://www.w3school.com.cn/css/index.asp)提供的优秀资料随着深入学习,此篇文章持续更新...

<!-- more -->

`css`中一些踩过的坑:

1.  `inline`是按照基线对齐的,可通过`vertical-align`调节
2.  2 个`inline-block`中间的空格是字体大小空格,将父元素字体大小设为 0 可取消
3.  优先使用`overflow:auto` 不同系统处理不一样
4.  个人觉得 css 处理文本长度不如 js 处理稳定
5.  伪元素`::before`是真的一个元素,伪类`:hover`是一种状态

6.hack 处理....愿世界没有 ie...建议找一个不那么在意兼容的工作 7.`float`布局会导致父元素高度坍塌,可以使用`overflow:auto`或者添加下方这个伪元素处理

```css
::after {
    content: '';
    display: block;
    clear: both;
}
```

### 媒体查询-响应式开发

响应式设计就是一套 CSS 根据当前的分辨率选择不同的样式
媒体查询主要用来:

-   检测媒体的类型, 比如 screen, tv 等
-   检测布局视口的特性, 比如视口的宽高分辨率等

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
/* 横屏设置
orientation：portrait | landscape
portrait：指定输出设备中的页面可见区域高度大于或等于宽度
landscape： 除portrait值情况外，都是landscape
 */
@media only screen and (orientation: landscape) {
    body {
        background-color: lightblue;
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

| 值       | 描述                                                        |
| :------- | :---------------------------------------------------------- |
| static   | 默认 `static`                                               |
| relative | 相对定位 可相对自身偏移                                     |
| absolute | 完全绝对定位, 忽略其他所有东西, 往上浮动到 非 static 的元素 |
| fixed    | 基于 `window` 的绝对定位, 不随页面滚动改变                  |

**非 `static` 元素可以用 `top left bottom right` 属性来设置坐标**
**非 `static` 元素可以用 `z-index` 属性来设置显示层次**

-   e.pageX——相对整个页面的坐标
-   e.clientX——相对可视区域的坐标
-   e.offsetX——相对当前坐标系的 border 左上角开始的坐标

---

### 常用 css

```css
/*input 默认元素设置*/
::-webkit-input-placeholder {
    color: #ababab;
}

/*小箭头*/
&::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}
/*按钮按压效果*/
.button {
    display: inline-block;
    padding: 15px 25px;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #4caf50;
    border: none;
    border-radius: 15px;
    box-shadow: 0 9px #999;
}

.button:hover {
    background-color: #3e8e41;
}

.button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
/*2个css实现的loding效果 1rem=16px*/
@keyframes bouncing-loader {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0.1;
        transform: translateY(-1rem);
    }
}
.bouncing-loader {
    display: flex;
    justify-content: center;
}
.bouncing-loader > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
    animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
    animation-delay: 0.4s;
}

/* 第2个*/
@keyframes donut-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.donut {
    display: inline-block;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #7983ff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: donut-spin 1.2s linear infinite;
}
/*css内部计算器多用于列表*/
ul {
    counter-reset: counter;
}
li::before {
    counter-increment: counter;
    content: counters(counter, '.') ' ';
}
/*文本选择的伪选择器*/
::selection {
    background: aquamarine;
    color: black;
}
/*root等同于html,方便的全局变量定义*/
:root {
    --some-color: #da7800;
    --some-keyword: italic;
    --some-size: 1.25em;
    --some-complex-value: 1px 1px 2px whitesmoke, 0 0 1em slategray, 0 0 0.2em slategray;
}
.custom-variables {
    color: var(--some-color);
    font-size: var(--some-size);
    font-style: var(--some-keyword);
    text-shadow: var(--some-complex-value);
}

/*悬停下划线动画效果*/
.hover-underline-animation {
    display: inline-block;
    position: relative;
    color: #0087ca;
}
.hover-underline-animation::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #0087ca;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}
.hover-underline-animation:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
/*重置所有样式为默认*/
.reset-all-styles {
    all: initial;
}
/*优先使用系统字体*/
.system-font-stack {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
        'Helvetica Neue', Helvetica, Arial, sans-serif;
}
/*三角形*/

.triangle.tr {
    width: 0;
    height: 0;
    border-top: 20px solid #333;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
}
/*截断文本 max-width:100%;*/
.truncate-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
}
```

```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
<!--第2个loding-->
<div class="donut"></div>

<ul>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ul>

<p class="hover-underline-animation">Hover this text to see the effect!</p>

<div class="triangle"></div>
```

动态加载同一图片不同大小
`srcset`可以使游览器动态加载不同大小图片
`sizes`可以告诉游览器这张图片的宽度,支持媒体查询

```html
<img src="img/480.png" srcset="img/480.png 480w, img/800.png 800w, img/1600.png 1600w" sizes="(min-width:800ox) calc(100% - 200px), 50vw">

  <picture>
        <source media="(max-width:36em)" srcset="img/aaa.png 768w" />
        <source media="(orientation: landscape)" srcset="img/bbb.png 768w" />
        <img src="ccc.png" alt="">
    </picture>
```

### less 与 sass

2 种预 css 处理器,差别不大,`less`使用`@`声明变量,`scss`使用`$`声明
这里我常用的是`less`,简述一些用发:

```less
// 嵌套就不说了...

// 变量与运算
@bgcolor: #blue;
@fontSize: 14px;

.box {
    background: @bgcolor;
    font-size: @fontSize + 2px;
}
// mixins
.bordered {
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
}

#menu a {
    color: #111;
    .bordered;
}

.post a {
    color: red;
    .bordered;
}

// extend  同样使用上面的例子
#menu a {
    &:extend(.bordered)  //等价于上面的,不过是把公共代码提了出来
color: #111;;
}

// loop  (less不支持for循环只能递归模拟)
.gen-col(@n) when (@n > 0) {
    .gen-col(@n - 1);
    .col-@{n} {
        width: 1000px/12 * @n;
    }
}
.gen-col(12);

// import
// 定义一个index.less  依次引入变量文件其他模块文件等...
```
