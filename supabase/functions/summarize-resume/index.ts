import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return json({ error: 'Unauthorized' }, 401)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    )

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return json({ error: 'Unauthorized' }, 401)
    }

    const { applicationId } = await req.json()
    if (!applicationId) {
      return json({ error: 'applicationId is required' }, 400)
    }

    const { data: application, error } = await supabase
      .from('applications')
      .select('id, full_name, email, experience_years, location, cover_note, status, jobs(title, department, location)')
      .eq('id', applicationId)
      .single()

    if (error || !application) {
      return json({ error: 'Application not found' }, 404)
    }

    const prompt = [
      'Summarize this job candidate for a recruiter in 4-6 short bullet points, then one Recommendation line.',
      'Be factual. Do not invent employers or skills that are not in the input.',
      `Job: ${application.jobs?.title || 'Unknown'} (${application.jobs?.department || ''} in ${application.jobs?.location || ''})`,
      `Name: ${application.full_name}`,
      `Email: ${application.email}`,
      `Experience years: ${application.experience_years}`,
      `Candidate location: ${application.location}`,
      `Cover note: ${application.cover_note || 'None'}`,
      `Current status: ${application.status}`,
    ].join('\n')

    const apiKey = Deno.env.get('OPENAI_API_KEY') || Deno.env.get('GROQ_API_KEY')
    let summary

    if (apiKey && Deno.env.get('OPENAI_API_KEY')) {
      summary = await completeOpenAI(apiKey, prompt)
    } else if (apiKey) {
      summary = await completeGroq(apiKey, prompt)
    } else {
      summary = [
        `• ${application.full_name} applied for ${application.jobs?.title} from ${application.location} with ${application.experience_years} years of experience.`,
        `• Contact: ${application.email}.`,
        application.cover_note
          ? `• Candidate note: ${application.cover_note}`
          : '• No cover note was provided; review the uploaded resume next.',
        `• Current pipeline status: ${application.status}.`,
        `Recommendation: Advance to Under Review if the resume matches ${application.jobs?.title}; otherwise close as Rejected.`,
      ].join('\n')
    }

    const { error: updateError } = await supabase
      .from('applications')
      .update({ resume_summary: summary })
      .eq('id', applicationId)

    if (updateError) {
      return json({ error: updateError.message }, 400)
    }

    return json({ summary })
  } catch (err) {
    return json({ error: err.message || 'Failed to summarize resume' }, 500)
  }
})

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function completeOpenAI(apiKey, prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'You write concise recruiter-facing candidate summaries.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error(data?.error?.message || 'OpenAI returned no summary')
  return text.trim()
}

async function completeGroq(apiKey, prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'You write concise recruiter-facing candidate summaries.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error(data?.error?.message || 'Groq returned no summary')
  return text.trim()
}
