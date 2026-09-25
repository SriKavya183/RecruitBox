import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ApplicantFilters from '../components/ApplicantFilters'
import ApplicantTable from '../components/ApplicantTable'
import { fetchApplicants, fetchJobs } from '../lib/api'
import { STATUSES } from '../lib/status'

const emptyFilters = {
  search: '',
  jobId: '',
  status: '',
  minExperience: '',
  maxExperience: '',
  location: '',
}

const statusStyles = {
  applied: 'border-blue-200 bg-blue-50 text-blue-700',
  under_review: 'border-amber-200 bg-amber-50 text-amber-700',
  shortlisted: 'border-purple-200 bg-purple-50 text-purple-700',
  interview: 'border-orange-200 bg-orange-50 text-orange-700',
  selected: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  rejected: 'border-red-200 bg-red-50 text-red-700',
}

const statusIcons = {
  applied: '📄',
  under_review: '🔍',
  shortlisted: '⭐',
  interview: '💬',
  selected: '✓',
  rejected: '✕',
}

export default function ApplicantList() {
  const [params] = useSearchParams()

  const [jobs, setJobs] = useState([])
  const [applicants, setApplicants] = useState([])
  const [filters, setFilters] = useState({
    ...emptyFilters,
    status: params.get('status') || '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    setLoading(true)

    fetchApplicants(filters)
      .then(setApplicants)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [filters])

  function onChange(e) {
    const { name, value } = e.target

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function resetFilters() {
    setFilters(emptyFilters)
  }

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-xl lg:p-10">

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">

          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
              Recruitment workspace
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Applicants
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Search and filter candidates by job, status, experience, and
              location to find the right talent for your open roles.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
            <Link
  to="/recruiter"
  className="rounded-xl bg-white px-6 py-3 text-sm font-bold !text-blue-700 shadow-lg transition duration-200 hover:bg-blue-50 hover:shadow-xl"
>
  ← Dashboard
</Link>

              <div className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-medium text-BLACK">
                Candidate management
              </div>
            </div>
          </div>

          {/* HERO IMAGE / ILLUSTRATION */}
          <div className="hidden lg:block">
            <div className="flex h-44 w-64 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-5xl">
                  👥
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  Hiring made simple
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TOTAL APPLICANTS */}
      <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total applicants
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {applicants.length}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Candidates matching current filters
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            👥
          </div>

        </div>
      </section>

      {/* FILTERS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Filters
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find candidates quickly using the filters below.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>

        <ApplicantFilters
          jobs={jobs}
          filters={filters}
          onChange={onChange}
          onReset={resetFilters}
        />
      </section>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* STATUS SUMMARY */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Hiring pipeline
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Candidate status overview
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          {STATUSES.map((status) => {
            const count = applicants.filter(
              (applicant) => applicant.status === status.value
            ).length

            return (
              <Link
                key={status.value}
                to={`/recruiter/applicants?status=${status.value}`}
                className={`rounded-2xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                  statusStyles[status.value] ||
                  'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">

                  <span className="text-2xl">
                    {statusIcons[status.value] || '•'}
                  </span>

                  <span className="text-2xl font-bold">
                    {count}
                  </span>

                </div>

                <p className="mt-3 text-sm font-semibold">
                  {status.label}
                </p>
              </Link>
            )
          })}

        </div>
      </section>

      {/* APPLICANTS TABLE */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Candidate applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage candidates across the hiring pipeline.
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {applicants.length} candidates
            </div>

          </div>
        </div>

        <div className="p-2 sm:p-4">

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                <p className="mt-3 text-sm text-slate-500">
                  Loading applicants…
                </p>
              </div>
            </div>
          ) : applicants.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No applicants found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your filters or search criteria.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ApplicantTable applicants={applicants} />
          )}

        </div>
      </section>

    </div>
  )
}