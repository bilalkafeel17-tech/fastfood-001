import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, remember = true) => {
    try {
      setLoading(true);
      const res = await authService.login(email, password, remember);
      setUser(res.user);
      showSuccess(`Welcome back, ${res.user.name}!`);
      return res.user;
    } catch (err) {
      showError(err.message || "Failed to log in.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      setLoading(true);
      const res = await authService.register(name, email, phone, password);
      setUser(res.user);
      showSuccess(`Welcome to CraveBite, ${res.user.name}!`);
      return res.user;
    } catch (err) {
      showError(err.message || "Failed to create account.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    showSuccess("Logged out successfully.");
  };

  const updateProfile = async (updates) => {
    try {
      const updated = await authService.updateProfile(updates);
      setUser(updated);
      showSuccess("Profile updated successfully!");
      return updated;
    } catch (err) {
      showError(err.message || "Could not update profile.");
      throw err;
    }
  };

  const isAdmin = Boolean(user && user.role === "admin");
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
