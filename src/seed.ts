/**
 * Seeds the first admin user and placeholder homepage content.
 * Safe to re-run: it updates the homepage and globals, and only creates an admin if none exists.
 *
 * Usage: pnpm seed
 */
import { getPayload } from 'payload'
import config from './payload.config'

const L = (label: string, href = '#') => ({ label, href })

async function seed() {
  const payload = await getPayload({ config })

  // 1. Admin user
  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.totalDocs === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
    const password = process.env.SEED_ADMIN_PASSWORD || 'change-me-now'
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Admin', roles: ['admin'] },
    })
    payload.logger.info(`Created admin user ${email}`)
  }

  // 2. Globals
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'YourBrand',
      tagline: 'Placeholder tagline – replace with your own.',
      copyright: 'YourBrand 2026',
      socials: [
        { platform: 'facebook', url: '#' },
        { platform: 'instagram', url: '#' },
        { platform: 'linkedin', url: '#' },
        { platform: 'x', url: '#' },
        { platform: 'youtube', url: '#' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          ...L('Study Destinations'),
          children: [
            L('Destination One'),
            L('Destination Two'),
            L('Destination Three'),
            L('Destination Four'),
            L('Destination Five'),
            L('Destination Six'),
          ],
        },
        {
          ...L('Services'),
          children: [
            L('Services for Students'),
            L('Services for Institutions'),
            L('Services for Partners'),
            L('Services for Franchisees'),
          ],
        },
        L('Upcoming Events'),
        L('Contact Us'),
        {
          ...L('Company'),
          children: [L('About Us'), L('Careers'), L('News & Press'), L('Blog')],
        },
      ],
      actions: [
        { ...L('For Partners'), style: 'link' },
        { ...L('Student Login'), style: 'link' },
        { ...L('Book Online Counselling'), style: 'button' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      aboutTitle: 'About YourBrand',
      aboutText:
        'Placeholder description of your organisation. Replace this text from the admin panel with a short summary of who you are and what you do.',
      columns: [
        {
          title: 'Company',
          links: [
            L('About Us'),
            { ...L('Careers'), badge: "We're hiring" },
            L('News & Press'),
            L('Blog'),
            L('Contact Us'),
          ],
        },
        {
          title: 'Services for Students',
          links: [
            L('Counselling'),
            L('Test Preparation'),
            L('Course & University Selection'),
            L('Applications & Admission'),
            L('Scholarships'),
            L('Education Loan'),
            L('Visa Processing'),
          ],
        },
        {
          title: 'Study Destinations',
          links: [
            L('Destination One'),
            L('Destination Two'),
            L('Destination Three'),
            L('Destination Four'),
            L('Destination Five'),
            L('Destination Six'),
          ],
        },
      ],
      legalLinks: [L('Terms & Conditions'), L('Privacy Policy'), L('Payment Terms')],
    },
  })

  // 3. Homepage
  const homeData = {
    title: 'Home',
    slug: 'home',
    _status: 'published' as const,
    meta: {
      title: 'YourBrand – Study abroad made simple',
      description: 'Placeholder meta description for the homepage.',
    },
    layout: [
      {
        blockType: 'hero' as const,
        heading: 'Placeholder headline about making overseas education accessible',
        subheading:
          'A short supporting sentence that explains what your platform does for students and partners.',
        ctaLabel: 'Start Your Journey',
        ctaHref: '#',
      },
      {
        blockType: 'coreStrengths' as const,
        title: 'Our Core Strengths',
        items: [
          {
            stat: '1000+',
            label: 'University Partnerships',
            description: 'Placeholder text describing your university network.',
            href: '#',
          },
          {
            stat: '50+',
            label: 'Offices Worldwide',
            description: 'Placeholder text describing your global presence.',
            href: '#',
          },
          {
            stat: '20+',
            label: 'Years of Experience',
            description: 'Placeholder text describing your track record.',
            href: '#',
          },
        ],
      },
      {
        blockType: 'newsletter' as const,
        title: 'Stay updated with YourBrand',
        interestLabel: "I'm Interested in",
        interests: [
          { label: 'Student' },
          { label: 'Institute' },
          { label: 'Partner' },
          { label: 'Franchisee' },
        ],
        buttonLabel: 'Subscribe Now',
      },
    ],
  }

  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    draft: true,
  })

  if (found.docs[0]) {
    await payload.update({ collection: 'pages', id: found.docs[0].id, data: homeData })
    payload.logger.info('Updated homepage')
  } else {
    await payload.create({ collection: 'pages', data: homeData })
    payload.logger.info('Created homepage')
  }

  payload.logger.info('Seed complete')
}

// `payload run` exits as soon as this module finishes evaluating, so top-level await is required.
try {
  await seed()
} catch (err) {
  console.error(err)
  process.exit(1)
}
