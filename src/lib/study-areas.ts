/**
 * Study areas students can pick in onboarding step 3, in display order.
 * Adding an area here also adds it to the Students "studyArea" select (needs a migration).
 */
export const studyAreas = [
  { code: 'agriculture', name: 'Agriculture, Forestry and Fishery' },
  { code: 'architecture', name: 'Architecture and Building' },
  { code: 'arts', name: 'Arts' },
  { code: 'business', name: 'Commerce, Business and Administration' },
  { code: 'computer_science', name: 'Computer Science and Information Technology' },
  { code: 'education', name: 'Education' },
  { code: 'engineering', name: 'Engineering and Engineering Trades' },
  { code: 'environmental', name: 'Environmental Science/Protection' },
  { code: 'health', name: 'Health' },
  { code: 'humanities', name: 'Humanities' },
  { code: 'law', name: 'Law' },
  { code: 'life_sciences', name: 'Life Sciences' },
  { code: 'manufacturing', name: 'Manufacturing and Processing' },
  { code: 'physical_sciences', name: 'Physical Sciences, Sciences' },
  { code: 'security_services', name: 'Security Services' },
  { code: 'social_behavioural', name: 'Social and Behavioural Science' },
  { code: 'social_services', name: 'Social Services' },
  { code: 'transport_services', name: 'Transport Services' },
  { code: 'veterinary', name: 'Veterinary' },
] as const

export const studyAreaName = (code?: string | null) => studyAreas.find((a) => a.code === code)?.name
