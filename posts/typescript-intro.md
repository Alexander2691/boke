---
title: TypeScript 入门笔记
date: 2026-06-04
tags: [技术, 笔记]
---

TypeScript 是 JavaScript 的超集，为前端开发带来了类型安全和更好的开发体验。

## 基础类型

```typescript
let name: string = "TypeScript"
let age: number = 5
let isAwesome: boolean = true
let list: number[] = [1, 2, 3]
let tuple: [string, number] = ["hello", 42]
```

## 接口

接口是 TypeScript 中定义对象形状的核心方式：

```typescript
interface User {
  id: number
  name: string
  email: string
  age?: number
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
}
```

## 泛型

```typescript
function identity<T>(arg: T): T {
  return arg
}

const result = identity<string>("hello")
```

## 类型别名与联合类型

```typescript
type Status = "idle" | "loading" | "success" | "error"

type ApiResponse<T> = {
  data: T
  status: Status
  message?: string
}
```

> TypeScript 不仅能捕获运行时错误，还能作为优秀的代码文档。
