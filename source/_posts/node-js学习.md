---
title: node.js学习
toc: true
mathjax: true
comments: true
date: 2017-11-01 07:40:12
updated:
tags: node
categories: 后端
---

对于 `node.js` 的学习,感谢[菜鸟教程](http://www.runoob.com/nodejs/nodejs-tutorial.html)与[慕课网](http://www.imooc.com/course/list?c=nodejs)提供的优秀资料随着学习的深入,此文章持续更新...

<!-- more -->

---

### CommonJS

* 支持`js json node`扩展名,不写依次尝试
* 不写路径则认为是`build-in`模块或各级`node_modules`内的第三方模块
* `module`被加载的时候执行,加载后缓存
* 一旦出现某个模块被循环加载,就只输出已经执行的部分,还未执行的部分不会输出
* `const exports = module.exports`

### global

node 里面没有`window`全局变量,取代的是`global`全局变量,例如:

```js
global.a = 200
// 暴露到全局中
console.log(a) // 200
```

#### global.process

* 挂载在全局`global`下的方法,可以读取 node 命令参数

输出到控制台

```js
process.stdout
```

argv = [node 命令, main.js 路径, --test, a=1, b=2]

```js
const argv = process
node main.js --test a=1 b=2
```

当前进程执行路径(执行 node 脚本的路径)

```js
console.log(process.cwd())
```

插入当前事件队列的最后一个 发生顺序 `nextTick` > `setTimeout` > `setImmediate

```js
process.nextTick(() => {})
```

#### buffer

* Buffer 类似于数组,挂载在全局`global`下的方法,操作二进制数据流

创建一个长度 10 且不可改变长度的 Buffer,默认用 0 填充

```js
const buf = Buffer.alloc(10)
buf[2] = 4
Buffer.alloc(5, 1) // 用1填充
```

定义一个长度为 10 的 Buffer,内容随机.因为没有清空值,所以创建速度更快

```js
Buffer.allocUnsafe(10)
```

创建指定内容的 Buffer,默认使用 utf-8 编码

```js
Buffer.from([1, 2, 3])
Buffer.from('test')
```

Buffer 长度

```js
Buffer.byteLength('test') // 4
Buffer.byteLength('测试') // 6
```

判断 Buffer 类型

```js
Buffer.isBuffer({}) // false
Buffer.isBuffer(Buffer.from([1, 2, 3])) // true
```

拼接 Buffer 类型

```js
const buf = Buffer.concat([Buffer.from('hello'), Buffer.from(' world')])
```

* Buffer 类型的一些实例方法:

转换字符串类型,默认 utf-8 编码

```js
console.log(buf.toString('base64'))
```

Buffer 类型初始定义长度,与内容无关

```js
console.log(buf.length) // 10
```

填充 Buffer 类型内容,第一个参数为填充内容,第二三个参数为填充位置

```js
console.log(buf.fill(10, 2, 6)) // 10
```

判断 Buffer 类型的内容是否一样

```js
console.log(Buffer.from('test').equals(Buffer.from('test')) // true
```

判断 Buffer 类型包含的内容位置,类似于数组的方法

```js
console.log(Buffer.from('test').indexOf('es') // 1
console.log(Buffer.from('test').indexOf('es!') //  -1
```

拷贝 Buffer 类型,参数`buf2`开始拷贝位置,`buf`拷贝区间汉字长度为 3,有时候会导致`copy`乱码,可以用内置包`string_decode`解决

```js
const buf = Buffer.from([1, 2, 3, 4, 5, 6])
const buf2 = Buffer.alloc(3)
buf.copy(buf2, 0, 2, 3)

const StringDecoder = require('string_decode').StringDecoder
const decoder = new StringDecoder('utf8')
decoder.write(buf2)
```

### 常用 api

#### path

合并出文件路径`/usr/local/bin/`

```js
const path = require('path')
path.join('/usr', 'local', 'bin/')
```

解析出绝对路径

```js
path.resolve('./')
```

文件名 文件夹名 扩展名

```js
console.log(path.basename)
console.log(path.dirname)
console.log(path.extname)
```

(总是)解析出文件绝对路径 文件夹绝对路径

```js
console.log(__dirname)
console.log(__filename)
```

`./`有两种情况:

1. 当在`require`里面使用时,等同于`__dirname`(总是文件绝对路径)
2. 当在其他地方使用时,等同于`process.cwd()`(相对于进程绝对路径)

#### events

```js
const EventEmitter = require('events')
class CustomEvent extends EventEmitter {}
const ce = new CustomEvent()
```

`on` 绑定事件与触发函数,一个事件可以绑定多个函数
`emit` 触发事件,填入参数
`removeListener`移除单个事件函数  
`removeAllListener`移除所有事件函数

```js
var fn1 = function() {
    console.log('remove')
}
ce.on('error', (err, time) => {
    console.log(err)
    console.log(time)
})
ce.on('error', fn1)
ce.emit('error', new Error('oops!'), Date.now())
ce.removeListener('error', fn1)
```

`once` 绑定的事件只会触发一次

```js
ce.once('test', () => {
    console.log('test event once')
})
```

#### fs 文件操作

读取文件,分同步与异步方法,可设置读取格式参数`utf8` 默认为`Buffer`类型

```js
const fs = require('fs')
fs.readFile('./main.js', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

// 同步
const data = fs.readFileSync('./main.js', 'utf8')
console.log(data)
```

创建写入文件,默认类型`utf8` 也可以传入`Buffer`类型

```js
fs.writeFile('./text', 'hello world', 'uft8', err => {})

const content = Buffer.from('this is a test!')
fs.writeFile('./text', content, err => {})

// 添加文件内容
fs.appendFile('file', '你好 python', err => {})
```

读取文件状态 监视文件状态

```js
fs.stat('./main.js', (err, stats) => {
    if (err) {
        console.log('文件不存在')
        return
    }
    console.log(stats.isFile())
    console.log(stats)
})

fs.watch(
    './',
    {
        recursive: true // 递归监视
    },
    (eventType, filename) => {
        //事件类型   文件名
        console.log(eventType, filename)
    }
)
```

文件流相关 读与写

```js
const rs = fs.createReadStream('./main.js')
// 打印到控制台,pipe可以链式使用
rs.pipe(process.stdout).pipe(...)

const ws = fs.createWriteStream('./text.txt')
const tid = setInterval(() => {
    const num = parseInt(Math.random() * 10)
    console.log(num)
    if (num < 8) {
        ws.write(num + '')
    } else {
        clearInterval(tid)
        // 结束写入流
        ws.end()
    }
}, 200)
// 结束时触发 finish 事件
ws.on('finish', () => {
    console.log('done!')
})
```

压缩文件

```js
const { createGzip, createDeflate } = require('zlib')
const inp = fs.createReadStream('input.txt')
const out = fs.createWriteStream('input.txt.gz')
inp.pipe(createGzip()).pipe(out)
```

改名 删除

```js
fs.rename('./main.js', 'index.js', err => {})

fs.unlink('./main.js', err => {})
```

读取文件列表 创建文件夹 删除文件夹

```js
fs.readdir('./', (err, files) => {
    if (err) throw err
    console.log(files)
})

fs.mkdir('test', err => {})

fs.rmdir('test', err => {})
```

#### 异步操作

目前解决异步的方法`promise` 与 `async await`

```js
// promise化工具
const promisify = require('util').promisify

const read = promisify(fs.readFile)
read('./main.js')
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
// async await
const test = async function() {
    try {
        const content = await read('./main.js')
        console.log(content.toString())
    } catch (err) {
        console.log(err)
    }
}
```
