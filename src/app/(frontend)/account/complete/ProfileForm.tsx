'use client'

import { useActionState } from 'react'
import { completeProfileAction, type ProfileState } from '../../login/actions'

export function ProfileForm({ email, name, phone }: { email: string; name: string; phone: string }) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(completeProfileAction, { name, phone })

  return (
    <form action={formAction} className="auth-form" noValidate>
      <h1>Tell us about you</h1>
      <p className="auth-lead">
        You&apos;re signed in as <strong>{email}</strong>. Just two details so our counsellors can reach you.
      </p>
      <label htmlFor="name">Full Name*</label>
      <div className="auth-input">
        <input id="name" name="name" autoComplete="name" placeholder="Enter your full name" defaultValue={state.name} required autoFocus />
      </div>
      <label htmlFor="phone">Phone Number*</label>
      <div className="auth-input">
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="e.g. +92 300 1234567" defaultValue={state.phone} required />
      </div>
      {state.error ? <p className="auth-error" role="alert">{state.error}</p> : null}
      <button type="submit" className="btn btn-cta auth-submit" disabled={pending}>
        {pending ? 'Saving…' : 'Continue'} <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}
