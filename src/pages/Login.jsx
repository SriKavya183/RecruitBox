import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('recruiter@recruitbox.dev')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/recruiter')
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-50">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:px-8">

        {/* Left branding section */}
        <div className="hidden lg:block">

          <div className="max-w-xl">

            <div className="inline-flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
                R
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight text-slate-900">
                  Recruit<span className="text-blue-600">Box</span>
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Recruiter workspace
                </p>
              </div>
            </div>

            <p className="mt-10 text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              Recruit smarter
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-[1.08] tracking-tight text-slate-950">
              Build your team
              <span className="block text-blue-600">
                with confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
              Manage applications, review candidates, track hiring progress,
              and move great talent through your pipeline — all in one place.
            </p>

            {/* Feature cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ✓
                </div>
                <p className="mt-4 text-sm font-bold text-slate-900">
                  Candidate tracking
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Keep every application organized.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  ✦
                </div>
                <p className="mt-4 text-sm font-bold text-slate-900">
                  AI-assisted insights
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Quickly understand candidate profiles.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="mx-auto w-full max-w-md">

          {/* Mobile logo */}
          <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
              R
            </div>

            <div>
              <p className="text-xl font-bold text-slate-900">
                Recruit<span className="text-blue-600">Box</span>
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Recruiter workspace
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-9">

            {/* Card header */}
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                🔐
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to your recruiter workspace and continue managing your
                hiring pipeline.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-7 space-y-5">

              {/* Email */}
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Email address
                </span>

                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    @
                  </span>

                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Password
                  </span>
                </div>

                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    •
                  </span>

                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </label>

              {/* Sign in */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}

                {!loading && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>

            {/* Demo account */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  ℹ
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Demo recruiter account
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-600">
                    Use the recruiter credentials configured in Supabase
                    Authentication.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer text */}
            <p className="mt-6 text-center text-xs text-slate-400">
              Secure recruiter access · RecruitBox
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}