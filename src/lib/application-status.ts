/** Where staff are with a student's application. Set on the /staff pages; students never see it. */
export const applicationStatuses = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'applied', label: 'Applied' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'closed', label: 'Not interested' },
] as const

export type ApplicationStatus = (typeof applicationStatuses)[number]['value']

export const statusLabel = (value?: string | null) =>
  applicationStatuses.find((s) => s.value === value)?.label ?? 'New'
