import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Loading from "./components/Loading";

// Layouts
const MainLayouts = React.lazy(() => import("./layouts/MainLayouts"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Components
const NotFound = React.lazy(() => import("./components/NotFound"));

// Menggunakan React.lazy untuk halaman (Pages)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Details = React.lazy(() => import("./pages/Details"));
const Service = React.lazy(() => import("./pages/Service"));
const Components = React.lazy(() => import("./pages/Components"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Main App Routes (dengan Sidebar) */}
          <Route element={<MainLayouts />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard searchTerm={searchTerm} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Details />} />
            <Route path="/service" element={<Service />} />
            <Route path="/components" element={<Components />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Error Routes (Full screen TANPA sidebar) */}
          <Route
            path="/400"
            element={
              <NotFound
                code="400"
                title="Bad Request"
                description="Permintaan tidak valid (Bad Request)."
                imageUrl="https://cdn-icons-png.flaticon.com/512/8281/8281802.png"
              />
            }
          />
          <Route
            path="/401"
            element={
              <NotFound
                code="401"
                title="Unauthorized"
                description="Anda tidak memiliki izin akses (Unauthorized)."
                imageUrl="https://cdn-icons-png.flaticon.com/512/2598/2598851.png"
              />
            }
          />
          <Route
            path="/403"
            element={
              <NotFound
                code="403"
                title="Forbidden"
                description="Akses halaman ini dilarang (Forbidden)."
                imageUrl="https://cdn-icons-png.flaticon.com/512/3855/3855833.png"
              />
            }
          />

          {/* Catch-all untuk 404 asli (Full screen TANPA sidebar) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
