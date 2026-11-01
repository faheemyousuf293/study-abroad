import type { Access } from 'payload'

type MaybeUser = { collection?: string; roles?: string[] | null } | null | undefined

/** True only for CMS users with the admin role (signed-in students are never admins). */
export const isAdmin = (user: MaybeUser) => user?.collection === 'users' && Boolean(user.roles?.includes('admin'))

/** Admins and staff: users who may work with student applications on the /staff pages. */
export const isStaff = (user: MaybeUser) =>
  user?.collection === 'users' && Boolean(user.roles?.some((r) => r === 'admin' || r === 'staff'))

export const adminOnly: Access = ({ req: { user } }) => isAdmin(user as MaybeUser)

export const staffOnly: Access = ({ req: { user } }) => isStaff(user as MaybeUser)
