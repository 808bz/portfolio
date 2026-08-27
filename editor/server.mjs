/* ============================================================================
 * 作品集「编辑后台」本地服务器
 *
 * 启动：在项目根目录运行  node editor/server.mjs
 * 打开：http://localhost:3002
 *
 * 零第三方依赖，只用 Node 内置模块。端口可用环境变量 PORT 覆盖。
 * ========================================================================== */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const EDITOR_DIR = __dirname
const CONTENT_FILE = path.join(ROOT, 'src', 'content.json')
const IMG_DIR = path.join(ROOT, 'public', 'content')
const PORT = Number(process.env.PORT || 3002)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
}

/* ---------- helpers ---------- */

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj)
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(body)
}

function readContent() {
  return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'))
}

function runGit(args) {
  return new Promise((resolve) => {
    execFile('git', ['-C', ROOT, ...args], { timeout: 60000 }, (err, stdout, stderr) => {
      if (err) resolve({ ok: false, msg: (stderr || err.message || '').trim().slice(0, 600) })
      else resolve({ ok: true, msg: stdout.trim().slice(0, 600) })
    })
  })
}

function safeFileName(name) {
  const base = path.basename(String(name || ''))
    .replace(/[^\w.一-龥-]/g, '')
    .toLowerCase()
  return base || 'image.png'
}

/* ---------- routes ---------- */

async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const p = url.pathname
  const method = req.method

  /* 静态：编辑器自身资源 */
  if (method === 'GET' && (p === '/' || p === '/index.html')) {
    return serveFile(res, path.join(EDITOR_DIR, 'index.html'))
  }
  if (method === 'GET' && (p === '/app.js')) {
    return serveFile(res, path.join(EDITOR_DIR, 'app.js'))
  }
  if (method === 'GET' && (p === '/style.css')) {
    return serveFile(res, path.join(EDITOR_DIR, 'style.css'))
  }
  /* 静态：public/content 图片预览 */
  if (method === 'GET' && p.startsWith('/content/')) {
    const file = path.join(IMG_DIR, path.basename(p))
    return serveFile(res, file)
  }

  /* API：读取内容 */
  if (method === 'GET' && p === '/api/content') {
    try {
      return sendJSON(res, 200, { ok: true, data: readContent() })
    } catch (e) {
      return sendJSON(res, 500, { ok: false, msg: '读取内容失败：' + e.message })
    }
  }

  /* API：保存内容 */
  if (method === 'PUT' && p === '/api/content') {
    try {
      const body = JSON.parse((await readBody(req)).toString('utf8'))
      if (!body || typeof body !== 'object' || !body.CONTENT) {
        return sendJSON(res, 400, { ok: false, msg: '数据格式不正确，请刷新后重试。' })
      }
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(body, null, 2), 'utf8')
      return sendJSON(res, 200, { ok: true, msg: '已保存到本地' })
    } catch (e) {
      return sendJSON(res, 500, { ok: false, msg: '保存失败：' + e.message })
    }
  }

  /* API：上传图片（JSON { name, data }，data 为 dataURL） */
  if (method === 'POST' && p === '/api/image') {
    try {
      const body = JSON.parse((await readBody(req)).toString('utf8'))
      const match = /^data:image\/(png|jpe?g|webp|gif);base64,(.+)$/.exec(String(body.data || ''))
      if (!match) return sendJSON(res, 400, { ok: false, msg: '图片格式不支持，请用 PNG/JPG/WebP/GIF。' })
      const ext = match[1] === 'jpeg' ? 'jpg' : match[1]
      const buf = Buffer.from(match[2], 'base64')
      if (buf.length > 12 * 1024 * 1024) {
        return sendJSON(res, 400, { ok: false, msg: '图片超过 12MB，请压缩后再传。' })
      }
      const requested = safeFileName(body.name)
      const base = requested.replace(/\.(png|jpe?g|webp|gif)$/i, '')
      const filename = `${base}-${Date.now()}.${ext}`
      fs.writeFileSync(path.join(IMG_DIR, filename), buf)
      return sendJSON(res, 200, { ok: true, filename })
    } catch (e) {
      return sendJSON(res, 500, { ok: false, msg: '上传失败：' + e.message })
    }
  }

  /* API：列出图片 */
  if (method === 'GET' && p === '/api/images') {
    try {
      const files = fs.readdirSync(IMG_DIR).filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      return sendJSON(res, 200, { ok: true, files })
    } catch (e) {
      return sendJSON(res, 500, { ok: false, msg: '读取图片列表失败：' + e.message })
    }
  }

  /* API：提交并推送上线 */
  if (method === 'POST' && p === '/api/publish') {
    const add = await runGit(['add', '-A'])
    if (!add.ok) return sendJSON(res, 500, { ok: false, msg: 'git add 失败：' + add.msg })
    const stamp = new Date().toLocaleString('zh-CN', { hour12: false })
    const commit = await runGit(['commit', '-m', `作品集内容更新 - ${stamp}`])
    if (!commit.ok) {
      if (/nothing to commit|no changes added/i.test(commit.msg)) {
        return sendJSON(res, 200, { ok: true, msg: '内容没有变化，无需发布。' })
      }
      return sendJSON(res, 500, { ok: false, msg: '提交失败：' + commit.msg })
    }
    const push = await runGit(['push', 'origin', 'HEAD'])
    if (!push.ok) {
      return sendJSON(res, 500, {
        ok: false,
        msg: '本地已提交，但推送失败：' + push.msg + '。你可以在终端手动运行：git push',
      })
    }
    return sendJSON(res, 200, { ok: true, msg: '已推送上线，约 1 分钟后网站自动更新。' })
  }

  return sendJSON(res, 404, { ok: false, msg: '未找到：' + p })
}

function serveFile(res, file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return sendJSON(res, 404, { ok: false, msg: '文件不存在' })
  }
  const ext = path.extname(file).toLowerCase()
  const buf = fs.readFileSync(file)
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': buf.length,
  })
  res.end(buf)
}

/* ---------- boot ---------- */

const server = http.createServer(handle)
server.listen(PORT, () => {
  console.log('')
  console.log('  作品集编辑后台已启动')
  console.log(`  打开浏览器访问:  http://localhost:${PORT}`)
  console.log('  关闭此窗口即可退出')
  console.log('')
})

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`端口 ${PORT} 已被占用。可能后台已开着？`)
    console.error(`如果打不开，改用其它端口：  PORT=3003 node editor/server.mjs`)
    process.exit(1)
  }
  throw e
})
