import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidPublicId } from '../lib/status'

export default function Track() {
  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    const value = id.trim().toUpperCase()

    if (!isValidPublicId(value)) {
      setError('Enter a valid ID such as RB-A1B2C3.')
      return
    }

    navigate(`/track/${value}`)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-5 py-10 shadow-[0_15px_50px_rgba(37,99,235,0.08)] sm:px-10 sm:py-14">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-200">
          ✓
        </div>

        {/* Heading */}
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Application tracking
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Track your application
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Stay updated on your hiring journey. Enter your application ID to
          view your current application status.
        </p>

        {/* Tracking Card */}
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:p-7">

          <form onSubmit={onSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="application-id"
                className="text-sm font-semibold text-slate-800"
              >
                Application ID
              </label>

              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                  #
                </span>

                <input
                  id="application-id"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value)
                    setError('')
                  }}
                  placeholder="RB-A1B2C3"
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-9 pr-4 font-mono text-sm uppercase text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Enter the ID provided on your application confirmation page.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <span>!</span>
                <span>{error}</span>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              View application status
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </form>
        </div>

        {/* Status information */}
        <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 text-left sm:grid-cols-4">

          <div className="rounded-xl border border-blue-100 bg-white/80 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
              1
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-700">
              Applied
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white/80 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
              2
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-700">
              Review
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white/80 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
              3
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-700">
              Interview
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white/80 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
              4
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-700">
              Decision
            </p>
          </div>

        </div>

        {/* Bottom note */}
        <p className="mt-8 text-xs text-slate-400">
          Your application status is updated by the recruitment team.
        </p>
      </div>
    </div>
  )
}