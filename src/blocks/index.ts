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

export const pageBlocks: Block[] = [HeroBlock, CoreStrengthsBlock, NewsletterBlock, RichTextBlock]
