/** Service cards for the "For Students" panel, used by the seed. */
import type { Page } from './payload-types'

type ServicesBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'services' }>
type Card = NonNullable<NonNullable<ServicesBlock['panels']>[number]['cards']>[number]

export const studentCards: Card[] = [
  {
    icon: 'plane',
    accent: 'blue',
    eyebrow: 'Study Visa',
    title: 'Your Gateway to Study Abroad',
    description: 'End-to-end guidance through documentation, applications, and the student visa process.',
    linkLabel: 'Learn More',
    linkHref: '#',
  },
  {
    icon: 'target',
    accent: 'red',
    eyebrow: 'Scholarship Applications',
    title: 'Win Scholarships',
    description: 'Personalized support finding and applying for scholarship opportunities that fit your profile.',
    linkLabel: 'Learn More',
    linkHref: '#',
  },
  {
    icon: 'grade',
    accent: 'navy',
    eyebrow: 'IELTS Training',
    title: 'Achieve IELTS Success',
    description: 'Structured preparation designed to help you reach the score your target university requires.',
    linkLabel: 'Learn More',
    linkHref: '#',
  },
]
