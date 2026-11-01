/** Footer content used by the seed. */
import type { Footer, SiteSetting } from './payload-types'

const L = (label: string, href = '#') => ({ label, href })

export const copyright = '2026 ScholarshipHive Edutancy. All Rights Reserved. Designed for Future Global Leaders.'

export const socials: NonNullable<SiteSetting['socials']> = [
  { platform: 'instagram', url: '#' },
  { platform: 'facebook', url: '#' },
  { platform: 'whatsapp', url: '#' },
]

export const footerData: Omit<Footer, 'id'> = {
  aboutTitle: 'ScholarshipHive Edutancy',
  aboutText:
    'Have questions about studying abroad? Contact **ScholarshipHive Edutancy, trusted Study Abroad Consultants in Pakistan**, today. Our experienced consultants are ready to help you choose the right university, scholarship, and visa pathway. Contact us today to start your journey.',
  columns: [
    {
      title: 'Company',
      links: [
        L('About Us'),
        { ...L('Careers'), badge: "We're hiring" },
        L('Blog'),
        L('Contact Us'),
        L('Privacy Policy', '/privacy-policy'),
      ],
    },
    {
      title: 'Services',
      links: [L('Study Visa'), L('Scholarship Applications'), L('IELTS Training')],
    },
  ],
  officesTitle: 'Our Offices',
  offices: [
    {
      title: 'Lahore',
      address: '4, Block R, 3 Khayaban-e-Firdousi, Block R3\nBlock R 3 Phase 2 Johar Town, Lahore, 54782, Pakistan',
    },
    { title: 'Islamabad', address: 'P3CF+4CM Islamabad, Pakistan' },
    { title: 'Minchinabad', address: '5H68+WMC Minchinabad, Pakistan' },
  ],
  legalLinks: [L('Terms & Conditions'), L('Privacy Policy', '/privacy-policy'), L('Payment Terms')],
}
