import { getPayload } from 'payload'
import config from '@payload-config'

export type Office = { code: string; name: string; address: string }

/** Offices students can pick in onboarding: the ones listed in the footer (Dashboard → Footer → Offices). */
export async function getOffices(): Promise<Office[]> {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({ slug: 'footer' })
  return (footer.offices ?? []).map((o) => ({ code: o.title, name: o.title, address: o.address }))
}
