'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload, createLocalReq, logoutOperation } from 'payload'
import config from '@payload-config'
import { isStaff } from '@/access'
import { applicationStatuses } from '@/lib/application-status'
import { destinations } from '@/lib/countries'
import { studyLevels } from '@/lib/study-levels'
import { studyAreas } from '@/lib/study-areas'
import { getOffices } from '@/lib/offices'
import { authCookie, normalizeEmail } from '@/lib/student-auth'
import { getCurrentStaff, getStaffMembers, requireStaff } from '@/lib/staff-auth'
import type { Student } from '@/payload-types'

export type StaffLoginState = { email: string; error?: string }

export async function staffLoginAction(_prev: StaffLoginState, formData: FormData): Promise<StaffLoginState> {
  const email = normalizeEmail(String(formData.get('email') || ''))
  const password = String(formData.get('password') || '')
  if (!email || !password) return { email, error: 'Please enter your email and password.' }

  const payload = await getPayload({ config })
  let result
  try {
    result = await payload.login({ collection: 'users', data: { email, password } })
  } catch (err) {
    // Payload locks an account for a while after too many wrong passwords.
    const locked = err instanceof Error && err.name === 'LockedAuth'
    return {
      email,
      error: locked
        ? 'Too many failed attempts. Please wait 10 minutes and try again.'
        : 'Incorrect email or password.',
    }
  }
  const { token, exp, user } = result
  if (!token || !exp || !isStaff({ collection: 'users', roles: user?.roles })) {
    return { email, error: 'Incorrect email or password.' }
  }

  const { name, secure } = await authCookie()
  ;(await cookies()).set(name, token, { httpOnly: true, sameSite: 'lax', secure, path: '/', expires: new Date(exp * 1000) })
  redirect('/staff')
}

export async function staffLogoutAction() {
  const staff = await getCurrentStaff()
  if (staff) {
    // Ends this session on the server too, not just in the browser.
    const payload = await getPayload({ config })
    const req = await createLocalReq({ user: { ...staff, collection: 'users' } }, payload)
    await logoutOperation({ collection: payload.collections.users, req })
  }
  const { name } = await authCookie()
  ;(await cookies()).delete(name)
  redirect('/staff/login')
}

/** Picks `value` if it's one of the allowed codes; an empty value clears the field. */
function oneOf<T extends string>(value: FormDataEntryValue | null, allowed: readonly string[]): T | null | undefined {
  const v = String(value ?? '')
  if (!v) return null
  return allowed.includes(v) ? (v as T) : undefined
}

export async function updateStudentAction(formData: FormData) {
  const staff = await requireStaff()
  const id = Number(formData.get('id'))
  if (!Number.isInteger(id)) redirect('/staff')

  const text = (key: string, max = 120) => String(formData.get(key) || '').trim().replace(/\s+/g, ' ').slice(0, max) || null
  const [offices, team] = await Promise.all([getOffices(), getStaffMembers()])
  const assigned = Number(formData.get('assignedTo'))

  const data: Partial<Student> = {
    name: text('name'),
    phone: text('phone', 40),
    city: text('city', 60),
    notes: String(formData.get('notes') || '').trim().slice(0, 10000) || null,
    assignedTo: team.some((m) => m.id === assigned) ? assigned : null,
  }
  const status = oneOf<NonNullable<Student['status']>>(formData.get('status'), applicationStatuses.map((s) => s.value))
  if (status) data.status = status
  const destination = oneOf<NonNullable<Student['destination']>>(formData.get('destination'), destinations.map((d) => d.code))
  if (destination !== undefined) data.destination = destination
  const studyLevel = oneOf<NonNullable<Student['studyLevel']>>(formData.get('studyLevel'), studyLevels.map((l) => l.code))
  if (studyLevel !== undefined) data.studyLevel = studyLevel
  const studyArea = oneOf<NonNullable<Student['studyArea']>>(formData.get('studyArea'), studyAreas.map((a) => a.code))
  if (studyArea !== undefined) data.studyArea = studyArea
  // Offices removed from the footer since the student chose them are kept as they are.
  const office = text('office', 120)
  if (!office || offices.some((o) => o.name === office) || office === formData.get('currentOffice')) data.office = office

  const payload = await getPayload({ config })
  // Runs with the staff member's own permissions, so collection and field access rules still apply.
  await payload.update({ collection: 'students', id, data, user: { ...staff, collection: 'users' }, overrideAccess: false })
  redirect(`/staff/students/${id}?saved=1`)
}
