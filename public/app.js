const forum = 'https://devforum.roblox.com'
const roleNames = ['scripter', 'builder', 'modeler', 'ui', 'animator', 'vfx', 'artist', 'audio', 'clothing']
const robuxPerUsd = 285

const icons = {
  briefcase: '<path d="M3 8h18v12H3z M8 8V5h8v3 M3 13h18"/>',
  user: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  search: '<path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4"/>',
  sliders: '<path d="M4 7h9 M17 7h3 M15 5v4 M4 17h3 M11 17h9 M9 15v4"/>',
  tag: '<path d="M3 12V3h9l9 9-9 9z M7.5 7.5h.01"/>',
  coins: '<path d="M12 9c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  clock: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2"/>',
  sort: '<path d="M7 4v16 M3 16l4 4 4-4 M17 20V4 M13 8l4-4 4 4"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  robux: '<path fill="currentColor" stroke="none" d="M23.402,5.573C25.009,6.501 26,8.217 26,10.073L26,17.929C26,19.786 25.009,21.501 23.402,22.429L16.597,26.358C14.99,27.286 13.009,27.286 11.402,26.358L4.597,22.429C2.99,21.501 2,19.786 2,17.929L2,10.073C2,8.217 2.99,6.501 4.597,5.573L11.402,1.645C13.009,0.717 14.99,0.717 16.597,1.645L23.402,5.573ZM12.313,3.428L5.686,7.254C4.642,7.857 4,8.97 4,10.176L4,17.827C4,19.032 4.642,20.146 5.686,20.749L12.313,24.574C13.357,25.177 14.642,25.177 15.686,24.574L22.313,20.749C23.357,20.146 24,19.032 24,17.827L24,10.176C24,8.97 23.357,7.857 22.313,7.254L15.686,3.428C14.642,2.825 13.357,2.825 12.313,3.428ZM15.385,5.566L20.614,8.584C21.471,9.079 22,9.994 22,10.985L22,17.022C22,18.012 21.471,18.927 20.614,19.422L15.385,22.441C14.528,22.936 13.471,22.936 12.614,22.441L7.385,19.422C6.528,18.927 6,18.012 6,17.022L6,10.985C6,9.994 6.528,9.079 7.385,8.584L12.614,5.566C13.471,5.071 14.528,5.071 15.385,5.566ZM11,17.003L17,17.003L17,11.003L11,11.003L11,17.003Z"/>',
  usd: '<path d="M12 3v18 M17 7c-1-1.5-2.8-2-5-2-2.8 0-4.5 1.3-4.5 3.2 0 4.6 10 2.4 10 7.3 0 2.1-1.9 3.5-5 3.5-2.6 0-4.6-.8-5.5-2.5"/>',
  percent: '<path d="M19 5L5 19 M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  box: '<path d="M15 14m-6 0a6 5 0 1 0 12 0a6 5 0 1 0 -12 0"/><path d="M15 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M3 16l9 -6.5"/><path d="M6 9h9"/><path d="M13 5l5.65 5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>',
  reply: '<path d="M4 5h16v11H9l-5 4z"/>',
  mail: '<path d="M3 5h18v14H3z M3 6l9 7 9-7"/>',
  back: '<path d="M19 12H5 M11 6l-6 6 6 6"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7 M3 4v5h5"/>',
  sync: '<path d="M21 12a9 9 0 1 1-3-6.7 M21 4v5h-5"/>',
  doc: '<path d="M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7 M9 17h5"/>',
  studio: '<path fill="currentColor" stroke="none" d="M 13.936 15.356 L 1.826 12.112 L 0 18.93 L 18.928 24 L 21.608 14.01 L 14.79 12.18 L 13.936 15.356 Z M 5.072 0 L 2.394 9.992 L 9.21 11.822 L 10.064 8.644 L 22.174 11.89 L 24 5.072 L 5.072 0 Z"/>',
  figma: '<path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z"/><path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15"/>',
  photoshop: '<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682"/><path d="M6.79 15.79v-3.79m0 0v-2.724c0 -.11 0 -.165 .004 -.211c.044 -.45 .4 -.806 .85 -.85c.046 -.004 .101 -.004 .211 -.004h1.303a1.895 1.895 0 1 1 0 3.789z"/><path d="M17.178 11.263c-.164 -.659 -.935 -1.158 -1.862 -1.158c-1.047 0 -1.895 .637 -1.895 1.421c0 .785 .848 1.421 1.895 1.421c1.046 0 1.895 .637 1.895 1.421c0 .785 -.849 1.421 -1.895 1.421c-.93 0 -1.704 -.502 -1.864 -1.165"/>',
  aftereffects: '<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682"/><path d="M12 15.79l-.82 -2.653m-4.864 2.652l.82 -2.652m0 0l.686 -2.218c.559 -1.806 .838 -2.708 1.336 -2.708s.777 .902 1.335 2.708l.686 2.218m-4.043 0h4.043"/><path d="M13.895 12.824v1.07a1.895 1.895 0 0 0 3.54 .942m-3.54 -2.012v-.824a1.895 1.895 0 1 1 3.79 0v.824z"/>',
  audacity: '<path fill="currentColor" stroke="none" d="M12 2.145c-2.487 0-4.755.776-6.428 2.08-1.673 1.303-2.76 3.169-2.76 5.244v.75C1.153 11.06 0 13.268 0 15.856c0 3.312 1.884 6 4.312 6V9.468c0-1.554.805-2.984 2.186-4.06C7.879 4.331 9.829 3.643 12 3.643c2.17 0 4.12.688 5.502 1.764 1.38 1.077 2.186 2.507 2.186 4.06v12.387c2.428 0 4.312-2.687 4.312-6 0-2.587-1.152-4.795-2.813-5.636v-.75c0-2.075-1.086-3.94-2.76-5.244-1.672-1.304-3.94-2.08-6.427-2.08zm0 6.153l-1.125 8.683L9.75 9.105l-.562 6.75-.376-.75-.375-4.5-.187 4.5-.563 1.313-.374-4.5-.376 3.562-.562-.937v2.625l-.563-2.11v-4.64a1.432 1.432 0 0 0-.937-.375v11.812c.375 0 .75-.187.937-.562v-3.375l.188.187.563 1.875.187-2.25.563 2.813v-3.562l.374.937.563 2.625v-3.562l.375.374.563 3.188.562-4.313 1.24 4.86.072-2.985.375-1.124.376 4.687 1.124-4.687.375 3.937.938-4.125.938 4.5.187-3.375.562-1.125.188 4.313.938-4.125.562 1.875.188-1.688.374.75v3.375c.188.375.563.562.938.562V10.043c-.375 0-.75.188-.938.375v4.813l-.374 1-.188-3.188-.375 2.437-.375-.75-.188-2.625-.937 3.563-.188-.75L15 9.293l-.562 4.875-.376 1.5-.75-5.062-.75 4.312-.375 1.125Z"/>',
  discourse: '<path fill="currentColor" stroke="none" d="M12.103 0C18.666 0 24 5.485 24 11.997c0 6.51-5.33 11.99-11.9 11.99L0 24V11.79C0 5.28 5.532 0 12.103 0zm.116 4.563c-2.593-.003-4.996 1.352-6.337 3.57-1.33 2.208-1.387 4.957-.148 7.22L4.4 19.61l4.794-1.074c2.745 1.225 5.965.676 8.136-1.39 2.17-2.054 2.86-5.228 1.737-7.997-1.135-2.778-3.84-4.59-6.84-4.585h-.008z"/>',
  maya: '<path fill="currentColor" stroke="none" d="M4.348 0 .69 2.203v16.875l3.657-2.203h17.297V1.219c0-.67-.551-1.219-1.22-1.219H4.349zm18.297 3.75v14.125H4.627l-1.943 1.17v3.736c0 .67.55 1.219 1.218 1.219H23.31V3.75h-.664zm-14.471.025h2.937l1.885 7.508 1.977-7.48-.012-.028h2.857v9.354h-2.216v-6.04l-1.565 6.026v.014h-2.203l-1.656-6.28v6.28H8.174V3.775zm1.33 14.762h1.18l1.068 3.543h-.902l-.217-.773H9.568l-.197.773h-.88l1.013-3.543zm1.918 0h.932l.648 1.494.643-1.494h.894l-1.113 2.133v1.41h-.887v-1.406l-1.117-2.137zm3.826 0h1.18l1.068 3.543h-.9l-.217-.773h-1.065l-.197.773h-.88l1.011-3.543zm-5.156.582-.362 1.53h.73l-.368-1.53zm5.744 0-.36 1.53h.73l-.37-1.53z"/>',
  roblox: '<path fill="currentColor" stroke="none" d="M18.926 23.998 0 18.892 5.075.002 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z"/>',
  photopea: '<path fill="currentColor" stroke="none" d="M20.098 0A3.899 3.899 0 0 1 24 3.903v16.194A3.899 3.899 0 0 1 20.098 24H6.393l-.051-10.34v-.074c0-3.92 3.112-7.09 6.963-7.09 2.31 0 4.177 1.902 4.177 4.254 0 2.352-1.867 4.254-4.177 4.254-.77 0-1.393-.634-1.393-1.418 0-.783.623-1.418 1.393-1.418.769 0 1.392-.634 1.392-1.418 0-.784-.623-1.418-1.392-1.418-2.31 0-4.178 1.9-4.178 4.253 0 2.352 1.868 4.254 4.178 4.254 3.85 0 6.962-3.169 6.962-7.09 0-3.92-3.112-7.089-6.962-7.089-5.39 0-9.75 4.436-9.75 9.925v.086l.023 10.315A3.899 3.899 0 0 1 0 20.097V3.903A3.899 3.899 0 0 1 3.902 0z"/>'
}
const roleIcons = { scripter: 'studio', builder: 'roblox', modeler: 'box', ui: 'figma', animator: 'maya', vfx: 'aftereffects', artist: 'photoshop', audio: 'audacity', clothing: 'photopea' }

const state = { tab: 'hiring', q: '', roles: new Set(), pay: 'any', within: 0, sort: 'new', sel: null }
const data = { hiring: null, forhire: null }
const bodies = new Map()

const $ = id => document.getElementById(id)
const listEl = $('list')
const detailBody = $('detailBody')
const detailEmpty = $('detailEmpty')

function el(tag, cls, text) {
  const node = document.createElement(tag)
  if (cls) node.className = cls
  if (text != null) node.textContent = text
  return node
}

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', name === 'robux' ? '0 0 28 28' : '0 0 24 24')
  svg.setAttribute('class', 'i')
  svg.setAttribute('aria-hidden', 'true')
  svg.innerHTML = icons[name]
  return svg
}

function withIcon(node, name) {
  node.prepend(icon(name))
  return node
}

function ago(ms) {
  const s = (Date.now() - ms) / 1000
  if (s < 60) return 'just now'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  return Math.floor(s / 86400) + 'd ago'
}

function short(n) {
  if (n >= 1e6) return +(n / 1e6).toFixed(1) + 'm'
  if (n >= 1e3) return +(n / 1e3).toFixed(1) + 'k'
  return String(n)
}

function cleanTitle(t) {
  const out = t.replace(/^\s*((\[[^\]]{1,30}\]|\((open|closed|hiring|for hire|paid|volunteer)\))\s*[|:-]?\s*)+/i, '').trim()
  return out || t
}

function payChips(pay) {
  const chips = []
  if (pay.r) chips.push(['r', short(pay.r), 'robux'])
  if (pay.u) chips.push(['u', short(pay.u), 'usd'])
  if (pay.p) chips.push(['p', pay.p + '% share', 'percent'])
  if (pay.v) chips.push(['', 'volunteer', 'heart'])
  return chips
}

function chipsFor(it) {
  const chips = el('div', 'chips')
  for (const [cls, text, name] of payChips(it.pay)) chips.append(withIcon(el('span', 'chip ' + cls, text), name))
  for (const r of it.roles) chips.append(withIcon(el('span', 'chip', r), roleIcons[r]))
  return chips
}

function payValue(pay) {
  return Math.max(pay.r || 0, (pay.u || 0) * robuxPerUsd)
}

function safeHref(h) {
  return typeof h === 'string' && /^https?:\/\//.test(h) ? h : null
}

function avatar(src, cls) {
  const img = el('img', cls || 'av')
  img.alt = ''
  img.loading = 'lazy'
  img.referrerPolicy = 'no-referrer'
  if (safeHref(src)) img.src = src
  return img
}

function filtered() {
  const items = data[state.tab]?.items || []
  const q = state.q.trim().toLowerCase()
  const since = state.within ? Date.now() - state.within * 864e5 : 0

  const out = items.filter(it => {
    if (since && it.created < since) return false
    if (state.roles.size && !it.roles.some(r => state.roles.has(r))) return false
    if (state.pay === 'paid' && !(it.pay.r || it.pay.u || it.pay.p)) return false
    if (state.pay !== 'any' && state.pay !== 'paid' && !it.pay[state.pay]) return false
    if (q) {
      const hay = (it.title + ' ' + it.ex + ' ' + it.author + ' ' + it.tags.join(' ')).toLowerCase()
      if (!q.split(/\s+/).every(w => hay.includes(w))) return false
    }
    return true
  })

  if (state.sort === 'active') out.sort((a, b) => b.bumped - a.bumped)
  else if (state.sort === 'views') out.sort((a, b) => b.views - a.views)
  else if (state.sort === 'pay') out.sort((a, b) => payValue(b.pay) - payValue(a.pay) || b.created - a.created)
  return out
}

function card(it, i, still) {
  const btn = el('button', 'card' + (it.id === state.sel ? ' on' : ''))
  btn.dataset.id = it.id
  if (still) btn.style.animation = 'none'
  else btn.style.animationDelay = Math.min(i, 12) * 18 + 'ms'

  const top = el('div', 'cardTop')
  top.append(avatar(it.avatar))
  const who = el('div', 'cardWho')
  who.append(el('b', null, it.author), withIcon(el('span', null, ago(it.created)), 'clock'), withIcon(el('span', null, it.replies + (it.replies === 1 ? ' reply' : ' replies')), 'reply'))
  top.append(who)

  btn.append(top, el('div', 'cardTitle', cleanTitle(it.title)))
  if (it.ex) btn.append(el('div', 'cardEx', it.ex))

  const chips = chipsFor(it)
  if (chips.childNodes.length) btn.append(chips)
  return btn
}

function renderList(fresh) {
  const items = filtered()
  const d = data[state.tab]
  $('resultCount').textContent = d ? items.length + (items.length === 1 ? ' post' : ' posts') : ''

  const scroller = listEl.parentElement
  let anchor = null
  if (fresh && scroller.scrollTop > 0) {
    const top = scroller.getBoundingClientRect().top
    const first = [...listEl.children].find(c => c.getBoundingClientRect().bottom > top)
    if (first?.dataset.id) anchor = { id: first.dataset.id, y: first.getBoundingClientRect().top }
  }

  listEl.replaceChildren()
  if (!d) {
    listEl.append(el('div', 'empty', 'loading'))
    return
  }
  if (!d.items.length) {
    listEl.append(el('div', 'empty', d.updated ? 'nothing here yet' : 'still syncing posts from the devforum, check back in a few minutes'))
    return
  }
  if (!items.length) {
    listEl.append(el('div', 'empty', 'no posts match these filters'))
    return
  }

  const frag = document.createDocumentFragment()
  items.forEach((it, i) => frag.append(card(it, i, fresh && !fresh.has(it.id))))
  listEl.append(frag)

  const kept = anchor && listEl.querySelector(`.card[data-id="${anchor.id}"]`)
  if (kept) scroller.scrollTop += kept.getBoundingClientRect().top - anchor.y
}

function renderRoles() {
  const items = data[state.tab]?.items || []
  const box = $('roles')
  box.replaceChildren()
  for (const name of roleNames) {
    const count = items.filter(it => it.roles.includes(name)).length
    const btn = withIcon(el('button', state.roles.has(name) ? 'on' : '', name), roleIcons[name])
    btn.dataset.role = name
    btn.append(el('em', null, count))
    box.append(btn)
  }
}

function renderCounts() {
  $('countHiring').textContent = data.hiring ? data.hiring.items.length : ''
  $('countForhire').textContent = data.forhire ? data.forhire.items.length : ''
  const d = data[state.tab]
  $('updated').replaceChildren()
  if (d?.updated) $('updated').append(withIcon(el('span', null, 'synced ' + ago(d.updated)), 'sync'))
  moveTabline()
}

function moveTabline() {
  const on = document.querySelector('#tabs button.on')
  const line = $('tabline')
  line.style.width = on.offsetWidth + 'px'
  line.style.transform = `translateX(${on.offsetLeft}px)`
}

function renderBlocks(blocks) {
  const post = el('div', 'post')
  let ul = null

  for (const b of blocks) {
    if (b.t !== 'li') ul = null
    if (b.t === 'img') {
      const src = safeHref(b.src)
      if (!src) continue
      const img = el('img')
      img.src = src
      img.alt = ''
      img.loading = 'lazy'
      img.referrerPolicy = 'no-referrer'
      post.append(img)
      continue
    }

    const tag = { h: 'h3', li: 'li', q: 'blockquote', pre: 'pre' }[b.t] || 'p'
    const node = el(tag)
    for (const r of b.r || []) {
      let piece = document.createTextNode(r.x)
      if (r.b) {
        const strong = el('strong')
        strong.append(piece)
        piece = strong
      }
      const href = safeHref(r.h)
      if (href) {
        const a = el('a')
        a.href = href
        a.target = '_blank'
        a.rel = 'noopener noreferrer nofollow'
        a.append(piece)
        piece = a
      }
      node.append(piece)
    }

    if (b.t === 'li') {
      if (!ul) {
        ul = el('ul')
        post.append(ul)
      }
      ul.append(node)
    } else {
      post.append(node)
    }
  }
  return post
}

async function openPost(id, push) {
  const it = data[state.tab]?.items.find(x => x.id === id)
  if (!it) return
  state.sel = id
  for (const c of listEl.querySelectorAll('.card')) c.classList.toggle('on', Number(c.dataset.id) === id)
  if (push) history.replaceState(null, '', `#${state.tab}/${id}`)

  const topicUrl = `${forum}/t/${encodeURIComponent(it.slug)}/${it.id}`
  const profileUrl = `${forum}/u/${encodeURIComponent(it.author)}`

  const back = withIcon(el('button', 'back', 'back to posts'), 'back')
  back.addEventListener('click', closePost)

  const who = el('div', 'dWho')
  const name = el('a', null, it.author)
  name.href = profileUrl
  name.target = '_blank'
  name.rel = 'noopener noreferrer'
  const whoText = el('div')
  const meta = el('div', 'dMeta')
  meta.append(withIcon(el('span', null, 'posted ' + ago(it.created)), 'clock'), withIcon(el('span', null, short(it.views) + ' views'), 'eye'), withIcon(el('span', null, it.replies + (it.replies === 1 ? ' reply' : ' replies')), 'reply'))
  whoText.append(name, meta)
  who.append(avatar(it.avatar), whoText)

  const chips = chipsFor(it)

  const actions = el('div', 'dActions')
  const open = withIcon(el('a', 'btn main', 'open on devforum'), 'discourse')
  open.href = topicUrl
  open.target = '_blank'
  open.rel = 'noopener noreferrer'
  const msg = withIcon(el('a', 'btn', 'message ' + it.author), 'mail')
  msg.href = `${forum}/new-message?username=${encodeURIComponent(it.author)}&title=${encodeURIComponent('re: ' + cleanTitle(it.title))}`
  msg.target = '_blank'
  msg.rel = 'noopener noreferrer'
  actions.append(open, msg)

  const slot = el('div', 'loading', 'loading post')
  detailBody.replaceChildren(back, el('h1', 'dTitle', it.title), who, chips, actions, slot)
  detailBody.hidden = false
  detailEmpty.hidden = true
  detailBody.style.animation = 'none'
  void detailBody.offsetWidth
  detailBody.style.animation = ''
  $('detail').scrollTop = 0
  document.body.classList.add('reading')

  let blocks = bodies.get(id)
  if (!blocks) {
    try {
      const res = await fetch('/api/post/' + id)
      if (!res.ok) throw new Error(res.status)
      blocks = (await res.json()).blocks
      bodies.set(id, blocks)
    } catch {
      if (state.sel === id) slot.textContent = 'could not load this post, open it on the devforum instead'
      return
    }
  }
  if (state.sel === id) slot.replaceWith(renderBlocks(blocks))
}

function closePost() {
  document.body.classList.remove('reading')
  state.sel = null
  for (const c of listEl.querySelectorAll('.card.on')) c.classList.remove('on')
  history.replaceState(null, '', `#${state.tab}`)
  detailBody.hidden = true
  detailEmpty.hidden = false
}

async function load(tab) {
  if (data[tab]) return
  try {
    const res = await fetch('/api/list?tab=' + tab)
    if (!res.ok) throw new Error(res.status)
    data[tab] = await res.json()
  } catch {
    data[tab] = { updated: 0, items: [] }
  }
}

async function setTab(tab, keepSel) {
  state.tab = tab
  for (const b of document.querySelectorAll('#tabs button')) b.classList.toggle('on', b.dataset.tab === tab)
  if (!keepSel) closePost()
  renderCounts()
  renderList()
  await load(tab)
  renderRoles()
  renderCounts()
  renderList()
}

function pick(groupId, attr, value) {
  for (const b of $(groupId).querySelectorAll('button')) b.classList.toggle('on', b.dataset[attr] === String(value))
}

$('tabs').addEventListener('click', e => {
  const b = e.target.closest('button')
  if (b && b.dataset.tab !== state.tab) setTab(b.dataset.tab)
})

$('roles').addEventListener('click', e => {
  const b = e.target.closest('button')
  if (!b) return
  const r = b.dataset.role
  state.roles.has(r) ? state.roles.delete(r) : state.roles.add(r)
  b.classList.toggle('on', state.roles.has(r))
  renderList()
})

$('pay').addEventListener('click', e => {
  const b = e.target.closest('button')
  if (!b) return
  state.pay = b.dataset.pay
  pick('pay', 'pay', state.pay)
  renderList()
})

$('within').addEventListener('click', e => {
  const b = e.target.closest('button')
  if (!b) return
  state.within = Number(b.dataset.within)
  pick('within', 'within', state.within)
  renderList()
})

$('sort').addEventListener('click', e => {
  const b = e.target.closest('button')
  if (!b) return
  state.sort = b.dataset.sort
  pick('sort', 'sort', state.sort)
  renderList()
})

$('reset').addEventListener('click', () => {
  state.roles.clear()
  state.pay = 'any'
  state.within = 0
  state.sort = 'new'
  state.q = ''
  $('q').value = ''
  pick('pay', 'pay', 'any')
  pick('within', 'within', 0)
  pick('sort', 'sort', 'new')
  renderRoles()
  renderList()
})

let typing
$('q').addEventListener('input', e => {
  clearTimeout(typing)
  typing = setTimeout(() => {
    state.q = e.target.value
    renderList()
  }, 120)
})

listEl.addEventListener('click', e => {
  const c = e.target.closest('.card')
  if (c) openPost(Number(c.dataset.id), true)
})

$('filterBtn').addEventListener('click', () => document.body.classList.toggle('filtering'))

$('scrim').addEventListener('click', () => {
  if (document.body.classList.contains('filtering')) document.body.classList.remove('filtering')
  else closePost()
})

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  if (document.body.classList.contains('filtering')) document.body.classList.remove('filtering')
  else if (state.sel) closePost()
})

window.addEventListener('resize', moveTabline)

async function start() {
  for (const node of document.querySelectorAll('[data-icon]')) node.prepend(icon(node.dataset.icon))
  const [tab, id] = location.hash.slice(1).split('/')
  await setTab(tab === 'forhire' ? 'forhire' : 'hiring', true)
  if (id && /^\d+$/.test(id)) openPost(Number(id), false)
  load(state.tab === 'hiring' ? 'forhire' : 'hiring').then(renderCounts)
  setInterval(poll, 60000)
}

async function poll() {
  if (document.hidden) return
  for (const tab of ['hiring', 'forhire']) {
    const old = data[tab]
    if (!old) continue
    let next
    try {
      const res = await fetch('/api/list?tab=' + tab, { cache: 'no-cache' })
      if (!res.ok) continue
      next = await res.json()
    } catch {
      continue
    }
    if (next.updated === old.updated) continue

    const seen = new Set(old.items.map(it => it.id))
    data[tab] = next
    if (tab !== state.tab) continue
    renderRoles()
    renderList(new Set(next.items.filter(it => !seen.has(it.id)).map(it => it.id)))
  }
  renderCounts()
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) poll()
})

start()
