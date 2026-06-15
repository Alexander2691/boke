---
title: CSS Grid 布局指南
date: 2026-06-10
tags: [技术, 教程]
---

CSS Grid 是迄今为止最强大的 CSS 布局系统之一。它帮助我们轻松创建复杂的二维布局。

## 基本概念

Grid 布局由容器（grid container）和项目（grid items）组成。通过 `display: grid` 创建网格容器。

## 定义列和行

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 200px auto;
  gap: 16px;
}
```

## fr 单位

`fr` 是 Grid 特有的弹性单位，代表可用空间的一份比例。上面的例子中，中间列占 2 份，两侧各占 1 份。

## 常用属性

- `grid-template-columns` — 定义列的数量和大小
- `grid-template-rows` — 定义行的数量和大小
- `gap` — 设置网格间距
- `grid-column` — 控制项目跨列
- `grid-row` — 控制项目跨行

## 实战：响应式卡片布局

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

这个布局会自动根据容器宽度调整列数，优雅地适配各种屏幕尺寸。
