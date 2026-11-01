import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getOffices } from '@/lib/offices'
import { getCurrentStudent } from '@/lib/student-auth'
import { OnboardingShell } from '../OnboardingShell'
import { OptionPicker } from '../OptionPicker'
import { chooseOfficeAction } from '../actions'
import { STEP_PATHS } from '../steps'

export const metadata: Metadata = { title: 'Your Nearest Office' }

export default async function OfficeStep() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  if (!student.name || !student.phone) redirect('/account/complete')
  if (!student.destination) redirect(STEP_PATHS.destination)
  if (!student.studyLevel) redirect(STEP_PATHS.level)
  if (!student.studyArea) redirect(STEP_PATHS.area)
  if (!student.city) redirect(STEP_PATHS.city)

  const offices = await getOffices()

  return (
    <OnboardingShell step={5} backHref={STEP_PATHS.city} title="Which office is nearest to you?">
      <OptionPicker
        name="office"
        options={offices.map((o) => ({ code: o.code, name: o.name, detail: o.address.split('\n')[0] }))}
        selected={student.office ?? null}
        action={chooseOfficeAction}
        searchLabel="Search offices"
        searchable={false}
      />
    </OnboardingShell>
  )
}
