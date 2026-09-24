import { STATUSES } from '../lib/status'

export default function ApplicantFilters({ jobs, filters, onChange, onReset }) {
  return (
    <div className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-6">
      <input
        placeholder="Search name or email"
        name="search"
        value={filters.search}
        onChange={onChange}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
      />
      <select name="jobId" value={filters.jobId} onChange={onChange} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <option value="">All jobs</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
      <select name="status" value={filters.status} onChange={onChange} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="0"
        name="minExperience"
        placeholder="Min years"
        value={filters.minExperience}
        onChange={onChange}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        type="number"
        min="0"
        name="maxExperience"
        placeholder="Max years"
        value={filters.maxExperience}
        onChange={onChange}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={onChange}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
      />
      <div className="md:col-span-6">
        <button type="button" onClick={onReset} className="text-sm text-teal-700 hover:underline">
          Clear filters
        </button>
      </div>
    </div>
  )
}
