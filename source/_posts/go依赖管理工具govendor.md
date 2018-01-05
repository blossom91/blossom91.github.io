---
title: go依赖管理工具govendor
toc: true
mathjax: true
comments: true
date: 2017-10-24 19:16:12
updated:
tags:
categories:
---

[govendor](https://github.com/kardianos/govendor)是类似于`npm`的一个包管理工具该工具将项目依赖的外部包拷贝到项目下的 `vendor` 目录下，并通过 `vendor.json` 文件来记录依赖包的版本，方便用户使用相对稳定的依赖。

<!-- more -->

### 基本说明

|   状态    | 缩写状态 |                        含义                         |
| :-------: | :------: | :-------------------------------------------------: |
|  +local   |    l     |             本地包，即项目自身的包组织              |
| +external |    e     | 外部包，即被 `$GOPATH` 管理，但不在 `vendor` 目录下 |
|  +vendor  |    v     |     已被 `govendor` 管理，即在 `vendor` 目录下      |
|   +std    |    s     |                    标准库中的包                     |
|  +unused  |    u     | 未使用的包，即包在 vendor 目录下，但项目并没有用到  |
| +missing  |    m     |         代码引用了依赖包，但该包并没有找到          |
| +program  |    p     |         主程序包，意味着可以编译为执行文件          |
| +outside  |          |                  外部包和缺失的包                   |
|   +all    |          |                      所有的包                       |

### 指令

|  指令  |                          含义                          |
| :----: | :----------------------------------------------------: |
|  init  |       创建 `vendor` 文件夹和 `vendor.json` 文件        |
|  list  |                  列出已经存在的依赖包                  |
|  add   |     从 `$GOPATH` 中添加依赖包，会加到 vendor.json      |
| update |                从 `$GOPATH` 升级依赖包                 |
| remove |               从 `vendor` 文件夹删除依赖               |
| status |        列出本地丢失的、过期的和修改的`package`         |
| fetch  |      从远端库添加或者更新 `vendor` 文件中的依赖包      |
|  sync  | 本地存在`vendor.json` 时候拉取依赖包，匹配所记录的版本 |
|  get   |                     等同于`go get`                     |

### 常用指令说明

安装`govendor`

```
go get -u github.com/kardianos/govendor
```

从`$GOPATH` 中添加所有依赖包

```
govendor add +external
```

查看使用的包列表

```
govendor list -v fmt
```

从线上远端库添加或更新最新的依赖包

```
govendor fetch golang.org/x/net/context
```

从线上远端库添加或更新标签或分支等于`v1`的依赖包

```
govendor fetch golang.org/x/net/context@=v1  
```
