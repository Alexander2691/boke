---
title: React Hooks 完全解析
date: 2026-06-20
tags: [tech, tutorial]
---

React Hooks 自 16.8 发布以来，彻底改变了 React 组件的编写方式。

## useState

```jsx
const [count, setCount] = useState(0)
const [user, setUser] = useState({ name: '', age: 0 })
```

## useEffect

处理副作用：数据请求、订阅、DOM 操作。

```jsx
useEffect(() => {
  fetch('/api/data').then(res => res.json()).then(setData)
  return () => console.log('cleanup')
}, [])
```

## useRef

保存可变值，不会触发重渲染。

```jsx
const inputRef = useRef(null)
const intervalRef = useRef(null)
```

## 自定义 Hook

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}
```

Hooks 让逻辑复用变得前所未有的简单。
