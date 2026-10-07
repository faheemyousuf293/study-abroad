import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true, update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')) },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'YourBrand' },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Optional. Text logo is shown when empty.' } },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: ['facebook', 'instagram', 'linkedin', 'x', 'youtube'],
        },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
    { name: 'copyright', type: 'text', localized: true, defaultValue: 'YourBrand 2026' },
  ],
}
