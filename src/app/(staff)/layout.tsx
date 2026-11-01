import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getSiteChrome } from '@/lib/content'
import '../(frontend)/globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteChrome()
  return {
    title: { default: `Staff | ${settings.siteName}`, template: `%s | Staff | ${settings.siteName}` },
    robots: { index: false, follow: false },
  }
}

/** Layout for the staff area: no public site header or footer. */
export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="staff-body">{children}</body>
    </html>
  )
}
