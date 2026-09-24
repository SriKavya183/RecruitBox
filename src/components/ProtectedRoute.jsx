import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Checking session…</div>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
