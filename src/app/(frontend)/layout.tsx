import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteChrome } from '@/lib/content'
import './globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteChrome()
  return {
    title: { default: settings.siteName, template: `%s | ${settings.siteName}` },
    description: settings.tagline ?? undefined,
  }
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const { settings, header, footer } = await getSiteChrome()

  return (
    <html lang="en">
      <body>
        <Header header={header} settings={settings} />
        <main>{children}</main>
        <Footer footer={footer} settings={settings} />
      </body>
    </html>
  )
}
