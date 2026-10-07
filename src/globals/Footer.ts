import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true, update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')) },
  fields: [
    { name: 'aboutTitle', type: 'text', localized: true, defaultValue: 'About YourBrand' },
    { name: 'aboutText', type: 'textarea', localized: true },
    {
      name: 'columns',
      type: 'array',
      maxRows: 5,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', defaultValue: '#' },
            { name: 'badge', type: 'text', localized: true, admin: { description: 'Optional small tag, e.g. "New"' } },
          ],
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}
