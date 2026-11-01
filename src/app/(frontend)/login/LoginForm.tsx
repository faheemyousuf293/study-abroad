'use client'

import { useActionState, useEffect, useState } from 'react'
import { loginAction, type LoginState } from './actions'

const initial: LoginState = { step: 'email', email: '' }

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial)
  const [wait, setWait] = useState(0)

  // Count down until "Resend code" becomes available again.
  useEffect(() => {
    setWait(state.retryIn ?? 0)
  }, [state])
  useEffect(() => {
    if (wait <= 0) return
    const t = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(t)
  }, [wait])

  if (state.step === 'email') {
    return (
      <form action={formAction} className="auth-form" noValidate>
        <h1>Sign in to continue</h1>
        <p className="auth-lead">Enter your email address and we&apos;ll send you a 6-digit verification code.</p>
        <label htmlFor="email">Email Address*</label>
        <div className="auth-input">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter Email"
            defaultValue={state.email}
            required
            autoFocus
          />
          <MailIcon />
        </div>
        {state.error ? <p className="auth-error" role="alert">{state.error}</p> : null}
        <button type="submit" name="intent" value="send" className="btn btn-cta auth-submit" disabled={pending}>
          {pending ? 'Sending…' : 'Continue'} <span aria-hidden="true">→</span>
        </button>
        <p className="auth-foot">New here? Just enter your email — your account is created automatically.</p>
      </form>
    )
  }

  return (
    <form action={formAction} className="auth-form" noValidate>
      <input type="hidden" name="email" value={state.email} />
      <h1>Check your email</h1>
      <p className="auth-lead">
        We sent a 6-digit code to <strong>{state.email}</strong>. It expires in 10 minutes.
      </p>
      <label htmlFor="code">Verification Code*</label>
      <div className="auth-input">
        <input
          key={state.email}
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="Enter 6-digit code"
          className="auth-code"
          required
          autoFocus
        />
      </div>
      {state.error ? <p className="auth-error" role="alert">{state.error}</p> : null}
      {state.notice && !state.error ? <p className="auth-notice" role="status">{state.notice}</p> : null}
      <button type="submit" name="intent" value="verify" className="btn btn-cta auth-submit" disabled={pending}>
        {pending ? 'Checking…' : 'Verify & Sign In'} <span aria-hidden="true">→</span>
      </button>
      <div className="auth-links">
        <button type="submit" name="intent" value="resend" className="auth-link" disabled={pending || wait > 0} formNoValidate>
          {wait > 0 ? `Resend code in ${wait}s` : 'Resend code'}
        </button>
        <button type="submit" name="intent" value="change" className="auth-link" disabled={pending} formNoValidate>
          Use a different email
        </button>
      </div>
    </form>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  )
}
