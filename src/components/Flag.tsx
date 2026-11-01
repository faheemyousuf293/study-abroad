/** Simplified inline SVG flags (3:2) for destination cards. */
import type { ReactNode } from 'react'

const tricolour = (a: string, b: string, c: string, vertical = true) =>
  vertical ? (
    <>
      <rect width="10" height="20" fill={a} />
      <rect x="10" width="10" height="20" fill={b} />
      <rect x="20" width="10" height="20" fill={c} />
    </>
  ) : (
    <>
      <rect width="30" height="6.67" fill={a} />
      <rect y="6.67" width="30" height="6.67" fill={b} />
      <rect y="13.33" width="30" height="6.67" fill={c} />
    </>
  )

const unionJack = (
  <>
    <rect width="30" height="20" fill="#012169" />
    <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
    <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.6" />
    <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
    <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.4" />
  </>
)

const flags: Record<string, ReactNode> = {
  it: tricolour('#009246', '#fff', '#CE2B37'),
  fr: tricolour('#0055A4', '#fff', '#EF4135'),
  ie: tricolour('#169B62', '#fff', '#FF883E'),
  be: tricolour('#000', '#FDDA24', '#EF3340'),
  de: tricolour('#000', '#DD0000', '#FFCE00', false),
  nl: tricolour('#AE1C28', '#fff', '#21468B', false),
  hu: tricolour('#CE2939', '#fff', '#477050', false),
  at: tricolour('#C8102E', '#fff', '#C8102E', false),
  es: (
    <>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </>
  ),
  pl: (
    <>
      <rect width="30" height="20" fill="#DC143C" />
      <rect width="30" height="10" fill="#fff" />
    </>
  ),
  gb: unionJack,
  us: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="12" height="10.77" fill="#3C3B6E" />
    </>
  ),
  ca: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="7.5" height="20" fill="#D80621" />
      <rect x="22.5" width="7.5" height="20" fill="#D80621" />
      <path d="M15 4l1.3 2.6 1.9-.9-.6 3.6 2.2-2 .5 1.4 2-.3-.8 2.4 1 .6-3.6 2.8.4 1.4-3.2-.5V17h-.4v-2.4l-3.2.5.4-1.4-3.6-2.8 1-.6-.8-2.4 2 .3.5-1.4 2.2 2-.6-3.6 1.9.9z" fill="#D80621" />
    </>
  ),
  au: (
    <>
      <rect width="30" height="20" fill="#012169" />
      <svg width="15" height="10" viewBox="0 0 30 20">
        {unionJack}
      </svg>
      {[
        [7.5, 15.5, 1.6],
        [22.5, 16.5, 1],
        [22.5, 4, 1],
        [19, 8.5, 1],
        [26, 7.5, 1],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#fff" />
      ))}
    </>
  ),
  cn: (
    <>
      <rect width="30" height="20" fill="#EE1C25" />
      <circle cx="5" cy="5" r="2.6" fill="#FFFF00" />
      {[
        [10, 2],
        [12, 4],
        [12, 7],
        [10, 9],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.8" fill="#FFFF00" />
      ))}
    </>
  ),
  tr: (
    <>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11" cy="10" r="5" fill="#fff" />
      <circle cx="12.3" cy="10" r="4" fill="#E30A17" />
      <circle cx="17" cy="10" r="1.6" fill="#fff" />
    </>
  ),
}

export function Flag({ code }: { code: string }) {
  const flag = flags[code]
  if (!flag) return null
  return (
    <svg className="flag" viewBox="0 0 30 20" aria-hidden="true">
      {flag}
    </svg>
  )
}
