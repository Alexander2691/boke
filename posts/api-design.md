---
title: RESTful API 设计最佳实践
date: 2026-06-30
tags: [tech, tutorial]
---

设计良好的 API 是前后端协作的基础。

## URL 设计

```
GET    /api/users          # 列表
POST   /api/users          # 创建
GET    /api/users/:id      # 详情
PUT    /api/users/:id      # 全量更新
PATCH  /api/users/:id      # 部分更新
DELETE /api/users/:id      # 删除
```

## 命名规范

- 使用名词复数：`/users` 而非 `/user`
- 使用 kebab-case：`/blog-posts`
- 嵌套表示关联：`/users/:id/posts`
- 查询参数过滤：`?status=active&page=1`

## 响应格式

```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  },
  "error": null
}
```

## 状态码

| 方法 | 成功 | 失败 |
|------|------|------|
| GET | 200 | 404 |
| POST | 201 | 400 |
| PUT | 200 | 404 |
| DELETE | 204 | 404 |

## 版本管理

通过 URL 或 Header 管理版本：

```
/api/v1/users
Accept: application/vnd.api+json;version=1
```

好的 API 设计让接口像文档一样清晰易读。
