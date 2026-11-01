import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentStaff } from '@/lib/staff-auth'
import { StaffLoginForm } from './StaffLoginForm'

export const metadata: Metadata = { title: 'Sign In' }

export default async function StaffLoginPage() {
  if (await getCurrentStaff()) redirect('/staff')
  return (
    <section className="auth-page staff-login">
      <div className="auth-card">
        <StaffLoginForm />
      </div>
    </section>
  )
}
