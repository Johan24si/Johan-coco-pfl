import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Loading from "./components/Loading";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layouts
const MainLayouts = React.lazy(() => import("./layouts/MainLayouts"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Components
const NotFound = React.lazy(() => import("./components/NotFound"));

// ── Admin Pages ──
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Details = React.lazy(() => import("./pages/Details"));
const Service = React.lazy(() => import("./pages/Service"));

// ── Auth Pages ──
const AdminLogin = React.lazy(() => import("./pages/auth/admin/Login"));
const AdminRegister = React.lazy(() => import("./pages/auth/admin/Register"));
const AdminForgot = React.lazy(() => import("./pages/auth/admin/Forgot"));
const GuestLogin = React.lazy(() => import("./pages/auth/guest/Login"));
const GuestRegister = React.lazy(() => import("./pages/auth/guest/Register"));
const GuestForgot = React.lazy(() => import("./pages/auth/guest/Forgot"));

// ── Guest / Public Pages ──
const GuestPage = React.lazy(() => import("./pages/GuestPage"));
const LayananPage = React.lazy(() => import("./pages/guest/LayananPage"));
const PromoPage = React.lazy(() => import("./pages/guest/PromoPage"));
const BookingPage = React.lazy(() => import("./pages/guest/BookingPage"));
const TentangKami = React.lazy(() => import("./pages/guest/TentangKami"));

// ── Member Pages ──
const MemberLayout = React.lazy(() => import("./pages/member/MemberLayout"));
const MemberDashboard = React.lazy(() => import("./pages/member/Dashboard"));
const MemberJadwal = React.lazy(() => import("./pages/member/Jadwal"));
const MemberProfil = React.lazy(() => import("./pages/member/Profil"));
const MemberKartu = React.lazy(() => import("./pages/member/KartuMember"));
const RiwayatPerawatan = React.lazy(() => import("./pages/member/RiwayatPerawatan"));
const TrackingStatus = React.lazy(() => import("./pages/member/TrackingStatus"));
const LoyaltyPoint = React.lazy(() => import("./pages/member/LoyaltyPoint"));
const VoucherSaya = React.lazy(() => import("./pages/member/VoucherSaya"));
const NotifikasiCRM = React.lazy(() => import("./pages/member/NotifikasiCRM"));

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Suspense fallback={<Loading />}>
          <Routes>

            {/* ── Guest / Public Routes ── */}
            <Route path="/guest" element={<GuestPage />} />
            <Route path="/guest/layanan" element={<LayananPage />} />
            <Route path="/guest/promo" element={<PromoPage />} />
            <Route path="/guest/booking" element={<BookingPage />} />
            <Route path="/guest/tentang" element={<TentangKami />} />

            {/* ── Auth Routes ── */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/register" element={<AdminRegister />} />
              <Route path="/forgot" element={<AdminForgot />} />
              
              <Route path="/guest/login" element={<GuestLogin />} />
              <Route path="/guest/register" element={<GuestRegister />} />
              <Route path="/guest/forgot" element={<GuestForgot />} />
            </Route>

            {/* ── Member Routes ── */}
            <Route path="/member" element={<MemberLayout />}>
              <Route index element={<Navigate to="/member/dashboard" replace />} />
              <Route path="dashboard" element={<MemberDashboard />} />
              <Route path="jadwal" element={<MemberJadwal />} />
              <Route path="tracking" element={<TrackingStatus />} />
              <Route path="riwayat" element={<RiwayatPerawatan />} />
              <Route path="loyalty" element={<LoyaltyPoint />} />
              <Route path="voucher" element={<VoucherSaya />} />
              <Route path="notifikasi" element={<NotifikasiCRM />} />
              <Route path="kartu" element={<MemberKartu />} />
              <Route path="profil" element={<MemberProfil />} />
            </Route>

            {/* ── Admin Routes ── */}
            <Route element={<MainLayouts />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<Details />} />
              <Route path="/service" element={<Service />} />
            </Route>

            {/* ── Error Routes ── */}
            <Route path="/400" element={<NotFound code="400" title="Bad Request" description="Permintaan tidak valid." imageUrl="https://cdn-icons-png.flaticon.com/512/8281/8281802.png" />} />
            <Route path="/401" element={<NotFound code="401" title="Unauthorized" description="Anda tidak memiliki izin akses." imageUrl="https://cdn-icons-png.flaticon.com/512/2598/2598851.png" />} />
            <Route path="/403" element={<NotFound code="403" title="Forbidden" description="Akses halaman ini dilarang." imageUrl="https://cdn-icons-png.flaticon.com/512/3855/3855833.png" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </BrowserRouter>
    </AuthProvider>
  );
}
