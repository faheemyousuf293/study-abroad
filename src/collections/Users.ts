import type { CollectionConfig } from 'payload'

/**
 * Single auth collection for everyone who logs in.
 * Only `admin` exists for now. Later iterations add `partner` and `student`
 * by extending the `roles` options and the access functions below.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'createdAt'],
  },
  auth: true,
  access: {
    // Only admins can manage users from the CMS for now.
    read: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')) || (user ? { id: { equals: user.id } } : false),
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')) || (user ? { id: { equals: user.id } } : false),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    // Only users with the admin role may open the CMS admin panel.
    admin: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
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
      defaultValue: ['admin'],
      saveToJWT: true,
      options: [{ label: 'Admin', value: 'admin' }],
    },
  ],
}
