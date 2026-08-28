import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/UserManagement';
import { DatasetManagement } from './pages/DatasetManagement';
import { DataAnalysis } from './pages/DataAnalysis';
import { AIAnalyst } from './pages/AIAnalyst';
import { Visualizations } from './pages/Visualizations';
import { Predictions } from './pages/Predictions';
import { Reports } from './pages/Reports';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout>{children}</AppLayout>;
};

export function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Landing & Auth Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Workspace Routes */}
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/user-management" element={<ProtectedLayout><UserManagement /></ProtectedLayout>} />
        <Route path="/dataset-management" element={<ProtectedLayout><DatasetManagement /></ProtectedLayout>} />
        <Route path="/data-analysis" element={<ProtectedLayout><DataAnalysis /></ProtectedLayout>} />
        <Route path="/ai-analyst" element={<ProtectedLayout><AIAnalyst /></ProtectedLayout>} />
        <Route path="/visualizations" element={<ProtectedLayout><Visualizations /></ProtectedLayout>} />
        <Route path="/predictions" element={<ProtectedLayout><Predictions /></ProtectedLayout>} />
        <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
        <Route path="/history" element={<ProtectedLayout><History /></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
