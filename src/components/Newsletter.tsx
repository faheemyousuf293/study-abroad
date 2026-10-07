'use client'

import { useState } from 'react'
import type { Page } from '@/payload-types'

type NewsletterBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'newsletter' }>

/**
 * Visual only for deliverable 1: the form does not submit anywhere yet.
 * A later iteration stores submissions in a `leads` collection shared with the partner portal.
 */
export function Newsletter({ block }: { block: NewsletterBlock }) {
  const [interest, setInterest] = useState('')

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <h3>{block.title}</h3>
        <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
          <label className="field">
            <span className="sr-only">{block.interestLabel}</span>
            <select value={interest} onChange={(e) => setInterest(e.target.value)} aria-label={block.interestLabel ?? undefined}>
              <option value="" disabled>
                {block.interestLabel}
              </option>
              {(block.interests ?? []).map((i) => (
                <option key={i.id} value={i.label}>
                  {i.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">
            {block.buttonLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
