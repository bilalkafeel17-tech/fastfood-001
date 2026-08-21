// Mock REST API Authentication Service

const STORAGE_KEY_USER = "cravebite_auth_user";
const STORAGE_KEY_TOKEN = "cravebite_auth_token";

const DEMO_ADMIN = {
  id: "admin-1",
  name: "Chef Anthony Romano",
  email: "admin@cravebite.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80",
  phone: "+1 (555) 234-5678"
};

const DEMO_CUSTOMER = {
  id: "cust-1",
  name: "Alex Jordan",
  email: "alex.jordan@gmail.com",
  role: "customer",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  phone: "+1 (555) 912-3456"
};

export const authService = {
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : DEMO_CUSTOMER;
    } catch {
      return DEMO_CUSTOMER;
    }
  },

  getToken: () => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || "mock_jwt_token_cravebite_89327492";
  },

  login: async (email, password, remember = true) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 400));

    const cleanEmail = email.trim().toLowerCase();

    // Check for Demo Admin
    if (cleanEmail === "admin@cravebite.com" && password === "Admin@123") {
      const user = { ...DEMO_ADMIN };
      if (remember) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_TOKEN, "admin_bearer_token_" + Date.now());
      }
      return { success: true, user, token: "admin_bearer_token" };
    }

    // Check for Demo Customer or any valid customer credential
    if (cleanEmail === "alex.jordan@gmail.com" || password.length >= 6) {
      const user = {
        id: "cust-1",
        name: cleanEmail.split("@")[0].replace(".", " ").toUpperCase(),
        email: cleanEmail,
        role: "customer",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        phone: "+1 (555) 912-3456"
      };
      if (remember) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_TOKEN, "customer_bearer_token_" + Date.now());
      }
      return { success: true, user, token: "customer_bearer_token" };
    }

    throw new Error("Invalid email or password. Try admin@cravebite.com / Admin@123 or any 6+ char password.");
  },

  register: async (name, email, phone, password) => {
    await new Promise((res) => setTimeout(res, 450));

    if (!name || !email || !password) {
      throw new Error("Please provide full name, email, and password.");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const newUser = {
      id: "cust-" + Date.now(),
      name,
      email: email.trim().toLowerCase(),
      phone: phone || "+1 (555) 000-0000",
      role: "customer",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      registeredAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, "customer_bearer_token_" + Date.now());

    return { success: true, user: newUser };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  },

  updateProfile: async (updates) => {
    await new Promise((res) => setTimeout(res, 300));
    const current = authService.getCurrentUser() || DEMO_CUSTOMER;
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    return updated;
  },

  changePassword: async (currentPassword, newPassword) => {
    await new Promise((res) => setTimeout(res, 350));
    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters.");
    }
    return { success: true, message: "Password updated successfully." };
  }
};
