import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((msg) => addToast(msg, "success"), [addToast]);
  const showError = useCallback((msg) => addToast(msg, "error", 4500), [addToast]);
  const showInfo = useCallback((msg) => addToast(msg, "info"), [addToast]);
  const showWarning = useCallback((msg) => addToast(msg, "warning"), [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showInfo,
        showWarning
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
