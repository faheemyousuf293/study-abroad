import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { destinations } from '@/lib/countries'
import { getCurrentStudent } from '@/lib/student-auth'
import { OnboardingShell } from '../OnboardingShell'
import { OptionPicker } from '../OptionPicker'
import { chooseDestinationAction } from '../actions'

export const metadata: Metadata = { title: 'Choose Your Study Destination' }

export default async function DestinationStep() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  if (!student.name || !student.phone) redirect('/account/complete')

  return (
    <OnboardingShell step={1} backHref="/account" title="Select your preferred study destination">
      <OptionPicker
        name="destination"
        options={destinations.map((d) => ({ ...d, flag: true }))}
        selected={student.destination ?? null}
        action={chooseDestinationAction}
        searchLabel="Search countries"
      />
    </OnboardingShell>
  )
}
