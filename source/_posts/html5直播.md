---
title: html5直播
toc: true
mathjax: true
comments: true
date: 2018-07-20 20:30:11
updated:
tags: js
categories: 前端
---

一直喜欢看斗鱼上面 dota2 比赛,突然有一天对直播很感兴趣,所以了解一下.

<!-- more -->

### 流程

pc 端采集=> H264 压缩 => 推流 => CDN => 播放

### 协议

HLS 协议
video <=> M3U8 => segment-1.ts
M3U8 是一个包含很多 ts 文件地址列表的文本文件,有 2 种类型
全量列表: 点播使用,包含一段视频所有 ts 文件
动态列表: 直播使用,动态更新 ts 文件地址  
简单的一个方案,比如斗鱼使用
因为 M3U8 下面切片了几个 ts 文件,导致有延时,实时性不太好

HTTP-FLV 协议
传送 flv 格式的视频,http 长连接导致没有过多的延迟性
比较综合的一种方案,B 站使用

### video

####attribute
controls 控制面板
poster 第一帧贴图
autoplay 自动播放
muted 静音
loop 循环播放
preload 预加载

```JavaScript
var v = document.getElementById('video');

// 音量控制
v.volume = 0.5;
// 播放时间控制
v.currentTime = 60;// 单位：秒
//播放地址切换
v.src = './....MP4'
```

#### event

```JavaScript
// loadstart
v.addEventListener('loadstart', function (e) {
   //开始加载
});
// durationchange
v.addEventListener('durationchange', function (e) {
  console.log('durationchange', v.duration);
// 视频长度变化
});
// loadedmetadata
v.addEventListener('loadedmetadata', function (e) {
  console.log('loadedmetadata');
//加载数据
});
// loadeddata
v.addEventListener('loadeddata', function (e) {
  console.log('loadeddata');
//加载数据结束
});
// progress
v.addEventListener('progress', function (e) {
  console.log('progress');
// 加载片段...
});
// canplay
v.addEventListener('canplay', function (e) {
  console.log('canplay');
//可以播放
});
// canplaythrough
v.addEventListener('canplaythrough', function (e) {
  console.log('canplaythrough');
// 可以流畅播放
});
// play
v.addEventListener('play', function (e) {
  console.log('play');
//播放
});
// pause
v.addEventListener('pause', function (e) {
  console.log('pause');
//暂停
});
// seeking
v.addEventListener('seeking', function (e) {
  console.log('seeking');
// 播放跳转
});
// seeded
v.addEventListener('seeked', function (e) {
  console.log('seeded');
//跳转结束
});
// waiting
v.addEventListener('waiting', function (e) {
  console.log('waiting');
// 播放等待中
});
// playing
v.addEventListener('playing', function (e) {
  console.log('playing');
// 播放中
});
// timeupdate
v.addEventListener('timeupdate', function (e) {
  console.log('timeupdate');
// 当前播放时间变化
});
// ended
v.addEventListener('ended', function (e) {
  console.log('ended');
// 播放结束
});
// error
v.addEventListener('error', function (e) {
  console.log('error', e);
// 加载错误
});
```

### 推流

```shell
# 安装nginx和rtmp模块
brew install nginx-full --with-rtmp-module
# 安装推流工具
brew install ffmpeg
# 安到哪了
 brew info nginx-full
```

```conf
// 打开nginx配置
 http {
       server {
         listen  8080;
         location /hls {
             # Serve HLS fragments
             types {
                 application/vnd.apple.mpegurl m3u8;
                 video/mp2t ts;
             }
             root ...; # 同下方配置
             expires -1;
         }
     }
     ……
 }
 // 在http节点后面加上rtmp配置：
 rtmp {
     server {
         listen 1935;
         chunk_size 4000;
         application rtmplive {
             live on;
             record off;
         }
        application hls {
             live on;
             hls on;
             hls_path 绝对路径; # 对应上方root配置
             hls_fragment 5s;
         }
     }
 }
```

下载一个 vlc 播放器 File=> Open Network 输入
`rtmp://localhost:1935/rtmplive/...`

rtmp 推流
`ffmpeg -re -i 1.mp4 -vcodec libx264 -acodec aac -f flv rtmp://localhost:1935/rtmplive/...`

http 推流
`ffmpeg -re -i 1.mp4 -vcodec libx264 -acodec aac -f flv rtmp://localhost:1935/hls/...`

封装好的工具推流
`ffmpeg -re -i 1.mp4 -c copy -f flv rtmp://localhost:1935/live/movie`

###框架

目前关于直播有 3 个成熟的框架

video.js 全家桶框架,包含各种插件与 ui 样式

hls.js 基于 hls 协议的直播框架,可以将不兼容 hls 协议的游览器支持 hls 协议,一个专注与内核的框架

flv.js bilibili 开源的 http-flv 协议的直播框架,用法与 hls 差不多
