import { Link, NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]'
      : 'text-slate-200 hover:bg-white/10 hover:text-white'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-50 overflow-hidden border-b border-blue-900/40 bg-gradient-to-r from-[#071B3A] via-[#0B2A5B] to-[#123C8C] text-white shadow-lg">

        {/* Decorative blue glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-24 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500 to-blue-700 text-xl font-extrabold text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition-transform duration-200 group-hover:scale-105">
              R
            </div>

            {/* Brand */}
            <div className="leading-none">
              <div className="text-xl font-bold tracking-tight">
                Recruit<span className="text-blue-400">Box</span>
              </div>

              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Career Portal
              </div>
            </div>

          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1.5">

            <NavLink to="/" className={linkClass} end>
              Jobs
            </NavLink>

            <NavLink to="/track" className={linkClass}>
              Track application
            </NavLink>

            <NavLink to="/login" className={linkClass}>
              Recruiter login
            </NavLink>

          </nav>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white py-7 text-center">

        <div className="text-sm font-semibold text-slate-700">
          Recruit<span className="text-blue-600">Box</span>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Recruitment made simple — candidate portal
        </p>

      </footer>

    </div>
  )
}