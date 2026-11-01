import { studentNextPath } from '@/lib/student-auth'
import type { Student } from '@/payload-types'

/** Dates in Pakistan time, e.g. "30 Oct 2026, 21:21". */
export const formatDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' }) : '—'

const progress: Record<string, string> = {
  '/account/complete': 'No name/phone yet',
  '/onboarding/destination': 'Stopped before step 1',
  '/onboarding/level': 'Stopped at step 2 of 5',
  '/onboarding/area': 'Stopped at step 3 of 5',
  '/onboarding/city': 'Stopped at step 4 of 5',
  '/onboarding/office': 'Stopped at step 5 of 5',
}

/** How far the student got through sign-up, or null when they finished it. */
export const signupProgress = (student: Student) => progress[studentNextPath(student)] ?? null
