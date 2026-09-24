import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-teal-700 text-white' : 'text-slate-200 hover:bg-slate-800'}`

export default function RecruiterLayout() {
  const { signOut, user } = useAuth()

  return (
    <div className="min-h-screen">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/recruiter" className="text-lg font-semibold tracking-tight">
            RecruitBox Recruiter
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/recruiter" className={linkClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/recruiter/applicants" className={linkClass}>
              Applicants
            </NavLink>
            <button
              type="button"
              onClick={() => signOut()}
              className="ml-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-6 text-sm text-slate-500">{user?.email}</p>
        <Outlet />
      </main>
    </div>
  )
}
