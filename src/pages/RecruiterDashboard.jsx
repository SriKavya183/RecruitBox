import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATUSES } from '../lib/status'
import { fetchDashboardCounts } from '../lib/api'

export default function RecruiterDashboard() {
  const [counts, setCounts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardCounts()
      .then(setCounts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold">Recruitment dashboard</h1>
      <p className="mt-1 text-slate-600">Pipeline snapshot. Click a status to open matching applicants.</p>
      {error && <p className="mt-4 text-sm text-rose-700">{error}</p>}
      {counts && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/recruiter/applicants" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total applicants</p>
            <p className="mt-2 text-3xl font-semibold">{counts.total}</p>
          </Link>
          {STATUSES.map((status) => (
            <Link
              key={status.value}
              to={`/recruiter/applicants?status=${status.value}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{status.label}</p>
              <p className="mt-2 text-3xl font-semibold">{counts[status.value]}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
