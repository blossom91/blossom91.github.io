---
title: JavaScript 学习笔记
mathjax: true
toc: true
comments: true
date: 2018-2-17 9:17:25
updated:
tags: js
categories: 前端
---

每年年底我都会重读一遍《JavaScript 高级程序设计》,每次看都有收获,今年重读写下笔记~~~

<!-- more -->

参考书籍

-   JavaScript 高级程序设计
-   JavaScript 语言精粹
-   ECMAScript 6 入门

### 一些注意点

1.  `script`标签应该放在`body`里面
2.  `var num = 1 ++num`为 2 先加后出结果`num--`为 2 先出结果后减 `num` 为 1
3.  `JavaScript`所有函数都是**按值传递**
4.  `arguments.callee`指向调用函数 递归时很好用

### 变量

> 从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩

```
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

**基本包装类型: Boolean Number Sring**
**对于基本类型也可以像对象一样有方法操作的原因**

```
var s1 = 'hello word'
var s2 = s1.length
// 内部转化
var s1 = new String('hello word')
var s2 = s1.length
s1 = null
```

### 字符串

| 属性                              | 说明                                                        |
| :-------------------------------- | :---------------------------------------------------------- |
| charAt ()                         | 返回字符串给定位置的字符                                    |
| at ()                             | 可返回大于`0xFFFF`给定位置的字符                            |
| charCodeAt()                      | 返回编码值                                                  |
| codePointAt()                     | 返回 4 个字节储存字符的编码值                               |
| String.fromCharCode               | 从码点返回对应字符                                          |
| String.fromCodePoint              | 识别大于`0xFFFF`的字符                                      |
| includes( str,2 )                 | 检查 是否包含 str 返回 bool,支持第二个参数 表示开始搜索位置 |
| startsWith(str,2),endsWith(str,2) | 返回布尔值,是否在头部/尾部,同支持第二个参数                 |
| repeat(3)                         | 返回一个新字符串，表示将原字符串重复 n 次,小数取整          |
| padStart(6)，padEnd(6)            | 头部/尾部 补全位数                                          |
| indexOf( str )                    | 从头部查找 是否包含 str 返回 下标                           |
| lastIndexOf( str )                | 从尾部查找 是否包含 str 返回 下标                           |
| slice(star,end)                   | 返回 切片负值会加上字符串长度                               |
| substr(star,length)               | 返回 切片参数 1 负值会加上字符串长度 2 转为 0               |
| substring(star,end)               | 返回 切片\负值会被转换为 0                                  |
| trim()                            | 去除首尾空格                                                |
| concat()                          | 相当于`'' + ''`                                             |
| toLowerCase()                     | 字母转小写                                                  |
| toUpperCase()                     | 字母转大写                                                  |
| encodeURI()                       | 编码整个 url                                                |
| encodeURIComponent()              | 编码 url 中的某一段                                         |
| decodeURI()                       | 对应解码                                                    |
| decodeURIComponent()              | 对应解码                                                    |
| match(str)                        | 匹配相应字符串或者正则返回一个数组                          |
| split( str )                      | 以 str 分割字符串 返回 array                                |
| replace( pattern, str )           | 替换 pattern 为 str                                         |
| search( [pattern]                 | 查找 pattern 返回下标 否则返回 -1                           |

```
// for of可以循环字符串
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"  "o"  "o"
```

### RegExp

| 属性                    | 说明                               |
| :---------------------- | :--------------------------------- |
| //ig                    | g 表示全局匹配 i 忽略大小写        |
| //u                     | ES6 新增 匹配码点大于`0xfff`的字符 |
| match(str)              | 匹配相应字符串或者正则返回一个数组 |
| split( str )            | 以 str 分割字符串 返回 array       |
| replace( pattern, str ) | 替换 pattern 为 str                |
| search( [pattern]       | 查找 pattern 返回下标 否则返回 -1  |
| test( str )             | 测试是否包含 返回 bool             |
| exec(str)               | 存在匹配返回数组,不然 null         |

### 数值与 Math

二进制字面量第一位必须是`0b`
八进制字面值第一位必须是`0o`
十六进制字面值的前两位必须是`0x`

```
var num = 10.002
num.toFixed(2)  // 10.00
```

| 属性(Math.) | 说明                                      |
| :---------- | :---------------------------------------- |
| random()    | 返回大于等于 0 小于 1 之间的数            |
| min([])     | 求数组的最小值                            |
| max([])     | 求数组的最大值                            |
| ceil(25.1)  | 26 向上取整                               |
| floor(25.9) | 25 向下取整                               |
| round()     | 四舍五入                                  |
| trunc()     | 去除小数部分                              |
| sign()      | 判断正负数 正数+1 负数-1 正负 0 返回+0 -0 |

```
var num = 10.002
num.toFixed(2)  // 10.00
```

### 数组

```
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

| 属性                    | 说明                                                                                           |
| :---------------------- | :--------------------------------------------------------------------------------------------- |
| toString()              | 返回数组的字符串形式,已,分隔                                                                   |
| length                  | 返回长度 ,长度可设置为`0`以清空                                                                |
| push( )                 | 末尾 添加元素,可多个                                                                           |
| pop( )                  | 尾部 删除一个元素                                                                              |
| unshift( )              | 头部 添加元素,可多个                                                                           |
| shift( )                | 头部 删除一个元素                                                                              |
| reverse( )              | 翻转 所有元素                                                                                  |
| sort( )                 | 排序函数(需提供排序方式函数)                                                                   |
| slice(star, end)        | 切片并返回支持负索引                                                                           |
| splice(star, end,...[]) | 删除插入并返回 开始的地方插入                                                                  |
| indexOf()               | 从头查找返回元素第一次在数组中出现的位置,无返回-1                                              |
| lastIndexOf()           | 从尾查找返回元素第一次在数组中出现的位置,无返回-1                                              |
| every()                 | 参数是一个过滤函数,全部通过返回 true                                                           |
| filter()                | 参数是一个过滤函数,返回符合条件的新数组                                                        |
| find()                  | 参数是一个过滤函数,返回符合条件的第一个成员,参数二是回调函数绑定的 this 对象,无返回`undefined` |
| findIndex()             | 同上 无返回`-1`                                                                                |
| forEach()               | 参数是函数,执行函数没有返回值                                                                  |
| map()                   | 参数是函数,执行函数返回一个新数组                                                              |
| some()                  | 参数是一个过滤函数,任一个通过返回 true                                                         |
| reduce()                | 从头开始,参数是一个函数(前一个值,当前值,索引,数组),第二个参数是可选的归并初始项                |
| reduceRight()           | 从尾开始                                                                                       |
| fill(value, star, end)  | 填充一个数组                                                                                   |
| keys()                  | for...of 中循环数组键名                                                                        |
| values()                | for...of 中循环数组值                                                                          |
| entries()               | for...of 中循环数组键值对                                                                      |
| copyWithin()            | target, start=0, end=this.length 将指定位置的成员复制到其他位置,会修改当前数组                 |
| concat( array )         | 连接 数组                                                                                      |
| join( str )             | 返回 字符串 str 分隔                                                                           |
| includes(str)           | 检查 是否包含 str 返回 bool                                                                    |
| Array.from()            | 将类似数组的对象和可遍历（iterable）的对象转为真正的数组,可选的第二个参数为函数,类似于 map     |
| Array.of(3, 11, 8)      | 用于将一组值，转换为数组[3,11,8]                                                               |

### Object

| 属性                                      | 说明                                              |
| :---------------------------------------- | :------------------------------------------------ |
| Object.is( , )                            | 相当于===,解决+-0 与 NaN 问题                     |
| Object.assign( , )                        | 对象合并,只是浅拷贝                               |
| Object.getOwnPropertyDescriptor(obj, key) | 获取对象键的描述                                  |
| Object.setPrototypeOf(obj, prop)          | 设置原型                                          |
| Object. getPrototypeOf(obj)               | 获取原型                                          |
| super                                     | 只能在对象里调用 指向对象的原型对象               |
| Object.keys()                             | 获取对象的 key 返回数组                           |
| Object.values()                           | 获取对象的值 返回数组                             |
| Object.entries()                          | 返回二位键值对数组[ ["foo", "bar"], ["baz", 42] ] |

### Date

```
var a = new Date()
a.toLocaleString() // 2018/3/27 下午12:02:30
a.toLocaleDateString() // 2018/3/27
a.toLocaleTimeString()  // 下午12:02:30

Date.now() == +new Date()   //获取时间毫秒数

var time = function( z = new Date() ) {
    var han = '日一二三四五六'
    var Year   = z.getFullYear()
    var Month  = z.getMonth() + 1
    var Day    = z.getDate()
    var Hour   = z.getHours()
    var Minute = z.getMinutes()
    var Second = z.getSeconds()
    var Week   = han[z.getDay()]
    if ( String(Month).length === 1) {
        Month = '0' + Month
    }
    return `${Year}年${Month}月${Day}日 ${Hour}时${Minute}分${Second}秒 星期${Week}`
}
```

### Symbol

-   `Symbol`是一种新的数据类型,表示独一无二的值.
-   可以转换为`string`与`bool`
-   不可以使用点语法 `Object.getOwnPropertySymbols`可以获取对象所有的 Symbol 属性名

```
const s = Symbol()
typeof s  // 'symbol'
// 可以接受字符串为参数,表示描述,容易打印区分
const s1 = Symbol('foo')
const s2 = Symbol('foo')
s1 === s2   // false
// for方法可以复用 搜索有没有该参数作为名称的 Symbol 值,有返回,没有创建
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2
```

### Set 与 Map

Set 类似于数组，但是成员的值都是唯一的，没有重复的值 (判断重复与===差不多,主要区别是 NaN 等于自身)
Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数

```
const set = new Set([1, 2, 3, 4, 4]);
add(value) //添加某个值，返回 Set 结构本身。
delete(value)//删除某个值，返回一个布尔值，表示删除是否成功。
has(value)//返回一个布尔值，表示该值是否为Set的成员。
clear()//清除所有成员，没有返回值。
keys()//返回键名的遍历器  (由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值）)
values()//返回键值的遍历器 (所以keys方法和values方法的行为完全一致)
entries()//返回键值对的遍历器 (返回键值对数组,例如['red','red'])
forEach()//使用回调函数遍历每个成员
// 简便的去重
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
```

Map 类似于对象,但键不再只能是**字符串**

```
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')  //设置
m.get(o) // "content" 获取
m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组

```
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
map. clear() // map.size  0
keys()//返回键名的遍历器 (返回数组键数组[key1, key2...])
values()//返回键值的遍历器(返回值数组[value1, value2...])
entries()//返回键值对的遍历器(返回键值对数组[key1,  value1],[key2, value2])
forEach()//使用回调函数遍历每个成员
```

如果对同一个键多次赋值，后面的值将覆盖前面的值
读取一个未知的键，则返回 undefined
只有对同一个对象的引用，Map 结构才将其视为同一个键
Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键

```
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"
new Map().get('asfddfsasadf') // undefined
map.set(['a'], 555);
map.get(['a']) // undefined
```

### Generator

next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式
`next()`是将 yield 表达式替换成一个值
`throw()`是将 yield 表达式替换成一个 throw 语句
return()是将 yield 表达式替换成一个 return 语句。

```
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }  立即结束generator函数(如果有finally代码块,等到finally代码块执行完，再执行)
g.next()  // { value: undefined, done: true }
g.throw();  // 可以被generator函数内捕获
---------------------
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

看懂这个函数就明白了一半了....
将 Generator 函数加到对象的 Symbol.iterator 属性上面,使原生对象具有遍历接口,可以使用 for...of 循环

```
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
```

`yield*`表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数

```
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
```

任何数据结构只要有 `Iterator`接口，就可以被`yield*`遍历

```
function* gen(){
  yield* ["a", "b", "c"];
}
//由于数组原生支持遍历器，因此就会遍历数组成员
//yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象
gen().next() // { value:"a", done:false }
// 一个方便地取出嵌套数组的所有成员的好例子
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a b c d e
```

### 解构赋值

1.  ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效
2.  如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

```
// 挑一些容易出错的例子
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
// 上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
let obj = { first: 'hello', last: 'world' };  // 变量名与属性名不一致
let { first: f, last: l } = obj;

let { log, sin, cos } = Math;

const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"

let {length : len} = 'hello';   // 写这样的代码大概率会被同事打死
len // 5

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

const o = Object.create({ x: 1, y: 2 });
o.z = 3;

// 扩展运算符的解构赋值，不能复制继承自原型对象的属性。
let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3

let ab = { ...a, ...b };  // 合并2个对象

function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

### async

async 函数是什么？一句话，它就是 Generator 函数的语法糖
async 函数对 Generator 函数的改进，体现在以下四点:

1.  内置执行器(自动 next())
2.  更好的语义(比`*`和`yield`更好理解)
3.  更广的适用性(命令可以是`promise`对象与原始类型值)
4.  返回值是 Promise

一些需要注意的点:

-   `return`返回的值是一个`promise`对象,可以被`then`
-   必须等内部所有`await`执行后才能`then`,除非中途`return`或`throw`
-   await 命令后面是一个 Promise 对象。如果不是，会被转成一个立即 resolve 的 Promise 对象。
-   只要一个`await`出错,后面的都不会执行,这时候可以使用`try catch`,或者每一个`await`都`catch`一下

```
async function f() {
  await Promise.reject('出错了');
// 等价于 return await Promise.reject('出错了');
}
// 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
let foo = await getFoo();
let bar = await getBar(); // 这样需要顺序执行
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
//以上可以同时执行,节省时间
```
