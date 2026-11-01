import type { CollectionConfig, FieldAccess } from 'payload'
import { adminOnly, isStaff, staffOnly } from '../access'
import { destinations } from '../lib/countries'
import { studyLevels } from '../lib/study-levels'
import { studyAreas } from '../lib/study-areas'
import { applicationStatuses } from '../lib/application-status'

/** Internal follow-up fields that students never see, even on their own record. */
const staffField: { read: FieldAccess; update: FieldAccess; create: FieldAccess } = {
  read: ({ req: { user } }) => isStaff(user),
  update: ({ req: { user } }) => isStaff(user),
  create: ({ req: { user } }) => isStaff(user),
}

/**
 * Students sign in on the website with an emailed one-time code (see src/lib/student-auth.ts).
 * They never get a password of their own and can't open the CMS admin panel.
 * Students' own writes go through server actions with overrideAccess. Staff work with these records on the /staff pages.
 */
export const Students: CollectionConfig = {
  slug: 'students',
  labels: { singular: 'Student', plural: 'Students' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'office', 'destination', 'studyLevel', 'status', 'onboardingCompletedAt'],
    listSearchableFields: ['name', 'email', 'phone', 'city'],
    group: 'Students',
    description: 'Student sign-ups. Staff follow them up at /staff.',
  },
  defaultSort: '-createdAt',
  auth: {
    tokenExpiration: 60 * 60 * 24 * 30, // stay signed in for 30 days
  },
  access: {
    read: ({ req: { user } }) => isStaff(user) || (user?.collection === 'students' ? { id: { equals: user.id } } : false),
    create: adminOnly,
    update: staffOnly,
    delete: adminOnly,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      // Onboarding step 1
      name: 'destination',
      label: 'Preferred study destination',
      type: 'select',
      options: destinations.map((d) => ({ label: d.name, value: d.code })),
    },
    {
      // Onboarding step 2
      name: 'studyLevel',
      label: 'Preferred study level',
      type: 'select',
      options: studyLevels.map((l) => ({ label: l.name, value: l.code })),
    },
    {
      // Onboarding step 3
      name: 'studyArea',
      label: 'Preferred study area',
      type: 'select',
      options: studyAreas.map((a) => ({ label: a.name, value: a.code })),
    },
    {
      // Onboarding step 4. Free text: usually a name from src/lib/pk-cities.ts, but students may type any city.
      name: 'city',
      type: 'text',
    },
    {
      // Onboarding step 5. The office title from the footer's office list at the time of choosing.
      name: 'office',
      label: 'Nearest office',
      type: 'text',
    },
    {
      name: 'onboardingCompletedAt',
      label: 'Sign-up completed',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'When the student finished all onboarding steps.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: applicationStatuses.map((s) => ({ ...s })),
      access: staffField,
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignedTo',
      label: 'Assigned to',
      type: 'relationship',
      relationTo: 'users',
      access: staffField,
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      label: 'Staff notes',
      type: 'textarea',
      access: staffField,
      admin: { description: 'Internal only — students never see this.' },
    },
  ],
}
