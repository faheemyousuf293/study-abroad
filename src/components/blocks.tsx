import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Media, Page } from '@/payload-types'
import { Newsletter } from './Newsletter'
import { SocialIcon, socialLabel } from './SocialIcon'
import { ServiceIcon } from './ServiceIcon'
import { Flag } from './Flag'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Block = NonNullable<Page['layout']>[number]

/** Wraps the first occurrence of `phrase` in `text` with an accent span. */
function highlight(text: string, phrase?: string | null) {
  const i = phrase ? text.indexOf(phrase) : -1
  if (!phrase || i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="accent">{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  )
}

function Hero({ block }: { block: Extract<Block, { blockType: 'hero' }> }) {
  const img = typeof block.image === 'object' && block.image ? block.image : null
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>{highlight(block.heading, block.headingHighlight)}</h1>
          {block.subheadingLead || block.subheading ? (
            <p className="lead">
              {block.subheadingLead ? <strong>{block.subheadingLead}</strong> : null}
              {block.subheading}
            </p>
          ) : null}
          {block.ctaLabel ? (
            <Link href={block.ctaHref || '#'} className="btn btn-cta btn-lg">
              {block.ctaLabel}
            </Link>
          ) : null}
        </div>
        <div className="hero-art">
          <img
            src={img?.url ?? '/hero-illustration.svg'}
            alt={img?.alt ?? ''}
            width={img?.width ?? 560}
            height={img?.height ?? 480}
            className={img ? 'hero-photo' : undefined}
          />
        </div>
      </div>
    </section>
  )
}

function Founder({ block }: { block: Extract<Block, { blockType: 'founder' }> }) {
  const img = typeof block.image === 'object' && block.image ? block.image : null
  return (
    <section className="founder">
      <div className="container founder-inner">
        <div className="founder-photo">
          <img
            src={img?.url ?? '/founder-placeholder.svg'}
            alt={img?.alt ?? block.name}
            width={760}
            height={940}
          />
        </div>
        <div className="founder-copy">
          {block.eyebrow ? <p className="founder-eyebrow">{block.eyebrow}</p> : null}
          <h2>{block.name}</h2>
          {block.role ? <p className="founder-role">{block.role}</p> : null}
          {block.bio ? <p className="founder-bio">{block.bio}</p> : null}
          {block.socials?.length ? (
            <ul className="founder-socials" aria-label={`${block.name} on social media`}>
              {block.socials.map((s) => (
                <li key={s.id}>
                  <a href={s.url} aria-label={socialLabel[s.platform] ?? s.platform} target="_blank" rel="noopener noreferrer">
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function LogoCarousel({ block }: { block: Extract<Block, { blockType: 'logoCarousel' }> }) {
  const logos = (block.logos ?? []).filter((l) => typeof l.image === 'object' && l.image?.url)
  if (!logos.length) return null
  // The list is rendered twice so the CSS animation can loop seamlessly; the copy is hidden from screen readers.
  const track = (copy: boolean) =>
    logos.map((logo) => {
      const img = logo.image as Media
      const el = <img src={img.url!} alt={copy ? '' : logo.name} width={img.width ?? 400} height={img.height ?? 120} loading="lazy" />
      return (
        <li key={`${copy ? 'b' : 'a'}-${logo.id}`} aria-hidden={copy || undefined}>
          {logo.href ? (
            <a href={logo.href} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined}>
              {el}
            </a>
          ) : (
            el
          )}
        </li>
      )
    })
  return (
    <section className="logo-carousel">
      {block.title || block.subtitle ? (
        <div className="container logo-carousel-head">
          {block.title ? <h2>{block.title}</h2> : null}
          {block.subtitle ? <p>{block.subtitle}</p> : null}
        </div>
      ) : null}
      <div className="logo-viewport">
        <ul className="logo-track" style={{ '--logo-duration': `${block.duration || 40}s` } as CSSProperties}>
          {track(false)}
          {track(true)}
        </ul>
      </div>
    </section>
  )
}

function CoreStrengths({ block }: { block: Extract<Block, { blockType: 'coreStrengths' }> }) {
  return (
    <section className="strengths">
      <div className="container">
        <h2>{block.title}</h2>
        <div className="strength-grid">
          {(block.items ?? []).map((item) => (
            <Link key={item.id} href={item.href || '#'} className="strength-card">
              <span className="stat">{item.stat}</span>
              <span className="stat-label">{item.label}</span>
              {item.description ? <p>{item.description}</p> : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services({ block }: { block: Extract<Block, { blockType: 'services' }> }) {
  return (
    <section className="services">
      {!block.panels?.length ? (
        <div className="container">
          <h2>{block.title}</h2>
        </div>
      ) : null}
      {(block.panels ?? []).map((panel, index) => {
        const img = typeof panel.image === 'object' && panel.image ? panel.image : null
        return (
          <div
            key={panel.id}
            className={`service-band tone-${panel.tone || 'brand'}${panel.imagePosition === 'left' ? ' image-left' : ''}`}
          >
            {/* The section title sits inside the first band so it shares its background. */}
            {index === 0 ? (
              <div className="container">
                <h2>{block.title}</h2>
              </div>
            ) : null}
            <div className={`container service-inner${panel.showImage === false ? ' no-image' : ''}`}>
              <div className="service-copy">
                <h3>{panel.heading}</h3>
                {panel.intro ? <p className="service-intro">{panel.intro}</p> : null}
                {panel.offerings?.length ? (
                  <>
                    <h4>{panel.offeringsLabel || 'Offerings'}</h4>
                    <ul className="service-list">
                      {panel.offerings.map((o) => (
                        <li key={o.id}>{o.label}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {panel.linkLabel ? (
                  <Link href={panel.linkHref || '#'} className="service-link">
                    {panel.linkLabel} <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
              {panel.showImage !== false ? (
                <div className="service-art">
                  <div className="service-circle">
                    <img
                      src={img?.url ?? '/student-placeholder.svg'}
                      alt={img?.alt ?? ''}
                      width={360}
                      height={360}
                    />
                  </div>
                  <span className="service-badge badge-a" aria-hidden="true">🎓</span>
                  <span className="service-badge badge-b" aria-hidden="true">✈</span>
                </div>
              ) : null}
            </div>
            {panel.cards?.length ? (
              <div className="container service-cards">
                {panel.cards.map((card) => (
                  <article key={card.id} className={`service-card accent-${card.accent || 'blue'}`}>
                    <span className="service-card-icon">
                      <ServiceIcon name={card.icon || 'plane'} />
                    </span>
                    {card.eyebrow ? <p className="service-card-eyebrow">{card.eyebrow}</p> : null}
                    <h4>{card.title}</h4>
                    {card.description ? <p className="service-card-text">{card.description}</p> : null}
                    {card.linkLabel ? (
                      <Link href={card.linkHref || '#'} className="service-card-link">
                        {card.linkLabel} <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}

function Destinations({ block }: { block: Extract<Block, { blockType: 'destinations' }> }) {
  return (
    <section className="destinations">
      <div className="container">
        <div className="section-head">
          <h2>{block.title}</h2>
          {block.subtitle ? <p>{block.subtitle}</p> : null}
        </div>
        <div className="destination-grid">
          {(block.items ?? []).map((item) => {
            const img = typeof item.image === 'object' && item.image ? item.image : null
            return (
              <Link key={item.id} href={item.href || '#'} className="destination-card">
                {img?.url ? <img src={img.url} alt={img.alt ?? ''} width={img.width ?? 600} height={img.height ?? 800} loading="lazy" /> : null}
                <span className="destination-label">
                  {item.flag ? <Flag code={item.flag} /> : null}
                  <span className="destination-title">{item.title}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RichTextBlock({ block }: { block: Extract<Block, { blockType: 'richText' }> }) {
  if (!block.content) return null
  return (
    <section className="container prose">
      <RichText data={block.content} />
    </section>
  )
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        if (block.hidden) return null
        switch (block.blockType) {
          case 'hero':
            return <Hero key={block.id} block={block} />
          case 'founder':
            return <Founder key={block.id} block={block} />
          case 'logoCarousel':
            return <LogoCarousel key={block.id} block={block} />
          case 'coreStrengths':
            return <CoreStrengths key={block.id} block={block} />
          case 'services':
            return <Services key={block.id} block={block} />
          case 'destinations':
            return <Destinations key={block.id} block={block} />
          case 'newsletter':
            return <Newsletter key={block.id} block={block} />
          case 'richText':
            return <RichTextBlock key={block.id} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
