export default function ResumeSummary({ summary, loading, error, onGenerate }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">AI resume summary</h2>
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Generating…' : summary ? 'Regenerate' : 'Generate summary'}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
      {summary ? (
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{summary}</pre>
      ) : (
        <p className="mt-3 text-sm text-slate-500">No summary yet. Generate one from the application details.</p>
      )}
    </section>
  )
}
