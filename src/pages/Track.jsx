import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidPublicId } from '../lib/status'

export default function Track() {
  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    const value = id.trim().toUpperCase()
    if (!isValidPublicId(value)) {
      setError('Enter a valid ID such as RB-A1B2C3.')
      return
    }
    navigate(`/track/${value}`)
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Track application</h1>
      <p className="mt-2 text-sm text-slate-600">Enter the application ID from your confirmation page.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="RB-XXXXXX"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono uppercase"
        />
        <button type="submit" className="w-full rounded-lg bg-teal-700 py-2.5 text-sm font-semibold text-white">
          View status
        </button>
      </form>
    </div>
  )
}
