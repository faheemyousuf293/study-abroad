import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { applicationStatuses, statusLabel } from '@/lib/application-status'
import { destinations } from '@/lib/countries'
import { studyLevels } from '@/lib/study-levels'
import { studyAreas } from '@/lib/study-areas'
import { getOffices } from '@/lib/offices'
import { telHref, whatsappHref } from '@/lib/phone'
import { getStaffMembers, requireStaff } from '@/lib/staff-auth'
import { StaffBar } from '../../StaffBar'
import { updateStudentAction } from '../../actions'
import { formatDate, signupProgress } from '../../format'
import { SaveButton } from './SaveButton'

export const metadata: Metadata = { title: 'Student' }

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }

/** One student: contact buttons, their sign-up answers and the staff follow-up fields, all editable. */
export default async function StaffStudentPage({ params, searchParams }: Props) {
  const staff = await requireStaff()
  const id = Number((await params).id)
  if (!Number.isInteger(id)) notFound()

  const payload = await getPayload({ config })
  const student = await payload
    .findByID({ collection: 'students', id, depth: 0, user: { ...staff, collection: 'users' }, overrideAccess: false })
    .catch(() => null)
  if (!student) notFound()

  const [{ saved }, offices, team] = await Promise.all([searchParams, getOffices(), getStaffMembers()])
  // Keep a student's office selectable even if it has since been removed from the footer.
  const officeNames = offices.map((o) => o.name)
  if (student.office && !officeNames.includes(student.office)) officeNames.push(student.office)
  const stuck = signupProgress(student)

  return (
    <>
      <StaffBar staff={staff} />
      <main className="staff-main staff-detail">
        <Link href="/staff" className="staff-back">
          ← All students
        </Link>
        <div className="staff-head">
          <h1>{student.name || 'No name yet'}</h1>
          <span className={`staff-status status-${student.status || 'new'}`}>{statusLabel(student.status)}</span>
        </div>
        <p className="staff-meta">
          Signed up {formatDate(student.createdAt)}
          {student.onboardingCompletedAt ? <> · Finished sign-up {formatDate(student.onboardingCompletedAt)}</> : null}
          {stuck ? <span className="staff-warn"> · {stuck}</span> : null}
        </p>

        {saved ? (
          <p className="auth-notice staff-saved" role="status">
            Changes saved.
          </p>
        ) : null}

        <div className="staff-contact-card">
          {student.phone ? (
            <>
              <a href={telHref(student.phone)} className="btn btn-cta">
                Call {student.phone}
              </a>
              <a href={whatsappHref(student.phone)} target="_blank" rel="noopener noreferrer" className="btn staff-btn-whatsapp">
                WhatsApp
              </a>
            </>
          ) : null}
          <a href={`mailto:${student.email}`} className="btn staff-btn-outline">
            Email {student.email}
          </a>
        </div>

        <form action={updateStudentAction} className="staff-form">
          <input type="hidden" name="id" value={student.id} />
          <input type="hidden" name="currentOffice" value={student.office ?? ''} />

          <section className="staff-panel">
            <h2>Follow-up</h2>
            <div className="staff-grid">
              <label>
                Status
                <select name="status" defaultValue={student.status || 'new'}>
                  {applicationStatuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Assigned to
                <select name="assignedTo" defaultValue={student.assignedTo ? String(student.assignedTo) : ''}>
                  <option value="">Not assigned</option>
                  {team.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.id === staff.id ? `${m.name} (me)` : m.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Notes <small>Only staff can see these.</small>
              <textarea
                name="notes"
                rows={6}
                defaultValue={student.notes ?? ''}
                placeholder="e.g. 30 Oct: called, interested in Padua, will visit the Lahore office on Monday."
              />
            </label>
          </section>

          <section className="staff-panel">
            <h2>Student details</h2>
            <p className="staff-hint">What the student told us when signing up. Correct anything that&apos;s wrong.</p>
            <div className="staff-grid">
              <label>
                Name
                <input name="name" defaultValue={student.name ?? ''} />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" defaultValue={student.phone ?? ''} />
              </label>
              <label>
                Destination
                <select name="destination" defaultValue={student.destination ?? ''}>
                  <option value="">Not chosen</option>
                  {destinations.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Study level
                <select name="studyLevel" defaultValue={student.studyLevel ?? ''}>
                  <option value="">Not chosen</option>
                  {studyLevels.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Study area
                <select name="studyArea" defaultValue={student.studyArea ?? ''}>
                  <option value="">Not chosen</option>
                  {studyAreas.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                City
                <input name="city" defaultValue={student.city ?? ''} />
              </label>
              <label>
                Nearest office
                <select name="office" defaultValue={student.office ?? ''}>
                  <option value="">Not chosen</option>
                  {officeNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Email <small>Used to sign in, can&apos;t be changed here.</small>
                <input value={student.email} readOnly disabled />
              </label>
            </div>
          </section>

          <div className="staff-actions">
            <SaveButton />
            <Link href="/staff" className="auth-link">
              Back to list
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}
