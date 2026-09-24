import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { trackApplication } from '../lib/api'

export default function TrackStatus() {
  const { publicId } = useParams()
  const [row, setRow] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    trackApplication(publicId)
      .then((data) => {
        setRow(data)
        if (!data) setError('No application found for that ID.')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [publicId])

  if (loading) return <p className="text-slate-500">Looking up application…</p>

  if (error || !row) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-slate-700">{error || 'Application not found.'}</p>
        <Link to="/track" className="mt-4 inline-block text-teal-700">
          Try another ID
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="font-mono text-sm text-slate-500">{row.public_id}</p>
      <h1 className="mt-1 text-2xl font-semibold">{row.full_name}</h1>
      <p className="mt-2 text-slate-600">{row.job_title}</p>
      <div className="mt-4">
        <StatusBadge status={row.status} />
      </div>
      <p className="mt-6 text-sm text-slate-500">Submitted {new Date(row.created_at).toLocaleString()}</p>
    </div>
  )
}
