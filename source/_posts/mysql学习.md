---
title: mysql学习
toc: true
mathjax: true
comments: true
date: 2017-11-12 20:40:12
updated:
tags: mysql
categories: 数据库
---

`mysql` 的学习,感谢[菜鸟教程](http://www.runoob.com/mysql/mysql-tutorial.html)与[宁皓网](https://ninghao.net/package/mysql)提供的优秀资料随着学习的深入,此文章持续更新...

<!-- more -->

<br>
MySQL 是一个关系型数据库管理系统,下面是一些术语解释:

-   数据库: 数据库是一些关联表的集合。.
-   数据表: 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
-   列: 一列(数据元素) 包含了相同的数据, 例如邮政编码的数据。
-   行：一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
-   冗余：存储两倍数据，冗余降低了性能，但提高了数据的安全性。
-   主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
-   外键：外键用于关联两个表。
-   复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
-   索引：使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
-   参照完整性: 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。

### 基本命令

|            方法             |   作用   |
| :-------------------------: | :------: |
|    `mysql.server start`     |   开启   |
|     `mysql.server stop`     |   关闭   |
|   `mysql.server restart`    |   重启   |
|    `mysql.server reload`    |  重加载  |
| `mysql.server force-reload` | 强制重载 |
|    `mysql.server status`    |   状态   |

```go
# 命令行导入数据库
$ mysql -u root -p 数据库 < 数据库文件.sql;
```

---

### 用户

```go
# 用户登录 默认本地  显示警告信息
$ mysql [-h hostname] -u uesr [-p ] [--show-warnings]

# 创建新用户  localhost: 本地
$ CREATE USER 'name'@'localhost' IDENTIFIED BY 'password';

# 权限: ALL PRIVILEGES 表示所有  数据库.数据表: .表示所有   数据库.* 表示某个库的所有表 主机名:localhost
$ GRANT 权限 ON 数据库.数据表 TO '用户'@'主机名' [IDENTIFIED BY '密码'];

# 修改立即生效
$ flush privileges;

# 查看数据库系统里面的所有的用户
$ select user from mysql.user;

# 查看表里的所有的字段
$ desc mysql.user;

# 查看 mysql 全局系统里面的用户的select_priv权限
$ select user, select_priv from mysql.user;

# 查看特定的数据库上的权限
$ select user, db, select_priv from mysql.db;

# 查看一下用户拥有的权限
$ show grants for blssom@localhost

# 删除更新 删除权限 在某个数据库的所有表上
$ revoke update, delete on 数据库.* from blssom@localhost

# 为用户设置密码"hello"
$ set password for blssom@localhost = password('hello');

# 删除用户
$ drop user blssom@localhost
```

---

### 数据库

|    数据类型    |          作用          |
| :------------: | :--------------------: |
| `varchar(255)` | 最大 255 字节的 string |
|     `date`     |          时间          |
|     `TEXT`     |         长文本         |
|   `INT(10)`    |     最大 10 位数字     |

```go
# 创建数据库 (如果不存在再创建)
$ CREATE DATABASE [IF NOT EXISTS] blssomHome [charset=utf8]

# 显示所有数据库
$ show databases;

# 切换 数据库
$ USE blssomHome;

# 删除 数据库
$ DROP DATABASE blssomHome;

# 显示数据库的所有表
$ SHOW TABLES;

# 创建数据表 film定义3个字段unsigned:不能为负
$ CREATE TABLE film(
id INT(10) unsigned not null auto_increment,
name varchar(255)  DEFAULT 0 COMMENT '这里是注释',
date date,
PRIMARY KEY(id)
) default charset=utf8
;

# 查看数据表详细信息
$ DESCRIBE film;

# ALTER TABLE 语句 添加字段在开头(默认末尾)
$ ALTER TABLE film ADD fid INT(10) FIRST;

# ALTER TABLE 语句 添加字段在name之后
$ ALTER TABLE film ADD fid INT(10) AFTER name;

# PRIMARY KEY 添加主键
$ ALTER TABLE film ADD PRIMARY KEY (fid);

# 改变数据栏名字
$ ALTER TABLE film CHANGE fid film_id INT(10);

# 重命名数据表
$ ALTER TABLE film RENAME TO movie;

# 删除数据栏
$ ALTER TABLE movie DROP film_content;

# 删除数据表
$ DROP TABLE movie;
```

---

### 查询

```go
# 添加数据 按顺序添加 按栏添加
$ INSERT INTO 数据表 (栏1, 栏2, 栏3) VALUES (值1, 值2, 值3);
$ INSERT INTO people VALUES (NULL, '华盛顿', '1954-12-28', '美国');
$ INSERT INTO people (name, location) VALUES ('安吉莉娜', '美国');

# 删除数据
$ DELETE FROM 表名称 WHERE 字段 = 值;
$ DELETE FROM people WHERE pid = 4;

# 更新数据
$ UPDATE 表名称 SET 字段 = '值' WHERE 字段 = 值;
$ UPDATE people SET birth = '1975-06-04' WHERE pid = 3;

# 查询数据  分栏查询 (*)所有
$ SELECT 栏1,栏2,栏3... FROM 数据表;
$ SELECT * FROM people;  

# where 限制条件
$ SELECT * FROM people WHERE location = '美国';

# ORDER BY 排序 默认ASC升序(DESC降序)
$ SELECT * FROM people ORDER BY people_birth DESC;

# LIMIT 限制查询数量  OFFSET 查询开始的偏移量
$ SELECT * FROM people WHERE location = '美国' LIMIT 3;
$ SELECT * FROM people LIMIT 3 OFFSET 1;
$ SELECT * FROM people LIMIT 1, 3;(等价于上一条)

# 比较(大于，小于，大于等于，小于等于，或者不等于)
$ SELECT * FROM people WHERE birth > '1960-01-01';

# 逻辑(AND:并且 OR:或者)
$ SELECT * FROM people WHERE birth > '1960-01-01' AND birth < '1970-01-01';
$ SELECT * FROM people WHERE birth > '1970-01-01' OR birth < '1960-01-01';

# IN:一个值在一个集合里面  NOT IN:不在
$ SELECT * FROM people WHERE location IN ('美国', '英国');
$ SELECT * FROM people WHERE location NOT IN ('美国', '英国');

# LIKE(% 表示一个或者多个字符，_ 表示一个字符)
$ SELECT * FROM people WHERE name LIKE ('李%');
```

---

### 关系

```go
# 栏的名称有冲突的话，写成 数据表.数据栏
# SELECT 栏1,栏2 FROM 数据表1, 数据表2 WHERE 组织条件
$ SELECT user_name, review_content FROM user, review WHERE review.user_id = user.user_id;

# 表与表之间, 表示CROSS JOIN:交叉关联  INNER JOIN:内部关联
$ SELECT user_name, review_content FROM user INNER JOIN review ON review.user_id = user.user_id;

# INNER JOIN(交集) 后继续设置条件
$ SELECT user_name, review_content FROM user INNER JOIN review ON review.user_id = user.user_id WHERE user.user_id = 1;

# LEFT JOIN:左关联 RIGHT JOIN:右关联
# 以哪个为主显示所有内容 次表有就关联显示 没有就null
$ SELECT user_name, review_content FROM user LEFT JOIN review ON review.user_id = user.user_id;

# COUNT()函数统计此栏的 数量
$ SELECT COUNT(review_id) FROM review;

# GROUP BY: 通过某个栏分组
$ SELECT film_id, COUNT((review_id) FROM review GROUP BY film_id;

# AVG()函数计算平均分
$ SELECT film_id, AVG(review_rate) FROM review GROUP BY film_id;

# SUM()函数求和
```

---

### 一些查询例子

```go
# 查询电影平均分
$ SELECT review.film_id, film.film_name, AVG(review_rate) FROM review, film WHERE review.film_id = film.film_id GROUP BY review.film_id;

# 查询电影名与参与电影人和工作
$ SELECT film_name, people_name, job FROM film, people, film_people WHERE film_people.film_id = film.film_id AND film_people.people_id = people.people_id;

# 查询电影名为x的参与电影人和工作 on duplicate key 当被约束时更新xxxxx
$ SELECT film_name, people_name, job FROM film, people, film_people WHERE film_people.film_id = film.film_id AND film_people.people_id = people.people_id AND film_name = 'x' on duplicate key update xxxxxx;

# 查询电影票房按导演名分组 按票房降序排序
# AS 可以给数据栏和数据表起别名
$ SELECT SUM(film_box) AS total_box, people_name FROM film, people, crew WHERE crew.film_id = film.film_id AND crew.people_id = people.people_id AND crew_job = '导演' GROUP BY people_name ORDER BY total_box DESC;
```
