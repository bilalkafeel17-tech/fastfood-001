import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "../components/customer/TopBar";
import { Navbar } from "../components/customer/Navbar";
import { Footer } from "../components/customer/Footer";
import { MobileNav } from "../components/customer/MobileNav";
import { CartDrawer } from "../components/customer/CartDrawer";
import { SearchModal } from "../components/customer/SearchModal";
import { QuickViewModal } from "../components/customer/QuickViewModal";
import { ToastContainer } from "../components/common/ToastContainer";

export const CustomerLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Global keyboard shortcut: Ctrl+K or Cmd+K to open search
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-light)" }}>
      {/* Toast Alert Stack */}
      <ToastContainer />

      {/* Top Banner & Sticky Navigation */}
      <TopBar />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Page Body */}
      <main style={{ flex: 1 }}>
        <Outlet context={{ openQuickView: (prod) => setQuickViewProduct(prod) }} />
      </main>

      {/* Side Cart Drawer */}
      <CartDrawer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenProductQuickView={(prod) => {
          setSearchOpen(false);
          setQuickViewProduct(prod);
        }}
      />

      {/* Global Quick Customize Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};
