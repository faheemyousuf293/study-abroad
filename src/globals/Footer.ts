import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true, update: adminOnly },
  fields: [
    { name: 'aboutTitle', type: 'text', localized: true, defaultValue: 'ScholarshipHive Edutancy' },
    {
      name: 'aboutText',
      type: 'textarea',
      localized: true,
      admin: { description: 'Wrap words in **double asterisks** to make them bold.' },
    },
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
    { name: 'officesTitle', type: 'text', localized: true, defaultValue: 'Our Offices' },
    {
      name: 'offices',
      type: 'array',
      maxRows: 6,
      admin: { description: 'Office cards with an embedded Google map, shown above the bottom bar.' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, admin: { description: 'e.g. Lahore' } },
        { name: 'address', type: 'textarea', required: true },
        {
          name: 'mapQuery',
          type: 'text',
          admin: {
            description:
              'Optional. What to search on Google Maps for the pin (a place name, plus code or "lat,lng"). Uses the address when empty.',
          },
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
