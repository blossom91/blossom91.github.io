---
title: html学习
mathjax: true
toc: true
comments: true
date: 2017-8-24 15:10:20
updated:
tags: html
categories: 前端
---

对于 `html` 的学习,感谢[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)与[W3school](http://www.w3school.com.cn/html/index.asp)提供的优秀资料随着深入学习,此篇文章持续更新...

<!-- more -->

### 移动端设置

设置 `viewport`
`viewport` 是 `html` 的父元素在手机上需要用下面的语句设置它的尺寸

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<script>
//设置rem
document.documentElement.style.fontSize
= document.documentElement.clientWidth / 7.5(iPhone6相对宽度) + 'px';
//通过设计图宽度 / 100 来得出相对宽度 rem
//比如iphone5 设计图宽度640 相对宽度 6.4
</script>
```

| 属性                 | 说明                   |
| :------------------- | :--------------------- |
| width=device-width   | 宽度等于设备宽度       |
| height=device-height | 高度等于设备宽度       |
| initial-scale        | 初始缩放比例           |
| minimum-scale        | 允许用户缩放的最小比例 |
| maximum-scale        | 允许用户缩放的最大比例 |
| user-scalable        | 是否允许用户缩放       |

---

### icon 设置

直接在`index.html`同文件夹放置`favicon.ico`图片或者:

```html
<link rel="icon" href="img" type="image/x-icon" />
```

---

### 视频音频标签

带控制器的视频标签, 不同浏览器有不同的文件格式要求所以用 2 个 source 标签指定不同的视频格式

```html
<video width="300" height="200" controls="controls">
    <source src="movie.mp4">
    <source src="movie.ogv">
</video>
```

带控制器的音频标签, 不同浏览器有不同的文件格式要求所以用 2 个 source 标签指定不同的音频格式

```html
<audio id='id-audio-player' controls="controls">
  <source src="audio.ogg">
  <source src="audio.mp3">
</audio >
```

audio 基本操作如下

```javascript
var a = document.querySelector('#id-audio-player')
a.play() //播放
a.pause() //暂停
a.autoplay //自动播放 (设为true)
a.src //链接音频文件
a.volume //音量（0-1之间的数）
a.duration //音频时间长度
a.currentTime = 1 //现在播放第几s（设置）
a.playbackRate // 播放速率, 默认是 1
```
