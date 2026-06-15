---
title: Python 实用技巧 10 则
date: 2026-06-06
tags: [技术, 教程]
---

在日常 Python 开发中，有一些小技巧能显著提高代码质量和开发效率。以下是 10 个我非常喜欢的技巧。

## 1. 列表推导式

```python
squares = [i * i for i in range(10)]
```

## 2. 使用 enumerate 获取索引

```python
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
```

## 3. 字典的 get 方法

```python
count = data.get("key", 0)
```

## 4. 使用 zip 并行迭代

```python
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

## 5. 上下文管理器

```python
with open("file.txt", "r") as f:
    content = f.read()
```

## 6. f-string 格式化

```python
print(f"Pi is {3.14159:.2f}")
```

## 7. collections.Counter

```python
from collections import Counter
count = Counter(["a", "b", "a", "c"])
```

## 8. 解包操作符

```python
first, *rest = [1, 2, 3, 4]
```

## 9. dataclass 装饰器

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
```

## 10. 类型提示

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

> 掌握这些小技巧，能让你的 Python 代码更简洁、更 Pythonic。
