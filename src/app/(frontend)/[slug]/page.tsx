import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/blocks'
import { getPageBySlug } from '@/lib/content'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/** Any published CMS page other than the homepage, e.g. /privacy-policy. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug((await params).slug)
  if (!page) return {}
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description ?? undefined,
  }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  if (slug === 'home') notFound()
  const page = await getPageBySlug(slug)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
