import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-teal-700">{job.department}</p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">{job.title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        {job.location} · {job.experience_min}+ years
      </p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm text-slate-500">{job.description}</p>
      <Link
        to={`/jobs/${job.id}`}
        className="mt-4 inline-flex w-fit rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
      >
        View role
      </Link>
    </article>
  )
}
