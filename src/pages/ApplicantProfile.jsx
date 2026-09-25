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

      setApplicant((prev) => ({
        ...prev,
        resume_summary: summary,
      }))
    } catch (err) {
      setSummaryError(err.message)
    } finally {
      setSummaryLoading(false)
    }
  }

  if (error && !applicant) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
        <p className="font-medium text-rose-700">{error}</p>
      </div>
    )
  }

  if (!applicant) {
    return (
      <div className="mx-auto max-w-4xl py-16 text-center">
        <p className="text-slate-500">Loading candidate…</p>
      </div>
    )
  }

  const initials = applicant.full_name
    .split(' ')
    .map((name) => name[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="space-y-6">

      {/* Back */}
      <Link
        to="/recruiter/applicants"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-800"
      >
        ← Back to applicants
      </Link>

      {/* Candidate Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-xl">
        
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-indigo-400/20" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">
            
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold shadow-lg ring-1 ring-white/30 backdrop-blur">
              {initials}
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Candidate profile
              </p>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {applicant.full_name}
              </h1>

              <p className="mt-2 text-lg text-blue-100">
                {applicant.jobs?.title}
              </p>

              <p className="mt-2 font-mono text-xs text-blue-200">
                {applicant.public_id}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-blue-100">
              Current status
            </p>
            <StatusBadge status={applicant.status} />
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Candidate Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Candidate information
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Personal & professional details
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Email
            </p>
            <p className="mt-2 break-all font-medium text-slate-900">
              {applicant.email}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Phone
            </p>
            <p className="mt-2 font-medium text-slate-900">
              {applicant.phone}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Location
            </p>
            <p className="mt-2 font-medium text-slate-900">
              {applicant.location}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Experience
            </p>
            <p className="mt-2 font-medium text-slate-900">
              {applicant.experience_years} years
            </p>
          </div>

        </div>

        {/* Cover Note */}
        {applicant.cover_note && (
          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Cover note
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              {applicant.cover_note}
            </p>
          </div>
        )}
      </section>

      {/* Application Actions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Application management
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Manage candidate
          </h2>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          {/* Status */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Change status
            </span>

            <select
              value={applicant.status}
              disabled={saving}
              onChange={(e) => changeStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-64"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-3">

            {/* Shortlist */}
            <button
              type="button"
              disabled={saving || applicant.status === 'shortlisted'}
              onClick={() => changeStatus('shortlisted')}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {applicant.status === 'shortlisted'
                ? '✓ Shortlisted'
                : 'Shortlist candidate'}
            </button>

            {/* Resume */}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                ↓ Download resume
              </a>
            ) : (
              <span className="rounded-xl bg-slate-100 px-5 py-3 text-sm text-slate-400">
                Resume not available
              </span>
            )}

          </div>
        </div>
      </section>

      {/* AI Summary */}
      <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">

        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-white px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                AI powered
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Resume summary
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Quickly understand the candidate's profile and experience.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-indigo-100">
              ✨
            </div>

          </div>
        </div>

        <div className="p-6">
          <ResumeSummary
            summary={applicant.resume_summary}
            loading={summaryLoading}
            error={summaryError}
            onGenerate={onGenerate}
          />
        </div>

      </section>

    </div>
  )
}