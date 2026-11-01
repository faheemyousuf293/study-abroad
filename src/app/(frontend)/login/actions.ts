'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload, createLocalReq, logoutOperation } from 'payload'
import config from '@payload-config'
import {
  authCookie,
  getCurrentStudent,
  normalizeEmail,
  sendLoginCode,
  studentNextPath,
  verifyLoginCode,
  RESEND_COOLDOWN_SECONDS,
} from '@/lib/student-auth'

export type LoginState = {
  step: 'email' | 'code'
  email: string
  error?: string
  notice?: string
  /** Seconds until "Resend code" is allowed. */
  retryIn?: number
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** One action drives both steps of the sign-in form; `intent` says which button was pressed. */
export async function loginAction(prev: LoginState, formData: FormData): Promise<LoginState> {
  const intent = String(formData.get('intent') || 'send')
  const email = normalizeEmail(String(formData.get('email') || prev.email || ''))

  if (intent === 'change') return { step: 'email', email }

  if (intent === 'send' || intent === 'resend') {
    if (!EMAIL_RE.test(email)) return { step: 'email', email, error: 'Please enter a valid email address.' }
    const sent = await sendLoginCode(email)
    if (!sent.ok) {
      // A cooldown means a code is already waiting, so move on to the code screen.
      // A failed send on the first step stays on the email screen.
      const step = sent.retryIn || intent === 'resend' ? 'code' : 'email'
      return { step, email, error: sent.error, retryIn: sent.retryIn }
    }
    return {
      step: 'code',
      email,
      notice: intent === 'resend' ? 'A new code has been sent.' : undefined,
      retryIn: RESEND_COOLDOWN_SECONDS,
    }
  }

  // intent === 'verify'
  const code = String(formData.get('code') || '').replace(/\D/g, '')
  if (code.length !== 6) return { step: 'code', email, error: 'Please enter the 6-digit code.' }
  const result = await verifyLoginCode(email, code)
  if (!result.ok) return { step: 'code', email, error: result.error }

  const { name, secure } = await authCookie()
  ;(await cookies()).set(name, result.token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    expires: new Date(result.exp * 1000),
  })
  redirect(studentNextPath(result.student))
}

export type ProfileState = { error?: string; name?: string; phone?: string }

export async function completeProfileAction(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const student = await getCurrentStudent()
  if (!student) redirect('/login')

  const name = String(formData.get('name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  if (name.length < 2) return { name, phone, error: 'Please enter your full name.' }
  if (phone.replace(/\D/g, '').length < 10) return { name, phone, error: 'Please enter a valid phone number.' }

  const payload = await getPayload({ config })
  await payload.update({ collection: 'students', id: student.id, data: { name, phone }, overrideAccess: true })
  redirect(studentNextPath({ ...student, name, phone }))
}

export async function logoutAction() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (user?.collection === 'students') {
    // Ends this session on the server too, not just in the browser.
    const req = await createLocalReq({ user }, payload)
    await logoutOperation({ collection: payload.collections.students, req })
  }
  const { name } = await authCookie()
  ;(await cookies()).delete(name)
  redirect('/')
}
