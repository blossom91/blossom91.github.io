---
title: jQuery与lodash($|_)
toc: true
mathjax: true
comments: true
date: 2017-12-23 18:37:57
tags: js
categories: 前端
---

最近写了个游览器插件,用于加载网页时自动给图片添加一个下载按钮,没有搞得太复杂,用 jq 和 lodash 搞定了,所以回顾一下常用操作~~~

<!-- more -->

### **jQuery**

> jQuery 是一个非常经典的 js 库 $是表达符号

#### 常用

| 选择器                      |                                        |
| :-------------------------- | :------------------------------------- |
| \$( `'.class'` )            | 匹配所有 符合[元素](#选择器) 返回 数组 |
| \$( `' #id, .class ,div '`) | 组选择                                 |
| .find( `'#id'` )            | 向下查找子元素                         |
| .closest( `'.class'` )      | 查找 父元素（一直向上 找到为止）       |
| .parent()                   | 查找 父元素                            |
| .next()                     | 下一个元素                             |
| .prev()                     | 上一个元素                             |
| .children()                 | 查找 子元素                            |
| .parent().children()        | 查找 父子元素                          |
| .siblings()                 | 查找 父子元素（除过 自己）             |
| .first()                    | 第一个元素                             |
| .last()                     | 最后一个元素                           |
| .slice( , )                 | 同数组 slice()方法一致                 |

```javascript
$('ul.lang li') // 选出JavaScript、Python和Lua 3个节点
$('ul.lang li:first-child') // 仅选出JavaScript
$('ul.lang li:last-child') // 仅选出Lua
$('ul.lang li:nth-child(2)') // 选出第N个元素，N从1开始
$('ul.lang li:nth-child(even)') // 选出序号为偶数的元素
$('ul.lang li:nth-child(odd)') // 选出序号为奇数的元素
```

---

#### **jQuery 对象 DOM 操作**

| dom 操作修改           |                                                 |
| :--------------------- | :---------------------------------------------- |
| .text( )               | 取值文本（有参数则为赋值）                      |
| .html( )               | 取值字符串（有参数则为赋值)                     |
| .show()                | 显示                                            |
| .hide()                | 隐藏                                            |
| .toggle()              | 开关                                            |
| .hasClass( )           | 查询 class 返回 ture 或 false                   |
| .addClass('className') | 添加 class                                      |
| .removeClass( )        | 删除 class                                      |
| .removeClass( )        | 删除 class                                      |
| .data( )               | 获取 data 属性                                  |
| .width()//.height()    | 查询宽高,填写参数是设置宽高                     |
| .attr( , )             | 第一个参数属性名,查询(有第二个参数赋值)         |
| .removeAttr( )         | 填入参数移除属性                                |
| .prop()                | 与 attr 类似,但是处理 checked 等 bool 属性      |
| .val()                 | 表单元素专属获取和设置(填参数)对应的 value 属性 |
| .append( )             | 最末尾                                          |
| .prepend( )            | 最开头                                          |
| .before( )             | 同级节点 之前                                   |
| .after( )              | 同级节点 之后                                   |
| .remove()              | 删除                                            |
| .empty()               | 删除（除过 自己)                                |

####**jQuery 对象 css 操作**

```javascript
//jQuery对象有“批量操作”的特点可调用css对象方便修改对象的CSS
$('#test')
    .css('background-color', 'black')
    .css('color', 'red')
var div = $('#test-div')
div.css('color') // '#000033', 获取CSS属性
div.css('color', '#336699') // 设置CSS属性
div.css('color', '') // 清除CSS属性
//css()方法将作用于DOM节点的style属性，具有最高优先级
```

---

#### **jQ** 动画

| 动画操作                                               |                                                          |
| :----------------------------------------------------- | :------------------------------------------------------- |
| .show('slow')                                          | 显示(参数时间 1000 或者时间描述)                         |
| .hide(3000)                                            | 同上                                                     |
| .toggle()                                              | 开关                                                     |
| .slideUp()                                             | 窗帘效果的关(参数同上)                                   |
| .slideDown()                                           | ....开                                                   |
| .slideToggle()                                         | 开关                                                     |
| .fadeOut()                                             | 淡入(参数同上)                                           |
| .fadeIn()                                              | 淡出                                                     |
| .fadeToggle()                                          | 淡入淡出                                                 |
| .animate({opacity: 0.25,width: '256px'},3000,callback) | 自定义动画,三个参数,1 变化对象,2 时间,3 动画结束回调函数 |
| .delay(1000)                                           | 暂停动画                                                 |
| .data('id')                                            | `<div data-id='101'>`取 data 值                          |

---

#### **jQ** 事件绑定

```javascript
function hello() {
    alert('hello!');
}

a.click(hello); // 绑定事件

// 10秒钟后解除绑定:
setTimeout(function () {
    a.off('click', hello);
}, 10000);
使用off('click')一次性移除已绑定的click事件的所有处理函数
无参数调用off()一次性移除已绑定的所有类型的事件处理函数

a.on('click', function () {
    alert('Hello!');
})
// 两者等价(常用下一种)
a.click(function () {
    alert('Hello!');
})
//事件委托用法
$( '#id-div-cont' ).on( 'click', '.del', Event )
// 绑定 父元素 #id-div-cont 监听.del(如果点击的是.del则发生)
```

---

#### **jQ** Ajax

```javascript
var request = {
    url: '/uploads/tags.json',
    type: 'get',
    success: function(r) {
        console.log(r)
    },
    error: function() {
        console.log(arguments)
    }
}
$.ajax(request)

//基础的jq ajax方法
$.ajax({name:value, name:value, ... })

// jq get方法
$.get("test.php", function(data){
console.log(data);
})
//jq post 方法
$.post(URL,{name:'小明'},function(data,status,xhr),dataType)
```

---

### **lodash**

> lodash 是一个非常实用的 js 工具库 \_是表达符号

### **lodash** 函数

**each**

```javascript
_.each(list(数组或对象), (v, k) => {
    // each 方法的两个参数
    // 如果 list 是 列表，那么 v 和 k 分别是指 list 的 element/index
    // 如果 list 是 对象（字典），那么 v 和 k 分别是指 object 的 value/key
    console.log('element and index', v, k)
})
```

**map** (旧数组/对象生成一个新数组)

```javascript
    const list2(新数组) = _.map(list1(旧数组), (v, k) => {
        const r = v * v
        return r
    })
    console.log('list2', list2)
```

**filter** (遍历数组/对象，返回符合判断函数中的元素)

```javascript
var u(符合条件的新数组) =
_.filter(us(数组可包含对象), (e) => {
        var b = e.score > 70(bool值)
        return b
    })
    console.log('filter u', u)
```

**orderBy** (按照条件排序,先按 score 升序,如果有 score 一样的,再按 name 降序)

```javascript
var users = _.orderBy(us, ['score', 'name'], ['asc'(升序), 'desc'(降序)])
console.log('order by users', users)
```

**flatten** (减少一层嵌套数组(只减少一层),也就是可以将二维数组拍成一维数组)

```javascript
var l = [1, [2], [3, [4]], [5, [6], [7]]]
var f = _.flatten(l)
console.log('flatten result', f)
```

**compact** 剔除数组中的假值元素(js 中假值元素分别为`false null 0 NaN '' undefined`)

```javascript
var result = _.compact(l(包含假值元素的数组))
console.log('compact result', result) ** (isEqual ** isEqual比较两个对象或者数组是否相等)
var o1 = {
    key: 1,
}
var o2 = {
    key: 1,
}
var result = _.isEqual(o1, o2)
console.log('isEqual result', result)
```

**result** (获取嵌套对象的值)

```javascript
var o = {
    k1: {
        k2: {
            k3: {
                k4: 'value in nested dict',
            },
        },
    },
}

var path = 'k1.k2.k3.k4'
var result = _.result(o, path)
console.log('result nested result', result)
```

**cloneDeep** 深拷贝(改变赋值不影响原函数的拷贝)

```javascript
var o = {
    a: [1],
    b: [2],
}
var deep = _.cloneDeep(o)
console.log('deep', deep)
```

**random** (返回给定范围的随机值)

```javascript
    var a = 10      var b = 20
    // 返回 a 和 b 之间的一个整数
    var r1 = _.random(a, b)
    console.log('random r1', r1)
//如果指定第三个参数为 true，这个参数的意思是指 floating ,那么返回的就是一个浮点数
    var r2 = _.random(a, b, true)
    console.log('random r2', r2(浮点数))
```

**shuffle** (返回打乱顺序后的数组)

```javascript
var l = [1, 2, 3, 4]
const s = _.shuffle(l)
console.log('shuffle l', s)
```
