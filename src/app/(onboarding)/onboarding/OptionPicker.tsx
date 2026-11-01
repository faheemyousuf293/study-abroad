'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'

export type PickerOption = { code: string; name: string; flag?: boolean; /** Small second line, e.g. an office address. */ detail?: string }

type Props = {
  /** Form field the chosen code is sent as. */
  name: string
  options: PickerOption[]
  selected: string | null
  action: (formData: FormData) => Promise<void>
  searchLabel: string
  /** Hide the search box for short lists. */
  searchable?: boolean
}

/** Searchable single-choice grid used by the onboarding steps. Clicking an option submits it straight away. */
export function OptionPicker({ name, options, selected, action, searchLabel, searchable = true }: Props) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const shown = q ? options.filter((o) => o.name.toLowerCase().includes(q)) : options

  return (
    <form action={action}>
      {searchable ? (
        <label className="onb-search">
          <span className="sr-only">{searchLabel}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input type="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
        </label>
      ) : null}
      <Options name={name} options={shown} selected={selected} />
      {!shown.length ? <p className="onb-empty">{q ? <>Nothing matches “{query}”.</> : 'Nothing to choose yet.'}</p> : null}
    </form>
  )
}

function Options({ name, options, selected }: { name: string; options: PickerOption[]; selected: string | null }) {
  const { pending, data } = useFormStatus()
  const choosing = pending ? String(data?.get(name) ?? '') : null

  return (
    <div className="onb-options">
      {options.map((o) => (
        <button
          key={o.code}
          type="submit"
          name={name}
          value={o.code}
          title={o.name}
          disabled={pending}
          className={`onb-option${(choosing ?? selected) === o.code ? ' is-selected' : ''}`}
        >
          {o.flag ? <img src={`/flags/${o.code}.svg`} alt="" width={24} height={24} /> : null}
          {o.detail ? (
            <span className="onb-option-text">
              <span>{o.name}</span>
              <small>{o.detail}</small>
            </span>
          ) : (
            <span>{o.name}</span>
          )}
        </button>
      ))}
    </div>
  )
}
