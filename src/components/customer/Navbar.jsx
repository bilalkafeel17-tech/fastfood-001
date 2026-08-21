import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Flame,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  ChevronDown,
  LayoutDashboard,
  Package,
  LogOut,
  ShieldAlert,
  Bell,
  MapPin,
  Ticket
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useNotifications } from "../../context/NotificationContext";

export const Navbar = ({ onOpenSearch }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItemCount, subtotal, openCart } = useCart();
  const { favoritesCount } = useFavorites();
  const { unreadCustomerCount } = useNotifications();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 800,
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "#FFFFFF",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid var(--border-light)",
        transition: "all var(--transition-fast)",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
          gap: "1rem"
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none"
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--primary) 0%, #B91C1C 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-primary)",
              color: "#FFFFFF"
            }}
          >
            <Flame size={24} fill="#FFB703" color="#FFB703" />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.45rem",
                fontWeight: 900,
                color: "var(--dark)",
                letterSpacing: "-0.5px",
                display: "block",
                lineHeight: 1.1
              }}
            >
              CRAVE<span style={{ color: "var(--primary)" }}>BITE</span>
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "1.5px",
                textTransform: "uppercase"
              }}
            >
              Express Gourmet
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem"
          }}
          className="desktop-nav-links"
        >
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive ? "var(--primary)" : "var(--text-main)",
              position: "relative"
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive ? "var(--primary)" : "var(--text-main)"
            })}
          >
            Menu
          </NavLink>
          <NavLink
            to="/deals"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive ? "var(--primary)" : "var(--text-main)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem"
            })}
          >
            <span>Deals</span>
            <span
              style={{
                background: "var(--secondary)",
                color: "var(--dark)",
                fontSize: "0.65rem",
                fontWeight: 800,
                padding: "1px 6px",
                borderRadius: "var(--radius-full)"
              }}
            >
              HOT
            </span>
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive ? "var(--primary)" : "var(--text-main)"
            })}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive ? "var(--primary)" : "var(--text-main)"
            })}
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Nav Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="btn-icon"
            aria-label="Search food"
            title="Search food (Ctrl + K)"
          >
            <Search size={19} />
          </button>

          {/* Favorites */}
          <Link
            to="/favorites"
            className="btn-icon"
            style={{ position: "relative" }}
            aria-label="View Favorites"
            title="Favorites"
          >
            <Heart size={19} fill={favoritesCount > 0 ? "var(--primary)" : "none"} color={favoritesCount > 0 ? "var(--primary)" : "currentColor"} />
            {favoritesCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "var(--primary)",
                  color: "#FFFFFF",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="btn btn-primary"
            style={{
              padding: "0.55rem 1.1rem",
              borderRadius: "var(--radius-full)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            aria-label="Open cart drawer"
          >
            <div style={{ position: "relative" }}>
              <ShoppingBag size={18} />
              {totalItemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-7px",
                    right: "-8px",
                    background: "var(--secondary)",
                    color: "var(--dark)",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #FFFFFF"
                  }}
                >
                  {totalItemCount}
                </span>
              )}
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>
              ${subtotal > 0 ? subtotal.toFixed(2) : "0.00"}
            </span>
          </button>

          {/* User Profile / Auth Area */}
          {isAuthenticated ? (
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#F3F4F6",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.3rem 0.6rem 0.3rem 0.3rem",
                  cursor: "pointer"
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="desktop-username">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={14} color="#6B7280" />
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "#FFFFFF",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    width: "230px",
                    padding: "0.5rem 0",
                    zIndex: 999,
                    animation: "fadeIn 0.15s ease-out"
                  }}
                >
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-light)" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--dark)" }}>{user.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {user.email}
                    </div>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.6rem 1rem",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "var(--primary)",
                        background: "var(--primary-light)"
                      }}
                    >
                      <ShieldAlert size={16} /> Admin Portal
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.6rem 1rem",
                      fontSize: "0.88rem",
                      color: "var(--text-main)"
                    }}
                  >
                    <LayoutDashboard size={16} color="#6B7280" /> Dashboard Overview
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.6rem 1rem",
                      fontSize: "0.88rem",
                      color: "var(--text-main)"
                    }}
                  >
                    <Package size={16} color="#6B7280" /> My Orders
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.6rem 1rem",
                      fontSize: "0.88rem",
                      color: "var(--text-main)"
                    }}
                  >
                    <Heart size={16} color="#6B7280" /> My Favorites
                  </Link>
                  <Link
                    to="/addresses"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.6rem 1rem",
                      fontSize: "0.88rem",
                      color: "var(--text-main)"
                    }}
                  >
                    <MapPin size={16} color="#6B7280" /> Saved Addresses
                  </Link>
                  <Link
                    to="/coupons"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.6rem 1rem",
                      fontSize: "0.88rem",
                      color: "var(--text-main)"
                    }}
                  >
                    <Ticket size={16} color="#6B7280" /> My Coupons
                  </Link>

                  <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.3rem 0" }} />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate("/");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.6rem 1rem",
                      fontSize: "0.88rem",
                      color: "var(--error)",
                      background: "transparent",
                      border: "none",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm desktop-signup-btn">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn-icon mobile-menu-toggle"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "#FFFFFF",
            borderBottom: "1px solid var(--border-light)",
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            boxShadow: "var(--shadow-md)"
          }}
          className="mobile-drawer-menu"
        >
          <NavLink to="/" onClick={closeMobile} style={{ padding: "0.5rem 0", fontWeight: 600 }}>Home</NavLink>
          <NavLink to="/menu" onClick={closeMobile} style={{ padding: "0.5rem 0", fontWeight: 600 }}>Full Menu</NavLink>
          <NavLink to="/deals" onClick={closeMobile} style={{ padding: "0.5rem 0", fontWeight: 600 }}>Deals & Offers 🔥</NavLink>
          <NavLink to="/about" onClick={closeMobile} style={{ padding: "0.5rem 0", fontWeight: 600 }}>About CraveBite</NavLink>
          <NavLink to="/contact" onClick={closeMobile} style={{ padding: "0.5rem 0", fontWeight: 600 }}>Contact & Locations</NavLink>
          
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {isAdmin && (
              <Link to="/admin" onClick={closeMobile} className="btn btn-dark" style={{ width: "100%" }}>
                <ShieldAlert size={16} /> Admin Portal
              </Link>
            )}
            {!isAuthenticated && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <Link to="/login" onClick={closeMobile} className="btn btn-outline" style={{ width: "100%" }}>Login</Link>
                <Link to="/register" onClick={closeMobile} className="btn btn-primary" style={{ width: "100%" }}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav-links { display: none !important; }
          .desktop-username { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-toggle { display: none !important; }
          .mobile-drawer-menu { display: none !important; }
        }
        @media (max-width: 480px) {
          .desktop-signup-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
