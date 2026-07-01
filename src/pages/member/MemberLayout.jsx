import { Outlet, Navigate } from 'react-router-dom';
import MemberNavbar from '../../components/MemberNavbar';
import { useAuthContext } from '../../context/AuthContext';

export default function MemberLayout() {
  const { user, loading } = useAuthContext();

  // Wait for session rehydration
  if (loading) return null;

  // Redirect to member login if not authenticated as member
  if (!user || user.role !== 'member') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <MemberNavbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4 md:p-8 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
