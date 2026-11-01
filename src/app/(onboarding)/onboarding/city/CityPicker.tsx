'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { chooseCityAction } from '../actions'

const MAX_RESULTS = 40

type Props = { top: string[]; cities: string[]; selected: string | null }

/**
 * Shows the top cities until the student searches, then matches against the full list
 * (names starting with the query first). A city that isn't listed can still be submitted as typed.
 */
export function CityPicker({ top, cities, selected }: Props) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  let shown = top
  if (q) {
    const starts = cities.filter((c) => c.toLowerCase().startsWith(q))
    const contains = cities.filter((c) => !c.toLowerCase().startsWith(q) && c.toLowerCase().includes(q))
    shown = [...starts, ...contains].slice(0, MAX_RESULTS)
  }
  const exact = q && cities.some((c) => c.toLowerCase() === q)
  const typed = query.trim().replace(/\s+/g, ' ')

  return (
    <form action={chooseCityAction}>
      <label className="onb-search">
        <span className="sr-only">Search city</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input type="search" placeholder="Search city..." value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
      </label>
      {!q ? (
        <div className="onb-hint">
          <strong>Top cities</strong>
          <p>
            Don&apos;t see your city? <strong>Search above</strong> — we cover {cities.length}+ cities across Pakistan.
          </p>
        </div>
      ) : null}
      <Options cities={shown} selected={selected} custom={q && !exact && typed.length >= 2 ? typed : null} />
    </form>
  )
}

function Options({ cities, selected, custom }: { cities: string[]; selected: string | null; custom: string | null }) {
  const { pending, data } = useFormStatus()
  const choosing = pending ? String(data?.get('city') ?? '') : null
  const current = (choosing ?? selected)?.toLowerCase()

  return (
    <>
      <div className="onb-options">
        {cities.map((c) => (
          <button
            key={c}
            type="submit"
            name="city"
            value={c}
            title={c}
            disabled={pending}
            className={`onb-option${current === c.toLowerCase() ? ' is-selected' : ''}`}
          >
            <span>{c}</span>
          </button>
        ))}
      </div>
      {custom ? (
        <div className="onb-custom">
          <p>{cities.length ? 'Not in the list?' : 'We couldn’t find that city in our list.'}</p>
          <button type="submit" name="city" value={custom} disabled={pending} className="onb-option onb-option-custom">
            <span>
              Use “{custom}” as my city <span aria-hidden="true">→</span>
            </span>
          </button>
        </div>
      ) : null}
    </>
  )
}
