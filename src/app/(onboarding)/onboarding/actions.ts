'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { destinations } from '@/lib/countries'
import { studyLevels } from '@/lib/study-levels'
import { studyAreas } from '@/lib/study-areas'
import { pakistanCities } from '@/lib/pk-cities'
import { getCurrentStudent } from '@/lib/student-auth'
import { getOffices } from '@/lib/offices'
import type { Student } from '@/payload-types'
import { STEP_PATHS } from './steps'

/** Saves one onboarding answer for the signed-in student, then moves to `next`. */
async function saveStep(data: Partial<Student>, next: string) {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  // The first time the last step is answered, the sign-up is complete and appears as new for staff.
  if (data.office && !student.onboardingCompletedAt) data = { ...data, onboardingCompletedAt: new Date().toISOString() }
  const payload = await getPayload({ config })
  await payload.update({ collection: 'students', id: student.id, data, overrideAccess: true })
  redirect(next)
}

export async function chooseDestinationAction(formData: FormData) {
  const country = destinations.find((d) => d.code === formData.get('destination'))
  if (!country) redirect(STEP_PATHS.destination)
  await saveStep({ destination: country.code }, STEP_PATHS.level)
}

export async function chooseLevelAction(formData: FormData) {
  const level = studyLevels.find((l) => l.code === formData.get('studyLevel'))
  if (!level) redirect(STEP_PATHS.level)
  await saveStep({ studyLevel: level.code }, STEP_PATHS.area)
}

export async function chooseAreaAction(formData: FormData) {
  const area = studyAreas.find((a) => a.code === formData.get('studyArea'))
  if (!area) redirect(STEP_PATHS.area)
  await saveStep({ studyArea: area.code }, STEP_PATHS.city)
}

export async function chooseCityAction(formData: FormData) {
  const typed = String(formData.get('city') || '').trim().replace(/\s+/g, ' ')
  if (typed.length < 2 || typed.length > 60) redirect(STEP_PATHS.city)
  // Use the list spelling when the student typed a listed city in a different case.
  const listed = pakistanCities.find((c) => c.toLowerCase() === typed.toLowerCase())
  await saveStep({ city: listed ?? typed }, STEP_PATHS.office)
}

export async function chooseOfficeAction(formData: FormData) {
  const office = (await getOffices()).find((o) => o.code === formData.get('office'))
  if (!office) redirect(STEP_PATHS.office)
  await saveStep({ office: office.name }, `${STEP_PATHS.done}?welcome=1`)
}
