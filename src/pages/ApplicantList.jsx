import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ApplicantFilters from '../components/ApplicantFilters'
import ApplicantTable from '../components/ApplicantTable'
import { fetchApplicants, fetchJobs } from '../lib/api'

const emptyFilters = {
  search: '',
  jobId: '',
  status: '',
  minExperience: '',
  maxExperience: '',
  location: '',
}

export default function ApplicantList() {
  const [params] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [applicants, setApplicants] = useState([])
  const [filters, setFilters] = useState({ ...emptyFilters, status: params.get('status') || '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs().then(setJobs).catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchApplicants(filters)
      .then(setApplicants)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [filters])

  function onChange(e) {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Applicants</h1>
      <p className="mt-1 mb-4 text-slate-600">Search and filter by job, status, experience, and location.</p>
      <ApplicantFilters jobs={jobs} filters={filters} onChange={onChange} onReset={() => setFilters(emptyFilters)} />
      {error && <p className="mb-4 text-sm text-rose-700">{error}</p>}
      {loading ? <p className="text-slate-500">Loading applicants…</p> : <ApplicantTable applicants={applicants} />}
    </div>
  )
}
