import Link from 'next/link'
import type { Page } from '@/payload-types'
import { Newsletter } from './Newsletter'

type Block = NonNullable<Page['layout']>[number]

function Hero({ block }: { block: Extract<Block, { blockType: 'hero' }> }) {
  const img = typeof block.image === 'object' && block.image ? block.image : null
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>{block.heading}</h1>
          {block.subheading ? <p className="lead">{block.subheading}</p> : null}
          {block.ctaLabel ? (
            <Link href={block.ctaHref || '#'} className="btn btn-primary btn-lg">
              {block.ctaLabel}
            </Link>
          ) : null}
        </div>
        <div className="hero-art">
          <img
            src={img?.url ?? '/hero-illustration.svg'}
            alt={img?.alt ?? ''}
            width={560}
            height={480}
          />
        </div>
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

function RichText({ block }: { block: Extract<Block, { blockType: 'richText' }> }) {
  // Rich text rendering is added together with the first content page.
  return <section className="container prose">{block.content ? null : null}</section>
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={block.id} block={block} />
          case 'coreStrengths':
            return <CoreStrengths key={block.id} block={block} />
          case 'newsletter':
            return <Newsletter key={block.id} block={block} />
          case 'richText':
            return <RichText key={block.id} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
