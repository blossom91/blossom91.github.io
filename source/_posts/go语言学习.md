---
title: go语言学习
mathjax: true
comments: true
date: 2017-12-19 17:37:34
updated:
tags: go
categories: 后端
---

`go`的学习,感谢[Go By Example](https://gobyexample.xgwang.me/)、[go 网络编程](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/preface.md)与[go 语言标准库](http://books.studygolang.com/The-Golang-Standard-Library-by-Example/),随着学习的深入,此文章持续更新...

<!-- more -->

## 基础

### 声明

```go
// 变量  
var a string = "hello"
var b, c int =  1, 2
// 只允许函数中这样声明
f := "world"
// 常量(只允许布尔型、数字型（整数型、浮点型和复数）和字符串型)
const n = "hello, world"
// 同时声明多个常量、变量，或者导入多个包时，可采用分组的方式进行声明
// 关键字iota，这个关键字用来声明enum的时候采用，它默认开始值是0，const中每增加一行加1
const (
    a = iota  //0
    b = iota  //1
    c = iota  //2
)
const v = iota // 每遇到一个const关键字，iota就会重置，此时v == 0

const (
    h, i, j = iota, iota, iota //h=0,i=0,j=0 iota在同一行值相同
)

// 声明了一个二维数组，该数组以两个数组作为元素，其中每个数组中又有4个int类型的元素
doubleArray := [2][4]int{[4]int{1, 2, 3, 4}, [4]int{5, 6, 7, 8}}

// 上面的声明可以简化，直接忽略内部的类型
easyArray := [2][4]int{{1, 2, 3, 4}, {5, 6, 7, 8}}
```

### 字符串

`go`语言中字符串是不可变的,想改变可以这样实现

```go
s := "hello"
c := []byte(s)  // 将字符串 s 转换为 []byte 类型
c[0] = 'c'
s2 := string(c)  // 再转换回 string 类型
fmt.Printf("%s\n", s2)
```

这样修改,字符串虽不能更改，但可进行切片操作

```go
s := "hello"
s = "c" + s[1:]
fmt.Printf("%s\n", s)
```

```go
import "strings"
```

| 属性                                         | 说明                |
| :------------------------------------------- | :------------------ |
| `strings.Contains("test", "es")`             | 是否包含:`true`     |
| `strings.Count("test", "t")`                 | 包含数量:`2`        |
| `strings.HasPrefix("test", "te")`            | 前缀:`true`         |
| `strings.HasSuffix("test", "st")`            | 后缀:`true`         |
| `strings.Index("test", "e")`                 | index:`1`           |
| `strings.Join([]string{"a", "b", "b"}, "-")` | join:`a-b-b`        |
| `strings.Repeat("a", 5)`                     | 复制:`aaaaa`        |
| `strings.Replace("foo", "o", "0", -1)`       | 替换:`f00`          |
| `strings.Replace("foo", "o", "0", 1)`        | 替换 1 次:`f0o`     |
| `strings.Split("a-b-c-d-e", "-")`            | split:`[a b c d e]` |
| `strings.ToLower("TEST")`                    | 转小写:`test`       |
| `strings.ToUpper("test")`                    | 转大写:`TEST`       |
| `len("hello")`                               | 长度:`5`            |
| `"hello"[1]`                                 | 索引取值:`101`      |

---

```go
import "fmt"
// fmt.Printf  通过 os.Stdout打印格式化的字符串

// fmt.Sprintf 格式化并返回一个字符串而不带任何输出
s := fmt.Sprintf("a %s", "string")
fmt.Println(s)   // a string

// fmt.Fprintf 格式化并输出到 io.Writers而不是 os.Stdout
fmt.Fprintf(os.Stderr, "an %s\n", "error")  // an error

p := point{x:1, y:2}
```

| 属性                               | 说明                                          |
| :--------------------------------- | :-------------------------------------------- |
| `fmt.Printf("%v\n", p)`            | 打印结构体`{1 2}`                             |
| `fmt.Printf("%+v\n", p)`           | 打印结构体的字段名`{x:1 y:2}`                 |
| `fmt.Printf("%#v\n", p)`           | 打印 Go 语法表示`main.point{x:1, y:2}`        |
| `fmt.Printf("%T\n", p)`            | 打印值的类型`main.point`                      |
| `fmt.Printf("%t\n", true)`         | 格式化布尔值`true`                            |
| `fmt.Printf("%d\n", 123)`          | 整数标准的十进制格式化`123`                   |
| `fmt.Printf("%b\n", 14)`           | 整数二进制`1110`                              |
| `fmt.Printf("%c\n", 33)`           | 整数输出给定整数的对应字符`!`                 |
| `fmt.Printf("%x\n", 456)`          | 整数十六进制`1c8`                             |
| `fmt.Printf("%f\n", 78.9)`         | 浮点数十进制格式化`78.900000`                 |
| `fmt.Printf("%e\n", 123400000.0)`  | 浮点型格式化科学技科学记数法`1.234000e+08`    |
| `fmt.Printf("%E\n", 123400000.0)`  | 浮点型格式化科学技科学记数法`1.234000E+08`    |
| `fmt.Printf("%s\n", "\"string\"")` | 基本的字符串输出`"string"`                    |
| `fmt.Printf("%q\n", "\"string\"")` | Go 源代码中那样带有双引号的输出`"\"string\""` |
| `fmt.Printf("%x\n", "hex this")`   | base-16 编码的字符串`6865782074686973`        |
| `fmt.Printf("%p\n", &p)`           | 输出一个指针的值`0x42135100`                  |

```go
// 当输出数字的时候，你将经常想要控制输出结果的宽度和精度，可以使用在 % 后面使用数字来控制输出宽度。默认结果使用右对齐并且通过空格来填充空白部分。
fmt.Printf("|%6d|%6d|\n", 12, 345)

// 你也可以指定浮点型的输出宽度，同时也可以通过 宽度.精度 的语法来指定输出的精度。
fmt.Printf("|%6.2f|%6.2f|\n", 1.2, 3.45)

// 要左对齐，使用 - 标志。
fmt.Printf("|%-6.2f|%-6.2f|\n", 1.2, 3.45)

// 你也许也想控制字符串输出时的宽度，特别是要确保他们在类表格输出时的对齐。这是基本的右对齐宽度表示。
fmt.Printf("|%6s|%6s|\n", "foo", "b")

// 要左对齐，和数字一样，使用 - 标志。
fmt.Printf("|%-6s|%-6s|\n", "foo", "b")
```

### 循环

```go
i := 1
for i <= 3 {
    fmt.Println(i)
    i = i + 1
}
// 经典的初始化/条件/后续形式 for 循环。 同样也支持跳过循环
for j := 7; j <= 9; j++ {
    fmt.Println(j)
        continue
}
// 不带条件的 for 循环将一直执行，直到在循环体内使用了 break 或者 return 来跳出循环。
for {
    fmt.Println("loop")
    break
}
```

### if/else

```go
if 7%2 == 0 {
    fmt.Println("7 is even")
} else {
    fmt.Println("7 is odd")
}
//在条件语句之前可以有一个语句；任何在这里声明的变量都可以在所有的条件分支中使用。
if num := 9; num < 0 {
    fmt.Println(num, "is negative")
} else if num < 10 {
    fmt.Println(num, "has 1 digit")
} else {
    fmt.Println(num, "has multiple digits")
}
```

### switch

```go
// 在一个 case 语句中，你可以使用逗号来分隔多个表达式。在这个例子中，我们很好的使用了可选的default 分支。
switch time.Now().Weekday() {
case time.Saturday, time.Sunday:
    fmt.Println("it's the weekend")
default:
    fmt.Println("it's a weekday")
}
// 不带表达式的 switch 是实现 if/else 逻辑的另一种方式。这里展示了 case 表达式是如何使用非常量的。
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("it's before noon")
default:
    fmt.Println("it's after noon")
}
```

### 数组

```go
// 这里我们创建了一个数组 a 来存放刚好 5 个 int。元素的类型和长度都是数组类型的一部分。数组默认是零值的，对于 int 数组来说也就是 0。
var a [5]int
fmt.Println("emp:", a)
// 我们可以使用 array[index] = value 语法来设置数组指定位置的值，或者用 array[index] 得到值。
a[4] = 100
fmt.Println("set:", a)
fmt.Println("get:", a[4])
// 使用内置函数 len 返回数组的长度
fmt.Println("len:", len(a))
// 使用这个语法在一行内初始化一个数组
b := [5]int{1, 2, 3, 4, 5}
fmt.Println("dcl:", b)
// 数组的存储类型是单一的，但是你可以组合这些数据来构造多维的数据结构。
var twoD [2][3]int
for i := 0; i < 2; i++ {
    for j := 0; j < 3; j++ {
        twoD[i][j] = i + j
    }
}
fmt.Println("2d: ", twoD)
```

### 切片`slice`

```go
// 不像数组，slice 的类型仅由它所包含的元素决定（不像数组中还需要元素的个数）。要创建一个长度非零的空slice，需要使用内建的方法 make。这里我们创建了一个长度为3的 string 类型 slice（初始化为零值）。
s := make([]string, 3)
fmt.Println("emp:", s)
// 我们可以和数组一样设置和得到值
s[0] = "a"
s[1] = "b"
s[2] = "c"
fmt.Println("set:", s)
fmt.Println("get:", s[2])
// 如你所料，len 返回 slice 的长度
fmt.Println("len:", len(s))
// 作为基本操作的补充，slice 支持比数组更多的操作。其中一个是内建的 append，它返回一个包含了一个或者多个新值的 slice。注意我们接受返回由 append返回的新的 slice 值。
s = append(s, "d")
s = append(s, "e", "f")
fmt.Println("apd:", s)
// Slice 也可以被 copy。这里我们创建一个空的和 s 有相同长度的 slice c，并且将 s 复制给 c。
c := make([]string, len(s))
copy(c, s)
fmt.Println("cpy:", c)
// Slice 支持通过 slice[low:high] 语法进行“切片”操作。例如，这里得到一个包含元素 s[2], s[3],s[4] 的 slice。
l := s[2:5]
fmt.Println("sl1:", l)
// 这个 slice 从 s[0] 到（但是包含）s[5]。
l = s[:5]
fmt.Println("sl2:", l)
// 这个 slice 从（包含）s[2] 到 slice 的后一个值。
l = s[2:]
fmt.Println("sl3:", l)
// 我们可以在一行代码中声明并初始化一个 slice 变量。
t := []string{"g", "h", "i"}
fmt.Println("dcl:", t)
// Slice 可以组成多维数据结构。内部的 slice 长度可以不同，这和多位数组不同。
twoD := make([][]int, 3)
for i := 0; i < 3; i++ {
    innerLen := i + 1
    twoD[i] = make([]int, innerLen)
    for j := 0; j < innerLen; j++ {
        twoD[i][j] = i + j
    }
}
fmt.Println("2d: ", twoD)
```

### 关系数组`map`

```go
// 要创建一个空 map，需要使用内建的 make:make(map[key-type]val-type).
m := make(map[string]int)
// 使用典型的 make[key] = val 语法来设置键值对。
m["k1"] = 7
m["k2"] = 13
// 使用例如 Println 来打印一个 map 将会输出所有的键值对。
fmt.Println("map:", m)
// 使用 name[key] 来获取一个键的值
v1 := m["k1"]
fmt.Println("v1: ", v1)
// 当对一个 map 调用内建的 len 时，返回的是键值对数目
fmt.Println("len:", len(m))
// 内建的 delete 可以从一个 map 中移除键值对
delete(m, "k2")
fmt.Println("map:", m)
// 当从一个 map 中取值时，可选的第二返回值指示这个键是在这个 map 中。这可以用来消除键不存在和键有零值，像 0 或者 "" 而产生的歧义。
num, prs := m["k1"]
fmt.Println("prs:", prs, num)
// 你也可以通过这个语法在同一行申明和初始化一个新的map。
n := map[string]int{"foo": 1, "bar": 2}
fmt.Println("map:", n)
```

### 遍历`Rang`

```go
// 这里我们使用 range 来统计一个 slice 的元素个数。数组也可以采用这种方法。
nums := []int{2, 3, 4}
sum := 0
for _, num := range nums {
    sum += num
}
fmt.Println("sum:", sum)
// range 在数组和 slice 中都同样提供每个项的索引和值。上面我们不需要索引，所以我们使用 空值定义符_ 来忽略它。有时候我们实际上是需要这个索引的。
for i, num := range nums {
    if num == 3 {
        fmt.Println("index:", i)
    }
}
// range 在 map 中迭代键值对。
kvs := map[string]string{"a": "apple", "b": "banana"}
for k, v := range kvs {
    fmt.Printf("%s -> %s\n", k, v)
}
// range 在字符串中迭代 unicode 编码。第一个返回值是rune 的起始字节位置，然后第二个是 rune 自己。
for i, c := range "go" {
    fmt.Println(i, c)
}
```

### JSON

```go
func main() {
    // 首先我们来看一下基本数据类型到 JSON 字符串的编码过程。这里是一些原子值的例子。
    bolB, _ := json.Marshal(true)
    fmt.Println(string(bolB))
    intB, _ := json.Marshal(1)
    fmt.Println(string(intB))
    fltB, _ := json.Marshal(2.34)
    fmt.Println(string(fltB))
    strB, _ := json.Marshal("gopher")
    fmt.Println(string(strB))
    // 这里是一些切片和 map 编码成 JSON 数组和对象的例子。
    slcD := []string{"apple", "peach", "pear"}
    slcB, _ := json.Marshal(slcD)
    fmt.Println(string(slcB))
    mapD := map[string]int{"apple": 5, "lettuce": 7}
    mapB, _ := json.Marshal(mapD)
    fmt.Println(string(mapB))
    // JSON 包可以自动的编码你的自定义类型。编码仅输出可导出的字段，并且默认使用他们的名字作为 JSON 数据的键。
    res1D := &Response1{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res1B, _ := json.Marshal(res1D)
    fmt.Println(string(res1B))
    // 你可以给结构字段声明标签来自定义编码的 JSON 数据键名称。在上面 Response2 的定义可以作为这个标签这个的一个例子。
    res2D := Response2{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res2B, _ := json.Marshal(res2D)
    fmt.Println(string(res2B))
    // 现在来看看解码 JSON 数据为 Go 值的过程。这里是一个普通数据结构的解码例子。
    byt := []byte(`{"num":6.13,"strs":["a","b"]}`)
    // 我们需要提供一个 JSON 包可以存放解码数据的变量。这里的 map[string]interface{} 将保存一个 string 为键，值为任意值的map。
    var dat map[string]interface{}
    // 这里就是实际的解码和相关的错误检查。
    if err := json.Unmarshal(byt, &dat); err != nil {
        panic(err)
    }
    fmt.Println(dat)
    // 为了使用解码 map 中的值，我们需要将他们进行适当的类型转换。例如这里我们将 num 的值转换成 float64类型。
    num := dat["num"].(float64)
    fmt.Println(num)
    // 访问嵌套的值需要一系列的转化。
    strs := dat["strs"].([]interface{})
    str1 := strs[0].(string)
    fmt.Println(str1)
    // 我们也可以解码 JSON 值到自定义类型。这个功能的好处就是可以为我们的程序带来额外的类型安全加强，并且消除在访问数据时的类型断言。
    str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := &Response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)
    fmt.Println(res.Fruits[0])
    // 在上面的例子中，我们经常使用 byte 和 string 作为使用标准输出时数据和 JSON 表示之间的中间值。我们也可以和os.Stdout 一样，直接将 JSON 编码直接输出至 os.Writer流中，或者作为 HTTP 响应体。
    enc := json.NewEncoder(os.Stdout)
    d := map[string]int{"apple": 5, "lettuce": 7}
    enc.Encode(d)
}
```

## 函数

```go
// 这里是一个函数，接受两个 int 并且以 int 返回它们的和
func plus(a int, b int) int {
// Go 需要明确的返回值，例如，它不会自动返回最后一个表达式的值
    return a + b
}
func main() {
// 正如你期望的那样，通过 name(args) 来调用一个函数，
    res := plus(1, 2)
    fmt.Println("1+2 =", res)
}
```

### 多返回值

```go
// (int, int) 在这个函数中标志着这个函数返回 2 个 int。
func vals() (int, int) {
    return 3, 7
}
func main() {
    // 这里我们通过多赋值 操作来使用这两个不同的返回值。
    a, b := vals()
    fmt.Println(a)
    fmt.Println(b)
    // 如果你仅仅想返回值的一部分的话，你可以使用空白定义符 _。
    _, c := vals()
    fmt.Println(c)
}
```

### 变参函数

```go
// 这个函数使用任意数目的 int 作为参数。
func sum(nums ...int) {
    fmt.Print(nums, " ")
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}
func main() {
    // 变参函数使用常规的调用方式，除了参数比较特殊。
    sum(1, 2)
    sum(1, 2, 3)
    // 如果你的 slice 已经有了多个值，想把它们作为变参使用，你要这样调用 func(slice...)。
    nums := []int{1, 2, 3, 4}
    sum(nums...)
}
```

### 闭包

```go
// 这个 intSeq 函数返回另一个在 intSeq 函数体内定义的匿名函数。这个返回的函数使用闭包的方式 隐藏 变量 i。
func intSeq() func() int {
    i := 0
    return func() int {
        i += 1
        return i
    }
}
func main() {
    // 我们调用 intSeq 函数，将返回值（也是一个函数）赋给nextInt。这个函数的值包含了自己的值 i，这样在每次调用 nextInt 时都会更新 i 的值。
    nextInt := intSeq()
    // 通过多次调用 nextInt 来看看闭包的效果。
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    // 为了确认这个状态对于这个特定的函数是唯一的，我们重新创建并测试一下。
    newInts := intSeq()
    fmt.Println(newInts())
}
```

### 递归

```go
// face 函数在到达 face(0) 前一直调用自身。
func fact(n int) int {
    if n == 0 {
        return 1
    }
    return n * fact(n-1)
}
func main() {
    fmt.Println(fact(7))
}
```

### 指针

```go
// 我们将通过两个函数：zeroval 和 zeroptr 来比较指针和值类型的不同。zeroval 有一个 int 型参数，所以使用值传递。zeroval 将从调用它的那个函数中得到一个 ival形参的拷贝。
func zeroval(ival int) {
    ival = 0
}

// zeroptr 有一和上面不同的 *int 参数，意味着它用了一个 int指针。函数体内的 *iptr 接着解引用 这个指针，从它内存地址得到这个地址对应的当前值。对一个解引用的指针赋值将会改变这个指针引用的真实地址的值。
func zeroptr(iptr *int) {
    *iptr = 0
}
func main() {
    i := 1
    fmt.Println("initial:", i)
    zeroval(i)
    fmt.Println("zeroval:", i)
    // 通过 &i 语法来取得 i 的内存地址，例如一个变量i 的指针。
    zeroptr(&i)
    fmt.Println("zeroptr:", i)
    // 指针也是可以被打印的。
    fmt.Println("pointer:", &i)
        // 又可以获取到值了
    fmt.Println("pointer:", *&i)
}

// zeroval 在 main 函数中不能改变 i 的值，但是zeroptr 可以，因为它有一个这个变量的内存地址的引用。
// 对于空指针   var  ptr *int    ptr == nil
```

### 结构体

```go
func main() {
    // 使用这个语法创建了一个新的结构体元素。
    fmt.Println(person{"Bob", 20})
    // 你可以在初始化一个结构体元素时指定字段名字。
    fmt.Println(person{name: "Alice", age: 30})
    // 省略的字段将被初始化为零值。
    fmt.Println(person{name: "Fred"})
    // & 前缀生成一个结构体指针。
    fmt.Println(&person{name: "Ann", age: 40})
    // 使用点来访问结构体字段。
    s := person{name: "Sean", age: 50}
    fmt.Println(s.name)
    // 也可以对结构体指针使用. - 指针会被自动解引用。
    sp := &s
    fmt.Println(sp.age)
    // 结构体是可变的。
    sp.age = 51
    fmt.Println(sp.age)
    fmt.Println(s.age) // 51
}
```

### 方法

```go
type rect struct {
    width, height int
}

// 这里的 area 方法有一个接收器类型 rect。
func (r *rect) area() int {
    return r.width * r.height
}

// 可以为值类型或者指针类型的接收器定义方法。这里是一个值类型接收器的例子。
func (r rect) perim() int {
    return 2*r.width + 2*r.height
}
func main() {
    r := rect{width: 10, height: 5}
    // 这里我们调用上面为结构体定义的两个方法。
    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())
    // Go 自动处理方法调用时的值和指针之间的转化。你可以使用指针来调用方法来避免在方法调用时产生一个拷贝，或者让方法能够改变接受的数据。
    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}
```

### 接口

```go
// 接口 是方法特征的命名集合。
// 这里是一个几何体的基本接口。
type geometry interface {
    area() float64
    perim() float64
}

// 在我们的例子中，我们将让 rect 和 circle 实现这个接口
type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}

// 要在 Go 中实现一个接口，我们只需要实现接口中的所有方法。这里我们让 rect 实现了 geometry 接口。
func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}

// circle 的实现。
func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}

// 如果一个变量是接口类型，那么我们可以调用这个被命名的接口中的方法。这里有一个一通用的 measure 函数，利用这个特性，它可以用在任何 geometry 上。
func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}
func main() {
    r := rect{width: 3, height: 4}
    c := circle{radius: 5}
    // 结构体类型 circle 和 rect 都实现了 geometry接口，所以我们可以使用它们的实例作为 measure 的参数。
    measure(r)
    measure(c)
}
```

### 获取 interface 变量存储的类型

`interface`的变量里面可以存储任意类型的数值(该类型实现了`interface`)
那么获取这个变量里面实际保存的对象类型可以使用下列方法

* Comma-ok 断言
  Go 语言里面有一个语法，可以直接判断是否是该类型的变量： value, ok = element.(T)，这里 value 就是变量的值，ok 是一个 bool 类型，element 是 interface 变量，T 是断言的类型。如果 element 里面确实存储了 T 类型的数值，那么 ok 返回 true，否则返回 false。

```go
type Element interface{}
type List []Element

type Person struct {
    name string
    age  int
}

//定义了String方法，实现了fmt.Stringer
func (p Person) String() string {
    return "(name: " + p.name + " - age: " + strconv.Itoa(p.age) + " years)"
}

func main() {
    list := make(List, 3)
    list[0] = 1       // an int
    list[1] = "Hello" // a string
    list[2] = Person{"Dennis", 70}

    for index, element := range list {
        if value, ok := element.(int); ok {
            fmt.Printf("list[%d] is an int and its value is %d\n", index, value)
        } else if value, ok := element.(string); ok {
            fmt.Printf("list[%d] is a string and its value is %s\n", index, value)
        } else if value, ok := element.(Person); ok {
            fmt.Printf("list[%d] is a Person and its value is %s\n", index, value)
        } else {
            fmt.Printf("list[%d] is of a different type\n", index)
        }
    }
}
```

* switch 测试

因为用到了很多的 if 所以自然有`switch`
这里有一点需要强调的是：`element.(type)`语法不能在 switch 外的任何逻辑里面使用，如果你要在 switch 外面判断一个类型就使用`comma-ok`。

```go
func main() {
    list := make(List, 3)
    list[0] = 1       //an int
    list[1] = "Hello" //a string
    list[2] = Person{"Dennis", 70}

    for index, element := range list {
        switch value := element.(type) {
        case int:
            fmt.Printf("list[%d] is an int and its value is %d\n", index, value)
        case string:
            fmt.Printf("list[%d] is a string and its value is %s\n", index, value)
        case Person:
            fmt.Printf("list[%d] is a Person and its value is %s\n", index, value)
        default:
            fmt.Println("list[%d] is of a different type", index)
        }
    }
}
```

### 反射(不太懂)

暂时觉得这个可以判断结构类型

```go
type MyStruct struct {
    name string
}

func (this *MyStruct) GetName(str string) string {
    this.name = str
    return this.name
}
func main() {
    // 备注: reflect.Indirect -> 如果是指针则返回 Elem()
    // 首先，reflect包有两个数据类型我们必须知道，一个是Type，一个是Value。
    // Type就是定义的类型的一个数据类型，Value是值的类型
    // 对象
    s := "this is string"
    // 获取对象类型 (string)
    fmt.Println(reflect.TypeOf(s))
    // 获取对象值 (this is string)
    fmt.Println(reflect.ValueOf(s))
    // 对象
    var x float64 = 3.4
    // 获取对象值 (<float64 Value>)
    fmt.Println(reflect.ValueOf(x))
    // 对象
    a := &MyStruct{name: "nljb"}
    // 返回对象的方法的数量 (1)
    fmt.Println(reflect.TypeOf(a).NumMethod())
    // 遍历对象中的方法
    for m := 0; m < reflect.TypeOf(a).NumMethod(); m++ {
        method := reflect.TypeOf(a).Method(m)
        fmt.Println(method.Type)         // func(*main.MyStruct) string
        fmt.Println(method.Name)         // GetName
        fmt.Println(method.Type.NumIn()) // 参数个数
        fmt.Println(method.Type.In(1))   // 参数类型
    }
    // 获取对象值 (<*main.MyStruct Value>)
    fmt.Println(reflect.ValueOf(a))
    // 获取对象名称
    fmt.Println(reflect.Indirect(reflect.ValueOf(a)).Type().Name())
    // 参数
    i := "Hello"
    v := make([]reflect.Value, 0)
    v = append(v, reflect.ValueOf(i))
    // 通过对象值中的方法名称调用方法 ([nljb]) (返回数组因为Go支持多值返回)
    fmt.Println(reflect.ValueOf(a).MethodByName("GetName").Call(v))
    // 通过对值中的子对象名称获取值 (nljb)
    fmt.Println(reflect.Indirect(reflect.ValueOf(a)).FieldByName("name"))
    // 是否可以改变这个值 (false)
    fmt.Println(reflect.Indirect(reflect.ValueOf(a)).FieldByName("name").CanSet())
    // 是否可以改变这个值 (true)
    fmt.Println(reflect.Indirect(reflect.ValueOf(&(a.name))).CanSet())
    // 不可改变 (false)
    fmt.Println(reflect.Indirect(reflect.ValueOf(s)).CanSet())
    // 可以改变
    // reflect.Indirect(reflect.ValueOf(&s)).SetString("jbnl")
    fmt.Println(reflect.Indirect(reflect.ValueOf(&s)).CanSet())
}
```

### 错误处理

```go
// 按照惯例，错误通常是最后一个返回值并且是 error 类型，一个内建的接口。
func f1(arg int) (int, error) {
    if arg == 42 {
        // errors.New 构造一个使用给定的错误信息的基本error 值。
        return -1, errors.New("can't work with 42")
    }
    // 返回错误值为 nil 代表没有错误。
    return arg + 3, nil
}

// 通过实现 Error 方法来自定义 error 类型是可以的。这里使用自定义错误类型来表示上面的参数错误。
type argError struct {
    arg  int
    prob string
}

func (e *argError) Error() string {
    return fmt.Sprintf("%d - %s", e.arg, e.prob)
}
func f2(arg int) (int, error) {
    if arg == 42 {
        // 在这个例子中，我们使用 &argError 语法来建立一个新的结构体，并提供了 arg 和 prob 这个两个字段的值。
        return -1, &argError{arg, "can't work with it"}
    }
    return arg + 3, nil
}
func main() {
    // 下面的两个循环测试了各个返回错误的函数。注意在 if行内的错误检查代码，在 Go 中是一个普遍的用法。
    for _, i := range []int{7, 42} {
        if r, e := f1(i); e != nil {
            fmt.Println("f1 failed:", e)
        } else {
            fmt.Println("f1 worked:", r)
        }
    }
    for _, i := range []int{7, 42} {
        if r, e := f2(i); e != nil {
            fmt.Println("f2 failed:", e)
        } else {
            fmt.Println("f2 worked:", r)
        }
    }
    // 你如果想在程序中使用一个自定义错误类型中的数据，你需要通过类型断言来得到这个错误类型的实例。
    _, e := f2(42)
    if ae, ok := e.(*argError); ok {
        fmt.Println(ae.arg)
        fmt.Println(ae.prob)
    }
}
```

### 排序

```go
func main() {
    // 排序方法是正对内置数据类型的；这里是一个字符串的例子。注意排序是原地更新的，所以他会改变给定的序列并且不返回一个新值。
    strs := []string{"c", "a", "b"}
    sort.Strings(strs)
    fmt.Println("Strings:", strs)
    // 一个 int 排序的例子。
    ints := []int{7, 2, 4}
    sort.Ints(ints)
    fmt.Println("Ints:   ", ints)
    // 我们也可以使用 sort 来检查一个序列是不是已经是排好序的。
    s := sort.IntsAreSorted(ints)
    fmt.Println("Sorted: ", s)
}
```

### 自定义排序

```go
// 为了在 Go 中使用自定义函数进行排序，我们需要一个对应的类型。这里我们创建一个为内置 []string 类型的别名的ByLength 类型，
type ByLength []string

// 我们在类型中实现了 sort.Interface 的 Len，Less和 Swap 方法，这样我们就可以使用 sort 包的通用Sort 方法了，Len 和 Swap 通常在各个类型中都差不多，Less 将控制实际的自定义排序逻辑。在我们的例子中，我们想按字符串长度增加的顺序来排序，所以这里使用了 len(s[i]) 和 len(s[j])。
func (s ByLength) Len() int {
    return len(s)
}
func (s ByLength) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}
func (s ByLength) Less(i, j int) bool {
    return len(s[i]) < len(s[j])
}

// 一切都准备好了，我们现在可以通过将原始的 fruits 切片转型成 ByLength 来实现我们的自定排序了。然后对这个转型的切片使用 sort.Sort 方法。
func main() {
    fruits := []string{"peach", "banana", "kiwi"}
    sort.Sort(ByLength(fruits))
    fmt.Println(fruits)
}
```

### Panic

```go
func main() {
    // 我们将在这个网站中使用 panic 来检查预期外的错误。这个是唯一一个为 panic 准备的例子。
    panic("a problem")
    // panic 的一个基本用法就是在一个函数返回了错误值但是我们并不知道（或者不想）处理时终止运行。这里是一个在创建一个新文件时返回异常错误时的panic 用法。
    _, err := os.Create("/tmp/file")
    if err != nil {
        panic(err)
    }
}
```

### Defer

```go
// 假设我们想要创建一个文件，向它进行写操作，然后在结束时关闭它。这里展示了如何通过 defer 来做到这一切。
func main() {
    // 在 closeFile 后得到一个文件对象，我们使用 defer通过 closeFile 来关闭这个文件。这会在封闭函数（main）结束时执行，就是 writeFile 结束后。
    f := createFile("/tmp/defer.txt")
    defer closeFile(f)
    writeFile(f)
}
func createFile(p string) *os.File {
    fmt.Println("creating")
    f, err := os.Create(p)
    if err != nil {
        panic(err)
    }
    return f
}
func writeFile(f *os.File) {
    fmt.Println("writing")
    fmt.Fprintln(f, "data")
}
func closeFile(f *os.File) {
    fmt.Println("closing")
    f.Close()
}
```

### 时间

```go
func main() {
    p := fmt.Println
    // 得到当前时间。
    now := time.Now()
    p(now)
    // 通过提供年月日等信息，你可以构建一个 time。时间总是关联着位置信息，例如时区。
    then := time.Date(
        2009, 11, 17, 20, 34, 58, 651387237, time.UTC)
    p(then)
    // 你可以提取出时间的各个组成部分。
    p(then.Year())
    p(then.Month())
    p(then.Day())
    p(then.Hour())
    p(then.Minute())
    p(then.Second())
    p(then.Nanosecond())
    p(then.Location())
    // 输出是星期一到日的 Weekday 也是支持的。
    p(then.Weekday())
    // 这些方法来比较两个时间，分别测试一下是否是之前，之后或者是同一时刻，精确到秒。
    p(then.Before(now))
    p(then.After(now))
    p(then.Equal(now))
    // 方法 Sub 返回一个 Duration 来表示两个时间点的间隔时间。
    diff := now.Sub(then)
    p(diff)
    // 我们计算出不同单位下的时间长度值。
    p(diff.Hours())
    p(diff.Minutes())
    p(diff.Seconds())
    p(diff.Nanoseconds())
    // 你可以使用 Add 将时间后移一个时间间隔，或者使用一个 - 来将时间前移一个时间间隔。
    p(then.Add(diff))
    p(then.Add(-diff))
}
```

### 时间戳

```go
func main() {
    // 分别使用带 Unix 或者 UnixNano 的 time.Now来获取从自协调世界时起到现在的秒数或者纳秒数。
    now := time.Now()
    secs := now.Unix()
    nanos := now.UnixNano()
    fmt.Println(now)
    // 注意 UnixMillis 是不存在的，所以要得到毫秒数的话，你要自己手动的从纳秒转化一下。
    millis := nanos / 1000000
    fmt.Println(secs)
    fmt.Println(millis)
    fmt.Println(nanos)
    // 你也可以将协调世界时起的整数秒或者纳秒转化到相应的时间。
    fmt.Println(time.Unix(secs, 0))
    fmt.Println(time.Unix(0, nanos))
}
```

### 时间的格式化与解析

```go
func main() {
    p := fmt.Println
    // 这里是一个基本的按照 RFC3339 进行格式化的例子，使用对应模式常量。
    t := time.Now()
    p(t.Format(time.RFC3339))
    // 时间解析使用同 Format 相同的形式值。
    t1, e := time.Parse(
        time.RFC3339,
        "2012-11-01T22:08:41+00:00")
    p(t1)
    // Format 和 Parse 使用基于例子的形式来决定日期格式，一般你只要使用 time 包中提供的模式常量就行了，但是你也可以实现自定义模式。模式必须使用时间 Mon Jan 2 15:04:05 MST 2006来指定给定时间/字符串的格式化/解析方式。时间一定要按照如下所示：2006为年，15 为小时，Monday 代表星期几，等等。
    p(t.Format("3:04PM"))
    p(t.Format("Mon Jan _2 15:04:05 2006"))
    p(t.Format("2006-01-02T15:04:05.999999-07:00"))
    form := "3 04 PM"
    t2, e := time.Parse(form, "8 41 PM")
    p(t2)
    // 对于纯数字表示的时间，你也可以使用标准的格式化字符串来提出出时间值得组成。
    fmt.Printf("%d-%02d-%02dT%02d:%02d:%02d-00:00\n",
        t.Year(), t.Month(), t.Day(),
        t.Hour(), t.Minute(), t.Second())
    // Parse 函数在输入的时间格式不正确是会返回一个错误。
    ansic := "Mon Jan _2 15:04:05 2006"
    _, e = time.Parse(ansic, "8:41PM")
    p(e)
}
```

### 数字解析

```go
func main() {
    // 使用 ParseFloat 解析浮点数，这里的 64 表示表示解析的数的位数。
    f, _ := strconv.ParseFloat("1.234", 64)
    fmt.Println(f)
    // 在使用 ParseInt 解析整形数时，例子中的参数 0 表示自动推断字符串所表示的数字的进制。64 表示返回的整形数是以 64 位存储的。
    i, _ := strconv.ParseInt("123", 0, 64)
    fmt.Println(i)
    // ParseInt 会自动识别出十六进制数。
    d, _ := strconv.ParseInt("0x1c8", 0, 64)
    fmt.Println(d)
    // ParseUint 也是可用的。
    u, _ := strconv.ParseUint("789", 0, 64)
    fmt.Println(u)
    // Atoi 是一个基础的 10 进制整型数转换函数。
    k, _ := strconv.Atoi("135")
    fmt.Println(k)
    // 在输入错误时，解析函数会返回一个错误。
    _, e := strconv.Atoi("wat")
    fmt.Println(e)
}
```

### url 解析

```go
func main() {
    // 我们将解析这个 URL 示例，它包含了一个 scheme，认证信息，主机名，端口，路径，查询参数和片段。
    s := "postgres://user:pass@host.com:5432/path?k=v#f"
    // 解析这个 URL 并确保解析没有出错。
    u, err := url.Parse(s)
    if err != nil {
        panic(err)
    }
    // 直接访问 scheme。
    fmt.Println(u.Scheme) // postgres
    // User 包含了所有的认证信息，这里调用 Username和 Password 来获取独立值。
    fmt.Println(u.User)            // user:pass
    fmt.Println(u.User.Username()) // user
    p, _ := u.User.Password()
    fmt.Println(p) // pass
    // Host 同时包括主机名和端口信息，如过端口存在的话，使用 strings.Split() 从 Host 中手动提取端口。
    fmt.Println(u.Host) // host.com:5432
    h := strings.Split(u.Host, ":")
    fmt.Println(h[0]) // host.com
    fmt.Println(h[1]) // 5432
    // 这里我们提出路径和查询片段信息。
    fmt.Println(u.Path)     // /path
    fmt.Println(u.Fragment) // f
    // 要得到字符串中的 k=v 这种格式的查询参数，可以使用 RawQuery 函数。你也可以将查询参数解析为一个map。
    // 已解析的查询参数 map 以查询字符串为键，对应值字符串切片为值，所以如何只想得到一个键对应的第一个值，将索引位置设置为 [0] 就行了。
    fmt.Println(u.RawQuery) // k=v
    m, _ := url.ParseQuery(u.RawQuery)
    fmt.Println(m)         // map[k:[v]]
    fmt.Println(m["k"][0]) // v
}
```

### 随机数

```go
func main() {
    // 例如，rand.Intn 返回一个随机的整数 n，0 <= n <= 100。
    fmt.Print(rand.Intn(100), ",")
    fmt.Print(rand.Intn(100))
    fmt.Println()
    // rand.Float64 返回一个64位浮点数 f，0.0 <= f <= 1.0。
    fmt.Println(rand.Float64())
    // 这个技巧可以用来生成其他范围的随机浮点数，例如5.0 <= f <= 10.0
    fmt.Print((rand.Float64()*5)+5, ",")
    fmt.Print((rand.Float64() * 5) + 5)
    fmt.Println()
    // 默认情况下，给定的种子是确定的，每次都会产生相同的随机数数字序列。要产生变化的序列，需要给定一个变化的种子。需要注意的是，如果你出于加密目的，需要使用随机数的话，请使用 crypto/rand 包，此方法不够安全。
    s1 := rand.NewSource(time.Now().UnixNano())
    r1 := rand.New(s1)
    // 调用上面返回的 rand.Source 的函数和调用 rand 包中函数是相同的。
    fmt.Print(r1.Intn(100), ",")
    fmt.Print(r1.Intn(100))
    fmt.Println()
    // 如果使用相同的种子生成的随机数生成器，将会产生相同的随机数序列。
    s2 := rand.NewSource(42)
    r2 := rand.New(s2)
    fmt.Print(r2.Intn(100), ",")
    fmt.Print(r2.Intn(100))
    fmt.Println()
    s3 := rand.NewSource(42)
    r3 := rand.New(s3)
    fmt.Print(r3.Intn(100), ",")
    fmt.Print(r3.Intn(100))
}
```

### SHA1 散列

```go
func main() {
    s := "sha1"
    // 产生一个散列值得方式是 sha1.New()，sha1.Write(bytes)，然后 sha1.Sum([]byte{})。这里我们从一个新的散列开始。
    h := sha1.New()
    // 写入要处理的字节。如果是一个字符串，需要使用[]byte(s) 来强制转换成字节数组。
    h.Write([]byte(s))
    // 这个用来得到最终的散列值的字符切片。Sum 的参数可以用来都现有的字符切片追加额外的字节切片：一般不需要要。
    bs := h.Sum(nil)
    // SHA1 值经常以 16 进制输出，例如在 git commit 中。使用%x 来将散列结果格式化为 16 进制字符串。
    fmt.Println(s)
    fmt.Printf("%x\n", bs)
}
```

### BASE64 编码

```go
func main() {
    // 这是将要编解码的字符串。
    data := "abc123!?$*&()'-=@~"
    // Go 同时支持标准的和 URL 兼容的 base64 格式。编码需要使用 []byte 类型的参数，所以要将字符串转成此类型。
    // 标准 base64 编码和 URL 兼容 base64 编码的编码字符串存在稍许不同（后缀为 + 和 -），但是两者都可以正确解码为原始字符串。
    sEnc := base64.StdEncoding.EncodeToString([]byte(data))
    fmt.Println(sEnc)
    // 解码可能会返回错误，如果不确定输入信息格式是否正确，那么，你就需要进行错误检查了。
    sDec, _ := base64.StdEncoding.DecodeString(sEnc)
    fmt.Println(string(sDec))
    fmt.Println()
    // 使用 URL 兼容的 base64 格式进行编解码。
    uEnc := base64.URLEncoding.EncodeToString([]byte(data))
    fmt.Println(uEnc)
    uDec, _ := base64.URLEncoding.DecodeString(uEnc)
    fmt.Println(string(uDec))
}
```

## 协程

```go
func f(from string) {
    for i := 0; i < 3; i++ {
        fmt.Println(from, ":", i)
    }
}
func main() {
    // 假设我们有一个函数叫做 f(s)。我们使用一般的方式调并同时运行。
    f("direct")
    // 使用 go f(s) 在一个 Go 协程中调用这个函数。这个新的 Go 协程将会并行的执行这个函数调用。
    go f("goroutine")
    // 你也可以为匿名函数启动一个 Go 协程。
    go func(msg string) {
        fmt.Println(msg)
    }("going")
    // 现在这两个 Go 协程在独立的 Go 协程中异步的运行，所以我们需要等它们执行结束。这里的 Scanln 代码需要我们在程序退出前按下任意键结束。
    var input string
    fmt.Scanln(&input)
    fmt.Println("done")
    // 当我们运行这个程序时，将首先看到阻塞式调用的输出，然后是两个 Go 协程的交替输出。这种交替的情况表示 Go 运行时是以异步的方式运行协程的。
}
```

### 通道

```go
// 通道 是连接多个 Go 协程的管道。你可以从一个 Go 协程将值发送到通道，然后在别的 Go 协程中接收。
func main() {
    // 使用 make(chan val-type) 创建一个新的通道。通道类型就是他们需要传递值的类型。
    messages := make(chan string)
    // 使用 channel <- 语法 发送 一个新的值到通道中。这里我们在一个新的 Go 协程中发送 "ping" 到上面创建的messages 通道中。
    go func() { messages <- "ping" }()
    // 使用 <-channel 语法从通道中 接收 一个值。这里将接收我们在上面发送的 "ping" 消息并打印出来。
    msg := <-messages
    fmt.Println(msg)
}
// 我们运行程序时，通过通道，消息 "ping" 成功的从一个 Go 协程传到另一个中。
// 默认发送和接收操作是阻塞的，直到发送方和接收方都准备完毕。这个特性允许我们，不使用任何其它的同步操作，来在程序结尾等待消息 "ping"。
```

### 通道缓冲

```go
// 默认通道是 无缓冲 的，这意味着只有在对应的接收（<- chan）通道准备好接收时，才允许进行发送（chan <-）。可缓存通道允许在没有对应接收方的情况下，缓存限定数量的值。
func main() {
    // 这里我们 make 了一个通道，最多允许缓存 2 个值。
    messages := make(chan string, 2)
    // 因为这个通道是有缓冲区的，即使没有一个对应的并发接收方，我们仍然可以发送这些值。
    messages <- "buffered"
    messages <- "channel"
    // 然后我们可以像前面一样接收这两个值。
    fmt.Println(<-messages)
    fmt.Println(<-messages)
}
```

### 通道同步

```go
// 我们可以使用通道来同步 Go 协程间的执行状态。这里是一个使用阻塞的接受方式来等待一个 Go 协程的运行结束。
// 这是一个我们将要在 Go 协程中运行的函数。done 通道将被用于通知其他 Go 协程这个函数已经工作完毕。
func worker(done chan bool) {
    fmt.Print("working...")
    time.Sleep(time.Second)
    fmt.Println("done")
    // 发送一个值来通知我们已经完工啦。
    done <- true
}
func main() {
    // 运行一个 worker Go协程，并给予用于通知的通道。
    done := make(chan bool, 1)
    go worker(done)
    // 程序将在接收到通道中 worker 发出的通知前一直阻塞。
    <-done
}

// 如果你把 <- done 这行代码从程序中移除，程序甚至会在 worker还没开始运行时就结束了
```

### 通道方向

```go
// ping 函数定义了一个只允许发送数据的通道。尝试使用这个通道来接收数据将会得到一个编译时错误。
func ping(pings chan<- string, msg string) {
    pings <- msg
}

// pong 函数允许通道（pings）来接收数据，另一通道（pongs）来发送数据。
func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}
func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    ping(pings, "passed message")
    pong(pings, pongs)
    fmt.Println(<-pongs)
}
```

### 通道选择器

```go
func main() {
    // 在我们的例子中，我们将从两个通道中选择。
    c1 := make(chan string)
    c2 := make(chan string)
    // 各个通道将在若干时间后接收一个值，这个用来模拟例如并行的 Go 协程中阻塞的 RPC 操作
    go func() {
        time.Sleep(time.Second * 1)
        c1 <- "one"
    }()
    go func() {
        time.Sleep(time.Second * 2)
        c2 <- "two"
    }()
    // 我们使用 select 关键字来同时等待这两个值，并打印各自接收到的值。
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-c1:
            fmt.Println("received", msg1)
        case msg2 := <-c2:
            fmt.Println("received", msg2)
        }
    }
}
```

### 超时处理

```go
func main() {
    // 在我们的例子中，假如我们执行一个外部调用，并在 2 秒后通过通道 c1 返回它的执行结果。
    c1 := make(chan string, 1)
    go func() {
        time.Sleep(time.Second * 2)
        c1 <- "result 1"
    }()
    // 这里是使用 select 实现一个超时操作。res := <- c1 等待结果，<-Time.After 等待超时时间 1 秒后发送的值。由于 select 默认处理第一个已准备好的接收操作，如果这个操作超过了允许的 1 秒的话，将会执行超时 case。
    select {
    case res := <-c1:
        fmt.Println(res)
    case <-time.After(time.Second * 1):
        fmt.Println("timeout 1")
    }
    // 如果我允许一个长一点的超时时间 3 秒，将会成功的从 c2接收到值，并且打印出结果。
    c2 := make(chan string, 1)
    go func() {
        time.Sleep(time.Second * 2)
        c2 <- "result 2"
    }()
    select {
    case res := <-c2:
        fmt.Println(res)
    case <-time.After(time.Second * 3):
        fmt.Println("timeout 2")
    }
}
```

### 非阻塞通道

```go
// 常规的通过通道发送和接收数据是阻塞的。然而，我们可以使用带一个 default 子句的 select 来实现非阻塞 的发送、接收，甚至是非阻塞的多路 select。
func main() {
    messages := make(chan string)
    signals := make(chan bool)
    // 这里是一个非阻塞接收的例子。如果在 messages 中存在，然后 select 将这个值带入 <-messages case中。如果不是，就直接到 default 分支中。
    select {
    case msg := <-messages:
        fmt.Println("received message", msg)
    default:
        fmt.Println("no message received")
    }
    // 一个非阻塞发送的实现方法和上面一样。
    msg := "hi"
    select {
    case messages <- msg:
        fmt.Println("sent message", msg)
    default:
        fmt.Println("no message sent")
    }
    // 我们可以在 default 前使用多个 case 子句来实现一个多路的非阻塞的选择器。这里我们试图在 messages和 signals 上同时使用非阻塞的接受操作。
    select {
    case msg := <-messages:
        fmt.Println("received message", msg)
    case sig := <-signals:
        fmt.Println("received signal", sig)
    default:
        fmt.Println("no activity")
    }
}
```

### 通道的关闭

```go
// 关闭 一个通道意味着不能再向这个通道发送值了。这个特性可以用来给这个通道的接收方传达工作已经完成的信息。
// 在这个例子中，我们将使用一个 jobs 通道来传递 main() 中 Go协程任务执行的结束信息到一个工作 Go 协程中。当我们没有多余的任务给这个工作 Go 协程时，我们将 close 这个 jobs 通道。
func main() {
    jobs := make(chan int, 5)
    done := make(chan bool)
    // 这是工作 Go 协程。使用 j, more := <- jobs 循环的从jobs 接收数据。在接收的这个特殊的二值形式的值中，如果 jobs 已经关闭了，并且通道中所有的值都已经接收完毕，那么 more 的值将是 false。当我们完成所有的任务时，将使用这个特性通过 done 通道去进行通知。
    go func() {
        for {
            j, more := <-jobs
            if more {
                fmt.Println("received job", j)
            } else {
                fmt.Println("received all jobs")
                done <- true
                return
            }
        }
    }()
    // 这里使用 jobs 发送 3 个任务到工作函数中，然后关闭 jobs。
    for j := 1; j <= 3; j++ {
        jobs <- j
        fmt.Println("sent job", j)
    }
    close(jobs)
    fmt.Println("sent all jobs")
    // 我们使用前面学到的通道同步方法等待任务结束。
    <-done
}
```

### 通道遍历

```go
// 在前面的例子中，我们讲过 for 和 range为基本的数据结构提供了迭代的功能。我们也可以使用这个语法来遍历从通道中取得的值。
func main() {
    // 我们将遍历在 queue 通道中的两个值。
    queue := make(chan string, 2)
    queue <- "one"
    queue <- "two"
    close(queue)
    // 这个 range 迭代从 queue 中得到的每个值。因为我们在前面 close 了这个通道，这个迭代会在接收完 2 个值之后结束。如果我们没有 close 它，我们将在这个循环中继续阻塞执行，等待接收第三个值
    for elem := range queue {
        fmt.Println(elem)
    }
}

// 这个例子也让我们看到，一个非空的通道也是可以关闭的，但是通道中剩下的值仍然可以被接收到。
```

### 定时器

```go
func main() {
    // 定时器表示在未来某一时刻的独立事件。你告诉定时器需要等待的时间，然后它将提供一个用于通知的通道。这里的定时器将等待 2 秒。
    timer1 := time.NewTimer(time.Second * 2)
    // <-timer1.C 直到这个定时器的通道 C 明确的发送了定时器失效的值之前，将一直阻塞。
    <-timer1.C
    fmt.Println("Timer 1 expired")
    // 如果你需要的仅仅是单纯的等待，你需要使用 time.Sleep。定时器是有用原因之一就是你可以在定时器失效之前，取消这个定时器。这是一个例子
    timer2 := time.NewTimer(time.Second)
    go func() {
        <-timer2.C
        fmt.Println("Timer 2 expired")
    }()
    stop2 := timer2.Stop()
    if stop2 {
        fmt.Println("Timer 2 stopped")
    }
}
```

### 打点器

```go
func main() {
    // 打点器和定时器的机制有点相似：一个通道用来发送数据。这里我们在这个通道上使用内置的 range 来迭代值每隔500ms 发送一次的值。
    ticker := time.NewTicker(time.Millisecond * 500)
    go func() {
        for t := range ticker.C {
            fmt.Println("Tick at", t)
        }
    }()
    // 打点器可以和定时器一样被停止。一旦一个打点停止了，将不能再从它的通道中接收到值。我们将在运行后 1600ms停止这个打点器。
    time.Sleep(time.Millisecond * 1600)
    ticker.Stop()
    fmt.Println("Ticker stopped")
}
```

### 工作池

```go
// 这是我们将要在多个并发实例中支持的任务了。这些执行者将从 jobs 通道接收任务，并且通过 results 发送对应的结果。我们将让每个任务间隔 1s 来模仿一个耗时的任务。
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Println("worker", id, "processing job", j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}
func main() {
    // 为了使用 worker 工作池并且收集他们的结果，我们需要2 个通道。
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    // 这里启动了 3 个 worker，初始是阻塞的，因为还没有传递任务。
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    // 这里我们发送 9 个 jobs，然后 close 这些通道来表示这些就是所有的任务了。
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)
    // 最后，我们收集所有这些任务的返回值。
    for a := 1; a <= 9; a++ {
        <-results
    }
    // 执行这个程序，显示 9 个任务被多个 worker 执行。整个程序处理所有的任务仅执行了 3s 而不是 9s，是因为 3 个 worker是并行的。
}
```

### 速率限制(未懂)

```go
func main() {
    // 首先我们将看一下基本的速率限制。假设我们想限制我们接收请求的处理，我们将这些请求发送给一个相同的通道。
    requests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        requests <- i
    }
    close(requests)
    // 这个 limiter 通道将每 200ms 接收一个值。这个是速率限制任务中的管理器。
    limiter := time.Tick(time.Millisecond * 200)
    // 通过在每次请求前阻塞 limiter 通道的一个接收，我们限制自己每 200ms 执行一次请求。
    for req := range requests {
        <-limiter
        fmt.Println("request", req, time.Now())
    }
    // 有时候我们想临时进行速率限制，并且不影响整体的速率控制我们可以通过通道缓冲来实现。这个 burstyLimiter 通道用来进行 3 次临时的脉冲型速率限制。
    burstyLimiter := make(chan time.Time, 3)
    // 想将通道填充需要临时改变3次的值，做好准备。
    for i := 0; i < 3; i++ {
        burstyLimiter <- time.Now()
    }
    // 每 200 ms 我们将添加一个新的值到 burstyLimiter中，直到达到 3 个的限制。
    go func() {
        for t := range time.Tick(time.Millisecond * 200) {
            burstyLimiter <- t
        }
    }()
    // 现在模拟超过 5 个的接入请求。它们中刚开始的 3 个将由于受 burstyLimiter 的“脉冲”影响。
    burstyRequests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        burstyRequests <- i
    }
    close(burstyRequests)
    for req := range burstyRequests {
        <-burstyLimiter
        fmt.Println("request", req, time.Now())
    }
    // 运行程序，我们看到第一批请求意料之中的大约每 200ms 处理一次。
    // 第二批请求，我们直接连续处理了 3 次，这是由于这个“脉冲”速率控制，然后大约每 200ms 处理其余的 2 个。
}
```

### 原子计数器

```go
func main() {
    // 我们将使用一个无符号整型数来表示（永远是正整数）这个计数器。
    var ops uint64 = 0
    // 为了模拟并发更新，我们启动 50 个 Go 协程，对计数器每隔 1ms （译者注：应为非准确时间）进行一次加一操作。
    for i := 0; i < 50; i++ {
        go func() {
            for {
                // 使用 AddUint64 来让计数器自动增加，使用& 语法来给出 ops 的内存地址。
                atomic.AddUint64(&ops, 1)
                // 允许其它 Go 协程的执行
                runtime.Gosched()
            }
        }()
    }
    // 等待一秒，让 ops 的自加操作执行一会。
    time.Sleep(time.Second)
    // 为了在计数器还在被其它 Go 协程更新时，安全的使用它，我们通过 LoadUint64 将当前值的拷贝提取到 opsFinal中。和上面一样，我们需要给这个函数所取值的内存地址 &ops
    opsFinal := atomic.LoadUint64(&ops)
    fmt.Println("ops:", opsFinal)
}
```

### 互斥锁(未懂)

```go
func main() {
    // 在我们的例子中，state 是一个 map。
    var state = make(map[int]int)
    // 这里的 mutex 将同步对 state 的访问。
    var mutex = &sync.Mutex{}
    // we'll see later, ops will count how manyoperations we perform against the state.为了比较基于互斥锁的处理方式和我们后面将要看到的其他方式，ops 将记录我们对 state 的操作次数。
    var ops int64 = 0
    // 这里我们运行 100 个 Go 协程来重复读取 state。
    for r := 0; r < 100; r++ {
        go func() {
            total := 0
            for {
                // 每次循环读取，我们使用一个键来进行访问，Lock() 这个 mutex 来确保对 state 的独占访问，读取选定的键的值，Unlock() 这个mutex，并且 ops 值加 1。
                key := rand.Intn(5)
                mutex.Lock()
                total += state[key]
                mutex.Unlock()
                atomic.AddInt64(&ops, 1)
                // 为了确保这个 Go 协程不会在调度中饿死，我们在每次操作后明确的使用 runtime.Gosched()进行释放。这个释放一般是自动处理的，像例如每个通道操作后或者 time.Sleep 的阻塞调用后相似，但是在这个例子中我们需要手动的处理。
                runtime.Gosched()
            }
        }()
    }
    // 同样的，我们运行 10 个 Go 协程来模拟写入操作，使用和读取相同的模式。
    for w := 0; w < 10; w++ {
        go func() {
            for {
                key := rand.Intn(5)
                val := rand.Intn(100)
                mutex.Lock()
                state[key] = val
                mutex.Unlock()
                atomic.AddInt64(&ops, 1)
                runtime.Gosched()
            }
        }()
    }
    // 让这 10 个 Go 协程对 state 和 mutex 的操作运行 1 s。
    time.Sleep(time.Second)
    // 获取并输出最终的操作计数。
    opsFinal := atomic.LoadInt64(&ops)
    fmt.Println("ops:", opsFinal)
    // 对 state 使用一个最终的锁，显示它是如何结束的。
    mutex.Lock()
    fmt.Println("state:", state)
    mutex.Unlock()
}
```

### `go`状态协程(未读)

```go
// 在这个例子中，state 将被一个单独的 Go 协程拥有。这就能够保证数据在并行读取时不会混乱。为了对 state 进行读取或者写入，其他的 Go 协程将发送一条数据到拥有的 Go协程中，然后接收对应的回复。结构体 readOp 和 writeOp封装这些请求，并且是拥有 Go 协程响应的一个方式。
type readOp struct {
    key  int
    resp chan int
}
type writeOp struct {
    key  int
    val  int
    resp chan bool
}

func main() {
    // 和前面一样，我们将计算我们执行操作的次数。
    var ops int64
    // reads 和 writes 通道分别将被其他 Go 协程用来发布读和写请求。
    reads := make(chan *readOp)
    writes := make(chan *writeOp)
    // 这个就是拥有 state 的那个 Go 协程，和前面例子中的map一样，不过这里是被这个状态协程私有的。这个 Go 协程反复响应到达的请求。先响应到达的请求，然后返回一个值到响应通道 resp 来表示操作成功（或者是 reads 中请求的值）
    go func() {
        var state = make(map[int]int)
        for {
            select {
            case read := <-reads:
                read.resp <- state[read.key]
            case write := <-writes:
                state[write.key] = write.val
                write.resp <- true
            }
        }
    }()
    // 启动 100 个 Go 协程通过 reads 通道发起对 state 所有者Go 协程的读取请求。每个读取请求需要构造一个 readOp，发送它到 reads 通道中，并通过给定的 resp 通道接收结果。
    for r := 0; r < 100; r++ {
        go func() {
            for {
                read := &readOp{
                    key:  rand.Intn(5),
                    resp: make(chan int)}
                reads <- read
                <-read.resp
                atomic.AddInt64(&ops, 1)
            }
        }()
    }
    // 用相同的方法启动 10 个写操作。
    for w := 0; w < 10; w++ {
        go func() {
            for {
                write := &writeOp{
                    key:  rand.Intn(5),
                    val:  rand.Intn(100),
                    resp: make(chan bool)}
                writes <- write
                <-write.resp
                atomic.AddInt64(&ops, 1)
            }
        }()
    }
    // 让 Go 协程们跑 1s。
    time.Sleep(time.Second)
    // 最后，获取并报告 ops 值。
    opsFinal := atomic.LoadInt64(&ops)
    fmt.Println("ops:", opsFinal)
}
```

### 读文件

```go
// 读取文件需要经常进行错误检查，这个帮助方法可以精简下面的错误检查过程。
func check(e error) {
    if e != nil {
        panic(e)
    }
}
func main() {
    // 也许大部分基本的文件读取任务是将文件内容读取到内存中。
    dat, err := ioutil.ReadFile("/tmp/dat")
    check(err)
    fmt.Print(string(dat))
    // 你经常会想对于一个文件是怎么读并且读取到哪一部分进行更多的控制。对于这个任务，从使用 os.Open打开一个文件获取一个 os.File 值开始。
    f, err := os.Open("/tmp/dat")
    defer f.Close()
    check(err)
    // 从文件开始位置读取一些字节。这里最多读取 5 个字节，并且这也是我们实际读取的字节数。
    b1 := make([]byte, 5)
    n1, err := f.Read(b1)
    check(err)
    fmt.Printf("%d bytes: %s\n", n1, string(b1))
    // 你也可以 Seek 到一个文件中已知的位置并从这个位置开始进行读取。
    o2, err := f.Seek(6, 0)
    check(err)
    b2 := make([]byte, 2)
    n2, err := f.Read(b2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n2, o2, string(b2))
    // io 包提供了一些可以帮助我们进行文件读取的函数。例如，上面的读取可以使用 ReadAtLeast 得到一个更健壮的实现。
    o3, err := f.Seek(6, 0)
    check(err)
    b3 := make([]byte, 2)
    n3, err := io.ReadAtLeast(f, b3, 2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))
    // 没有内置的回转支持，但是使用 Seek(0, 0) 实现。
    _, err = f.Seek(0, 0)
    check(err)
    // bufio 包实现了带缓冲的读取，这不仅对有很多小的读取操作的能提升性能，也提供了很多附加的读取函数。
    r4 := bufio.NewReader(f)
    b4, err := r4.Peek(5)
    check(err)
    fmt.Printf("5 bytes: %s\n", string(b4))
    // 任务结束后要关闭这个文件（通常这个操作应该在 Open操作后立即使用 defer 来完成）。
}
```

### 写文件

```go
func main() {
    // 开始，这里是展示如写入一个字符串（或者只是一些字节）到一个文件。
    d1 := []byte("hello\ngo\n")
    err := ioutil.WriteFile("/tmp/dat1", d1, 0644)
    check(err)
    // 对于更细粒度的写入，先打开一个文件。
    f, err := os.Create("/tmp/dat2")
    check(err)
    // 打开文件后，习惯立即使用 defer 调用文件的 Close操作。
    defer f.Close()
    // 你可以写入你想写入的字节切片
    d2 := []byte{115, 111, 109, 101, 10}
    n2, err := f.Write(d2)
    check(err)
    fmt.Printf("wrote %d bytes\n", n2)
    // WriteString 也是可用的。
    n3, err := f.WriteString("writes\n")
    fmt.Printf("wrote %d bytes\n", n3)
    // 调用 Sync 来将缓冲区的信息写入磁盘。
    f.Sync()
    // bufio 提供了和我们前面看到的带缓冲的读取器一样的带缓冲的写入器。
    w := bufio.NewWriter(f)
    n4, err := w.WriteString("buffered\n")
    fmt.Printf("wrote %d bytes\n", n4)
    // 使用 Flush 来确保所有缓存的操作已写入底层写入器。
    w.Flush()
}
```

### 行过滤器

```go
// 在读取标准输入流的输入，处理该输入，然后将得到一些的结果输出到标准输出的程序
func main() {
    // 对 os.Stdin 使用一个带缓冲的 scanner，让我们可以直接使用方便的 Scan 方法来直接读取一行，每次调用该方法可以让 scanner 读取下一行。
    scanner := bufio.NewScanner(os.Stdin)
    // Text 返回当前的 token，现在是输入的下一行。
    for scanner.Scan() {
        ucl := strings.ToUpper(scanner.Text())
        // 写出大写的行。
        fmt.Println(ucl)
    }
    // 检查 Scan 的错误。文件结束符是可以接受的，并且不会被 Scan 当作一个错误。
    if err := scanner.Err(); err != nil {
        fmt.Fprintln(os.Stderr, "error:", err)
        os.Exit(1)
    }
}
```

### 命令行参数

```go
// 命令行参数是指定程序运行参数的一个常见方式。例如，go run hello.go，程序 go 使用了 run 和 hello.go 两个参数。
func main() {
    // os.Args 提供原始命令行参数访问功能。注意，切片中的第一个参数是该程序的路径，并且 os.Args[1:]保存所有程序的的参数。
    argsWithProg := os.Args
    argsWithoutProg := os.Args[1:]
    // 你可以使用标准的索引位置方式取得单个参数的值。
    arg := os.Args[3]
    fmt.Println(argsWithProg)    // [./command-line-arguments a b c d]
    fmt.Println(argsWithoutProg) // [a b c d]
    fmt.Println(arg)             // c
}

// 要实验命令行参数，最好先使用 go build 编译一个可执行二进制文件
// $ go build command-line-arguments.go
// $ ./command-line-arguments a b c d
```

### 命令行标志(未懂)

```go
func main() {
    // 基本的标记声明仅支持字符串、整数和布尔值选项。这里我们声明一个默认值为 "foo" 的字符串标志 word并带有一个简短的描述。
    // 这里的 flag.String 函数返回一个字符串指针（不是一个字符串值），在下面我们会看到是如何使用这个指针的。
    wordPtr := flag.String("word", "foo", "a string")
    // 使用和声明 word 标志相同的方法来声明 numb 和 fork 标志。
    numbPtr := flag.Int("numb", 42, "an int")
    boolPtr := flag.Bool("fork", false, "a bool")
    // 用程序中已有的参数来声明一个标志也是可以的。注意在标志声明函数中需要使用该参数的指针。
    var svar string
    flag.StringVar(&svar, "svar", "bar", "a string var")
    // 所有标志都声明完成以后，调用 flag.Parse() 来执行命令行解析。
    flag.Parse()
    // 这里我们将仅输出解析的选项以及后面的位置参数。注意，我们需要使用类似 *wordPtr 这样的语法来对指针解引用，从而得到选项的实际值。
    fmt.Println("word:", *wordPtr)
    fmt.Println("numb:", *numbPtr)
    fmt.Println("fork:", *boolPtr)
    fmt.Println("svar:", svar)
    fmt.Println("tail:", flag.Args())
}

// 测试这个程序前，最好将这个程序编译成二进制文件，然后再运行这个程序。
// $ go build command-line-flags.go
// word: opt
// numb: 7
// fork: true
// svar: flag
// tail: []
// 注意到，如果你省略一个标志，那么这个标志的值自动的设定为他的默认值。
// $ ./command-line-flags -word=opt
// word: opt
// numb: 42
// fork: false
// svar: bar
// tail: []
// 位置参数可以出现在任何标志后面。
// $ ./command-line-flags -word=opt a1 a2 a3
// word: opt
// ...
// tail: [a1 a2 a3]
// 注意，flag 包需要所有的标志出现位置参数之前（否则，这个标志将会被解析为位置参数）。
// $ ./command-line-flags -word=opt a1 a2 a3 -numb=7
// word: opt
// numb: 42
// fork: false
// svar: bar
// trailing: [a1 a2 a3 -numb=7]
// 使用 -h 或者 --help 标志来得到自动生成的这个命令行程序的帮助文本。
// $ ./command-line-flags -h
// Usage of ./command-line-flags:
//   -fork=false: a bool
//   -numb=42: an int
//   -svar="bar": a string var
//   -word="foo": a string
// 如果你提供一个没有使用 flag 包指定的标志，程序会输出一个错误信息，并再次显示帮助文本。
// $ ./command-line-flags -wat
// flag provided but not defined: -wat
// Usage of ./command-line-flags:
// ...
```

### 环境变量(未懂)

```go
func main() {
    // 使用 os.Setenv 来设置一个键值队。使用 os.Getenv获取一个键对应的值。如果键不存在，将会返回一个空字符串。
    os.Setenv("FOO", "1")
    fmt.Println("FOO:", os.Getenv("FOO"))
    fmt.Println("BAR:", os.Getenv("BAR"))
    // 使用 os.Environ 来列出所有环境变量键值队。这个函数会返回一个 KEY=value 形式的字符串切片。你可以使用strings.Split 来得到键和值。这里我们打印所有的键。
    fmt.Println()
    for _, e := range os.Environ() {
        pair := strings.Split(e, "=")
        fmt.Println(pair[0])
    }
}

// 运行这个程序，显示我们在程序中设置的 FOO 的值，然而没有设置的 BAR 是空的。
// $ go run environment-variables.go
// FOO: 1
// BAR:
// 键的列表是由你的电脑情况而定的。
// TERM_PROGRAM
// PATH
// SHELL
// ...
// 如果我们在运行前设置了 BAR 的值，那么运行程序将会获取到这个值。
// $ BAR=2 go run environment-variables.go
// FOO: 1
// BAR: 2
// ...
```

### 执行外部进程

```go
func main() {
    // 我们将从一个简单的命令开始，没有参数或者输入，仅打印一些信息到标准输出流。exec.Command 函数帮助我们创建一个表示这个外部进程的对象。
    dateCmd := exec.Command("date")
    // .Output 是另一个帮助我们处理运行一个命令的常见情况的函数，它等待命令运行完成，并收集命令的输出。如果没有出错，dateOut 将获取到日期信息的字节。
    dateOut, err := dateCmd.Output()
    if err != nil {
        panic(err)
    }
    fmt.Println("> date")
    fmt.Println(string(dateOut))
    // 下面我们将看看一个稍复杂的例子，我们将从外部进程的stdin 输入数据并从 stdout 收集结果。
    grepCmd := exec.Command("grep", "hello")
    // 这里我们明确的获取输入/输出管道，运行这个进程，写入一些输入信息，读取输出的结果，最后等待程序运行结束。
    grepIn, _ := grepCmd.StdinPipe()
    grepOut, _ := grepCmd.StdoutPipe()
    grepCmd.Start()
    grepIn.Write([]byte("hello grep\ngoodbye grep"))
    grepIn.Close()
    grepBytes, _ := ioutil.ReadAll(grepOut)
    grepCmd.Wait()
    // 上面的例子中，我们忽略了错误检测，但是你可以使用if err != nil 的方式来进行错误检查，我们也只收集StdoutPipe 的结果，但是你可以使用相同的方法收集StderrPipe 的结果。
    fmt.Println("> grep hello")
    fmt.Println(string(grepBytes))
    // 注意，当我们需要提供一个明确的命令和参数数组来生成命令，和能够只需要提供一行命令行字符串相比，你想使用通过一个字符串生成一个完整的命令，那么你可以使用 bash命令的 -c 选项：
    lsCmd := exec.Command("bash", "-c", "ls -a -l -h")
    lsOut, err := lsCmd.Output()
    if err != nil {
        panic(err)
    }
    fmt.Println("> ls -a -l -h")
    fmt.Println(string(lsOut))
}
```

### 替换执行进程

```go
    // 有时候只想 用其他的（也许是非 Go 程序）来完全替代当前的 Go 进程
    // 在我们的例子中，我们将执行 ls 命令。Go 需要提供我 们需要执行的可执行文件的绝对路径，所以我们将使用 exec.LookPath 来得到它（大概是 /bin/ls）。
    binary, lookErr := exec.LookPath("ls")
    if lookErr != nil {
        panic(lookErr)
    }
    // Exec 需要的参数是切片的形式的（不是放在一起的一个大字 符串）。我们给 ls 一些基本的参数。注意，第一个参数需要 是程序名。
    args := []string{"ls", "-a", "-l", "-h"}
    // Exec 同样需要使用环境变量。 这里我们仅提供当前的环境变量。
    env := os.Environ()
    // 这里是 os.Exec 调用。如果这个调用成功，那么我们的 进程将在这里被替换成 /bin/ls -a -l -h 进程。如果存 在错误，那么我们将会得到一个返回值。
    execErr := syscall.Exec(binary, args, env)
    if execErr != nil {
        panic(execErr)
    }
    // 运行程序时，它会替换为 ls
}
```

### 信号

```go
func main() {
    // Go 通过向一个通道发送 os.Signal 值来进行信号通知。我们 将创建一个通道来接收这些通知（同时还创建一个用于在程序可 以结束时进行通知的通道）。
    sigs := make(chan os.Signal, 1)
    done := make(chan bool, 1)
    // signal.Notify 注册这个给定的通道用于接收特定信号。
    signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
    // 这个 Go 协程执行一个阻塞的信号接收操作。当它得到一个 值时，它将打印这个值，然后通知程序可以退出。
    go func() {
        sig := <-sigs
        fmt.Println()
        fmt.Println(sig)
        done <- true
    }()
    // 程序将在这里进行等待，直到它得到了期望的信号（也就 是上面的 Go 协程发送的 done 值）然后退出。
    fmt.Println("awaiting signal")
    <-done
    fmt.Println("exiting")
}

// 当我们运行这个程序时，它将一直等待一个信号。使用 ctrl-C （终端显示为 ^C），我们可以发送一个 SIGINT 信号，这会 使程序打印 interrupt 然后退出。
// $ go run signals.go
// awaiting signal
// ^C
// interrupt
// exiting
```

### 退出

```go
func main() {
    // 当使用 os.Exit 时 defer 将不会 执行，所以这里的 fmt.Println 将永远不会被调用。
    defer fmt.Println("!")
    // 退出并且退出状态为 3。
    os.Exit(3)
}
```
