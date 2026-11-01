import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    {
      name: 'headingHighlight',
      type: 'text',
      localized: true,
      admin: { description: 'Optional. Words from the heading to show in the accent colour, e.g. "Study Abroad".' },
    },
    {
      name: 'subheadingLead',
      type: 'text',
      localized: true,
      admin: { description: 'Optional. Bold opening of the paragraph, shown right before the subheading.' },
    },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaHref', type: 'text', defaultValue: '#' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. A built-in placeholder illustration is shown when empty.' },
    },
  ],
}

export const FounderBlock: Block = {
  slug: 'founder',
  labels: { singular: 'Founder Profile', plural: 'Founder Profiles' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Meet Our Founder', localized: true },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', localized: true, admin: { description: 'e.g. Founder & Study Abroad Consultant' } },
    { name: 'bio', type: 'textarea', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait photo (about 4:5). A placeholder is shown when empty.' },
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: ['instagram', 'whatsapp', 'facebook', 'linkedin', 'x', 'youtube'],
        },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
  ],
}

export const LogoCarouselBlock: Block = {
  slug: 'logoCarousel',
  labels: { singular: 'Logo Carousel', plural: 'Logo Carousels' },
  fields: [
    { name: 'title', type: 'text', localized: true, admin: { description: 'Optional heading above the logos.' } },
    { name: 'subtitle', type: 'text', localized: true, admin: { description: 'Optional line under the heading.' } },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true, admin: { description: 'e.g. Harvard University (used as alt text)' } },
        { name: 'href', type: 'text', admin: { description: 'Optional link.' } },
      ],
    },
    {
      name: 'duration',
      type: 'number',
      defaultValue: 40,
      min: 5,
      admin: { description: 'Seconds for one full loop. Lower is faster.' },
    },
  ],
}

export const CoreStrengthsBlock: Block = {
  slug: 'coreStrengths',
  labels: { singular: 'Core Strengths', plural: 'Core Strengths' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'stat', type: 'text', required: true, admin: { description: 'e.g. 1200+' } },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'href', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}

export const ServicesBlock: Block = {
  slug: 'services',
  labels: { singular: 'Services & Offerings', plural: 'Services & Offerings' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'panels',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true, admin: { description: 'e.g. For Students' } },
        { name: 'intro', type: 'textarea', localized: true },
        { name: 'offeringsLabel', type: 'text', defaultValue: 'Offerings', localized: true },
        {
          name: 'offerings',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true, localized: true }],
        },
        { name: 'linkLabel', type: 'text', defaultValue: 'See More', localized: true },
        { name: 'linkHref', type: 'text', defaultValue: '#' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional. A built-in placeholder illustration is shown when empty.' },
        },
        { name: 'showImage', type: 'checkbox', defaultValue: true, admin: { description: 'Show the round image next to the text.' } },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'brand',
          admin: { description: 'Background colour of the band. Colours are defined in globals.css.' },
          options: [
            { label: 'Brand tint', value: 'brand' },
            { label: 'Warm', value: 'warm' },
            { label: 'Sky', value: 'sky' },
            { label: 'Lavender', value: 'lavender' },
          ],
        },
        {
          name: 'cards',
          type: 'array',
          maxRows: 6,
          admin: { description: 'Service cards shown in a row below this panel.' },
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'plane',
              options: [
                { label: 'Plane', value: 'plane' },
                { label: 'Target', value: 'target' },
                { label: 'A+ grade', value: 'grade' },
                { label: 'Graduation cap', value: 'cap' },
                { label: 'Globe', value: 'globe' },
                { label: 'Document', value: 'document' },
              ],
            },
            {
              name: 'accent',
              type: 'select',
              defaultValue: 'blue',
              admin: { description: 'Colour of the line along the top of the card.' },
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Red', value: 'red' },
                { label: 'Navy', value: 'navy' },
                { label: 'Gold', value: 'gold' },
              ],
            },
            { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'Small label, e.g. Study Visa' } },
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'linkLabel', type: 'text', defaultValue: 'Learn More', localized: true },
            { name: 'linkHref', type: 'text', defaultValue: '#' },
          ],
        },
      ],
    },
  ],
}

export const DestinationsBlock: Block = {
  slug: 'destinations',
  labels: { singular: 'Study Destinations', plural: 'Study Destinations' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'subtitle', type: 'textarea', localized: true, admin: { description: 'Optional text under the heading.' } },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'flag',
          type: 'select',
          options: [
            { label: 'Italy', value: 'it' },
            { label: 'United Kingdom', value: 'gb' },
            { label: 'France', value: 'fr' },
            { label: 'Germany', value: 'de' },
            { label: 'Ireland', value: 'ie' },
            { label: 'Spain', value: 'es' },
            { label: 'Netherlands', value: 'nl' },
            { label: 'Belgium', value: 'be' },
            { label: 'Austria', value: 'at' },
            { label: 'Hungary', value: 'hu' },
            { label: 'Poland', value: 'pl' },
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'Australia', value: 'au' },
            { label: 'China', value: 'cn' },
            { label: 'Turkey', value: 'tr' },
          ],
        },
        { name: 'title', type: 'text', required: true, localized: true, admin: { description: 'e.g. Study in Italy' } },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Portrait photo (about 3:4) of a landmark.' },
        },
        { name: 'href', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}

export const NewsletterBlock: Block = {
  slug: 'newsletter',
  labels: { singular: 'Newsletter Signup', plural: 'Newsletter Signups' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'interestLabel', type: 'text', defaultValue: "I'm Interested in", localized: true },
    {
      name: 'interests',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Subscribe Now', localized: true },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
    },
  ],
}

/** Added to every page block so a section can be switched off without deleting its content. */
const hiddenField: Block['fields'][number] = {
  name: 'hidden',
  type: 'checkbox',
  defaultValue: false,
  label: 'Hide this section',
}

export const pageBlocks: Block[] = [
  HeroBlock,
  FounderBlock,
  LogoCarouselBlock,
  CoreStrengthsBlock,
  ServicesBlock,
  DestinationsBlock,
  NewsletterBlock,
  RichTextBlock,
].map((block) => ({ ...block, fields: [hiddenField, ...block.fields] }))
