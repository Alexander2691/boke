---
title: Docker 入门指南
date: 2026-06-18
tags: [tech, tutorial]
---

## 什么是 Docker

Docker 是一个容器化平台，让开发者可以打包应用及其依赖到一个轻量级容器中，实现"一次构建，随处运行"。

## 核心概念

- **镜像（Image）** — 应用的只读模板
- **容器（Container）** — 镜像的运行实例
- **Dockerfile** — 构建镜像的脚本
- **仓库（Registry）** — 存储分发镜像的地方

## 常用命令

```bash
# 拉取镜像
docker pull nginx:latest

# 运行容器
docker run -d -p 80:80 --name my-nginx nginx

# 查看容器
docker ps -a

# 进入容器
docker exec -it my-nginx bash

# 构建镜像
docker build -t my-app:latest .
```

## 编写 Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Docker 让开发环境和生产环境保持一致，是现代 DevOps 的基石。
