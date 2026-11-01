import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { studyAreas } from '@/lib/study-areas'
import { getCurrentStudent } from '@/lib/student-auth'
import { OnboardingShell } from '../OnboardingShell'
import { OptionPicker } from '../OptionPicker'
import { chooseAreaAction } from '../actions'
import { STEP_PATHS } from '../steps'

export const metadata: Metadata = { title: 'Choose Your Study Area' }

export default async function AreaStep() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  if (!student.name || !student.phone) redirect('/account/complete')
  if (!student.destination) redirect(STEP_PATHS.destination)
  if (!student.studyLevel) redirect(STEP_PATHS.level)

  return (
    <OnboardingShell step={3} backHref={STEP_PATHS.level} title="Select your preferred study area">
      <OptionPicker
        name="studyArea"
        options={studyAreas.map((a) => ({ ...a }))}
        selected={student.studyArea ?? null}
        action={chooseAreaAction}
        searchLabel="Search study areas"
      />
    </OnboardingShell>
  )
}
