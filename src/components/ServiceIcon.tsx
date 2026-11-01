/** Line icons for service cards. They inherit `currentColor`. */
export function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case 'plane':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M44 24c0-1.7-1.4-3-3-3H30L19 4h-4l5.5 17H10l-3.5-5H3l2.5 8L3 32h3.5l3.5-5h10.5L15 44h4l11-17h11c1.6 0 3-1.3 3-3z"
            fill="currentColor"
          />
        </svg>
      )
    case 'target':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3.5">
          <circle cx="24" cy="24" r="18" />
          <circle cx="24" cy="24" r="10" />
        </svg>
      )
    case 'grade':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <text x="2" y="38" fontSize="34" fontFamily="inherit" fill="currentColor">
            A+
          </text>
        </svg>
      )
    case 'cap':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <path d="M3 18l21-9 21 9-21 9z" />
          <path d="M12 22v10c7 5 17 5 24 0V22" />
          <path d="M42 19v12" strokeLinecap="round" />
        </svg>
      )
    case 'globe':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="24" cy="24" r="19" />
          <path d="M5 24h38M24 5c6 6 8 12 8 19s-2 13-8 19c-6-6-8-12-8-19s2-13 8-19z" />
        </svg>
      )
    case 'document':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <path d="M11 4h18l10 10v30H11z" />
          <path d="M29 4v10h10M17 24h14M17 31h14M17 38h9" />
        </svg>
      )
    default:
      return null
  }
}
