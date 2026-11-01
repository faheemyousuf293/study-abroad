import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentStudent } from '@/lib/student-auth'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = { title: 'Student Sign In' }

export default async function LoginPage() {
  if (await getCurrentStudent()) redirect('/account')
  return (
    <section className="auth-page">
      <div className="auth-card">
        <LoginForm />
      </div>
    </section>
  )
}
