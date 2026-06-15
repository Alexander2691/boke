---
title: Git 工作流最佳实践
date: 2026-06-08
tags: [技术, 笔记]
---

在团队协作中，规范的 Git 工作流能够显著提高开发效率、减少冲突。本文介绍几种主流的工作流模式及其适用场景。

## GitHub Flow

GitHub Flow 是最简单也最流行的工作流之一，适合持续部署的项目：

- `main` 分支始终保持可部署状态
- 从 `main` 创建功能分支进行开发
- 通过 Pull Request 进行代码审查
- 合并后立即部署

## Git Flow

Git Flow 更适合有版本发布周期的项目，包含以下分支：

- `main` — 生产分支
- `develop` — 开发主分支
- `feature/*` — 功能分支
- `release/*` — 发布分支
- `hotfix/*` — 紧急修复分支

这种模式分支较多，但结构清晰，适合需要维护多个版本的项目。

## Commit 规范

推荐使用 Conventional Commits 规范：

```
feat: 添加用户登录功能
fix: 修复支付页面崩溃问题
docs: 更新 API 文档
refactor: 重构数据查询模块
chore: 更新依赖版本
```

> 好的 Commit Message 应该能清晰地表达"这个改动做了什么以及为什么"。
