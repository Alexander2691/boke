---
title: Linux 常用命令速查
date: 2026-06-28
tags: [tech, tutorial]
---

日常开发高频使用的 Linux 命令。

## 文件操作

```bash
ls -la              # 查看文件详情
cp -r src/ dst/     # 递归复制
mv file.txt /tmp/   # 移动/重命名
rm -rf dir/         # 删除目录
find . -name "*.js" # 查找文件
```

## 文本处理

```bash
grep -r "keyword" . # 递归搜索
sed -i 's/old/new/g' file.txt  # 替换
awk '{print $1}' file.txt      # 提取列
```

## 进程管理

```bash
ps aux               # 查看进程
top                  # 实时监控
kill -9 PID          # 强制终止
nohup node app.js &  # 后台运行
```

## 网络

```bash
curl -I https://example.com    # HTTP 头
netstat -tlnp                  # 监听端口
ssh user@host                  # 远程连接
scp file.txt user@host:/tmp/   # 传文件
```

掌握这些命令，终端效率翻倍。
