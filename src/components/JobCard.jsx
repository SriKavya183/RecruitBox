import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_6px_24px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_14px_40px_rgba(37,99,235,0.16)]">
      
      {/* Top section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700">
          {job.title?.charAt(0)?.toUpperCase() || 'J'}
        </div>

        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
          {job.department}
        </span>
      </div>

      {/* Job title */}
      <div className="mt-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-700">
          {job.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {job.description}
        </p>
      </div>

      {/* Job details */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
          <span>📍</span>
          {job.location}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
          <span>💼</span>
          {job.experience_min}+ years
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
          <span>✓</span>
          Full-time
        </span>
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-6">
        <div className="mb-4 h-px bg-slate-100" />

        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-4 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-[0_6px_18px_rgba(37,99,235,0.15)] focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          View role
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}