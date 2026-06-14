import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ role, guestOnly }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#0891b2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (guestOnly) {
    if (user) {
      return <Navigate to={user.role === 'admin' ? '/dashboard' : '/member/dashboard'} replace />;
    }
    return <Outlet />;
  }

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // If logged in but wrong role, redirect to appropriate dashboard
    return <Navigate to={user.role === 'admin' ? '/dashboard' : '/member/dashboard'} replace />;
  }

  return <Outlet />;
}
