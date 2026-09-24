import { statusLabel, STATUS_STYLES } from '../lib/status'

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate-100 text-slate-700'
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}>
      {statusLabel(status)}
    </span>
  )
}
