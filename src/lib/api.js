import { supabase } from './supabase'
import { generatePublicId } from './status'

export async function fetchOpenJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_open', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function fetchJob(jobId) {
  const { data, error } = await supabase.from('jobs').select('*').eq('id', jobId).single()
  if (error) throw error
  return data
}

export async function fetchJobs() {
  const { data, error } = await supabase.from('jobs').select('id, title').order('title')
  if (error) throw error
  return data || []
}

export async function submitApplication({ jobId, form, resumeFile }) {
  const publicId = generatePublicId()
  const safeName = resumeFile.name.replace(/[^\w.\-]+/g, '_')
  const resumePath = `${crypto.randomUUID()}/${safeName}`

  const { error: uploadError } = await supabase.storage.from('resumes').upload(resumePath, resumeFile, {
    cacheControl: '3600',
    upsert: false,
  })
  if (uploadError) throw uploadError

  const { data, error } = await supabase
    .from('applications')
    .insert({
      public_id: publicId,
      job_id: jobId,
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      experience_years: Number(form.experience_years),
      location: form.location.trim(),
      cover_note: form.cover_note.trim() || null,
      resume_path: resumePath,
      status: 'applied',
    })
    .select('id, public_id')
    .single()

  if (error) throw error
  return data
}

export async function trackApplication(publicId) {
  const { data, error } = await supabase.rpc('get_application_by_public_id', {
    p_id: publicId.trim().toUpperCase(),
  })
  if (error) throw error
  return Array.isArray(data) ? data[0] || null : data
}

export async function fetchDashboardCounts() {
  const { data, error } = await supabase.from('applications').select('status')
  if (error) throw error
  const counts = {
    total: data.length,
    applied: 0,
    under_review: 0,
    shortlisted: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  }
  data.forEach((row) => {
    if (counts[row.status] !== undefined) counts[row.status] += 1
  })
  return counts
}

export async function fetchApplicants(filters) {
  let query = supabase
    .from('applications')
    .select('id, public_id, full_name, email, location, experience_years, status, created_at, jobs(title, location)')
    .order('created_at', { ascending: false })

  if (filters.jobId) query = query.eq('job_id', filters.jobId)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.location) query = query.ilike('location', `%${filters.location}%`)
  if (filters.minExperience !== '' && filters.minExperience != null) {
    query = query.gte('experience_years', Number(filters.minExperience))
  }
  if (filters.maxExperience !== '' && filters.maxExperience != null) {
    query = query.lte('experience_years', Number(filters.maxExperience))
  }
  if (filters.search) {
    const term = filters.search.trim()
    query = query.or(`full_name.ilike.%${term}%,email.ilike.%${term}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function fetchApplicant(id) {
  const { data, error } = await supabase
    .from('applications')
    .select('*, jobs(id, title, department, location)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function updateApplicationStatus(id, status) {
  const { data, error } = await supabase
    .from('applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data
}

export async function getResumeUrl(path) {
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 60 * 10)
  if (error) throw error
  return data.signedUrl
}

export async function generateResumeSummary(applicationId) {
  const { data, error } = await supabase.functions.invoke('summarize-resume', {
    body: { applicationId },
  })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data.summary
}

export function localFallbackSummary(application) {
  const job = application.jobs?.title || 'this role'
  const years = application.experience_years
  const loc = application.location
  const note = application.cover_note
  return [
    `• ${application.full_name} applied for ${job} from ${loc} with ${years} year${years === 1 ? '' : 's'} of experience.`,
    `• Contact: ${application.email}${application.phone ? ` / ${application.phone}` : ''}.`,
    note ? `• Candidate note: ${note}` : '• No cover note was provided; review the uploaded resume for skills and achievements.',
    `• Current pipeline status: ${application.status.replace('_', ' ')}.`,
    `Recommendation: Move to Under Review if the resume matches ${job}; otherwise reject with a skills-gap note.`,
  ].join('\n')
}

export async function saveResumeSummary(id, summary) {
  const { error } = await supabase.from('applications').update({ resume_summary: summary }).eq('id', id)
  if (error) throw error
}
