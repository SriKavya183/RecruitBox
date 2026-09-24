import { Link, NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-teal-700 text-white' : 'text-slate-200 hover:bg-slate-800'}`

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            RecruitBox
          </Link>
          <nav className="flex items-center gap-1">
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
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        RecruitBox MVP — candidate portal
      </footer>
    </div>
  )
}
