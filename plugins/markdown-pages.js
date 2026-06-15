import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import { marked } from 'marked'

const tagMap = { tech: '技术', tutorial: '教程', note: '笔记', life: '生活' }

export function markdownPages() {
  return {
    name: 'markdown-pages',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url.match(/^\/posts\/(.+)\.html($|\?)/)
        if (match) {
          req.url = `/post.html?file=${match[1]}.md`
        }
        next()
      })
    },

    async closeBundle() {
      const distDir = resolve(process.cwd(), 'dist')
      const postsDir = resolve(process.cwd(), 'posts')

      if (!existsSync(distDir)) return

      const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
      const cssMatch = indexHtml.match(/href="([^"]+\.css)"/)
      const cssHref = cssMatch ? cssMatch[1].replace(/^\//, '') : 'assets/main.css'

      const template = readFileSync(resolve(process.cwd(), 'post.html'), 'utf-8')

      const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))

      const distPosts = resolve(distDir, 'posts')
      if (!existsSync(distPosts)) mkdirSync(distPosts, { recursive: true })

      for (const file of files) {
        const raw = readFileSync(resolve(postsDir, file), 'utf-8')

        let title = file.replace('.md', '')
        let date = ''
        let tags = []
        let body = raw

        const fm = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
        if (fm) {
          for (const l of fm[1].split('\n')) {
            const m = l.match(/^\s*(\w+)\s*:\s*(.+)/)
            if (m) {
              const key = m[1].trim()
              const val = m[2].trim()
              if (key === 'title') title = val.replace(/^['"]|['"]$/g, '')
              else if (key === 'date') date = val
              else if (key === 'tags') tags = val.replace(/[\[\]]/g, '').split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''))
            }
          }
          body = raw.slice(fm[0].length)
        }

        const html = marked.parse(body)
        const tagsHtml = tags.map(t => `<span class="tag ${t}">${tagMap[t] || t}</span>`).join('')

        const postContent = [
          `<h1>${title}</h1>`,
          `<div class="post-meta">`,
          `  <span class="date">&#x1F4C5; ${date}</span>`,
          `  <span class="tags">${tagsHtml}</span>`,
          `</div>`,
          `<div class="post-content">${html}</div>`
        ].join('\n        ')

        let output = template
          .replace('<title>文章 - My Blog</title>', `<title>${title} - My Blog</title>`)
          .replace('<div class="loading">&#x1F4D6; 加载中...</div>', postContent)
          .replace('<script type="module" src="/js/post.js"></script>', '')

        output = output
          .replace('href="css/style.css"', `href="../${cssHref}"`)
          .replace(/(href|src)="(?!http|\/\/|#|\/|\.\.)([^"]+)"/g, '$1="../$2"')

        const outName = file.replace('.md', '.html')
        writeFileSync(resolve(distPosts, outName), output)
        console.log(`  Generated: posts/${outName}`)
      }
    }
  }
}
