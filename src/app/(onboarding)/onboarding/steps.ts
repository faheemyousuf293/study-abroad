/** Total number of onboarding steps shown in "Step X of N" and the progress bar. */
export const ONBOARDING_STEPS = 5

/** Step routes in order. `done` is where students land after the last step. */
export const STEP_PATHS = {
  destination: '/onboarding/destination',
  level: '/onboarding/level',
  area: '/onboarding/area',
  city: '/onboarding/city',
  office: '/onboarding/office',
  done: '/account',
} as const
