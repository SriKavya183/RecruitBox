export const STATUSES = [
  { value: 'applied', label: 'Applied' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview', label: 'Interview' },
  { value: 'selected', label: 'Selected' },
  { value: 'rejected', label: 'Rejected' },
]

export const STATUS_LABELS = Object.fromEntries(STATUSES.map((s) => [s.value, s.label]))

export const STATUS_STYLES = {
  applied: 'bg-slate-100 text-slate-700',
  under_review: 'bg-amber-100 text-amber-800',
  shortlisted: 'bg-teal-100 text-teal-800',
  interview: 'bg-indigo-100 text-indigo-800',
  selected: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800',
}

export function statusLabel(value) {
  return STATUS_LABELS[value] || value
}

export function generatePublicId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return `RB-${out}`
}

export function isValidPublicId(value) {
  return /^RB-[A-Z0-9]{6}$/i.test(String(value || '').trim())
}
