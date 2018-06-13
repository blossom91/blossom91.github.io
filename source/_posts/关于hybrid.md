---
title: 关于Hybrid
mathjax: true
toc: false
comments: true
date: 2018-5-19 22:17:25
updated:
tags: js
categories: 前端
---

公司如果是做 app 的,前端不会 hybrid 就不用混了,用了这么久,总结一下自己对 hybrid 的理解~~

<!-- more -->

hybrid: 前端与客户端一起玩(开发)~~
hybrid 最大好处,无需审核就可更新....
通过 webview 与 file 协议实现(就是本地拿文件)
<br>
如何更新:
服务端需要维护一个 zip 版本管理工具
app 主动请求服务端 web 包的版本号,如果有新的就更新一下,没有就算了~
下载下来就把本地老包覆盖了~
<br>

如何与客户端通信---schema 协议

跟 jsonp 特别像,下面一个傻瓜式封装函数,把这个文件内置到客户端,启动 webview 默认执行,调用就行,记得和客户端约定好调用后的逻辑~~返回内容

```js
    // 调用 schema 的封装
    function _invoke(action, data, callback) {
        // 拼装 schema 协议
        var schema = 'myapp://utils/' + action

        // 拼接参数
        schema += '?a=a'
        var key = Object.keys(data)
        key.forEach(e =>{
            schema += '&' + e + '=' + data[e]
        })

        // 处理 callback
        var callbackName = ''
        if (typeof callback === 'string') {
            // 全局已经有了这个函数 传入了一个函数名称
            callbackName = callback
        } else {
            // 传入了一个函数 ,全局注册一下这个函数
            callbackName = action + Date.now()
            window[callbackName] = callback
        }
        schema +='&'+ 'callback=' + callbackName

        // 触发通信
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = schema  
        var body = document.body
        body.appendChild(iframe)
        setTimeout(function () {
            body.removeChild(iframe)
            iframe = null
        })
    }

    // 暴露到全局变量一些方法
    window.invoke = {
        share: function (data, callback) {
            _invoke('share', data, callback)
        },
        scan: function (data, callback) {
            _invoke('scan', data, callback)
        }
        login: function (data, callback) {
            _invoke('login', data, callback)
        }
    }

    //调用
    invoke.share({
        name:'xc',
        age:'1'
    },()=>{
        console.log('hahah')
    })
```
