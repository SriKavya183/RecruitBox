import { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'
import { fetchOpenJobs } from '../lib/api'
import { hasSupabaseConfig } from '../lib/supabase'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpenJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold">Open roles</h1>
      <p className="mt-1 text-slate-600">Browse jobs and apply in a few minutes. You will get an application ID to track status.</p>
      {loading && <p className="mt-6 text-slate-500">Loading jobs…</p>}
      {error && (
        <p className="mt-6 rounded-md bg-rose-50 p-3 text-sm text-rose-700">
          {hasSupabaseConfig
            ? error
            : 'Supabase is not configured. Copy .env.example to .env, add your project URL and anon key, then run the SQL in supabase/migrations/001_init.sql.'}
        </p>
      )}
      {!loading && !error && jobs.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No open jobs right now.
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
