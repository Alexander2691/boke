---
title: HTTP/3 与 QUIC 协议新特性
date: 2026-07-02
tags: [tech, note]
---

HTTP/3 基于 QUIC 协议，是 HTTP 协议的一次重大升级。

## 核心改进

### 0-RTT 连接
基于 UDP 的 QUIC 协议实现了零往返时间连接建立，显著降低延迟。

### 多路复用无队头阻塞
HTTP/2 的队头阻塞问题在 HTTP/3 中彻底解决。

### 连接迁移
手机切换 Wi-Fi/4G 时连接不中断，移动端体验大幅提升。

### 内置加密
TLS 1.3 成为协议标配，无需额外配置 HTTPS。

## 当前支持

所有主流浏览器（Chrome、Firefox、Safari、Edge）已支持 HTTP/3。

## 部署建议

```nginx
# Nginx 配置 HTTP/3
server {
    listen 443 quic reuseport;
    listen 443 ssl;
    http2 on;

    add_header Alt-Svc 'h3=":443"';
}
```

HTTP/3 正在重塑互联网传输效率。
