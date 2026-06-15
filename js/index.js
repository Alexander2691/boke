import './main.js'

const posts = [
  { title: '开始写博客', date: '2026-06-14', tags: ['life'], excerpt: '这是我个人博客的第一篇文章。我决定开始记录自己的学习和思考，分享技术心得与生活感悟。', file: 'hello-world.md' },
  { title: 'JavaScript 异步编程入门', date: '2026-06-12', tags: ['tech', 'tutorial'], excerpt: '异步编程是 JavaScript 中最重要的概念之一。本文将介绍 Promise、async/await 等基础知识。', file: 'js-async.md' },
  { title: 'CSS Grid 布局指南', date: '2026-06-10', tags: ['tech', 'tutorial'], excerpt: 'CSS Grid 是一种强大的二维布局系统。本文通过实例讲解如何使用 Grid 构建现代网页布局。', file: 'css-grid.md' },
  { title: 'Git 工作流最佳实践', date: '2026-06-08', tags: ['tech', 'note'], excerpt: '团队协作中，规范的 Git 工作流至关重要。本文介绍几种主流工作流及其适用场景。', file: 'git-workflow.md' },
  { title: 'Python 实用技巧 10 则', date: '2026-06-06', tags: ['tech', 'tutorial'], excerpt: '日常开发中非常实用的 Python 小技巧，涵盖列表推导、装饰器、上下文管理器等。', file: 'python-tips.md' },
  { title: 'TypeScript 入门笔记', date: '2026-06-04', tags: ['tech', 'note'], excerpt: 'TypeScript 是 JavaScript 的超集，为前端开发带来了类型安全。本文记录基础概念与实战经验。', file: 'typescript-intro.md' },
  { title: 'HTTP/3 与 QUIC 协议新特性', date: '2026-07-02', tags: ['tech', 'note'], excerpt: 'HTTP/3 基于 QUIC 协议，实现了 0-RTT 连接、多路复用无队头阻塞等重大改进。', file: 'http3-quic.md' },
  { title: 'RESTful API 设计最佳实践', date: '2026-06-30', tags: ['tech', 'tutorial'], excerpt: '设计良好的 API 是前后端协作的基础。本文介绍 URL 设计、命名规范、状态码等实践。', file: 'api-design.md' },
  { title: 'Linux 常用命令速查', date: '2026-06-28', tags: ['tech', 'tutorial'], excerpt: '日常开发高频使用的 Linux 命令速查，涵盖文件操作、文本处理、进程管理、网络等。', file: 'linux-commands.md' },
  { title: '我的技术书单', date: '2026-06-26', tags: ['life', 'note'], excerpt: '分享我读过并强烈推荐的技术书籍，涵盖计算机系统、分布式、前端等领域经典。', file: 'book-list.md' },
  { title: '2026 年前端技术趋势', date: '2026-06-24', tags: ['tech', 'note'], excerpt: '回顾 2026 上半年前端领域值得关注的方向：AI 融合、RSC、Bun、TypeScript 6.0 等。', file: 'frontend-trends.md' },
  { title: '2026 年高效 VS Code 插件推荐', date: '2026-06-22', tags: ['tech', 'note'], excerpt: '分享日常开发中离不开的 VS Code 插件，从 Copilot 到 GitLens 提升开发效率。', file: 'vscode-plugins.md' },
  { title: 'React Hooks 完全解析', date: '2026-06-20', tags: ['tech', 'tutorial'], excerpt: 'React Hooks 彻底改变了组件编写方式。本文详解 useState、useEffect、自定义 Hook。', file: 'react-hooks.md' },
  { title: 'Docker 入门指南', date: '2026-06-18', tags: ['tech', 'tutorial'], excerpt: 'Docker 容器化平台的核心概念与常用命令，助你快速上手容器化开发。', file: 'docker-intro.md' }
]

const tagMap = { tech: '技术', tutorial: '教程', note: '笔记', life: '生活' }

function renderPosts(list) {
  const el = document.getElementById('post-list')
  el.innerHTML = ''
  list.forEach(post => {
    const li = document.createElement('li')
    li.className = 'post-card'
    li.dataset.tags = post.tags.join(',')
    li.innerHTML = `
      <h2><a href="posts/${post.file.replace('.md', '.html')}">${post.title}</a></h2>
      <div class="post-meta">
        <span class="date">&#x1F4C5; ${post.date}</span>
        <span class="tags">${post.tags.map(t => `<span class="tag ${t}">${tagMap[t] || t}</span>`).join('')}</span>
      </div>
      <p class="post-excerpt">${post.excerpt}</p>
    `
    el.appendChild(li)
  })
  document.querySelectorAll('.post-card').forEach(card => {
    setTimeout(() => card.classList.add('visible'), 50)
  })
}

renderPosts(posts)

/* Tags Filter */
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    const filter = btn.dataset.filter
    const filtered = filter === 'all' ? posts : posts.filter(p => p.tags.includes(filter))
    applySearch(filtered)
  })
})

/* Search */
const searchInput = document.getElementById('search-input')
const searchCount = document.getElementById('search-count')

function applySearch(filtered) {
  const q = searchInput.value.trim().toLowerCase()
  const result = q ? filtered.filter(p =>
    p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
  ) : filtered
  renderPosts(result)
  if (q) {
    searchCount.textContent = result.length > 0
      ? `找到 ${result.length} 篇包含 "${q}" 的文章`
      : `没有找到包含 "${q}" 的文章`
    searchCount.className = 'visible'
  } else {
    searchCount.className = ''
  }
}

searchInput.addEventListener('input', () => {
  const activeBtn = document.querySelector('.tag-btn.active')
  const filter = activeBtn ? activeBtn.dataset.filter : 'all'
  const filtered = filter === 'all' ? posts : posts.filter(p => p.tags.includes(filter))
  applySearch(filtered)
})
