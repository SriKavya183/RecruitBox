import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchJob } from '../lib/api'

export default function JobDetail() {
  const { jobId } = useParams()

  const [job, setJob] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJob(jobId)
      .then(setJob)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [jobId])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="animate-pulse rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="mt-5 h-10 w-2/3 rounded bg-slate-200" />
          <div className="mt-4 h-5 w-1/3 rounded bg-slate-100" />
          <div className="mt-10 h-24 rounded bg-slate-100" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-rose-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl">
          !
        </div>

        <h1 className="mt-5 text-xl font-bold text-slate-900">
          Unable to load this role
        </h1>

        <p className="mt-2 text-sm text-slate-500">{error}</p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to jobs
        </Link>
      </div>
    )
  }

  if (!job) return null

  return (
    <div className="mx-auto max-w-6xl pb-16">

      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
        <Link
          to="/"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Jobs
        </Link>

        <span>/</span>

        <span>{job.title}</span>
      </div>

      {/* Main Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/60 to-indigo-50 shadow-[0_12px_40px_rgba(37,99,235,0.08)]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative grid lg:grid-cols-[1fr_330px]">

          {/* Job information */}
          <div className="p-7 sm:p-10 lg:p-12">

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                {job.department}
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                ● Open position
              </span>

            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {job.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Join a collaborative team and work on meaningful products that
              create real impact.
            </p>

            {/* Job metadata */}
            <div className="mt-8 flex flex-wrap gap-3">

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  📍
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {job.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  💼
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Experience
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {job.experience_min}+ years
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  ✓
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Employment
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    Full-time
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Apply panel */}
          <div className="border-t border-blue-100 bg-white/80 p-7 backdrop-blur-sm lg:border-l lg:border-t-0 lg:p-8">

            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-[0_6px_18px_rgba(37,99,235,0.25)]">
                →
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Interested in this role?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit your application and take the next step in your career.
              </p>

              <Link
                to={`/jobs/${job.id}/apply`}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(37,99,235,0.25)] transition hover:bg-blue-700 hover:shadow-[0_8px_22px_rgba(37,99,235,0.3)]"
              >
                Apply for this job
                <span className="ml-2">→</span>
              </Link>

              <p className="mt-3 text-center text-xs text-slate-400">
                Application takes approximately 5 minutes
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">

        {/* Description */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_6px_24px_rgba(15,23,42,0.05)] sm:p-9">

          <div className="flex items-center gap-3">

            <span className="h-8 w-1 rounded-full bg-blue-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              About the role
            </h2>

          </div>

          <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600">
            {job.description}
          </p>

        </section>

        {/* Quick facts */}
        <aside className="h-fit rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_6px_24px_rgba(37,99,235,0.08)]">

          <h3 className="text-lg font-bold text-slate-900">
            Role overview
          </h3>

          <div className="mt-5 space-y-4">

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                Department
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {job.department}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Location
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {job.location}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Experience
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {job.experience_min}+ years
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Job type
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                Full-time
              </p>
            </div>

          </div>

          <Link
            to="/"
            className="mt-6 flex w-full items-center justify-center rounded-xl border-2 border-blue-600 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            ← Browse other roles
          </Link>

        </aside>

      </div>

    </div>
  )
}