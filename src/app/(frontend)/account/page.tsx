import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { destinationName } from '@/lib/countries'
import { studyLevelName } from '@/lib/study-levels'
import { studyAreaName } from '@/lib/study-areas'
import { getCurrentStudent, studentNextPath } from '@/lib/student-auth'
import { logoutAction } from '../login/actions'

export const metadata: Metadata = { title: 'My Account' }

type Props = { searchParams: Promise<{ welcome?: string }> }

/** The student's page: what they told us in onboarding, and what happens next. */
export default async function AccountPage({ searchParams }: Props) {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  if (!student.name || !student.phone) redirect('/account/complete')

  const { welcome } = await searchParams
  const nextPath = studentNextPath(student)
  const complete = nextPath === '/account'

  const answers = [
    { label: 'Destination', value: student.destination && destinationName(student.destination), href: '/onboarding/destination' },
    { label: 'Study level', value: student.studyLevel && studyLevelName(student.studyLevel), href: '/onboarding/level' },
    { label: 'Study area', value: student.studyArea && studyAreaName(student.studyArea), href: '/onboarding/area' },
    { label: 'City', value: student.city, href: '/onboarding/city' },
    { label: 'Nearest office', value: student.office, href: '/onboarding/office' },
  ]

  return (
    <section className="auth-page">
      <div className="auth-card account-card">
        <h1>{complete && welcome ? "You're all set" : 'Welcome'}, {student.name.split(' ')[0]}!</h1>
        {complete ? (
          <div className="account-next" role="status">
            <strong>What happens next?</strong>
            <p>
              A counsellor from our {student.office} office will call you on <b>{student.phone}</b> to help you find the
              right universities and courses. Keep your phone handy!
            </p>
          </div>
        ) : (
          <p className="auth-lead">Your student account is ready. Here&apos;s what you&apos;ve told us so far.</p>
        )}
        <dl className="account-details">
          <dt>Name</dt>
          <dd>{student.name}</dd>
          <dt>Email</dt>
          <dd>{student.email}</dd>
          <dt>Phone</dt>
          <dd>{student.phone}</dd>
          {answers.map((a) => (
            <div key={a.label} className="account-row">
              <dt>{a.label}</dt>
              <dd>
                {a.value ? (
                  <>
                    {a.value}{' '}
                    <Link href={a.href} className="auth-link">
                      Change
                    </Link>
                  </>
                ) : (
                  'Not chosen yet'
                )}
              </dd>
            </div>
          ))}
        </dl>
        {!complete ? (
          <Link href={nextPath} className="btn btn-cta auth-submit account-continue">
            Continue your application <span aria-hidden="true">→</span>
          </Link>
        ) : null}
        <form action={logoutAction}>
          <button type="submit" className="auth-link">
            Log out
          </button>
        </form>
      </div>
    </section>
  )
}
