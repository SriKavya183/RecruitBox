export default function ApplicationForm({
  form,
  onChange,
  onSubmit,
  submitting,
  error,
}) {
  const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"

const selectClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_10px_40px_rgba(37,99,235,0.08)]"
    >
      {/* Header */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          Your application
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Tell us about yourself
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Complete the details below to apply for this position.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Personal Information */}
        <section>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Personal information
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Full name
              <input
                required
                name="full_name"
                value={form.full_name}
                onChange={onChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Email address
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Phone number
              <input
                required
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Location
              <input
                required
                name="location"
                value={form.location}
                onChange={onChange}
                placeholder="e.g. Hyderabad"
                className={inputClass}
              />
            </label>
          </div>
        </section>

        {/* Professional Information */}
        <section className="border-t border-slate-100 pt-7">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Professional information
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Years of experience
              <input
                required
                type="number"
                min="0"
                name="experience_years"
                value={form.experience_years}
                onChange={onChange}
                placeholder="e.g. 2"
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Current employment status
              <select
                required
                name="employment_status"
                value={form.employment_status}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select status</option>
                <option value="Fresher / Student">Fresher / Student</option>
                <option value="Currently employed">Currently employed</option>
                <option value="Currently not working">
                  Currently not working
                </option>
                <option value="Self-employed">Self-employed</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Notice period
              <select
                required
                name="notice_period"
                value={form.notice_period}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select notice period</option>
                <option value="Immediate">Immediate</option>
                <option value="15 days">15 days</option>
                <option value="30 days">30 days</option>
                <option value="60 days">60 days</option>
                <option value="90+ days">90+ days</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Highest qualification
              <select
                required
                name="qualification"
                value={form.qualification}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select qualification</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
        </section>

        {/* Work Preferences */}
        <section className="border-t border-slate-100 pt-7">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Work preferences
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Preferred work mode
              <select
                required
                name="work_preference"
                value={form.work_preference}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select preference</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Flexible">Flexible</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Willing to relocate?
              <select
                required
                name="willing_to_relocate"
                value={form.willing_to_relocate}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
              Expected salary range
              <select
                name="expected_salary"
                value={form.expected_salary}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select salary range</option>
                <option value="₹3–5 LPA">₹3–5 LPA</option>
                <option value="₹5–8 LPA">₹5–8 LPA</option>
                <option value="₹8–12 LPA">₹8–12 LPA</option>
                <option value="₹12–15 LPA">₹12–15 LPA</option>
                <option value="₹15+ LPA">₹15+ LPA</option>
                <option value="Negotiable">Negotiable</option>
              </select>
            </label>
          </div>
        </section>

        {/* Additional Information */}
        <section className="border-t border-slate-100 pt-7">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Additional information
          </h3>

          <div className="space-y-5">
            <label className="block text-sm font-semibold text-slate-700">
              How did you hear about this job?
              <select
                name="source"
                value={form.source}
                onChange={onChange}
                className={selectClass}
              >
                <option value="">Select an option</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Indeed">Indeed</option>
                <option value="Company website">Company website</option>
                <option value="Referral">Referral</option>
                <option value="Job portal">Job portal</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Cover note <span className="font-normal text-slate-400">(optional)</span>
              <textarea
                name="cover_note"
                rows="4"
                value={form.cover_note}
                onChange={onChange}
                placeholder="Tell the recruiter briefly why you're a good fit..."
                className={inputClass}
              />
            </label>
          </div>
        </section>

        {/* Resume */}
        <section className="border-t border-slate-100 pt-7">
          <label className="block text-sm font-semibold text-slate-700">
            Resume
            <span className="ml-2 font-normal text-slate-400">
              PDF or DOCX
            </span>
          </label>

          <div className="mt-3 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              📄
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              Upload your resume
            </p>

            <p className="mt-1 text-xs text-slate-500">
              PDF or DOCX format
            </p>

            <input
              required
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf"
              onChange={onChange}
              className="mx-auto mt-4 block w-full max-w-sm text-sm text-slate-600"
            />
          </div>
        </section>

        {/* Submit */}
        <div className="border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
          >
            {submitting ? "Submitting…" : "Submit application"}
            {!submitting && <span>→</span>}
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Your information will be securely submitted to the recruitment
            team.
          </p>
        </div>
      </div>
    </form>
  )
}