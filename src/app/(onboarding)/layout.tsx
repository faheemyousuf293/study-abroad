import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getSiteChrome } from '@/lib/content'
import '../(frontend)/globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteChrome()
  return { title: { default: settings.siteName, template: `%s | ${settings.siteName}` } }
}

/** Distraction-free layout for the student onboarding steps: no site header or footer. */
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="onboarding-body">{children}</body>
    </html>
  )
}
