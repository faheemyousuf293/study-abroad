import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
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

export const pageBlocks: Block[] = [
  HeroBlock,
  CoreStrengthsBlock,
  ServicesBlock,
  NewsletterBlock,
  RichTextBlock,
]
