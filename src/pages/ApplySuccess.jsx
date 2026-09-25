import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ApplySuccess() {
  const location = useLocation()
  const { publicId, jobTitle } = location.state || {}

  const [copied, setCopied] = useState(false)

  const applicationId = publicId || 'RB-JYDUZR'
  const role = jobTitle || 'Frontend Engineer'

  async function copyId() {
    try {
      await navigator.clipboard.writeText(applicationId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Main Success Area */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Success Card */}
        <section className="relative overflow-hidden rounded-[28px] border border-white bg-white px-6 py-10 shadow-xl sm:px-12 sm:py-14">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-blue-100/70" />
          <div className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full bg-indigo-100/70" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-emerald-50" />

          {/* Confetti */}
          <div className="pointer-events-none absolute left-[18%] top-12 text-2xl">✨</div>
          <div className="pointer-events-none absolute left-[30%] top-20 text-xl">🎉</div>
          <div className="pointer-events-none absolute right-[25%] top-16 text-xl">✨</div>
          <div className="pointer-events-none absolute right-[15%] top-32 text-2xl">🎊</div>

          <div className="relative z-10 text-center">

            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 shadow-inner">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white shadow-lg">
                ✓
              </div>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Application submitted!
            </h1>

            <p className="mt-3 text-base text-slate-500">
              Thank you for applying to
            </p>

            <p className="mt-1 text-xl font-bold text-blue-600 sm:text-2xl">
              {role}
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Save this ID to track your application status
            </p>

            {/* Application ID */}
            <div className="mx-auto mt-5 flex max-w-md items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
              <span className="font-mono text-2xl font-bold tracking-wider text-emerald-700 sm:text-3xl">
                {applicationId}
              </span>

              <button
                type="button"
                onClick={copyId}
                className="ml-4 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                title="Copy application ID"
              >
                📋
              </button>
            </div>

            {/* Copied message */}
            {copied && (
              <p className="mt-2 text-sm font-medium text-emerald-600">
                Application ID copied!
              </p>
            )}

            {/* Buttons */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                type="button"
                onClick={copyId}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                📋 {copied ? 'Copied!' : 'Copy ID'}
              </button>

              <Link
                to={`/track/${applicationId}`}
                className="rounded-xl bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                📊 Track status →
              </Link>
            </div>
          </div>

          {/* Decorative illustration */}
          <div className="pointer-events-none absolute bottom-8 left-8 hidden text-7xl opacity-80 lg:block">
            📩
          </div>

          <div className="pointer-events-none absolute bottom-10 right-10 hidden text-6xl opacity-80 lg:block">
            ✈️
          </div>
        </section>

        {/* Information Cards */}
        <section className="mt-5 overflow-hidden rounded-[24px] border border-white bg-white shadow-lg">
          <div className="grid md:grid-cols-3">

            {/* Card 1 */}
            <div className="flex gap-4 p-6 sm:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl">
                ✉️
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Application Received
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  We have received your application successfully.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block">
              <div className="h-full w-px bg-slate-200" />
            </div>

            {/* Card 2 */}
            <div className="flex gap-4 p-6 sm:p-8 md:-ml-px">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl">
                🕐
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Under Review
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Our team will review your profile and get back to you.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex gap-4 border-t border-slate-200 p-6 sm:p-8 md:border-l md:border-t-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                🔔
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Stay Updated
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Use the above ID to track your application status anytime.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Back to Jobs */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            ← Browse more jobs
          </Link>
        </div>

      </div>
    </div>
  )
}