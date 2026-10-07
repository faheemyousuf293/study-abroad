import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: false,
  })
  return result.docs[0] ?? null
}

export async function getSiteChrome() {
  const payload = await getPayload({ config })
  const [settings, header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])
  return { settings, header, footer }
}
