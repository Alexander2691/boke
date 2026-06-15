import { defineConfig } from 'vite'
import { resolve } from 'path'
import { markdownPages } from './plugins/markdown-pages.js'

export default defineConfig({
  plugins: [markdownPages()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        post: resolve(__dirname, 'post.html'),
        about: resolve(__dirname, 'about.html'),
        archive: resolve(__dirname, 'archive.html'),
        contact: resolve(__dirname, 'contact.html'),
        projects: resolve(__dirname, 'projects.html'),
      },
    },
  },
})
