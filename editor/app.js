/* 作品集编辑后台 —— 前端逻辑 */

const state = { data: null, images: [], sec: 'basic' }
const $ = (s) => document.querySelector(s)

/* ---------- 工具 ---------- */

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}
function setPath(obj, path, value) {
  const keys = path.split('.')
  let o = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (o[keys[i]] == null) o[keys[i]] = {}
    o = o[keys[i]]
  }
  o[keys[keys.length - 1]] = value
}

async function api(path, opts = {}) {
  const res = await fetch(path, opts)
  return res.json()
}

function flash(msg, ok = true) {
  const el = $('#status')
  el.textContent = msg
  el.className = 'status ' + (ok ? 'ok' : 'err')
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.textContent = ''; el.className = 'status' }, 6000)
}

/* ---------- 表单组件 ---------- */

function fieldFix(path, label, opts = {}) {
  const val = esc(getPath(state.data, path))
  if (opts.area) {
    return `
      <div class="f">
        <label class="f__label">${label}</label>
        <textarea class="f__input" data-path="${path}" rows="${opts.rows || 4}">${val}</textarea>
      </div>`
  }
  return `
    <div class="f">
      <label class="f__label">${label}</label>
      <input class="f__input" data-path="${path}" value="${val}" />
    </div>`
}

function pair(path, label) {
  return `
    <div class="f f--pair">
      <div class="f__label">${label}</div>
      <div class="pair">
        <div class="pair__col">
          <span class="pair__tag">中文</span>
          ${input(`${path}.zh`)}
        </div>
        <div class="pair__col">
          <span class="pair__tag">English</span>
          ${input(`${path}.en`)}
        </div>
      </div>
    </div>`
}
function input(path) {
  const val = esc(getPath(state.data, path))
  return `<input class="f__input" data-path="${path}" value="${val}" />`
}

function imagePicker(path, label) {
  const cur = getPath(state.data, path) || ''
  const opts = ['<option value="">（无图）</option>']
    .concat(
      state.images.map((f) => `<option value="${esc(f)}" ${f === cur ? 'selected' : ''}>${esc(f)}</option>`)
    )
    .join('')
  return `
    <div class="f f--img">
      <div class="f__label">${label}</div>
      <div class="imgrow">
        <select class="f__input" data-path="${path}">${opts}</select>
        <button type="button" class="btn btn--ghost" data-upload="${path}">上传新图</button>
      </div>
      <div class="imgprev" data-preview="${path}"></div>
    </div>`
}

function card(title, body) {
  return `<details class="card" open><summary>${title}</summary><div class="card__body">${body}</div></details>`
}

/* ---------- 各分区渲染 ---------- */

function renderBasic() {
  const C = state.data.CONTENT
  const T = state.data.CONTACT
  const F = state.data.FOOTER
  return `
    ${card('姓名与主页', pair('CONTENT.brand', '姓名 / 名字') + pair('CONTENT.roleLine', '行业标签（副标题）') + pair('CONTENT.statement', '主页一句话自我介绍'))}
    ${card('导航与按钮', pair('CONTENT.navWork', '导航·作品') + pair('CONTENT.navAbout', '导航·关于') + pair('CONTENT.navContact', '导航·联系') + pair('CONTENT.selectedWork', '作品区块标题') + pair('CONTENT.viewCase', '查看案例按钮'))}
    ${card('联系信息', fieldFix('CONTACT.email', '邮箱') + fieldFix('CONTACT.phone', '电话') + pair('CONTACT.intent', '求职意向') + pair('CONTACT.heading', '联系区大标题'))}
    ${card('页脚', pair('FOOTER.note', '页脚备注') + pair('FOOTER.top', '回到顶部按钮'))}
  `
}

const hval = (k) => state.data.HERO_SETTINGS?.[k]
const colorField = (k, label) => `<div class="f"><label class="f__label">${label}</label><input type="color" data-path="HERO_SETTINGS.${k}" value="${hval(k) || '#2457ff'}" /></div>`
const rangeField = (k, label, min, max, step) => `<div class="f"><label class="f__label">${label} <span class="muted">${hval(k)}</span></label><input type="range" data-path="HERO_SETTINGS.${k}" min="${min}" max="${max}" step="${step}" value="${hval(k)}" /></div>`
const checkField = (k, label) => `<label class="f__check"><input type="checkbox" data-path="HERO_SETTINGS.${k}" ${hval(k) ? 'checked' : ''} /> ${label}</label>`
const selectField = (k, label, a, b) => `<div class="f"><label class="f__label">${label}</label><select data-path="HERO_SETTINGS.${k}"><option value="${a}" ${hval(k) === a ? 'selected' : ''}>${a}</option><option value="${b}" ${hval(k) === b ? 'selected' : ''}>${b}</option></select></div>`

function renderHero() {
  return `
    ${card('主标题', rangeField('nameSize', '字号大小', 60, 200, 2) + colorField('nameColor', '文字颜色') + rangeField('nameSkew', '倾斜角度（0=不斜）', -15, 15, 1) + checkField('nameShadow', '显示阴影') + rangeField('shadowSize', '阴影大小', 0, 30, 1) + colorField('shadowColor', '阴影颜色'))}
    ${card('眉标', checkField('eyebrowShow', '显示眉标') + colorField('eyebrowColor', '眉标颜色'))}
    ${card('定位句', colorField('statementColor', '文字颜色') + rangeField('statementSize', '字号', 12, 26, 1))}
    ${card('斜线', checkField('lineShow', '显示斜线') + colorField('lineColor', '斜线颜色'))}
    ${card('光斑', checkField('glowShow', '显示光斑') + rangeField('glowOpacity', '光斑强度', 0, 0.4, 0.01))}
    ${card('背景与对齐', rangeField('bgTone', '背景蓝调强度', 0, 100, 1) + selectField('align', '对齐', 'left', 'center'))}
  `
}

function renderProjects() {
  const CASE_MAP = {
    'cb-biliagent': { prefix: 'CB_CASE', name: 'CB-BiliAgent' },
    'bili-sentiment': { prefix: 'SENTIMENT_CASE', name: 'B站评论舆情分析工具' },
  }
  return state.data.PROJECTS.map((p, i) => {
    const cm = CASE_MAP[p.slug]
    const caseUI = cm
      ? `<details class="card card--case"><summary>案例详情页（叙事：背景 → 实现 → 效果 → 价值）</summary><div class="card__body">${renderCaseUI(state.data[cm.prefix], cm.prefix, cm.name)}</div></details>`
      : ''
    return card(`项目 ${p.no} — ${p.title?.zh || ''}`, `
      <div class="grid2">
        ${fieldFix(`PROJECTS.${i}.no`, '编号')}
        ${imagePicker(`PROJECTS.${i}.image`, '封面大图')}
      </div>
      ${pair(`PROJECTS.${i}.title`, '项目标题')}
      ${pair(`PROJECTS.${i}.category`, '分类标签')}
      ${fieldFix(`PROJECTS.${i}.brief.zh`, '简介（中文）', { area: true })}
      ${fieldFix(`PROJECTS.${i}.brief.en`, '简介（English）', { area: true })}
      ${cm ? caseUI : `
        ${pair(`PROJECTS.${i}.roleShort`, '角色简写')}
        ${fieldFix(`PROJECTS.${i}.roleFull.zh`, '角色说明（中文）', { area: true })}
        ${fieldFix(`PROJECTS.${i}.roleFull.en`, '角色说明（English）', { area: true })}
        <div class="grid3">
          ${fieldFix(`PROJECTS.${i}.outcome.value`, '成果数字')}
        </div>
        ${pair(`PROJECTS.${i}.outcome.caption`, '成果说明')}
        ${p.points.map((_, k) => pair(`PROJECTS.${i}.points.${k}`, `要点 ${k + 1}`)).join('')}
        ${imagePicker(`PROJECTS.${i}.image2`, '案例页第二张图')}
      `}
    `)
  }).join('')
}

function renderExperience() {
  return state.data.EXPERIENCE.map((e, i) =>
    card(`经历 ${e.no} — ${e.org?.zh || ''}`, `
      ${fieldFix(`EXPERIENCE.${i}.no`, '编号')}
      ${pair(`EXPERIENCE.${i}.org`, '公司/机构')}
      ${pair(`EXPERIENCE.${i}.role`, '职位')}
      ${pair(`EXPERIENCE.${i}.period`, '时间段')}
      ${e.highlights.map((_, k) => pair(`EXPERIENCE.${i}.highlights.${k}`, `亮点 ${k + 1}`)).join('')}
    `)
  ).join('')
}

function renderAbout() {
  const A = state.data.ABOUT
  return `
    ${card('关于', pair('ABOUT.heading', '大标题') + fieldFix('ABOUT.body.zh', '介绍（中文）', { area: true }) + fieldFix('ABOUT.body.en', '介绍（English）', { area: true }) + pair('ABOUT.education', '教育背景') + pair('ABOUT.period', '年限') + pair('ABOUT.games', '长期耕耘'))}
    ${card('技能标签', A.skills.map((_, k) => pair(`ABOUT.skills.${k}`, `技能 ${k + 1}`)).join(''))}
  `
}

function renderContact() {
  const T = state.data.CONTACT
  return `
    ${card('联系', pair('CONTACT.heading', '大标题') + fieldFix('CONTACT.email', '邮箱') + fieldFix('CONTACT.phone', '电话') + pair('CONTACT.intent', '求职意向'))}
  `
}

/* ---------- 案例分区（CB-BiliAgent / B站舆情） ---------- */

const CASE_LABELS = {
  kicker: '眉题', title: '标题', sub: '副标题', intro: '简介', role: '角色',
  context: '背景', body: '正文', flow: '流程', tags: '标签', imageCaption: '图片说明',
  wrong: '识别错', right: '正确', note: '注释', insight: '要点', takeaway: '总结',
  prompt: '提示词', before: 'Before', after: 'After', t: '标题', d: '说明',
  p: '问题', s: '解决', loop: '迭代方式', summary: '总结语', gain: '收获',
  stats: '成果数据', v: '数值', label: '说明', pains: '痛点', features: '特性',
  final: '结尾总结', tech: '技术栈', image2: '第二张图', example: '案例', strategies: '策略',
  n: '编号', scenes: '场景',
}

function renderCaseUI(c, prefix, name) {
  const sec = (title, obj, path) =>
    `<details class="card" open><summary>${title}</summary><div class="card__body">${cbWalk(obj, path, CASE_LABELS)}</div></details>`
  let html = sec('顶部 Hero', c.hero, prefix + '.hero')
  ;(c.stages || []).forEach((st, i) => {
    html += sec('阶段 ' + (st.no || i + 1) + ' — ' + (st.title?.zh || ''), st, `${prefix}.stages.${i}`)
  })
  if (c.final) html += sec('结尾总结', c.final, prefix + '.final')
  if (c.tech) html += sec('技术栈', c.tech, prefix + '.tech')
  return html
}

function cbWalk(obj, path, labels) {
  const seg = path.split('.').pop()
  const label = labels[seg] || seg
  if (obj && typeof obj.zh === 'string') {
    const en = typeof obj.en === 'string' ? obj.en : ''
    return `<div class="f"><div class="f__label">${label}</div><div class="pair">
      <div class="pair__col"><span class="pair__tag">中文</span><input class="f__input" data-path="${path}.zh" value="${esc(obj.zh)}" /></div>
      <div class="pair__col"><span class="pair__tag">English</span><input class="f__input" data-path="${path}.en" value="${esc(en)}" /></div>
    </div></div>`
  }
  if (obj && typeof obj.en === 'string') {
    return `<div class="f"><label class="f__label">${label}（English）</label><input class="f__input" data-path="${path}.en" value="${esc(obj.en)}" /></div>`
  }
  if (seg === 'image' && typeof obj === 'string') {
    return imagePicker(path, '图片')
  }
  if (typeof obj === 'string') {
    return `<div class="f"><label class="f__label">${label}</label><input class="f__input" data-path="${path}" value="${esc(obj)}" /></div>`
  }
  if (Array.isArray(obj)) {
    return obj.map((item, i) => cbWalk(item, `${path}.${i}`, labels)).join('')
  }
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).map(([k, v]) => cbWalk(v, `${path}.${k}`, labels)).join('')
  }
  return ''
}

/* ---------- 图片管理 ---------- */

function renderImages() {
  const rows = state.images.map((f) => `
    <div class="imgcard">
      <img src="/content/${esc(f)}" alt="${esc(f)}" loading="lazy" />
      <code>${esc(f)}</code>
    </div>`).join('')
  return `
    <div class="block">
      <p class="block__hint">图片都存在 <code>public/content</code> 文件夹。引用它们的项目会自动显示对应图片。上传后即可在项目 / 案例的「封面大图」下拉里选到。</p>
      <label class="drop" for="bulkUpload">
        点击选择图片（可多选）上传
        <input type="file" id="bulkUpload" accept="image/*" multiple hidden />
      </label>
      <div class="imggrid">${rows}</div>
    </div>`
}

/* ---------- 渲染调度 ---------- */

const VIEWS = {
  basic: renderBasic,
  hero: renderHero,
  projects: renderProjects,
  experience: renderExperience,
  about: renderAbout,
  contact: renderContact,
  images: renderImages,
}
const TITLES = {
  basic: '基本信息',
  hero: 'Hero 设置',
  projects: '项目（作品）',
  experience: '经历',
  about: '关于',
  contact: '联系',
  images: '图片管理',
}

function renderView() {
  $('#viewTitle').textContent = TITLES[state.sec]
  $('#content').innerHTML = VIEWS[state.sec]()
  bindInputs()
  bindUploads()
  bindPreviews()
}

function bindInputs() {
  document.querySelectorAll('[data-path]').forEach((el) => {
    const set = () => {
      let v = el.value
      if (el.type === 'checkbox') v = el.checked
      else if (el.type === 'range') v = parseFloat(el.value)
      setPath(state.data, el.dataset.path, v)
      const prev = el.closest('.imgrow')?.querySelector('.imgprev')
      if (prev) prev.remove()
    }
    el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', set)
  })
}

function bindUploads() {
  document.querySelectorAll('[data-upload]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const path = btn.dataset.upload
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return
        flash('正在上传…')
        const reader = new FileReader()
        reader.onload = async () => {
          const r = await api('/api/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: file.name, data: reader.result }),
          })
          if (r.ok) {
            state.images.push(r.filename)
            setPath(state.data, path, r.filename)
            flash('图片已上传：' + r.filename)
            renderView()
          } else {
            flash(r.msg || '上传失败', false)
          }
        }
        reader.readAsDataURL(file)
      }
      input.click()
    })
  })
}

function bindPreviews() {
  document.querySelectorAll('[data-preview]').forEach((el) => {
    const path = el.dataset.preview
    const val = getPath(state.data, path)
    if (val) el.innerHTML = `<img src="/content/${esc(val)}" alt="" />`
  })
}

/* ---------- 保存 / 发布 ---------- */

async function save() {
  const r = await api('/api/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.data),
  })
  if (r.ok) flash('已保存到本地 ✓')
  else flash(r.msg || '保存失败', false)
}

async function publish() {
  $('#btnPublish').disabled = true
  $('#btnPublish').textContent = '发布中…'
  try {
    const r = await api('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.data),
    })
    if (!r.ok) { flash(r.msg || '保存失败', false); return }
    const p = await api('/api/publish', { method: 'POST' })
    flash(p.msg || '已发布', p.ok)
  } finally {
    $('#btnPublish').disabled = false
    $('#btnPublish').textContent = '🚀 保存并上线'
  }
}

/* ---------- 启动 ---------- */

async function init() {
  const [c, imgs] = await Promise.all([api('/api/content'), api('/api/images')])
  if (!c.ok) { flash(c.msg || '加载失败', false); return }
  state.data = c.data
  state.images = imgs.files || []
  renderView()

  $('#nav').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-sec]')
    if (!btn) return
    state.sec = btn.dataset.sec
    document.querySelectorAll('#nav button').forEach((b) => b.classList.toggle('is-active', b === btn))
    renderView()
    window.scrollTo(0, 0)
  })

  $('#btnSave').addEventListener('click', save)
  $('#btnPublish').addEventListener('click', publish)

  const bulk = $('#bulkUpload')
  if (bulk) bulk.addEventListener('change', async (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader()
      await new Promise((res) => { reader.onload = res; reader.readAsDataURL(file) })
      const r = await api('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, data: reader.result }),
      })
      if (r.ok) state.images.push(r.filename)
    }
    flash('上传完成')
    renderView()
  })
}

init()
