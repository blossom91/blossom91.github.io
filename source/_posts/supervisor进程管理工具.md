---
title: supervisor进程管理工具
mathjax: true
toc: true
comments: true
date: 2018-1-8 11:17:25
updated:
tags: variety
categories: 后端
---

我平时写 node 小工具的进程管理工具都是`pm2`,但公司内部使用`supervisor`,所以也来了解学习一下~~~

<!-- more -->

## 安装

```
sudo pip install supervisor
```

## 配置

Supervisor 相当强大，提供了很丰富的功能，不过我们可能只需要用到其中一小部分。安装完成之后，可以编写配置文件，来满足自己的需求。为了方便，我们把配置分成两部分：supervisord（supervisor 是一个 C/S 模型的程序，这是 server 端，对应的有 client 端：supervisorctl）和应用程序（即我们要管理的程序）。

首先来看 supervisord 的配置文件。安装完 supervisor 之后，可以运行 echo_supervisord_conf 命令输出默认的配置项，也可以重定向到一个配置文件里：

```
echo_supervisord_conf > /etc/supervisord.conf
```

去除里面大部分注释和“不相关”的部分，我们可以先看这些配置：

```
[unix_http_server]
file=/tmp/supervisor.sock   ; UNIX socket 文件，supervisorctl 会使用
;chmod=0700                 ; socket 文件的 mode，默认是 0700
;chown=nobody:nogroup       ; socket 文件的 owner，格式： uid:gid

;[inet_http_server]         ; HTTP 服务器，提供 web 管理界面
;port=127.0.0.1:9001        ; Web 管理后台运行的 IP 和端口，如果开放到公网，需要注意安全性
;username=user              ; 登录管理后台的用户名
;password=123               ; 登录管理后台的密码

[supervisord]
logfile=/tmp/supervisord.log ; 日志文件，默认是 $CWD/supervisord.log
logfile_maxbytes=50MB        ; 日志文件大小，超出会 rotate，默认 50MB
logfile_backups=10           ; 日志文件保留备份数量默认 10
loglevel=info                ; 日志级别，默认 info，其它: debug,warn,trace
pidfile=/tmp/supervisord.pid ; pid 文件
nodaemon=false               ; 是否在前台启动，默认是 false，即以 daemon 的方式启动
minfds=1024                  ; 可以打开的文件描述符的最小值，默认 1024
minprocs=200                 ; 可以打开的进程数的最小值，默认 200

; the below section must remain in the config file for RPC
; (supervisorctl/web interface) to work, additional interfaces may be
; added by defining them in separate rpcinterface: sections
[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///tmp/supervisor.sock ; 通过 UNIX socket 连接 supervisord，路径与 unix_http_server 部分的 file 一致
;serverurl=http://127.0.0.1:9001 ; 通过 HTTP 的方式连接 supervisord

; 包含其他的配置文件
[include]
files = relative/directory/*.ini    ; 可以是 *.conf 或 *.ini
```

我们把上面这部分配置保存到 /etc/supervisord.conf（或其他任意有权限访问的文件），然后启动 supervisord（通过 -c 选项指定配置文件路径，如果不指定会按照这个顺序查找配置文件：$CWD/supervisord.conf, $CWD/etc/supervisord.conf, /etc/supervisord.conf）：

```
supervisord -c /etc/supervisord.conf
```

查看 supervisord 是否在运行：

```
ps aux | grep supervisord
```

program 配置
上面我们已经把 supervisrod 运行起来了，现在可以添加我们要管理的进程的配置文件。这些配置可以都写到 supervisord.conf 文件里，如果应用程序很多，最好通过 include 的方式把不同的程序（组）写到不同的配置文件里。

为了举例，我们新建一个目录 /etc/supervisor/ 用于存放这些配置文件，相应的，把 /etc/supervisord.conf 里 include 部分的的配置修改一下：

```
[include]
files = /etc/supervisor/*.conf
假设有个用 Flask 开发的用户系统 usercenter, 生产环境使用 gunicorn 运行。项目代码位于 /home/leon/projects/usercenter，WSGI 对象位于 wsgi.py。在命令行启动的方式是这样的：

cd /home/leon/projects/usercenter
gunicorn -w 8 -b 0.0.0.0:17510 wsgi:app
对应的配置文件可能是：

[program:usercenter]
directory = /home/leon/projects/usercenter ; 程序的启动目录
command = gunicorn -w 8 -b 0.0.0.0:17510 wsgi:app  ; 启动命令
autostart = true     ; 在 supervisord 启动的时候也自动启动
startsecs = 5        ; 启动 5 秒后没有异常退出，就当作已经正常启动了
autorestart = true   ; 程序异常退出后自动重启
startretries = 3     ; 启动失败自动重试次数，默认是 3
user = leon          ; 用哪个用户启动
redirect_stderr = true  ; 把 stderr 重定向到 stdout，默认 false
stdout_logfile_maxbytes = 20MB  ; stdout 日志文件大小，默认 50MB
stdout_logfile_backups = 20     ; stdout 日志文件备份数
; stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）
stdout_logfile = /data/logs/usercenter_stdout.log
```

其中 [program:usercenter] 中的 usercenter 是应用程序的唯一标识，不能重复。对该程序的所有操作（start, restart 等）都通过名字来实现。

## 管理

Supervisord 安装完成后有两个可用的命令行 supervisor 和 supervisorctl，命令使用解释如下：

-   supervisord，初始启动 Supervisord，启动、管理配置中设置的进程。
-   supervisorctl stop programxxx，停止某一个进程(programxxx)，programxxx 为[program:blogdemon]里配置的值，这个示例就是 blogdemon。
-   supervisorctl start programxxx，启动某个进程
-   supervisorctl restart programxxx，重启某个进程
-   supervisorctl stop all，停止全部进程，注：start、restart、stop 都不会载入最新的配置文件。
-   supervisorctl reload，载入最新的配置文件，并按新的配置启动、管理所有进程。
