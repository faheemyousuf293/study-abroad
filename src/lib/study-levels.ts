/**
 * Study levels students can pick in onboarding step 2, in display order.
 * Adding a level here also adds it to the Students "studyLevel" select (needs a migration).
 */
export const studyLevels = [
  { code: 'bachelors', name: 'Bachelors' },
  { code: 'masters', name: 'Masters' },
  { code: 'ug_diploma', name: 'UG/ UG Diploma' },
  { code: 'pg_diploma', name: 'PG/ PG Diploma' },
  { code: 'phd', name: 'PhD' },
  { code: 'diploma_certificate', name: 'Diploma/ Certificate Programs' },
  { code: 'foundation_pathway', name: 'Foundation/ Pathway Programs' },
  { code: 'others', name: 'Others' },
] as const

export const studyLevelName = (code?: string | null) => studyLevels.find((l) => l.code === code)?.name
