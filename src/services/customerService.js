import { INITIAL_CUSTOMERS } from "../data/initialCustomers";

const STORAGE_KEY = "cravebite_customers_data";

const getStoredCustomers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CUSTOMERS;
  }
};

const saveCustomers = (customers) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
};

export const customerService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredCustomers();
  },

  getById: async (id) => {
    await new Promise((r) => setTimeout(r, 100));
    const list = getStoredCustomers();
    return list.find((c) => String(c.id) === String(id)) || null;
  },

  updateStatus: async (id, status) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCustomers();
    const idx = list.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) throw new Error("Customer not found");
    list[idx].status = status;
    saveCustomers(list);
    return list[idx];
  },

  delete: async (id) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCustomers();
    const filtered = list.filter((c) => String(c.id) !== String(id));
    saveCustomers(filtered);
    return true;
  },

  addAddress: async (customerId, address) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCustomers();
    const idx = list.findIndex((c) => String(c.id) === String(customerId));
    if (idx === -1) throw new Error("Customer not found");
    
    const newAddress = {
      ...address,
      id: "addr-" + Date.now(),
      isDefault: !list[idx].addresses || list[idx].addresses.length === 0
    };

    if (!list[idx].addresses) list[idx].addresses = [];
    list[idx].addresses.push(newAddress);
    saveCustomers(list);
    return newAddress;
  },

  removeAddress: async (customerId, addressId) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCustomers();
    const idx = list.findIndex((c) => String(c.id) === String(customerId));
    if (idx === -1) throw new Error("Customer not found");

    list[idx].addresses = list[idx].addresses.filter((a) => String(a.id) !== String(addressId));
    saveCustomers(list);
    return true;
  }
};
