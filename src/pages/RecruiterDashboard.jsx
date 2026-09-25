import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATUSES } from '../lib/status'
import { fetchDashboardCounts } from '../lib/api'

const statusStyles = {
  applied: {
    icon: '📄',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    text: 'text-blue-700',
    bar: 'bg-blue-600',
  },
  under_review: {
    icon: '🔍',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    text: 'text-amber-700',
    bar: 'bg-amber-500',
  },
  shortlisted: {
    icon: '⭐',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    text: 'text-purple-700',
    bar: 'bg-purple-600',
  },
  interview: {
    icon: '💬',
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    text: 'text-orange-700',
    bar: 'bg-orange-500',
  },
  selected: {
    icon: '✓',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    text: 'text-emerald-700',
    bar: 'bg-emerald-600',
  },
  rejected: {
    icon: '✕',
    bg: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    text: 'text-rose-700',
    bar: 'bg-rose-600',
  },
}

export default function RecruiterDashboard() {
  const [counts, setCounts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardCounts()
      .then(setCounts)
      .catch((err) => setError(err.message))
  }, [])

  const total = counts?.total || 0

  return (
    <div className="space-y-8">


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 shadow-[0_20px_60px_rgba(37,99,235,0.25)]">

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-[-100px] left-[35%] h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative grid min-h-[360px] lg:grid-cols-[1.05fr_0.95fr]">

          {/* Hero content */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">

            <div className="mb-5 inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
              Recruiter workspace
            </div>

            <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-[42%] h-[80%] items-center justify-center">
  <img
    src="/recruiter-dashboard.png"
    alt="Recruiter managing candidates"
    className="max-h-full max-w-full object-contain drop-shadow-2xl"
  />
</div>

            <p className="mt-5 max-w-xl text-base leading-7 text-blue-50 sm:text-lg">
              Get a quick overview of your hiring pipeline and manage
              candidates at every stage of the recruitment process.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/recruiter/applicants"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
              >
                View all applicants
                <span className="text-lg">→</span>
              </Link>

              <Link
                to="/recruiter/applicants"
                className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/20"
              >
                Hiring pipeline overview
              </Link>

            </div>

            {/* Hero feature points */}
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-blue-50">

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  👥
                </span>
                Track candidates
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  📋
                </span>
                Manage applications
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  📊
                </span>
                Hiring insights
              </div>

            </div>
          </div>

          {/* Recruiter image */}
          <div className="relative hidden min-h-[360px] lg:block">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600/30 to-transparent z-10" />

            <img
              src="/recruiter-dashboard.png"
              alt="Recruiter managing candidates"
              className="absolute inset-0 h-full w-full object-cover object-[78%_30%] opacity-95"
            />

            {/* Image overlay */}
            <div className="absolute bottom-8 right-8 z-20 rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-white shadow-xl backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
                Hiring made simple
              </p>
              <p className="mt-1 text-lg font-bold">
                Find the right talent
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* ================= TOTAL APPLICANTS ================= */}
      {counts && (
        <>
          <Link
            to="/recruiter/applicants"
            className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_35px_rgba(37,99,235,0.12)] sm:p-7"
          >
            <div className="flex items-center justify-between gap-6">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total applicants
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                  {total}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Candidates across all open roles
                </p>
              </div>

              <div className="hidden items-center gap-1 sm:flex">
                <span className="h-5 w-2 rounded-full bg-blue-100" />
                <span className="h-8 w-2 rounded-full bg-blue-200" />
                <span className="h-11 w-2 rounded-full bg-blue-300" />
                <span className="h-14 w-2 rounded-full bg-blue-400" />
                <span className="h-17 w-2 rounded-full bg-blue-600" />
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                👥
              </div>

            </div>
          </Link>

          {/* ================= PIPELINE HEADER ================= */}
          <div>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Hiring pipeline
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  Candidate progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor candidates as they move through the hiring process.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                💡 Click a stage to view candidates
              </div>

            </div>

            {/* ================= STATUS CARDS ================= */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {STATUSES.map((status) => {
                const style =
                  statusStyles[status.value] || statusStyles.applied

                const count = counts[status.value] || 0

                const percentage =
                  total > 0 ? Math.round((count / total) * 100) : 0

                return (
                  <Link
                    key={status.value}
                    to={`/recruiter/applicants?status=${status.value}`}
                    className={`group rounded-2xl border border-slate-200 ${style.bg} p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between">

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBg} text-xl`}
                      >
                        {style.icon}
                      </div>

                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/70 ${style.text} transition-transform duration-200 group-hover:translate-x-1`}
                      >
                        →
                      </span>

                    </div>

                    <p className={`mt-5 text-sm font-semibold ${style.text}`}>
                      {status.label}
                    </p>

                    <div className="mt-1 flex items-end justify-between">

                      <p className="text-3xl font-bold text-slate-900">
                        {count}
                      </p>

                      <p className="text-xs font-medium text-slate-400">
                        {percentage}%
                      </p>

                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/80">
                      <div
                        className={`h-full rounded-full ${style.bar} transition-all duration-500`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                  </Link>
                )
              })}

            </div>
          </div>
        </>
      )}
    </div>
  )
}