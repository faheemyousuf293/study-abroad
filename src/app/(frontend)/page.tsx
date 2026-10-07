import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/blocks'
import { getPageBySlug } from '@/lib/content'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')
  return {
    title: page?.meta?.title || page?.title,
    description: page?.meta?.description ?? undefined,
  }
}

export default async function HomePage() {
  const page = await getPageBySlug('home')
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
