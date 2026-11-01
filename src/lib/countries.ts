/**
 * Study destinations students can pick in onboarding step 1, in display order.
 * `code` is the ISO country code; the flag is served from /public/flags/<code>.svg.
 * Adding a country here also adds it to the Students "destination" select (needs a migration).
 */
export const destinations = [
  { code: 'gb', name: 'United Kingdom' },
  { code: 'us', name: 'United States' },
  { code: 'au', name: 'Australia' },
  { code: 'de', name: 'Germany' },
  { code: 'ca', name: 'Canada' },
  { code: 'ie', name: 'Ireland' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'sg', name: 'Singapore' },
  { code: 'ae', name: 'United Arab Emirates' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'fr', name: 'France' },
  { code: 'se', name: 'Sweden' },
  { code: 'at', name: 'Austria' },
  { code: 'dk', name: 'Denmark' },
  { code: 'fi', name: 'Finland' },
  { code: 'it', name: 'Italy' },
  { code: 'hu', name: 'Hungary' },
  { code: 'ch', name: 'Switzerland' },
  { code: 'es', name: 'Spain' },
  { code: 'lt', name: 'Lithuania' },
  { code: 'lv', name: 'Latvia' },
  { code: 'cy', name: 'Cyprus' },
  { code: 'pl', name: 'Poland' },
  { code: 'my', name: 'Malaysia' },
  { code: 'mu', name: 'Mauritius' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'cn', name: 'China' },
  { code: 'vn', name: 'Vietnam' },
  { code: 'mt', name: 'Malta' },
  { code: 'jp', name: 'Japan' },
  { code: 'be', name: 'Belgium' },
  { code: 'ru', name: 'Russia' },
  { code: 'kr', name: 'South Korea' },
  { code: 'ge', name: 'Georgia' },
  { code: 'id', name: 'Indonesia' },
  { code: 'ph', name: 'Philippines' },
  { code: 'cz', name: 'Czech Republic' },
  { code: 'pk', name: 'Pakistan' },
] as const

export type DestinationCode = (typeof destinations)[number]['code']

export const destinationName = (code?: string | null) => destinations.find((d) => d.code === code)?.name
