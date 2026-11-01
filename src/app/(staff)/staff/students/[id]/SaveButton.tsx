'use client'

import { useFormStatus } from 'react-dom'

export function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn-cta" disabled={pending}>
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  )
}
