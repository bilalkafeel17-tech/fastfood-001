import { INITIAL_STAFF } from "../data/initialStaff";

const STORAGE_KEY = "cravebite_staff_data";

const getStoredStaff = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STAFF));
      return INITIAL_STAFF;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_STAFF;
  }
};

const saveStaff = (staff) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(staff));
};

export const staffService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredStaff();
  },

  create: async (data) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredStaff();
    const newStaff = {
      ...data,
      id: "stf-" + Date.now(),
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    };
    const updated = [...list, newStaff];
    saveStaff(updated);
    return newStaff;
  },

  update: async (id, updates) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredStaff();
    const idx = list.findIndex((s) => String(s.id) === String(id));
    if (idx === -1) throw new Error("Staff member not found");
    list[idx] = { ...list[idx], ...updates };
    saveStaff(list);
    return list[idx];
  },

  delete: async (id) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredStaff();
    const filtered = list.filter((s) => String(s.id) !== String(id));
    saveStaff(filtered);
    return true;
  }
};
