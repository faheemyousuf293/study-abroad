import Link from 'next/link'
import type { ReactNode } from 'react'
import { getSiteChrome } from '@/lib/content'
import { ONBOARDING_STEPS } from './steps'

type Props = { step: number; backHref: string; title: string; children: ReactNode }

/** Top bar (back, logo, close), progress line and step heading shared by every onboarding step. */
export async function OnboardingShell({ step, backHref, title, children }: Props) {
  const { settings } = await getSiteChrome()
  const logo = typeof settings.logo === 'object' ? settings.logo : null

  return (
    <>
      <header className="onb-bar">
        <Link href={backHref} className="onb-icon" aria-label="Back">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12H4M10 6l-6 6 6 6" />
          </svg>
        </Link>
        <Link href="/" className="onb-logo" aria-label={settings.siteName}>
          {logo?.url ? <img src={logo.url} alt={settings.siteName} height={48} /> : <span>{settings.siteName}</span>}
        </Link>
        <Link href="/account" className="onb-icon" aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </Link>
        <div
          className="onb-progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={ONBOARDING_STEPS}
          aria-valuenow={step}
          aria-label={`Step ${step} of ${ONBOARDING_STEPS}`}
        >
          <span style={{ width: `${(step / ONBOARDING_STEPS) * 100}%` }} />
        </div>
      </header>
      <main className="onb-main">
        <p className="onb-step">
          Step {step} of {ONBOARDING_STEPS}
        </p>
        <h1>{title}</h1>
        {children}
      </main>
    </>
  )
}
