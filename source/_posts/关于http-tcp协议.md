---
title: 关于http/tcp协议
toc: true
mathjax: true
comments: true
date: 2018-6-2 23:10:12
updated:
tags: http
categories: 杂货铺
---

http/tcp 协议是程序员必须知道的东西,目前先简单了解一下,后续还需要继续做功课...

<!-- more -->

### http 的发展

目前还在使用的版本是 http1.1 版本,有许多问题,比如请求按照顺序响应,造成了一些客户端优化(合并文件,减少请求数,img 放入 css 等)
未来的 http2 会很好的解决这个问题
<br>

五层网络:

-   tcp 用于传输层,http 用于应用层,至于还有的下三层,暂时不需要了解

http 的连接需要 3 次握手,1.1 版本可以保持连接,直到一段时间不响应自动中断,免除了重复握手的性能消耗

<br>
URI(url urn) 统一资源标志符:

-   url: 平时我们见到的网址链接
-   urn: 目前还没什么用

http code

-   1 开头 需要继续操作
-   2 开头代表成功
-   3 开头代表需要从定向从其他地方获取资源
-   4 开头代表失败了
-   5 服务端错误

### http 相关特性

跨域: 这个是游览器限制,请求已经发送了,内容也已经返回了,但是游览器限制了这个内容,服务端请求没有这个问题
解决跨域 1. jsonp 2. cors(推荐阮老师的博客相关文章)

关于 cors:
默认只允许 post get head 方法 text/plain multipart/form-data application/x-www-form-urlencoded 请求格式

```js
response.writeHead(200, {
    'Access-Control-Allow-Origin': '*', // 允许请求域名
    'Access-Control-Allow-Headers': '*', // 允许的请求头
    'Access-Control-Allow-Methods': 'Post,PUT,Delete', //允许跨域请求的方法
    'Access-Control-Max-Age': '1000', // 1000s内部不再需要预请求
})
```

### Cache-Control:

-   public: 所有地方包括代理服务器都可以缓存
-   private: 只有游览器可以缓存
-   no-cache: (需要服务器验证才可以使用缓存)
-   no-store: 不可以使用缓存

到期:

-   max-age = <seconds> 过期时间
-   s-maxage= <seconds> 只在代理服务器生效
-   max-stale = <seconds> 即使过期了也继续使用缓存

验证:

-   Last-Modified 服务端上次修改时间,游览器储存
-   If-Modified-Since 游览器请求带上储存的上次修改时间去匹配
-   Etag hash 计算文件内容,通过签名验证文件变动
-   must-revalidate 过期了去原服务器拿数据
-   proxy-revalidate 过期了去代理服务器拿数据

Cookie:

-   max-age 和 expires 设置过期时间
-   Secure 只在 https 的时候发送
-   HttpOnly 无法通过 document.cookie 访问

### http 长连接

Connection: keep-alive / close
http1.1 同一个域名下一般最多 6 个 http 链接,后面可复用前面的链接不需要再次 3 次握手,默认是打开的,可设置 close 关闭
http2 可以并发的处理请求,就没有这个限制了

### 数据协商

------- 客户端
Accept: 需要的数据类型
Accept-Encoding: 如何进行数据压缩
Accept-Language: 语言种类
User-Agent: 游览器种类,系统版本等相关信息

------ 服务端
Content-Type 返回的数据类型
Content-Encoding: 压缩方式
Content-Language: 语言

### Redirect: 重定向

```js
// 302 是临时跳转  301 是永久跳转  游览器会缓存 使用要慎重
response.writeHead(302, {
    Location: '/new',
})
```

### CSP: 游览器安全限制

服务端可以通过设置这个头限制 html 里面内联的 js 运行,防止注入攻击

```js
// 302 是临时跳转  301 是永久跳转  游览器会缓存 使用要慎重
response.writeHead(302, {
      'Content-Security-Policy': 'default-src http: https:',
      'Content-Security-Policy': 'default-src \'self\; form-action \'self\', // 也可以限制表单的提交范围
      'Content-Security-Policy': 'default-src \'self\' http://url' //限制外链链接 只能使用自己网站的  可以手动添加允许链接
    })
```

### http2

信道复用:只需要一个 http 连接
分帧传输: 可以并发发送请求
Server Push: 服务端推送

相较于 http1.1 http2 性能提升非常明显,所以有条件的话建议通过 nginx 配置 http2

待续......
