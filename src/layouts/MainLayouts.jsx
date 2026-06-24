import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuthContext } from '../context/AuthContext';

export default function MainLayouts() {
  const { user, loading, logout } = useAuthContext();
  const navigate = useNavigate();

  // Wait for session rehydration
  if (loading) return null;

  // Redirect to login if not authenticated or not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
