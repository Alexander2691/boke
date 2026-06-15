import './main.js'
import { marked } from 'marked'

const params = new URLSearchParams(window.location.search)
const file = params.get('file') || 'hello-world.md'
const tagMap = { tech: '技术', tutorial: '教程', note: '笔记', life: '生活' }

fetch('posts/' + file)
  .then(r => {
    if (!r.ok) throw new Error('文章不存在')
    return r.text()
  })
  .then(raw => {
    let title = file.replace('.md', '')
    let date = ''
    let tags = []
    let body = raw

    const fm = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
    if (fm) {
      const lines = fm[1].split('\n')
      lines.forEach(l => {
        const m = l.match(/^\s*(\w+)\s*:\s*(.+)/)
        if (m) {
          const key = m[1].trim()
          const val = m[2].trim()
          if (key === 'title') title = val.replace(/^['"]|['"]$/g, '')
          else if (key === 'date') date = val
          else if (key === 'tags') tags = val.replace(/[\[\]]/g, '').split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        }
      })
      body = raw.slice(fm[0].length)
    }

    document.title = title + ' - My Blog'
    const html = marked.parse(body)

    document.getElementById('post-content').innerHTML = `
      <h1>${title}</h1>
      <div class="post-meta">
        <span class="date">&#x1F4C5; ${date}</span>
        <span class="tags">${tags.map(t => `<span class="tag ${t}">${tagMap[t] || t}</span>`).join('')}</span>
      </div>
      <div class="post-content">${html}</div>
    `
  })
  .catch(err => {
    document.getElementById('post-content').innerHTML = `
      <div class="empty-state">
        <div class="emoji">&#x1F4ED;</div>
        <p>${err.message}</p>
        <p><a href="index.html" style="color:var(--primary)">&#x2190; 返回首页</a></p>
      </div>
    `
  })
