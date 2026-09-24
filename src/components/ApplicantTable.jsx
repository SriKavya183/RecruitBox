import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function ApplicantTable({ applicants }) {
  if (!applicants.length) {
    return <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No applicants match these filters.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Candidate</th>
            <th className="px-4 py-3">Job</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Experience</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((row) => (
            <tr key={row.id} className="border-t border-slate-100">
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900">{row.full_name}</div>
                <div className="text-xs text-slate-500">{row.email}</div>
              </td>
              <td className="px-4 py-3">{row.jobs?.title || '—'}</td>
              <td className="px-4 py-3">{row.location}</td>
              <td className="px-4 py-3">{row.experience_years} yrs</td>
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <Link to={`/recruiter/applicants/${row.id}`} className="font-medium text-teal-700 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
