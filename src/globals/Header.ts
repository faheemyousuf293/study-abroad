import type { Field, GlobalConfig } from 'payload'
import { adminOnly } from '../access'

const hidden: Field = {
  name: 'hidden',
  type: 'checkbox',
  defaultValue: false,
  admin: { description: 'Hide from the site without deleting it.' },
}

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true, update: adminOnly },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      admin: { description: 'Main navigation. Add children to make a dropdown.' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', defaultValue: '#' },
        hidden,
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', defaultValue: '#' },
            hidden,
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
        hidden,
      ],
    },
  ],
}
