import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { trackApplication } from '../lib/api'

const stages = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Interview',
  'Selected',
]

export default function TrackStatus() {
  const { publicId } = useParams()
  const [row, setRow] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError('')

    trackApplication(publicId)
      .then((data) => {
        setRow(data)
        if (!data) setError('No application found for that ID.')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [publicId])

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Looking up your application…
          </p>
        </div>
      </div>
    )
  }

  if (error || !row) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-xl text-rose-600">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Application not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error || 'We could not find an application with that ID.'}
          </p>

          <Link
            to="/track"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            ← Try another ID
          </Link>
        </div>
      </div>
    )
  }

  const currentIndex = stages.indexOf(row.status)

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-8 shadow-[0_10px_40px_rgba(37,99,235,0.06)] sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Application tracking
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Application status
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Track your recruitment journey and stay updated.
            </p>
          </div>

          <Link
            to="/track"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Track another
          </Link>
        </div>
      </div>

      {/* Candidate Summary */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">

        {/* Main Application Card */}
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                {row.full_name?.charAt(0)?.toUpperCase() || 'A'}
              </div>

              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-500">
                  {row.public_id}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {row.full_name}
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {row.job_title}
                </p>
              </div>
            </div>

            <StatusBadge status={row.status} />
          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-slate-100" />

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Hiring progress
            </h3>

            <div className="mt-6">
              {stages.map((stage, index) => {
                const completed =
                  currentIndex >= 0 && index <= currentIndex

                const current = row.status === stage

                return (
                  <div key={stage} className="relative flex gap-4">

                    {/* Connecting line */}
                    {index !== stages.length - 1 && (
                      <div
                        className={`absolute left-[15px] top-8 h-[calc(100%-4px)] w-0.5 ${
                          currentIndex > index
                            ? 'bg-blue-500'
                            : 'bg-slate-200'
                        }`}
                      />
                    )}

                    {/* Circle */}
                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        completed
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                          : 'border-2 border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      {completed ? '✓' : index + 1}
                    </div>

                    {/* Text */}
                    <div className="pb-7">
                      <p
                        className={`text-sm font-semibold ${
                          current
                            ? 'text-blue-600'
                            : completed
                              ? 'text-slate-800'
                              : 'text-slate-400'
                        }`}
                      >
                        {stage}
                      </p>

                      {current && (
                        <p className="mt-1 text-xs text-slate-500">
                          Your application is currently at this stage.
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Side Information */}
        <div className="space-y-6">

          {/* Current Status */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg shadow-blue-200">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-100">
              Current status
            </p>

            <div className="mt-4">
              <p className="text-3xl font-bold">
                {row.status}
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Your application is being processed by the recruitment team.
              </p>
            </div>
          </div>

          {/* Application Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Application details
            </h3>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs text-slate-400">
                  Application ID
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                  {row.public_id}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Position
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {row.job_title}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Submitted
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {new Date(row.created_at).toLocaleString()}
                </p>
              </div>

            </div>
          </div>

          {/* Help */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-bold text-blue-900">
              Need help?
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Keep your application ID handy when contacting the recruitment
              team about your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}