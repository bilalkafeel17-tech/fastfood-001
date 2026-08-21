import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminHeader } from "../components/admin/AdminHeader";
import { ToastContainer } from "../components/common/ToastContainer";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg-light)" }}>
      {/* Toast notifications */}
      <ToastContainer />

      {/* Admin Sidebar Navigation */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 850
          }}
          onClick={() => setSidebarOpen(false)}
          className="admin-backdrop"
        />
      )}

      {/* Main Admin Page Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          marginLeft: "260px"
        }}
        className="admin-main-wrapper"
      >
        <AdminHeader onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main style={{ flex: 1, padding: "2rem", overflowX: "hidden" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-main-wrapper {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
