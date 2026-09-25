import { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard'
import { fetchOpenJobs } from '../lib/api'
import { hasSupabaseConfig } from '../lib/supabase'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All locations')

  useEffect(() => {
    fetchOpenJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(jobs.map((job) => job.location).filter(Boolean)),
    ]

    return ['All locations', ...uniqueLocations]
  }, [jobs])

  const filteredJobs = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return jobs.filter((job) => {
      const matchesSearch =
        !searchText ||
        job.title?.toLowerCase().includes(searchText) ||
        job.department?.toLowerCase().includes(searchText) ||
        job.description?.toLowerCase().includes(searchText)

      const matchesLocation =
        location === 'All locations' || job.location === location

      return matchesSearch && matchesLocation
    })
  }, [jobs, search, location])

  return (
    <div className="pb-16">

      {/* HERO */}
      <section className="relative mb-10 overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-[0_12px_40px_rgba(37,99,235,0.08)]">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative grid items-center lg:grid-cols-[1.05fr_0.95fr]">

          {/* Hero content */}
          <div className="px-7 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12">

            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
              Build Your Career
            </span>

            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl">
              Find the right opportunity
              <span className="block text-blue-600">
                for your next big step
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Explore exciting roles, connect with great teams, and discover
              opportunities that help you build a career you are proud of.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <div className="rounded-xl border border-blue-100 bg-white/90 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Open opportunities
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {jobs.length}
                </p>
              </div>

              <div className="rounded-xl border border-blue-100 bg-white/90 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Easy application
                </p>

                <p className="mt-1 text-xl font-bold text-blue-600">
                  5 min
                </p>
              </div>

            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden min-h-[330px] overflow-hidden lg:block">

            <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-50/80 via-transparent to-transparent" />

            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              alt="Professionals collaborating at work"
              className="h-full w-full object-cover"
            />

            {/* Quote */}
            <div className="absolute bottom-8 left-8 z-20 max-w-[290px] rounded-2xl border border-white/80 bg-white/95 p-5 shadow-xl backdrop-blur-md">

              <p className="text-lg font-semibold leading-7 text-slate-900">
                “Great careers
                <span className="text-blue-600"> happen here.</span>”
              </p>

              <div className="mt-3 h-1 w-12 rounded-full bg-blue-600" />

            </div>
          </div>
        </div>
      </section>

      {/* JOB HEADER */}
      <section>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <span className="h-8 w-1 rounded-full bg-blue-600" />

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Open roles
              </h2>

            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Browse jobs and apply in a few minutes. You will get an
              application ID to track your status.
            </p>
          </div>

          {/* SEARCH */}
          {!loading && !error && jobs.length > 0 && (
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

              <div className="relative sm:min-w-[280px]">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles, skills..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>
          )}

        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">

          <p className="font-semibold">
            Unable to load jobs
          </p>

          <p className="mt-1">
            {hasSupabaseConfig
              ? error
              : 'Supabase is not configured. Copy .env.example to .env, add your project URL and anon key, then run the SQL in supabase/migrations/001_init.sql.'}
          </p>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[330px] animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-11 w-11 rounded-xl bg-slate-200" />
              <div className="mt-6 h-6 w-3/4 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded bg-slate-100" />
              <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
              <div className="mt-8 h-10 w-full rounded-xl bg-slate-200" />
            </div>
          ))}

        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && jobs.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-blue-200 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            💼
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            No open jobs right now
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Please check back later for new opportunities.
          </p>

        </div>
      )}

      {/* FILTER EMPTY */}
      {!loading &&
        !error &&
        jobs.length > 0 &&
        filteredJobs.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🔍
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No matching roles
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or location filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('')
                setLocation('All locations')
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear filters
            </button>

          </div>
        )}

      {/* JOB GRID */}
      {!loading && !error && filteredJobs.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

        </div>
      )}

      {/* BOTTOM CTA */}
      {!loading && !error && jobs.length > 0 && (
        <section className="mt-12 overflow-hidden rounded-2xl bg-[#0B1F3A] p-7 shadow-lg sm:p-10">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                Your next chapter
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Your next opportunity could be one application away.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Explore our open roles and find a position that matches your
                skills and career goals.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
            >
              Explore roles ↑
            </button>

          </div>

        </section>
      )}

    </div>
  )
}