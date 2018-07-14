---
title: 关于promise的实现
toc: false
mathjax: true
comments: true
date: 2018-07-14 23:28:30
updated:
tags: js
categories: 前端
---

自从有了 promise，我写异步代码就是一个 then，then 的层级深了就是一个 async，包治百病，哈哈哈哈。。。。
今天就来探讨一下，一个 promise 是如何实现的

<!-- more -->

```javascript
class Promise {
    constructor(executor) {
        this.state = 'pending' //根据当前状态决定执行函数
        this.value = undefined //正确值
        this.reason = undefined //错误原因
        this.onResolvedCallbacks = [] //正确函数执行顺序数组
        this.onRejectedCallbacks = [] //错误函数执行顺序数组
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            } //看看你天天resolve(value)的函数内部干了什么
        }
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            } //看看你天天resolve(err)的函数内部干了什么
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onFulfilled, onRejected) {
        //oh,then你会为什么这么好用，大部分人是不是不知道可以放2个函数参数的
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : err => {
                      throw err
                  }
        let promise2 = new Promise((resolve, reject) => {
            //可以让我们一直then下去的关键，因为then里面封装返回了一个promise
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    //promise标准规定参数函数必须是异步调用
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    catch(fn) {
        //catch只是then的一层封装
        return this.then(null, fn)
    }
}
//resolvePromise函数，处理自己return的promise和默认的promise2的关系
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    let called
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    err => {
                        if (called) return
                        called = true
                        reject(err)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
//上面就是主要流程了，下面都是语法糖
//resolve方法
Promise.resolve = function(val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    })
}
//reject方法
Promise.reject = function(val) {
    return new Promise((resolve, reject) => {
        reject(val)
    })
}
//race方法
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises) {
    let arr = []
    let i = 0
    function processData(index, data) {
        arr[index] = data
        i++
        if (i == promises.length) {
            resolve(arr)
        }
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data)
            }, reject)
        }
    })
}
```
