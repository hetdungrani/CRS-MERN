import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import RegisteredStudents from './pages/RegisteredStudents';
import PostJob from './pages/PostJob';
import JobPostList from './pages/JobPostList'; // Assuming you added this
import AdminFooter from './components/AdminFooter';
import AdminLogin from './pages/AdminLogin';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AdminApp() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-white bg-transparent">
        <AdminNavbar />
        <main className="grow">
          <Routes>
            {/* FIX: Redirects the root path (/) to the Dashboard view */}
            <Route path="/" element={<Navigate to="/admin" replace />} />

            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/students" element={<PrivateRoute><RegisteredStudents /></PrivateRoute>} />
            <Route path="/admin/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
            <Route path="/admin/job-list" element={<PrivateRoute><JobPostList /></PrivateRoute>} /> 
            <Route path="/login" element={<AdminLogin />} />
          </Routes>
        </main>
        <AdminFooter />
      </div>
    </Router>
  );
}

export default AdminApp;