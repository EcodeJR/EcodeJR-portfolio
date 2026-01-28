import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectsGallery from './pages/ProjectsGallery';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import ClientDashboard from './pages/client/Dashboard';
import ClientProjectDetail from './pages/client/ClientProjectDetail';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<ProjectsGallery />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Home />} /> {/* Redirect/Alias for now */}

            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/projects/:id"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientProjectDetail />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
