import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true, update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')) },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      admin: { description: 'Main navigation. Add children to make a dropdown.' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', defaultValue: '#' },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', defaultValue: '#' },
          ],
        },
      ],
    },
    {
      name: 'actions',
      type: 'array',
      admin: { description: 'Right-hand links and buttons (partner link, login, booking button).' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', defaultValue: '#' },
        { name: 'style', type: 'select', defaultValue: 'link', options: ['link', 'button'] },
      ],
    },
  ],
}
