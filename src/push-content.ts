/**
 * Copies this machine's site content to the live site through its REST API:
 * images (Media), pages, and the Site Settings, Header and Footer globals.
 * Admin users, staff and students on the live site are never touched.
 *
 *   pnpm push-content            # do it
 *   DRY_RUN=1 pnpm push-content  # only show what would change
 *
 * Needs in .env: PROD_URL, PROD_ADMIN_EMAIL, PROD_ADMIN_PASSWORD (an admin account on the live site).
 * Safe to run again at any time, e.g. after a redeploy has wiped the uploaded image files.
 */
import fs from 'fs/promises'
import path from 'path'
import { getPayload, type Field } from 'payload'
import config from '@payload-config'

const PROD = (process.env.PROD_URL || '').replace(/\/+$/, '')
const DRY = Boolean(process.env.DRY_RUN)
if (!PROD || !process.env.PROD_ADMIN_EMAIL || !process.env.PROD_ADMIN_PASSWORD) {
  console.error('Set PROD_URL, PROD_ADMIN_EMAIL and PROD_ADMIN_PASSWORD in .env first.')
  process.exit(1)
}

const payload = await getPayload({ config })
const log = (msg: string) => console.log(`${DRY ? '[dry run] ' : ''}${msg}`)

// --- Live site API ---------------------------------------------------------------------------

const loginRes = await fetch(`${PROD}/api/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: process.env.PROD_ADMIN_EMAIL, password: process.env.PROD_ADMIN_PASSWORD }),
})
if (!loginRes.ok) {
  console.error(`Could not log in to ${PROD} (${loginRes.status}): ${await loginRes.text()}`)
  process.exit(1)
}
const auth = { Authorization: `JWT ${(await loginRes.json()).token}` }
log(`Logged in to ${PROD}`)

async function api<T = { doc?: { id: number }; docs?: { id: number }[] }>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(`${PROD}/api/${url}`, {
    method,
    headers: body instanceof FormData ? auth : { ...auth, 'Content-Type': 'application/json' },
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`${method} ${url} failed (${res.status}): ${await res.text()}`)
  return res.json() as Promise<T>
}

// --- Images ----------------------------------------------------------------------------------

const mediaDir = payload.collections.media.config.upload.staticDir!
const localMedia = await payload.find({ collection: 'media', limit: 1000, depth: 0, pagination: false })
/** Local media id → live media id. */
const mediaMap = new Map<number, number>()

for (const m of localMedia.docs) {
  if (!m.filename) continue
  const form = async () => {
    const f = new FormData()
    f.append('file', new Blob([await fs.readFile(path.join(mediaDir, m.filename!))], { type: m.mimeType ?? undefined }), m.filename!)
    f.append('_payload', JSON.stringify({ alt: m.alt }))
    return f
  }
  const found = await api('GET', `media?where[filename][equals]=${encodeURIComponent(m.filename)}&limit=1&depth=0`)
  const live = found.docs?.[0]
  if (live) {
    mediaMap.set(m.id, live.id)
    // A redeploy without a persistent volume keeps the database row but loses the file.
    // (Payload doesn't answer HEAD for files, so this is a GET whose body is thrown away.)
    const file = await fetch(`${PROD}/api/media/file/${encodeURIComponent(m.filename)}`)
    await file.body?.cancel()
    if (file.ok) continue
    log(`Re-uploading missing file ${m.filename}`)
    if (DRY) continue
    try {
      await api('PATCH', `media/${live.id}`, await form())
      continue
    } catch (err) {
      console.warn(`  Could not replace the file in place, uploading it as a new image instead: ${(err as Error).message}`)
    }
  } else {
    log(`Uploading ${m.filename}`)
  }
  if (DRY) continue
  const created = await api('POST', 'media', await form())
  mediaMap.set(m.id, created.doc!.id)
}

// --- Content ---------------------------------------------------------------------------------

/**
 * Rewrites a document for the live site, following the field config: image references point at
 * the live media ids, and array/block row ids are dropped so the live site creates its own.
 */
function prepare(value: Record<string, unknown>, fields: Field[]): Record<string, unknown> {
  const out: Record<string, unknown> = { ...value }
  for (const field of fields) {
    if (!('name' in field)) {
      // row, collapsible and tabs only lay fields out; their data sits on the parent
      if ('fields' in field) Object.assign(out, prepare(out, field.fields))
      if (field.type === 'tabs')
        for (const tab of field.tabs)
          if ('name' in tab) out[tab.name] = out[tab.name] && prepare(out[tab.name] as Record<string, unknown>, tab.fields)
          else Object.assign(out, prepare(out, tab.fields))
      continue
    }
    const v = out[field.name]
    if (v == null) continue
    if (field.type === 'upload' && field.relationTo === 'media') {
      const id = typeof v === 'object' ? (v as { id: number }).id : (v as number)
      out[field.name] = DRY ? id : (mediaMap.get(id) ?? null)
    } else if (field.type === 'group') {
      out[field.name] = prepare(v as Record<string, unknown>, field.fields)
    } else if (field.type === 'array') {
      out[field.name] = (v as Record<string, unknown>[]).map(({ id: _id, ...row }) => prepare(row, field.fields))
    } else if (field.type === 'blocks') {
      out[field.name] = (v as Record<string, unknown>[]).map(({ id: _id, ...row }) => {
        const block = field.blocks.find((b) => b.slug === row.blockType)
        return block ? prepare(row, block.fields) : row
      })
    }
  }
  return out
}

const strip = ({ id: _id, createdAt: _c, updatedAt: _u, globalType: _g, ...rest }: Record<string, unknown>) => rest

for (const slug of ['site-settings', 'header', 'footer'] as const) {
  const global = await payload.findGlobal({ slug, depth: 0 })
  const fields = payload.globals.config.find((g) => g.slug === slug)!.fields
  log(`Updating ${slug}`)
  if (!DRY) await api('POST', `globals/${slug}`, prepare(strip(global as unknown as Record<string, unknown>), fields))
}

const pages = await payload.find({ collection: 'pages', limit: 1000, depth: 0, pagination: false })
for (const page of pages.docs) {
  const data = { ...prepare(strip(page as unknown as Record<string, unknown>), payload.collections.pages.config.fields), _status: 'published' }
  const found = await api('GET', `pages?where[slug][equals]=${encodeURIComponent(page.slug)}&limit=1&depth=0&draft=true`)
  const live = found.docs?.[0]
  log(`${live ? 'Updating' : 'Creating'} page "${page.slug}"`)
  if (DRY) continue
  if (live) await api('PATCH', `pages/${live.id}`, data)
  else await api('POST', 'pages', data)
}

log('Done.')
process.exit(0)
