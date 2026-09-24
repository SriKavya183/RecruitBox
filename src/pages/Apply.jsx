import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApplicationForm from '../components/ApplicationForm'
import { fetchJob, submitApplication } from '../lib/api'

const emptyForm = {
  full_name: '',
  email: '',
  phone: '',
  experience_years: '',
  location: '',
  cover_note: '',
  resume: null,
}

export default function Apply() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchJob(jobId).then(setJob).catch((err) => setError(err.message))
  }, [jobId])

  function onChange(e) {
    const { name, value, files } = e.target
    if (files) {
      setForm((prev) => ({ ...prev, resume: files[0] }))
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.resume) {
      setError('Please upload a resume.')
      return
    }
    setSubmitting(true)
    try {
      const result = await submitApplication({ jobId, form, resumeFile: form.resume })
      navigate('/apply/success', { state: { publicId: result.public_id, jobTitle: job?.title } })
    } catch (err) {
      setError(err.message || 'Could not submit application.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Apply{job ? ` — ${job.title}` : ''}</h1>
      <p className="mt-1 mb-6 text-slate-600">Fill in your details and upload a resume. You will receive an application ID.</p>
      <ApplicationForm form={form} onChange={onChange} onSubmit={onSubmit} submitting={submitting} error={error} />
    </div>
  )
}
