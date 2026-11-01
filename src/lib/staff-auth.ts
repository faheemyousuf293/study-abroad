import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { isStaff } from '@/access'
import type { User } from '@/payload-types'

/** The signed-in staff member (or admin) for the current request, or null. */
export async function getCurrentStaff(): Promise<User | null> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return user?.collection === 'users' && isStaff(user) ? (user as User) : null
}

/** Like getCurrentStaff, but sends visitors who aren't staff to the staff sign-in page. */
export async function requireStaff(): Promise<User> {
  const staff = await getCurrentStaff()
  if (!staff) redirect('/staff/login')
  return staff
}

/** Admins and staff, for the "Assigned to" picker. */
export async function getStaffMembers() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'users',
    where: { roles: { in: ['staff', 'admin'] } },
    sort: 'name',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })
  return docs.map((u) => ({ id: u.id, name: u.name || u.email }))
}
