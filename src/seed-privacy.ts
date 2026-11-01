/**
 * Privacy Policy page content, written as Lexical rich text.
 * The policy text is a placeholder; the attribution section is required by the GeoNames licence (CC BY 4.0).
 */
type Node = { type: string; version: number; [k: string]: unknown }

const text = (t: string, format = 0): Node => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })
const link = (label: string, url: string): Node => ({
  type: 'link',
  fields: { linkType: 'custom', url, newTab: true },
  children: [text(label)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 3,
})
const block = (type: 'paragraph' | 'heading', children: Node[], extra: Record<string, unknown> = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...(type === 'paragraph' ? { textFormat: 0, textStyle: '' } : {}),
  ...extra,
})
const p = (...children: Node[]) => block('paragraph', children)
const h = (tag: 'h1' | 'h2', t: string) => block('heading', [text(t)], { tag })

export const privacyPage = {
  title: 'Privacy Policy',
  slug: 'privacy-policy',
  _status: 'published' as const,
  meta: { title: 'Privacy Policy', description: 'How ScholarshipHive Edutancy handles your personal information.' },
  layout: [
    {
      blockType: 'richText' as const,
      content: {
        root: {
          type: 'root',
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            h('h1', 'Privacy Policy'),
            p(text('Our full privacy policy is being prepared and will be published on this page soon.')),
            p(text('If you have any questions about how we handle your personal information in the meantime, please contact us.')),
            h('h2', 'Data sources and attributions'),
            p(
              text('City names used in our student sign-up are based on data from '),
              link('GeoNames', 'https://www.geonames.org/'),
              text(', licensed under '),
              link('Creative Commons Attribution 4.0', 'https://creativecommons.org/licenses/by/4.0/'),
              text('.'),
            ),
          ],
        },
      },
    },
  ],
}
