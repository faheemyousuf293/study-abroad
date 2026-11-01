import { Fragment } from 'react'
import Link from 'next/link'
import type { Footer as FooterType, SiteSetting } from '@/payload-types'
import { SocialIcon, socialLabel } from './SocialIcon'

type Props = { footer: FooterType; settings: SiteSetting }

/** Renders `**bold**` segments of plain text as <strong>. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  )
}

const mapSrc = (query: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`

export function Footer({ footer, settings }: Props) {
  const offices = footer.offices ?? []

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-about">
          <h3>{footer.aboutTitle}</h3>
          {footer.aboutText ? <p>{withBold(footer.aboutText)}</p> : null}
        </div>
        {(footer.columns ?? []).map((col) => (
          <div key={col.id} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {(col.links ?? []).map((l) => (
                <li key={l.id}>
                  <Link href={l.href || '#'}>{l.label}</Link>
                  {l.badge ? <span className="badge">{l.badge}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {offices.length ? (
        <div className="container footer-offices">
          {footer.officesTitle ? <h4>{footer.officesTitle}</h4> : null}
          <div className="office-grid">
            {offices.map((o) => (
              <div key={o.id} className="office-card">
                <h5>{o.title}</h5>
                <p>{o.address}</p>
                <iframe
                  src={mapSrc(o.mapQuery || o.address.replace(/\s*\n\s*/g, ', '))}
                  title={`Map: ${o.title}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="container footer-bottom">
        <ul className="socials" aria-label="Social media">
          {(settings.socials ?? []).map((s) => (
            <li key={s.id}>
              <a href={s.url} aria-label={socialLabel[s.platform] ?? s.platform} target="_blank" rel="noopener noreferrer">
                <SocialIcon platform={s.platform} />
              </a>
            </li>
          ))}
        </ul>
        <p className="copyright">© {settings.copyright}</p>
        <ul className="legal">
          {(footer.legalLinks ?? []).map((l) => (
            <li key={l.id}>
              <Link href={l.href || '#'}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
