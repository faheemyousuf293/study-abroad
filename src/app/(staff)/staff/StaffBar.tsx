import Link from 'next/link'
import { getSiteChrome } from '@/lib/content'
import type { User } from '@/payload-types'
import { staffLogoutAction } from './actions'

/** Top bar of the staff area: logo, the signed-in staff member and log out. */
export async function StaffBar({ staff }: { staff: User }) {
  const { settings } = await getSiteChrome()
  const logo = typeof settings.logo === 'object' ? settings.logo : null

  return (
    <header className="staff-bar">
      <Link href="/staff" className="staff-brand">
        {logo?.url ? <img src={logo.url} alt={settings.siteName} height={40} /> : <span>{settings.siteName}</span>}
        <span className="staff-tag">Staff</span>
      </Link>
      <div className="staff-user">
        <span>{staff.name || staff.email}</span>
        <form action={staffLogoutAction}>
          <button type="submit" className="auth-link">
            Log out
          </button>
        </form>
      </div>
    </header>
  )
}
