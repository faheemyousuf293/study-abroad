import Link from 'next/link'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'

type Props = { header: HeaderType; settings: SiteSetting }

export function Header({ header, settings }: Props) {
  const logo = typeof settings.logo === 'object' ? settings.logo : null
  const actions = header.actions ?? []

  return (
    <header className="site-header">
      <input id="nav-toggle" type="checkbox" className="nav-toggle" aria-label="Toggle menu" />
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={settings.siteName}>
          {logo?.url ? <img src={logo.url} alt={settings.siteName} height={36} /> : <span>{settings.siteName}</span>}
        </Link>

        <label htmlFor="nav-toggle" className="nav-burger" aria-hidden="true">
          <span />
          <span />
          <span />
        </label>

        <nav className="main-nav" aria-label="Main">
          <ul>
            {(header.navItems ?? []).map((item) => (
              <li key={item.id} className={item.children?.length ? 'has-children' : undefined}>
                <Link href={item.href || '#'}>
                  {item.label}
                  {item.children?.length ? <span className="caret" aria-hidden="true" /> : null}
                </Link>
                {item.children?.length ? (
                  <ul className="dropdown">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link href={child.href || '#'}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="header-actions">
            {actions.map((a) => (
              <Link key={a.id} href={a.href || '#'} className={a.style === 'button' ? 'btn btn-primary' : 'action-link'}>
                {a.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
