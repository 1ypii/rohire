const base = 'https://devforum.roblox.com'
const catPaths = { 82: 'c/collaboration/recruitment/82', 83: 'c/collaboration/portfolios/83' }
const keepDays = 30
const bodyBudget = 8
const ua = 'Mozilla/5.0 (compatible; rohire/1.0)'

const sellTags = new Set(['selling', 'sale', 'for-sale', 'buying', 'investors', 'investor', 'investment', 'trading', 'giveaway'])
const sellText = /\b(for sale|selling (my|our|this|a|an|the)\b|sell(ing)? (my|our|this) (game|group|studio|account|place)|open to offers|looking to buy|buying (games?|groups?|accounts?|limiteds?|places?|assets?)|game for sale|seeking investors?|looking for (an )?investors?|investors? (wanted|needed))/i
const sellTitle = /\b(selling|buying|for sale|investors?|investment|giveaway|trading)\b/i
const closedTitle = /^\W*(closed+|filled|hired|done|finished|taken|cancell?ed)\b|[[(](closed|filled|hired|done|finished|taken|cancell?ed|no longer hiring)[\])]/i
const forHireTitle = /\b(for hire|portfolio|commissions? open|open for (work|commissions?)|available for (work|hire|commissions?)|looking for (work|jobs?|commissions?))\b/i
const hiringTitle = /\b(hiring|recruiting)\b/i

const roleRules = [
  ['scripter', /script|programm|coder|\bdev(eloper)?s?\b|luau|\blua\b|full.?stack/i],
  ['builder', /build|\bmaps?\b|map.?design|environment|level.?design/i],
  ['modeler', /model|blender|\b3d\b|sculpt|\brig/i],
  ['ui', /\bu[ix]\b|\bgui\b|interface/i],
  ['animator', /animat/i],
  ['vfx', /vfx|\beffects?\b|particle/i],
  ['artist', /artist|\bart\b|thumbnail|\bicons?\b|\b2d\b|concept|illustrat|graphic|gfx|drawing/i],
  ['audio', /sound|music|sfx|compos|voice|audio/i],
  ['clothing', /clothing|\bugc\b|shirts?\b|outfit/i]
]

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', times: '×', copy: '©', trade: '™', reg: '®' }

function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] !== '#') return entities[e.toLowerCase()] ?? m
    const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
    return code > 0 && code < 0x110000 ? String.fromCodePoint(code) : ''
  })
}

function safeUrl(raw, images) {
  if (!raw) return null
  let url
  try {
    url = new URL(raw.startsWith('//') ? 'https:' + raw : raw, base)
  } catch {
    return null
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
  if (images) {
    const host = url.hostname
    if (host !== 'devforum.roblox.com' && !host.endsWith('.amazonaws.com') && !host.endsWith('.rbxcdn.com')) return null
    url.protocol = 'https:'
  }
  return url.href
}

const blockKinds = { p: 'p', h1: 'h', h2: 'h', h3: 'h', h4: 'h', h5: 'h', h6: 'h', li: 'li', blockquote: 'q', pre: 'pre', div: 'p', ul: 'p', ol: 'p', table: 'p', tr: 'p', details: 'p', summary: 'p' }
const skipTags = new Set(['aside', 'svg', 'script', 'style', 'iframe', 'video', 'audio', 'noscript', 'button', 'form'])
const voidTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'source', 'wbr', 'link', 'area', 'col', 'embed', 'track'])

function attrs(s) {
  const out = {}
  for (const m of s.matchAll(/([a-z][a-z0-9:-]*)\s*=\s*("([^"]*)"|'([^']*)')/gi)) out[m[1].toLowerCase()] = decode(m[3] ?? m[4] ?? '')
  return out
}

function parseCooked(html) {
  const blocks = []
  const stack = []
  let runs = []
  let size = 0

  const kind = () => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const k = blockKinds[stack[i].tag]
      if (k && k !== 'p') return k
    }
    return 'p'
  }
  const skipping = () => stack.some(e => e.skip)
  const flush = () => {
    const pre = kind() === 'pre'
    if (!pre) {
      while (runs.length && !runs[0].x.trim()) runs.shift()
      while (runs.length && !runs[runs.length - 1].x.trim()) runs.pop()
      if (runs.length) {
        runs[0].x = runs[0].x.replace(/^\s+/, '')
        runs[runs.length - 1].x = runs[runs.length - 1].x.replace(/\s+$/, '')
      }
    }
    if (runs.some(r => r.x.trim())) blocks.push({ t: kind(), r: runs })
    runs = []
  }
  const push = (text, raw) => {
    if (skipping() || size > 20000) return
    if (!raw && kind() !== 'pre') text = text.replace(/\s+/g, ' ')
    if (!text) return
    const bold = stack.some(e => e.tag === 'strong' || e.tag === 'b')
    const link = [...stack].reverse().find(e => e.href)?.href
    const last = runs[runs.length - 1]
    if (last && !!last.b === bold && last.h === link) {
      if (text === ' ' && last.x.endsWith(' ')) return
      last.x += text
    } else {
      const run = { x: text }
      if (bold) run.b = 1
      if (link) run.h = link
      runs.push(run)
    }
    size += text.length
  }

  for (const m of html.matchAll(/<(\/?)([a-z][a-z0-9]*)([^>]*)>|([^<]+)/gi)) {
    if (m[4] !== undefined) {
      push(decode(m[4]))
      continue
    }
    const closing = m[1] === '/'
    const tag = m[2].toLowerCase()

    if (closing) {
      const at = stack.map(e => e.tag).lastIndexOf(tag)
      if (at === -1) continue
      if (blockKinds[tag] && !skipping()) flush()
      stack.length = at
      continue
    }

    const a = attrs(m[3])
    if (tag === 'br') {
      push('\n', true)
      continue
    }
    if (tag === 'img') {
      if (skipping() || (a.class || '').includes('emoji') || (a.class || '').includes('avatar')) continue
      const src = safeUrl(a.src, true)
      if (!src || blocks.length > 300) continue
      flush()
      blocks.push({ t: 'img', src })
      continue
    }
    if (voidTags.has(tag)) continue

    const cls = a.class || ''
    const entry = { tag }
    if (skipTags.has(tag) || (tag === 'div' && /\bmeta\b/.test(cls)) || cls.includes('onebox')) entry.skip = true
    if (tag === 'a' && !cls.includes('anchor') && !cls.includes('lightbox')) entry.href = safeUrl(a.href, false)
    if (blockKinds[tag] && !skipping()) flush()
    if (!m[3].trim().endsWith('/')) stack.push(entry)
  }
  flush()
  return blocks.slice(0, 300)
}

function amount(n, unit) {
  let v = parseFloat(n.replace(/,/g, ''))
  if (!isFinite(v)) return 0
  if (unit) v *= unit.toLowerCase() === 'm' ? 1e6 : 1e3
  return v
}

function parsePay(text) {
  const pay = {}
  const take = (key, v, max) => {
    if (v > 0 && v <= max && v > (pay[key] || 0)) pay[key] = Math.round(v)
  }
  for (const m of text.matchAll(/(?:r\$|rbx|robux)\s?:?\s?(\d[\d,]*(?:\.\d+)?)\s*([km])?\b/gi)) take('r', amount(m[1], m[2]), 5e6)
  for (const m of text.matchAll(/(\d[\d,]*(?:\.\d+)?)\s*([km])?\s*(?:robux|rbx|r\$)/gi)) take('r', amount(m[1], m[2]), 5e6)
  for (const m of text.matchAll(/(?<![a-z])\$\s?(\d[\d,]*(?:\.\d+)?)\s*([km])?\b/gi)) take('u', amount(m[1], m[2]), 5e4)
  for (const m of text.matchAll(/(\d[\d,]*(?:\.\d+)?)\s*([km])?\s*(?:usd|dollars)\b/gi)) take('u', amount(m[1], m[2]), 5e4)
  if (/revenue|profit|percent|split|\bshare\b|\bcut\b|%\s*of/i.test(text)) {
    for (const m of text.matchAll(/(\d{1,2}(?:\.\d+)?)\s*%/g)) take('p', parseFloat(m[1]), 99)
  }
  if (/\b(volunteer(s|ing)?|unpaid|no pay(ment)?|not paid|for free|free of charge)\b/i.test(text)) pay.v = 1
  return pay
}

function classify(row) {
  const { cat, title, tags, closed, plain } = row
  let tab = cat === 82 ? 'hiring' : 'forhire'
  if (cat === 82 && forHireTitle.test(title) && !hiringTitle.test(title)) tab = 'forhire'
  if (cat === 83 && hiringTitle.test(title) && !forHireTitle.test(title)) tab = 'hiring'

  let hidden = null
  if (closed || closedTitle.test(title)) hidden = 'closed'
  else if (tags.some(t => sellTags.has(t)) || sellTitle.test(title) || sellText.test(plain)) hidden = 'selling'
  else if (plain.replace(/\s+/g, ' ').length < 80) hidden = 'short'

  const roleText = title + ' ' + tags.join(' ')
  const roles = roleRules.filter(([, re]) => re.test(roleText)).map(([name]) => name)

  return {
    tab,
    hidden,
    roles: JSON.stringify(roles),
    pay: JSON.stringify(parsePay(tab === 'forhire' ? title : title + '\n' + plain))
  }
}

async function getJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': ua, accept: 'application/json' } })
  if (res.status === 404 || res.status === 403) return null
  if (!res.ok) throw new Error('devforum ' + res.status)
  return res.json()
}

function tagNames(list) {
  return (list || []).map(t => (typeof t === 'string' ? t : t?.name)).filter(Boolean).map(t => String(t).toLowerCase())
}

async function upsertTopics(env, cat, topics, cutoff) {
  const fresh = topics.filter(t => Number.isInteger(t.id) && Date.parse(t.created_at) > cutoff)
  if (!fresh.length) return false

  const ids = fresh.map(t => t.id)
  const { results } = await env.DB.prepare(`SELECT id, cat, title, tags, closed, views, replies, bumped, plain FROM posts WHERE id IN (${ids.map(() => '?').join(',')})`).bind(...ids).all()
  const have = new Map(results.map(r => [r.id, r]))

  const stmts = []
  for (const t of fresh) {
    const title = String(t.title || '').slice(0, 300)
    const slug = String(t.slug || 'topic').slice(0, 200)
    const tags = tagNames(t.tags)
    const tagsJson = JSON.stringify(tags)
    const closed = t.closed || t.archived ? 1 : 0
    const bumped = Date.parse(t.bumped_at) || 0
    const views = t.views || 0
    const replies = Math.max(0, (t.posts_count || 1) - 1)
    const row = have.get(t.id)

    if (!row) {
      stmts.push(env.DB.prepare('INSERT INTO posts (id, cat, title, slug, tags, closed, created, bumped, views, replies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(t.id, cat, title, slug, tagsJson, closed, Date.parse(t.created_at), bumped, views, replies))
      continue
    }

    if (row.title !== title || row.tags !== tagsJson || row.closed !== closed || row.cat !== cat) {
      const c = row.plain == null ? { tab: null, hidden: null, roles: null, pay: null } : classify({ cat, title, tags, closed, plain: row.plain })
      stmts.push(env.DB.prepare('UPDATE posts SET cat = ?, title = ?, slug = ?, tags = ?, closed = ?, bumped = ?, views = ?, replies = ?, tab = ?, hidden = ?, roles = ?, pay = ? WHERE id = ?')
        .bind(cat, title, slug, tagsJson, closed, bumped, views, replies, c.tab, c.hidden, c.roles, c.pay, t.id))
    } else if (row.replies !== replies || row.bumped !== bumped) {
      stmts.push(env.DB.prepare('UPDATE posts SET views = ?, replies = ?, bumped = ? WHERE id = ?').bind(views, replies, bumped, t.id))
    }
  }

  if (stmts.length) await env.DB.batch(stmts)
  return stmts.length > 0
}

async function fetchBodies(env) {
  const { results } = await env.DB.prepare('SELECT id, cat, title, tags, closed FROM posts WHERE plain IS NULL AND gone = 0 ORDER BY created DESC LIMIT ?').bind(bodyBudget).all()
  const stmts = []

  for (const row of results) {
    let data
    try {
      data = await getJson(`${base}/t/${row.id}.json`)
    } catch {
      break
    }
    const op = data?.post_stream?.posts?.find(p => p.post_number === 1)
    if (!op) {
      stmts.push(env.DB.prepare('UPDATE posts SET gone = 1 WHERE id = ?').bind(row.id))
      continue
    }

    const blocks = parseCooked(String(op.cooked || ''))
    const plain = blocks.filter(b => b.t !== 'img').map(b => b.r.map(r => r.x).join('')).join('\n').slice(0, 6000)
    const avatar = op.avatar_template ? safeUrl(String(op.avatar_template).replace('{size}', '90'), true) : null
    const c = classify({ cat: row.cat, title: row.title, tags: JSON.parse(row.tags), closed: row.closed, plain })

    stmts.push(env.DB.prepare('UPDATE posts SET author = ?, avatar = ?, plain = ?, blocks = ?, tab = ?, hidden = ?, roles = ?, pay = ? WHERE id = ?')
      .bind(String(op.username || '').slice(0, 40), avatar, plain, JSON.stringify(blocks), c.tab, c.hidden, c.roles, c.pay, row.id))
  }

  if (stmts.length) await env.DB.batch(stmts)
  return stmts.length > 0
}

async function sync(env) {
  const now = Date.now()
  const cutoff = now - keepDays * 864e5
  const { results: metaRows } = await env.DB.prepare("SELECT k, v FROM meta WHERE k IN ('bf82', 'bf83')").all()
  const meta = Object.fromEntries(metaRows.map(r => [r.k, r.v]))
  const metaWrites = []
  let changed = false

  for (const cat of [82, 83]) {
    const backfill = Number(meta['bf' + cat] ?? 2)
    const pages = backfill >= 2 ? [0, 1, backfill] : [0, 1]

    for (const page of pages) {
      let data
      try {
        data = await getJson(`${base}/${catPaths[cat]}/l/latest.json?page=${page}`)
      } catch {
        break
      }
      const topics = (data?.topic_list?.topics || []).filter(t => !t.pinned && !t.pinned_globally && t.visible !== false)
      if (page === backfill) {
        const more = !!data?.topic_list?.more_topics_url && topics.some(t => Date.parse(t.bumped_at) > cutoff)
        metaWrites.push(env.DB.prepare('INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v').bind('bf' + cat, String(more ? page + 1 : -1)))
      }
      if (await upsertTopics(env, cat, topics, cutoff)) changed = true
    }
  }

  if (await fetchBodies(env)) changed = true

  const purge = await env.DB.prepare('DELETE FROM posts WHERE created < ?').bind(cutoff).run()
  if (purge.meta?.changes) changed = true

  if (changed) {
    const { results } = await env.DB.prepare(`SELECT id, slug, title, tags, created, bumped, views, replies, author, avatar, substr(plain, 1, 260) AS ex, tab, roles, pay
      FROM posts WHERE plain IS NOT NULL AND hidden IS NULL AND gone = 0 AND created > ? ORDER BY created DESC`).bind(cutoff).all()
    const snaps = { hiring: [], forhire: [] }
    for (const r of results) {
      snaps[r.tab]?.push({
        id: r.id,
        slug: r.slug,
        title: r.title,
        tags: JSON.parse(r.tags),
        created: r.created,
        bumped: r.bumped,
        views: r.views,
        replies: r.replies,
        author: r.author,
        avatar: r.avatar,
        ex: r.ex.replace(/\s+/g, ' ').trim(),
        roles: JSON.parse(r.roles),
        pay: JSON.parse(r.pay)
      })
    }
    for (const tab of ['hiring', 'forhire']) {
      metaWrites.push(env.DB.prepare('INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v')
        .bind('snap:' + tab, JSON.stringify({ updated: now, items: snaps[tab] })))
    }
  }

  if (metaWrites.length) await env.DB.batch(metaWrites)
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url)
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(req)
    if (req.method !== 'GET') return json({ error: 'method not allowed' }, 405)

    const ip = req.headers.get('cf-connecting-ip') || 'unknown'
    const { success } = await env.API_LIMITER.limit({ key: ip })
    if (!success) return json({ error: 'slow down' }, 429)

    const headers = { 'content-type': 'application/json', 'cache-control': 'public, max-age=60' }

    if (url.pathname === '/api/list') {
      const tab = url.searchParams.get('tab')
      if (tab !== 'hiring' && tab !== 'forhire') return json({ error: 'bad tab' }, 400)
      const row = await env.DB.prepare('SELECT v FROM meta WHERE k = ?').bind('snap:' + tab).first()
      return new Response(row?.v || '{"updated":0,"items":[]}', { headers })
    }

    const m = url.pathname.match(/^\/api\/post\/(\d{1,12})$/)
    if (m) {
      const row = await env.DB.prepare('SELECT blocks FROM posts WHERE id = ? AND hidden IS NULL AND gone = 0').bind(Number(m[1])).first()
      if (!row?.blocks) return json({ error: 'not found' }, 404)
      return new Response(`{"blocks":${row.blocks}}`, { headers })
    }

    return json({ error: 'not found' }, 404)
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(sync(env))
  }
}
