---
title: JavaScript 异步编程入门
date: 2026-06-12
tags: [技术, 教程]
---

JavaScript 是单线程语言，但通过事件循环机制，它能高效地处理异步操作。本文介绍三种主流的异步编程方式。

## 回调函数

回调是最早的异步处理方式，将函数作为参数传递给异步操作：

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("数据加载完成")
  }, 1000)
}

fetchData((message) => {
  console.log(message)
})
```

## Promise

Promise 解决了回调地狱的问题，提供了更优雅的链式调用：

```javascript
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("数据加载完成"), 1000)
  })
}

fetchData().then(msg => console.log(msg))
```

## async/await

async/await 是 ES2017 引入的语法糖，让异步代码看起来像同步代码：

```javascript
async function loadData() {
  const msg = await fetchData()
  console.log(msg)
}
```

三种方式各有适用场景：简单回调适合一次性操作，Promise 适合复杂链式调用，async/await 则让异步代码更易读。
