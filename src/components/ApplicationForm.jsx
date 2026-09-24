export default function ApplicationForm({ form, onChange, onSubmit, submitting, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {error && <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input
            required
            name="full_name"
            value={form.full_name}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Phone
          <input
            required
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Years of experience
          <input
            required
            type="number"
            min="0"
            name="experience_years"
            value={form.experience_years}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Location
          <input
            required
            name="location"
            value={form.location}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Cover note (optional)
          <textarea
            name="cover_note"
            rows="3"
            value={form.cover_note}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Resume (PDF or DOCX)
          <input
            required
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx,application/pdf"
            onChange={onChange}
            className="mt-1 w-full text-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {submitting ? 'Submitting…' : 'Submit application'}
      </button>
    </form>
  )
}
