import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResumeSummary from '../components/ResumeSummary'
import StatusBadge from '../components/StatusBadge'
import {
  fetchApplicant,
  generateResumeSummary,
  getResumeUrl,
  localFallbackSummary,
  saveResumeSummary,
  updateApplicationStatus,
} from '../lib/api'
import { STATUSES } from '../lib/status'

export default function ApplicantProfile() {
  const { id } = useParams()
  const [applicant, setApplicant] = useState(null)
  const [resumeUrl, setResumeUrl] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summaryError, setSummaryError] = useState('')

  useEffect(() => {
    fetchApplicant(id)
      .then(async (data) => {
        setApplicant(data)
        if (data.resume_path) {
          try {
            setResumeUrl(await getResumeUrl(data.resume_path))
          } catch {
            setResumeUrl('')
          }
        }
      })
      .catch((err) => setError(err.message))
  }, [id])

  async function changeStatus(status) {
    setSaving(true)
    setError('')
    try {
      const updated = await updateApplicationStatus(id, status)
      setApplicant((prev) => ({ ...prev, ...updated }))
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function onGenerate() {
    setSummaryLoading(true)
    setSummaryError('')
    try {
      let summary
      try {
        summary = await generateResumeSummary(id)
      } catch {
        summary = localFallbackSummary(applicant)
        await saveResumeSummary(id, summary)
      }
      setApplicant((prev) => ({ ...prev, resume_summary: summary }))
    } catch (err) {
      setSummaryError(err.message)
    } finally {
      setSummaryLoading(false)
    }
  }

  if (error && !applicant) return <p className="text-rose-700">{error}</p>
  if (!applicant) return <p className="text-slate-500">Loading candidate…</p>

  return (
    <div className="space-y-6">
      <Link to="/recruiter/applicants" className="text-sm text-teal-700">
        ← Applicants
      </Link>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{applicant.full_name}</h1>
            <p className="mt-1 text-slate-600">{applicant.jobs?.title}</p>
            <p className="mt-1 font-mono text-xs text-slate-400">{applicant.public_id}</p>
          </div>
          <StatusBadge status={applicant.status} />
        </div>
        {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd>{applicant.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd>{applicant.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Location</dt>
            <dd>{applicant.location}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Experience</dt>
            <dd>{applicant.experience_years} years</dd>
          </div>
        </dl>
        {applicant.cover_note && (
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{applicant.cover_note}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium">
            Change status
            <select
              value={applicant.status}
              disabled={saving}
              onChange={(e) => changeStatus(e.target.value)}
              className="ml-2 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={saving || applicant.status === 'shortlisted'}
            onClick={() => changeStatus('shortlisted')}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Shortlist
          </button>
          {resumeUrl ? (
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-teal-700 hover:underline">
              Download resume
            </a>
          ) : (
            <span className="text-sm text-slate-400">Resume not available</span>
          )}
        </div>
      </div>
      <ResumeSummary
        summary={applicant.resume_summary}
        loading={summaryLoading}
        error={summaryError}
        onGenerate={onGenerate}
      />
    </div>
  )
}
