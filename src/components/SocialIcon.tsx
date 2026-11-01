export const socialLabel: Record<string, string> = {
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  x: 'X',
  youtube: 'YouTube',
}

/** Brand-coloured social media icons as inline SVG (no external requests). */
export function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <defs>
            <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#feda75" />
              <stop offset="0.3" stopColor="#fa7e1e" />
              <stop offset="0.6" stopColor="#d62976" />
              <stop offset="1" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect x="5" y="5" width="38" height="38" rx="11" fill="none" stroke="url(#ig-grad)" strokeWidth="4" />
          <circle cx="24" cy="24" r="8.5" fill="none" stroke="url(#ig-grad)" strokeWidth="4" />
          <circle cx="35" cy="13" r="2.6" fill="url(#ig-grad)" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 4a20 20 0 0 0-17.3 30L4 44l10.3-2.7A20 20 0 1 0 24 4z" fill="#25d366" />
          <path
            d="M34.6 29.3c-.5-.3-3-1.5-3.4-1.6-.5-.2-.8-.3-1.1.2-.3.5-1.3 1.6-1.6 2-.3.3-.6.4-1.1.1-.5-.3-2.1-.8-4-2.5-1.5-1.3-2.5-2.9-2.8-3.4-.3-.5 0-.8.2-1l.8-.9c.2-.3.3-.5.5-.8.2-.3.1-.6 0-.9l-1.5-3.6c-.4-.9-.8-.8-1.1-.8h-.9c-.3 0-.9.1-1.3.6-.5.5-1.7 1.7-1.7 4.1s1.8 4.8 2 5.1c.3.3 3.5 5.4 8.5 7.5 1.2.5 2.1.8 2.8 1 1.2.4 2.3.3 3.1.2 1-.1 3-1.2 3.4-2.4.4-1.2.4-2.2.3-2.4-.1-.2-.4-.3-.9-.5z"
            fill="#fff"
          />
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="#1877f2" />
          <path d="M26.6 45V30.4h4.9l.7-5.7h-5.6v-3.6c0-1.6.5-2.8 2.8-2.8h3V13.2c-.5-.1-2.3-.2-4.4-.2-4.3 0-7.3 2.6-7.3 7.5v4.2h-4.9v5.7h4.9V45z" fill="#fff" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#0a66c2" />
          <path d="M13 19h5v16h-5zm2.5-8a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8zM21 19h4.8v2.2c.7-1.3 2.3-2.6 4.8-2.6 5.1 0 6 3.3 6 7.7V35h-5v-7.8c0-1.9 0-4.2-2.6-4.2s-3 2-3 4.1V35h-5z" fill="#fff" />
        </svg>
      )
    case 'x':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="#000" />
          <path d="M14 13h6.5l5 6.9 5.9-6.9h2.4l-7.2 8.4L35 35h-6.5l-5.5-7.5-6.4 7.5h-2.4l7.7-9z" fill="#fff" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="3" y="10" width="42" height="28" rx="9" fill="#ff0000" />
          <path d="M20 17.5v13l11-6.5z" fill="#fff" />
        </svg>
      )
    default:
      return <span>{platform}</span>
  }
}
