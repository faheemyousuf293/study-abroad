import Link from 'next/link'
import type { Footer as FooterType, SiteSetting } from '@/payload-types'

type Props = { footer: FooterType; settings: SiteSetting }

const socialGlyph: Record<string, string> = {
  facebook: 'f',
  instagram: 'ig',
  linkedin: 'in',
  x: 'x',
  youtube: '▶',
}

export function Footer({ footer, settings }: Props) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-about">
          <h3>{footer.aboutTitle}</h3>
          <p>{footer.aboutText}</p>
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
      <div className="container footer-bottom">
        <ul className="socials" aria-label="Social media">
          {(settings.socials ?? []).map((s) => (
            <li key={s.id}>
              <a href={s.url} aria-label={s.platform}>
                {socialGlyph[s.platform] ?? s.platform}
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
