import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentStudent } from '@/lib/student-auth'
import { ProfileForm } from './ProfileForm'

export const metadata: Metadata = { title: 'Complete Your Profile' }

export default async function CompleteProfilePage() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')
  return (
    <section className="auth-page">
      <div className="auth-card">
        <ProfileForm email={student.email} name={student.name ?? ''} phone={student.phone ?? ''} />
      </div>
    </section>
  )
}
