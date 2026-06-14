import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import MemberSidebar from '../../components/MemberSidebar';

export default function MemberLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <MemberSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-[260px] min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="font-bold text-gray-900">DentaCare</div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 bg-gray-50 rounded-lg text-gray-600"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
