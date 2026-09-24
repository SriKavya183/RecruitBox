import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ApplySuccess() {
  const location = useLocation()
  const publicId = location.state?.publicId
  const jobTitle = location.state?.jobTitle
  const [copied, setCopied] = useState(false)

  if (!publicId) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p>No application ID found. Apply for a job first.</p>
        <Link to="/" className="mt-3 inline-block text-teal-700">
          Browse jobs
        </Link>
      </div>
    )
  }

  async function copyId() {
    await navigator.clipboard.writeText(publicId)
    setCopied(true)
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold">Application submitted</h1>
      {jobTitle && <p className="mt-2 text-slate-600">{jobTitle}</p>}
      <p className="mt-6 text-sm text-slate-500">Save this ID to track your status</p>
      <p className="mt-2 font-mono text-3xl font-semibold tracking-wide text-teal-800">{publicId}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={copyId} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
          {copied ? 'Copied' : 'Copy ID'}
        </button>
        <Link to={`/track/${publicId}`} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">
          Track status
        </Link>
      </div>
    </div>
  )
}
