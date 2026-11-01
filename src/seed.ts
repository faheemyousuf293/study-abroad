/**
 * Seeds the first admin user and placeholder homepage content.
 * Safe to re-run: it updates the homepage and globals, and only creates an admin if none exists.
 *
 * Usage: pnpm seed
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from './payload.config'
import { copyright, footerData, socials } from './seed-footer'
import { studentCards } from './seed-services'
import { universityLogos } from './seed-universities'
import { destinationsData } from './seed-destinations'
import { privacyPage } from './seed-privacy'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const L = (label: string, href = '#') => ({ label, href })

/** Returns the media doc for a seed-assets file, uploading it only the first time. */
async function ensureMedia(payload: Payload, filename: string, alt: string) {
  const found = await payload.find({
    collection: 'media',
    where: { filename: { equals: path.basename(filename) } },
    limit: 1,
  })
  if (found.docs[0]) return found.docs[0]
  return payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.resolve(dirname, 'seed-assets', filename),
  })
}

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
  // Logo: uploaded once from seed-assets; left alone if one is already set in the CMS.
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (!settings.logo) {
    const logo = await payload.create({
      collection: 'media',
      data: { alt: 'ScholarshipHive Edutancy' },
      filePath: path.resolve(dirname, 'seed-assets/scholarshiphive-logo.png'),
    })
    await payload.updateGlobal({ slug: 'site-settings', data: { logo: logo.id } })
    payload.logger.info('Uploaded site logo')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'ScholarshipHive Edutancy',
      tagline: 'Placeholder tagline – replace with your own.',
      copyright,
      socials,
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        L('Home', '/'),
        {
          ...L('Services'),
          children: [L('Study Visa'), L('Scholarship Applications'), L('IELTS Training')],
        },
        L('FAQ'),
        L('About Us'),
        L('Events'),
        {
          ...L('Scholarships'),
          children: [L('Scholarship Programs')],
        },
        L('Blog'),
        L('Team'),
        L('Privacy Policy', '/privacy-policy'),
        L('Contact'),
      ],
      actions: [
        { ...L('For Partners'), style: 'link', hidden: true },
        { ...L('Student Login', '/login'), style: 'link' },
        { ...L('Book Online Counselling'), style: 'button', hidden: true },
      ],
    },
  })

  await payload.updateGlobal({ slug: 'footer', data: footerData })

  // 3. Homepage
  const heroImage = await ensureMedia(payload, 'hero-campus.jpg', 'University campus with students')
  const founderImage = await ensureMedia(
    payload,
    'founder-abdul-wahab.jpg',
    'Abdul Wahab at his graduation, University of Padua',
  )
  const logos = []
  for (const { file, name } of universityLogos) {
    const media = await ensureMedia(payload, `universities/${file}`, `${name} logo`)
    logos.push({ image: media.id, name })
  }
  const destinationItems = []
  for (const { file, alt, ...item } of destinationsData.items) {
    const media = await ensureMedia(payload, `destinations/${file}`, alt)
    destinationItems.push({ ...item, image: media.id, href: '#' })
  }

  const homeData = {
    title: 'Home',
    slug: 'home',
    _status: 'published' as const,
    meta: {
      title: 'ScholarshipHive Edutancy – Study abroad made simple',
      description: 'Placeholder meta description for the homepage.',
    },
    layout: [
      {
        blockType: 'hero' as const,
        heading: 'Your Trusted Study Abroad Consultant in Pakistan',
        headingHighlight: 'Study Abroad',
        subheadingLead: 'ScholarshipHive Edutancy is a trusted study abroad consultant in Pakistan',
        subheading:
          ', helping students achieve their international education goals through university admissions, scholarships, student visas, and IELTS preparation.',
        ctaLabel: 'Book Appointment',
        ctaHref: '#',
        image: heroImage.id,
      },
      {
        blockType: 'founder' as const,
        eyebrow: 'Meet Our Founder',
        name: 'Abdul Wahab',
        role: 'Founder & Study Abroad Consultant',
        image: founderImage.id,
        bio: 'With years of experience in international education consultancy, Abdul Wahab has guided hundreds of students toward successful admissions, scholarships, and visa approvals.',
        socials: [
          { platform: 'instagram' as const, url: '#' },
          { platform: 'whatsapp' as const, url: '#' },
          { platform: 'facebook' as const, url: '#' },
        ],
      },
      {
        blockType: 'logoCarousel' as const,
        title: 'Our Partner Universities',
        subtitle: 'We collaborate with internationally recognized universities',
        logos,
        duration: 40,
      },
      {
        blockType: 'coreStrengths' as const,
        hidden: true,
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
        blockType: 'services' as const,
        title: 'Our Services and Offerings',
        panels: [
          {
            heading: 'For Students',
            intro:
              'With a keen eye for your choices and preferences, our counselling experience is so seamless that you will land in your dream university!',
            linkLabel: '',
            showImage: false,
            tone: 'sky' as const,
            cards: studentCards,
          },
        ],
      },
      {
        blockType: 'destinations' as const,
        title: destinationsData.title,
        subtitle: destinationsData.subtitle,
        items: destinationItems,
      },
      {
        blockType: 'newsletter' as const,
        hidden: true,
        title: 'Stay updated with ScholarshipHive Edutancy',
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

  // 4. Privacy Policy: created once, then left for editing in the CMS.
  const privacy = await payload.find({ collection: 'pages', where: { slug: { equals: privacyPage.slug } }, limit: 1, draft: true })
  if (!privacy.docs[0]) {
    await payload.create({ collection: 'pages', data: privacyPage })
    payload.logger.info('Created privacy policy page')
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
