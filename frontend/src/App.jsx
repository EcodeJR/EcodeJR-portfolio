import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';

import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import ClientLayout from './components/layout/ClientLayout';
import SettingsLayoutWrapper from './components/layout/SettingsLayoutWrapper';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectsGallery from './pages/ProjectsGallery';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import ClientDashboard from './pages/client/Dashboard';

import ClientProjectDetail from './pages/client/ClientProjectDetail';
import AdminDashboard from './pages/admin/Dashboard';
import AdminInquiries from './pages/admin/Inquiries';
import AdminProjects from './pages/admin/Projects';
import AdminProjectForm from './pages/admin/ProjectForm';
import ClientMessages from './pages/client/Messages';
import ClientFiles from './pages/client/Files';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="min-h-screen bg-background-dark text-white">
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes - Wrapped in PublicLayout */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/projects" element={<PublicLayout><ProjectsGallery /></PublicLayout>} />
            <Route path="/projects/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />


            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientLayout><ClientDashboard /></ClientLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/projects/:id"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientLayout><ClientProjectDetail /></ClientLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/messages"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientLayout><ClientMessages /></ClientLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/files"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientLayout><ClientFiles /></ClientLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout><AdminDashboard /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inquiries"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout><AdminInquiries /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout><AdminProjects /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/new"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout><AdminProjectForm /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/edit/:id"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout><AdminProjectForm /></AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={['admin', 'client']}>
                  <SettingsLayoutWrapper><Settings /></SettingsLayoutWrapper>
                </ProtectedRoute>
              }
            />

          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </div >
  );
}

export default App;
