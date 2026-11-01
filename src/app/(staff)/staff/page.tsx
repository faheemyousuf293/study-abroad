import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import { applicationStatuses, statusLabel } from '@/lib/application-status'
import { destinationName, destinations } from '@/lib/countries'
import { studyLevelName } from '@/lib/study-levels'
import { studyAreaName } from '@/lib/study-areas'
import { getOffices } from '@/lib/offices'
import { telHref, whatsappHref } from '@/lib/phone'
import { getStaffMembers, requireStaff } from '@/lib/staff-auth'
import { StaffBar } from './StaffBar'
import { formatDate, signupProgress } from './format'

export const metadata: Metadata = { title: 'Students' }

const PER_PAGE = 25

type Filters = { q?: string; status?: string; office?: string; destination?: string; assigned?: string; signup?: string; page?: string }
type Props = { searchParams: Promise<Filters> }

/** Staff home: every student sign-up, newest first, with filters. */
export default async function StaffStudentsPage({ searchParams }: Props) {
  const staff = await requireStaff()
  const filters = await searchParams
  const page = Math.max(1, Number(filters.page) || 1)
  const q = filters.q?.trim() ?? ''

  const base: Where[] = []
  if (q) base.push({ or: ['name', 'email', 'phone', 'city'].map((f) => ({ [f]: { like: q } })) })
  if (filters.office) base.push({ office: { equals: filters.office } })
  if (filters.destination) base.push({ destination: { equals: filters.destination } })
  if (filters.assigned === 'me') base.push({ assignedTo: { equals: staff.id } })
  else if (filters.assigned === 'none') base.push({ assignedTo: { exists: false } })
  else if (Number(filters.assigned)) base.push({ assignedTo: { equals: Number(filters.assigned) } })
  if (filters.signup === 'complete') base.push({ onboardingCompletedAt: { exists: true } })
  if (filters.signup === 'incomplete') base.push({ onboardingCompletedAt: { exists: false } })
  const status = applicationStatuses.find((s) => s.value === filters.status)?.value
  const where = (extra?: Where): Where => ({ and: extra ? [...base, extra] : base })

  const payload = await getPayload({ config })
  // Queries run with the staff member's own permissions.
  const as = { user: { ...staff, collection: 'users' as const }, overrideAccess: false }
  const [result, total, counts, offices, team] = await Promise.all([
    payload.find({
      collection: 'students',
      where: where(status ? { status: { equals: status } } : undefined),
      sort: '-createdAt',
      limit: PER_PAGE,
      page,
      depth: 0,
      ...as,
    }),
    payload.count({ collection: 'students', where: where(), ...as }),
    Promise.all(
      applicationStatuses.map((s) => payload.count({ collection: 'students', where: where({ status: { equals: s.value } }), ...as })),
    ),
    getOffices(),
    getStaffMembers(),
  ])
  const teamName = (id: unknown) => team.find((m) => m.id === id)?.name

  /** The current filters with some changed, as a /staff URL. Changing a filter goes back to page 1. */
  const href = (change: Partial<Filters>) => {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries({ ...filters, page: undefined, ...change })) if (v) params.set(k, String(v))
    const s = params.toString()
    return s ? `/staff?${s}` : '/staff'
  }
  const filtered = Boolean(q || filters.office || filters.destination || filters.assigned || filters.signup)

  return (
    <>
      <StaffBar staff={staff} />
      <main className="staff-main">
        <div className="staff-head">
          <h1>Students</h1>
          <p>
            {total.totalDocs} {filtered ? 'matching' : 'in total'}
          </p>
        </div>

        <nav className="staff-tabs" aria-label="Filter by status">
          <Link href={href({ status: undefined })} className={!status ? 'is-active' : undefined}>
            All <span>{total.totalDocs}</span>
          </Link>
          {applicationStatuses.map((s, i) => (
            <Link key={s.value} href={href({ status: s.value })} className={status === s.value ? 'is-active' : undefined}>
              {s.label} <span>{counts[i].totalDocs}</span>
            </Link>
          ))}
        </nav>

        <form className="staff-filters" action="/staff">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <label className="staff-search">
            <span className="sr-only">Search</span>
            <input type="search" name="q" defaultValue={q} placeholder="Search name, email, phone or city" />
          </label>
          <select name="office" defaultValue={filters.office ?? ''} aria-label="Office">
            <option value="">All offices</option>
            {offices.map((o) => (
              <option key={o.code} value={o.name}>
                {o.name}
              </option>
            ))}
          </select>
          <select name="destination" defaultValue={filters.destination ?? ''} aria-label="Destination">
            <option value="">All destinations</option>
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
          <select name="assigned" defaultValue={filters.assigned ?? ''} aria-label="Assigned to">
            <option value="">Assigned to anyone</option>
            <option value="me">Assigned to me</option>
            <option value="none">Not assigned</option>
            {team
              .filter((m) => m.id !== staff.id)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
          </select>
          <select name="signup" defaultValue={filters.signup ?? ''} aria-label="Sign-up">
            <option value="">Any sign-up</option>
            <option value="complete">Finished sign-up</option>
            <option value="incomplete">Didn&apos;t finish</option>
          </select>
          <button type="submit" className="btn btn-cta">
            Filter
          </button>
          {filtered ? (
            <Link href={status ? `/staff?status=${status}` : '/staff'} className="auth-link">
              Clear
            </Link>
          ) : null}
        </form>

        {result.docs.length ? (
          <div className="staff-table-wrap">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Phone</th>
                  <th>Office</th>
                  <th>Interested in</th>
                  <th>Status</th>
                  <th>Assigned to</th>
                  <th>Signed up</th>
                </tr>
              </thead>
              <tbody>
                {result.docs.map((s) => {
                  const stuck = signupProgress(s)
                  const wants = [s.studyLevel && studyLevelName(s.studyLevel), s.studyArea && studyAreaName(s.studyArea)]
                  return (
                    <tr key={s.id}>
                      <td>
                        <Link href={`/staff/students/${s.id}`} className="staff-name">
                          {s.name || 'No name yet'}
                        </Link>
                        <small>{s.email}</small>
                      </td>
                      <td>
                        {s.phone ? (
                          <>
                            <span className="staff-nowrap">{s.phone}</span>
                            <span className="staff-contact">
                              <a href={telHref(s.phone)}>Call</a>
                              <a href={whatsappHref(s.phone)} target="_blank" rel="noopener noreferrer">
                                WhatsApp
                              </a>
                            </span>
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{s.office || '—'}</td>
                      <td>
                        {s.destination ? (
                          <span className="staff-nowrap">
                            <img src={`/flags/${s.destination}.svg`} alt="" width={18} height={18} className="staff-flag" />
                            {destinationName(s.destination)}
                          </span>
                        ) : (
                          '—'
                        )}
                        <small>{wants.filter(Boolean).join(' · ')}</small>
                      </td>
                      <td>
                        <span className={`staff-status status-${s.status || 'new'}`}>{statusLabel(s.status)}</span>
                      </td>
                      <td>{teamName(s.assignedTo) ?? <span className="staff-muted">—</span>}</td>
                      <td>
                        <span className="staff-nowrap">{formatDate(s.createdAt)}</span>
                        {stuck ? <small className="staff-warn">{stuck}</small> : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="staff-empty">No students match these filters.</p>
        )}

        {result.totalPages > 1 ? (
          <nav className="staff-pages" aria-label="Pages">
            {result.hasPrevPage ? <Link href={href({ page: String(page - 1) })}>← Previous</Link> : <span />}
            <span>
              Page {result.page} of {result.totalPages}
            </span>
            {result.hasNextPage ? <Link href={href({ page: String(page + 1) })}>Next →</Link> : <span />}
          </nav>
        ) : null}
      </main>
    </>
  )
}
