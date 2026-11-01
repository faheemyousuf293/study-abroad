import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * Admins manage the whole site in the CMS admin panel.
 * Staff only work with student applications on the website at /staff and never get into the admin panel.
 * Students live in their own collection (see Students.ts).
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'roles', 'createdAt'],
  },
  auth: {
    tokenExpiration: 60 * 60 * 10, // a working day, so staff aren't signed out mid-shift
  },
  access: {
    // Only admins manage users; everyone else may only see their own account.
    // `collection` is checked because signed-in students are also `req.user` (from the students collection).
    read: ({ req: { user } }) => isAdmin(user) || (user?.collection === 'users' ? { id: { equals: user.id } } : false),
    create: ({ req: { user } }) => isAdmin(user),
    update: ({ req: { user } }) => isAdmin(user) || (user?.collection === 'users' ? { id: { equals: user.id } } : false),
    delete: ({ req: { user } }) => isAdmin(user),
    // Only admins may open the CMS admin panel; staff use /staff instead.
    admin: ({ req: { user } }) => isAdmin(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['staff'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
      ],
      admin: { description: 'Admins manage the whole site here. Staff sign in at /staff to work with student applications only.' },
      // Users may edit their own account, but only admins can change roles.
      access: { update: ({ req: { user } }) => isAdmin(user) },
    },
  ],
}
