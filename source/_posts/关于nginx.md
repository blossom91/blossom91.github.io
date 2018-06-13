---
title: 关于Nginx
mathjax: true
toc: true
comments: true
date: 2018-3-9 19:17:25
updated:
tags: nginx
categories: 杂货铺
---

Nginx 的大名从我接触开发以来如雷贯耳,但一直不清楚具体用法,今天就来研究一下....

<!-- more -->

### 安装

```shell
brew install nginx
```

安装后目录在`/usr/local/etc/nginx`

目录中有一个 nginx.conf 就是配置文件

常用命令

启动: `nginx` 去访问 `localhost:8080` 吧
关闭: `nginx -s stop`
重启: `nginx -s reload` 每次修改完`.conf` 文件就需要重启 `nginx`
检查配置: `nginx -t` 检查修改的`nginx.conf`配置是否正确

最基本的代理功能

```conf
server {
  listen       80;
# listen       [::]:80 default_server;   默认跳转到https
# return 302 https://$server_name$request_uri;
  server_name  test.com;

  location / {
    proxy_cache my_cache;
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```

### 缓存

```conf
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
```

在相对路径创建一个 cache 目录 等级 1:2 可以有子目录 目录名字:大小

https 与 http2 公钥 私匙

```conf
server {
  listen       443 http2; # 配置http2
  server_name  test.com;
  http2_push_preload  on; # 开启http2 push

  ssl on;
  ssl_certificate_key  ../certs/localhost-privkey.pem;  # https证书地址
  ssl_certificate      ../certs/localhost-cert.pem;

  location / {
    proxy_cache my_cache;
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```

### 反向代理

当我们有一个服务器集群，并且服务器集群中的每台服务器的内容一样的时候，同样我们要直接从个人电脑访问到服务器集群服务器的时候无法访问，必须通过第三方服务器才能访问集群
这个时候，我们通过第三方服务器访问服务器集群的内容，但是我们并不知道是哪一台服务器提供的内容，此种代理方式称为反向代理

nginx 反向代理主要通过 proxy_pass 来配置，将你项目的开发机地址填写到 proxy_pass 后面，正常的格式为 proxy_pass URL 即可

```shell
server {
    listen 80;
    location / {
        proxy_pass http://10.10.10.10:20186;
    }
}
```

### 负载均衡

公司会建立很多的服务器，这些服务器组成了服务器集群，然后，当用户访问网站的时候，先访问一个中间服务器，再让这个中间服务器在服务器集群中选择一个压力较小的服务器，然后将该访问请求引入选择的服务器
所以，用户每次访问，都会保证服务器集群中的每个服务器压力趋于平衡，分担了服务器压力，避免了服务器崩溃的情况
一句话：nginx 会给你分配服务器压力小的去访问

worker_processes

工作进程数，和 CPU 核数相同

worker_connections

每个进程允许的最大连接数

upstream 模块

负载均衡就靠它
语法格式：upstream name {}
里面写的两个 server 分别对应着不同的服务器

server 模块

实现反向代理
listen 监督端口号
location / {}访问根路径
proxy_pass `http://firstdemo`，代理到 firstdemo 里两个服务器上

```shell
// 修改nginx.conf
worker_processes 1;
events {
    worker_connections 1024;
}
http {
    upstream firstdemo {
        ip_hash;
        server 39.106.145.33;
        server 47.93.6.93;
    }
    server {
        listen 8080;
        location / {
            proxy_pass http://firstdemo;
        }
    }
}
```

目前游览器默认要求 HTTP2 必须使用 https

服务端开发可以面向 http1.1 通过 nginx 代理来配置 http2 这样可以兼容那些不支持 http2 的游览器

未完待续....
