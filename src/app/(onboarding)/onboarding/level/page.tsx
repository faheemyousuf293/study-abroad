import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { studyLevels } from '@/lib/study-levels'
import { getCurrentStudent } from '@/lib/student-auth'
import { OnboardingShell } from '../OnboardingShell'
import { OptionPicker } from '../OptionPicker'
import { chooseLevelAction } from '../actions'
import { STEP_PATHS } from '../steps'

export const metadata: Metadata = { title: 'Choose Your Study Level' }

export default async function LevelStep() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  if (!student.name || !student.phone) redirect('/account/complete')
  if (!student.destination) redirect(STEP_PATHS.destination)

  return (
    <OnboardingShell step={2} backHref={STEP_PATHS.destination} title="Select your preferred study level">
      <OptionPicker
        name="studyLevel"
        options={studyLevels.map((l) => ({ ...l }))}
        selected={student.studyLevel ?? null}
        action={chooseLevelAction}
        searchLabel="Search study levels"
      />
    </OnboardingShell>
  )
}
