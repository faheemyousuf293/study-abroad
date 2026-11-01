import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Student } from '@/payload-types'

/** How long an emailed code stays valid, how often it can be resent, and how many guesses are allowed. */
export const CODE_TTL_MINUTES = 10
export const RESEND_COOLDOWN_SECONDS = 60
const MAX_ATTEMPTS = 5

export const normalizeEmail = (email: string) => email.trim().toLowerCase()

const hashCode = (email: string, code: string) =>
  createHmac('sha256', process.env.PAYLOAD_SECRET || '').update(`${email}:${code}`).digest('hex')

/** The signed-in student for the current request, or null (admins are not students). */
export async function getCurrentStudent(): Promise<Student | null> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return user?.collection === 'students' ? (user as Student) : null
}

export type SendResult = { ok: true } | { ok: false; error: string; retryIn?: number }

/** Creates a fresh code for `email`, replacing any earlier one, and sends it. */
export async function sendLoginCode(email: string): Promise<SendResult> {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'login-codes',
    where: { email: { equals: email } },
    sort: '-createdAt',
    limit: 1,
    overrideAccess: true,
  })
  const last = existing.docs[0]
  if (last) {
    const elapsed = (Date.now() - new Date(last.createdAt).getTime()) / 1000
    if (elapsed < RESEND_COOLDOWN_SECONDS) {
      const retryIn = Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed)
      return { ok: false, error: `Please wait ${retryIn} seconds before requesting a new code.`, retryIn }
    }
  }

  const code = randomInt(0, 1_000_000).toString().padStart(6, '0')
  await payload.delete({ collection: 'login-codes', where: { email: { equals: email } }, overrideAccess: true })
  await payload.create({
    collection: 'login-codes',
    data: {
      email,
      codeHash: hashCode(email, code),
      expiresAt: new Date(Date.now() + CODE_TTL_MINUTES * 60_000).toISOString(),
      attempts: 0,
    },
    overrideAccess: true,
  })

  const { siteName } = await payload.findGlobal({ slug: 'site-settings' })
  try {
    await payload.sendEmail({
      to: email,
      subject: `${code} is your ${siteName} sign-in code`,
      text: `Your sign-in code is ${code}. It expires in ${CODE_TTL_MINUTES} minutes. If you didn't request it, you can ignore this email.`,
      html: `<p>Your sign-in code is</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>It expires in ${CODE_TTL_MINUTES} minutes. If you didn't request it, you can ignore this email.</p>`,
    })
  } catch (err) {
    // e.g. wrong SMTP password or Gmail's daily sending limit. Drop the code so the student can retry straight away.
    payload.logger.error({ err, msg: `Could not send sign-in code to ${email}` })
    await payload.delete({ collection: 'login-codes', where: { email: { equals: email } }, overrideAccess: true })
    return { ok: false, error: "We couldn't send the email right now. Please try again in a few minutes." }
  }
  // Until a real email adapter is configured, print the code so sign-in can be tested from the terminal.
  if (payload.email?.name === 'console') {
    payload.logger.info(`Student sign-in code for ${email}: ${code}`)
  }
  return { ok: true }
}

export type VerifyResult = { ok: true; token: string; exp: number; student: Student } | { ok: false; error: string }

/**
 * Checks the code and, when it matches, signs the student in (creating the account on first sign-in).
 * Students have no password of their own: a random one is set and used once for Payload's normal login,
 * so sessions and tokens work exactly like the admin login.
 */
export async function verifyLoginCode(email: string, code: string): Promise<VerifyResult> {
  const payload = await getPayload({ config })
  const invalid = { ok: false as const, error: 'That code is incorrect or has expired. Please try again or request a new code.' }

  const { docs } = await payload.find({
    collection: 'login-codes',
    where: { email: { equals: email } },
    sort: '-createdAt',
    limit: 1,
    overrideAccess: true,
  })
  const pending = docs[0]
  if (!pending || new Date(pending.expiresAt).getTime() < Date.now()) return invalid

  const expected = Buffer.from(pending.codeHash, 'hex')
  const actual = Buffer.from(hashCode(email, code), 'hex')
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    const attempts = (pending.attempts ?? 0) + 1
    if (attempts >= MAX_ATTEMPTS) {
      await payload.delete({ collection: 'login-codes', id: pending.id, overrideAccess: true })
      return { ok: false, error: 'Too many incorrect attempts. Please request a new code.' }
    }
    await payload.update({ collection: 'login-codes', id: pending.id, data: { attempts }, overrideAccess: true })
    return invalid
  }

  await payload.delete({ collection: 'login-codes', where: { email: { equals: email } }, overrideAccess: true })

  const password = randomBytes(32).toString('hex')
  const found = await payload.find({ collection: 'students', where: { email: { equals: email } }, limit: 1, overrideAccess: true })
  if (found.docs[0]) {
    await payload.update({ collection: 'students', id: found.docs[0].id, data: { password }, overrideAccess: true })
  } else {
    await payload.create({ collection: 'students', data: { email, password }, overrideAccess: true })
  }
  const { token, exp, user } = await payload.login({ collection: 'students', data: { email, password } })
  if (!token || !exp) return { ok: false, error: 'Something went wrong while signing you in. Please try again.' }
  return { ok: true, token, exp, student: user as Student }
}

/** Cookie name and options matching Payload's own auth cookie. */
export async function authCookie() {
  const payload = await getPayload({ config })
  return {
    name: `${payload.config.cookiePrefix}-token`,
    secure: (payload.config.serverURL || '').startsWith('https://'),
  }
}

/** Where a signed-in student should continue: profile details first, then the onboarding steps, then their account. */
export function studentNextPath(student: Pick<Student, 'name' | 'phone' | 'destination' | 'studyLevel' | 'studyArea' | 'city' | 'office'>) {
  if (!student.name || !student.phone) return '/account/complete'
  if (!student.destination) return '/onboarding/destination'
  if (!student.studyLevel) return '/onboarding/level'
  if (!student.studyArea) return '/onboarding/area'
  if (!student.city) return '/onboarding/city'
  if (!student.office) return '/onboarding/office'
  return '/account'
}
