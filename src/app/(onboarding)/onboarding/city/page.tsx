import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { pakistanCities, topCities } from '@/lib/pk-cities'
import { getCurrentStudent } from '@/lib/student-auth'
import { OnboardingShell } from '../OnboardingShell'
import { STEP_PATHS } from '../steps'
import { CityPicker } from './CityPicker'

export const metadata: Metadata = { title: 'Your City' }

export default async function CityStep() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  if (!student.name || !student.phone) redirect('/account/complete')
  if (!student.destination) redirect(STEP_PATHS.destination)
  if (!student.studyLevel) redirect(STEP_PATHS.level)
  if (!student.studyArea) redirect(STEP_PATHS.area)

  return (
    <OnboardingShell step={4} backHref={STEP_PATHS.area} title="Which city do you live in?">
      <CityPicker top={topCities} cities={pakistanCities} selected={student.city ?? null} />
    </OnboardingShell>
  )
}
