import type { CollectionConfig } from 'payload'

/**
 * Pending one-time sign-in codes for students. Only a hash of the code is stored.
 * Rows are created and removed by src/lib/student-auth.ts; nobody reads them through the API.
 */
export const LoginCodes: CollectionConfig = {
  slug: 'login-codes',
  admin: { hidden: true },
  access: {
    read: () => false,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'codeHash', type: 'text', required: true },
    { name: 'expiresAt', type: 'date', required: true },
    { name: 'attempts', type: 'number', defaultValue: 0 },
  ],
}
