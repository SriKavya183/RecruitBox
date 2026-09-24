import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RecruiterLayout from './components/RecruiterLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import JobList from './pages/JobList'
import JobDetail from './pages/JobDetail'
import Apply from './pages/Apply'
import ApplySuccess from './pages/ApplySuccess'
import Track from './pages/Track'
import TrackStatus from './pages/TrackStatus'
import Login from './pages/Login'
import RecruiterDashboard from './pages/RecruiterDashboard'
import ApplicantList from './pages/ApplicantList'
import ApplicantProfile from './pages/ApplicantProfile'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route path="/jobs/:jobId/apply" element={<Apply />} />
            <Route path="/apply/success" element={<ApplySuccess />} />
            <Route path="/track" element={<Track />} />
            <Route path="/track/:publicId" element={<TrackStatus />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<RecruiterLayout />}>
              <Route path="/recruiter" element={<RecruiterDashboard />} />
              <Route path="/recruiter/applicants" element={<ApplicantList />} />
              <Route path="/recruiter/applicants/:id" element={<ApplicantProfile />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
