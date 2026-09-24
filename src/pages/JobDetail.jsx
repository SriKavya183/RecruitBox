import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

  if (loading) return <p className="text-slate-500">Loading role…</p>
  if (error) return <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p>
  if (!job) return <p>Job not found.</p>

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-teal-700">{job.department}</p>
      <h1 className="mt-1 text-2xl font-semibold">{job.title}</h1>
      <p className="mt-2 text-slate-600">
        {job.location} · {job.experience_min}+ years experience
      </p>
      <p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-slate-700">{job.description}</p>
      <Link
        to={`/jobs/${job.id}/apply`}
        className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
      >
        Apply for this job
      </Link>
    </article>
  )
}
