import type { CollectionConfig } from 'payload'
import { pageBlocks } from '../blocks'
import { adminOnly, isAdmin } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  access: {
    // Public visitors only ever see published pages; admins also see drafts.
    read: ({ req: { user } }) => (isAdmin(user) ? true : { _status: { equals: 'published' } }),
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Use "home" for the homepage.' },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      localized: true,
      blocks: pageBlocks,
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
