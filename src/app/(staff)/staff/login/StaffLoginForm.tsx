'use client'

import { useActionState } from 'react'
import { staffLoginAction, type StaffLoginState } from '../actions'

export function StaffLoginForm() {
  const [state, formAction, pending] = useActionState<StaffLoginState, FormData>(staffLoginAction, { email: '' })

  return (
    <form action={formAction} className="auth-form" noValidate>
      <h1>Staff sign in</h1>
      <p className="auth-lead">Sign in to see and follow up student applications.</p>
      <label htmlFor="email">Email</label>
      <div className="auth-input">
        <input id="email" name="email" type="email" autoComplete="username" defaultValue={state.email} required autoFocus />
      </div>
      <label htmlFor="password">Password</label>
      <div className="auth-input">
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {state.error ? <p className="auth-error" role="alert">{state.error}</p> : null}
      <button type="submit" className="btn btn-cta auth-submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'} <span aria-hidden="true">→</span>
      </button>
      <p className="auth-foot">Forgot your password? Ask your manager to reset it.</p>
    </form>
  )
}
