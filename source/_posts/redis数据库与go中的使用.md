---
title: redis数据库与go中的使用
mathjax: true
toc: true
comments: true
date: 2018-1-21 22:17:25
updated:
tags: redis
categories: 数据库
---

对于`redis`的学习,感谢[菜鸟教程](http://www.runoob.com/redis/redis-tutorial.html)提供的优秀资料
随着学习的深入,此文章持续更新...

<!-- more -->

Redis 是 key - value 型数据库,有以下三个特点：

-   Redis 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
-   Redis 不仅仅支持简单的 key-value 类型的数据，同时还提供 list，set，zset，hash 等数据结构的存储。
-   Redis 支持数据的备份，即 master-slave 模式的数据备份。

### 基本

通过`homebrew`安装

```shell
brew install redis
```

通过`homebrew`安装`Redis Desktop Manager` 是一个`redis`桌面管理工具

```shell
brew cask install rdm
```

启动`redis` / 关闭`redis`

```shell
redis-server

redis-cli shutdown
```

进入`redis`命令界面 --raw 解决乱码问题

```shell
redis-cli --raw
```

选择数据库 默认数据库为`0`

```shell
SELECT 0   # ok
```

通过 config 命令查看或设置配置项

```shell
config get config_setting_name
# 查看所有配置
config get *
# 设置配置
config set config_setting_name new_config_value
config set loglevel "notice"

config get loglevel
# "notice"
```

### 命令

#### Keys

|          命令          |                    描述                    |                     返回                     |
| :--------------------: | :----------------------------------------: | :------------------------------------------: |
|        Del key         |             key 存在时删除 key             |                  删除的数量                  |
|       Exists key       |            检查 key 值是否存在             |                存在`1`否则`0`                |
|       Expire key       |              已秒设置过期时间              |                成功`1`否则`0`                |
|      Expireat key      |          `unix`时间戳设置过去时间          |                成功`1`否则`0`                |
|      PEXPIRE key       |             以毫秒设置过期时间             |                成功`1`否则`0`                |
|        KEYS \*         |         查找所有符合给定模式的 key         |              符合查询要求的数组              |
|   Move key database    |          移动 key 值到其他数据库           |                成功`1`否则`0`                |
|      PERSIST key       |            移除 key 的过期时间             |                成功`1`否则`0`                |
|        Pttl key        |          以毫秒为单位返回过期时间          |  无 key:`-2` 无过期时间: `-1` 否则返回时间   |
|        TTL key         |       以秒为单位返回 key 的过期时间        |  无 key:`-2` 无过期时间: `-1` 否则返回时间   |
|       RANDOMKEY        |       从当前数据库中随机返回一个 key       |               无 key 返回`nil`               |
|  RENAME oldkey newkey  |              修改 key 的名称               | 成功:`ok` 失败返回错误 新 key 存在覆盖新 key |
| Renamenx oldkey newkey | 仅当 newkey 不存在时，将 key 改名为 newkey |                成功`1`否则`0`                |
|        TYPE key        |         返回 key 所储存的值的类型          |              无 key 返回`none`               |

#### String（字符串)

-   string 可以包含任何数据。比如 jpg 图片或者序列化的对象
-   一个键最大能存储 512MB

|              命令              |                         描述                         |                      返回                      |
| :----------------------------: | :--------------------------------------------------: | :--------------------------------------------: |
|         SET key value          |                    设置 key value                    |                 成功后返回`ok`                 |
|            Get key             |                  获取指定 key 的值                   |                无 key 返回`nil`                |
|     Getrange key start end     |             返回 key 中字符串值的子字符              |                 截取的子字符串                 |
|        GETSET key value        | 将给定 key 的值设为 value 返回 key 的旧值(old value) |                无 key 返回`nil`                |
|         MGET key1 key2         |          获取所有(一个或多个)给定 key 的值           |        一个包含所有给定 key 的值的列表         |
|    SETEX key time(s) value     |                 重设 key 与过期时间                  |                    成功`ok`                    |
|        SETNX key value         |                key 不存在时设置 value                |                 成功`1`失败`0`                 |
|           STRLEN key           |                   返回 key 的长度                    |                 无 key 返回`0`                 |
|  MSET key1 value1 key2 value2  |              同时设置多个 key 与 value               |                    总是`ok`                    |
| MSETNX key1 value1 key2 value2 |          同时设置多个不存在的 key 与 value           |             全部成功返回`1`否则`0`             |
|    PSETEX key time(s) value    |                毫秒为单位设置过期时间                |                    成功`ok`                    |
|            INCR key            |                    使 key 值加一                     |  newkey,无 key 初始化为`0`再加`1`否则返回错误  |
|        Incrby key int64        |                   使 key 值加 num                    | newkey,无 key 初始化为`0`再加`num`否则返回错误 |
|     Incrbyfloat key float      |                   同上 浮点数类型                    |                      同上                      |
|            Decr key            |                    使 key 值减一                     |                      同上                      |
|        Decrby key int64        |                  使 key 值减去 num                   |                      同上                      |
|        Append key value        |                  给 key 追加 value                   |         newkey 的长度 无 key 等于 set          |

#### Hash（哈希）

-   hash 是一个键值(key=>value)对集合。
-   hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。
-   每个 hash 可以存储 232 -1 键值对（40 多亿）

|                 命令                  |                     描述                      |            返回            |
| :-----------------------------------: | :-------------------------------------------: | :------------------------: |
|            Hdel key field1            |           删除一个或多个哈希表字段            |       成功删除的数量       |
|          Hexists key field1           |             查看指定字段是否存在              |      存在`1` 否则`0`       |
|            HGET key field1            |               返回指定字段的值                |      不存在返回`nil`       |
|          Hgetall key field1           |                 返回整个 key                  |      不存在返回空列表      |
|       HINCRBY key field1 int64        |    为 key 中的指定字段的整数值加上指定增量    |        此字段的新值        |
|     HINCRBYFLOAT key field1 float     |                  浮点数版本                   |            同上            |
|               Hkeys key               |            获取所有哈希表中的字段             |      不存在返回空列表      |
|               Hlen key                |            获取哈希表中字段的数量             |       不存在返回`0`        |
|        Hmget key field1 field2        |             获取所有给定字段的值              |      不存在返回`nil`       |
| Hmset key field1 value1 field2 value2 | 同时将多个 field-value (域-值)对设置到 key 中 |        成功返回`ok`        |
|         Hset key field value          |       key 中的字段 field 的值设为 value       | 新建字段返回`1`覆盖返回`0` |
|        Hsetnx key field value         |     字段 field 不存在时设置哈希表字段的值     |       成功`1`失败`0`       |
|               Hvals key               |              获取哈希表中所有值               |      不存在返回空列表      |

#### List（列表）

-   Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）
-   列表最多可存储 232 - 1 元素 (4294967295, 每个列表可存储 40 多亿)。

#### Set（集合）

-   集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。
-   集合中最大的成员数为 232 - 1(4294967295, 每个集合可存储 40 多亿个成员)。

#### Zset（有序集合)

-   string 类型元素的集合,且不允许重复的成员
-   每个元素都会关联一个 double 类型的分数,通过分数来为集合中的成员进行从小到大的排序。
-   成员是唯一的,但分数(score)却可以重复

### Golang redis 操作

`golang`操作`redis`,使用[redis.v6](https://gopkg.in/redis.v6)的一些简单说明

#### 使用

```go
go get gopkg.in/redis.v6
import "gopkg.in/redis.v6"
```

#### 创建客户端

通过 redis.NewClient 函数即可创建一个 redis 客户端, 这个方法接收一个 redis.Options 对象参数, 通过这个参数, 我们可以配置 redis 相关的属性, 例如 redis 服务器地址, 数据库名, 数据库密码等.

```go
func createClient() *redis.Client {
    client := redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "",
        DB:       0,
    })

    // 通过 cient.Ping() 来检查是否成功连接到了 redis 服务器
    pong, err := client.Ping().Result()
    fmt.Println(pong, err)

    return client
}
```

#### string

set get 操作,第三个参数是过期时间, 如果是 0, 则表示没有过期时间.

```go
err := client.Set("name", "xys", 0).Err()

val, err := client.Get("name").Result()
```

这里设置过期时间.

```go
err = client.Set("age", "20", 1 * time.Second).Err()
```

#### list

在名称为 fruit 的 list 尾添加一个值为 value 的元素

```go
client.RPush("fruit", "apple")
```

在名称为 fruit 的 list 头添加一个值为 value 的 元素

```go
client.LPush("fruit", "banana")
```

返回名称为 fruit 的 list 的长度

```go
length, err := client.LLen("fruit").Result()
```

返回并删除名称为 fruit 的 list 中的首元素

```go
value, err := client.LPop("fruit").Result()
```

返回并删除名称为 fruit 的 list 中的尾元素

```go
value, err = client.RPop("fruit").Result()
```

#### set

向 blacklist 中添加元素

```go
client.SAdd("blacklist", "Obama")
```

向 whitelist 添加元素

```go
client.SAdd("whitelist", "the Elder")
```

判断元素是否在集合中

```go
isMember, err := client.SIsMember("blacklist", "Bush").Result()
```

求交集, 即既在黑名单中, 又在白名单中的元素

```go
names, err := client.SInter("blacklist", "whitelist").Result()
```

获取指定集合的所有元素

```go
all, err := client.SMembers("blacklist").Result()
```

#### hash

向名称为 user_xys 的 hash 中添加元素 name

```go
client.HSet("user_xys", "name", "xys")
```

批量地向名称为 user_test 的 hash 中添加元素 name 和 age

```go
client.HMSet("user_test", map[string]string{"name": "test", "age":"20"})
```

单独获取名为 user_test 的 age 字段

```go
age, err := client.HGet("user_test", "age").Result()
```

批量获取名为 user_test 的 hash 中的指定字段的值.

```go
fields, err := client.HMGet("user_test", "name", "age").Result()
```

获取名为 user_xys 的 hash 中的字段个数

```go
length, err := client.HLen("user_xys").Result()
```

删除名为 user_test 的 age 字段

```go
 client.HDel("user_test", "age")
```
