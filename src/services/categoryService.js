import { INITIAL_CATEGORIES } from "../data/initialCategories";

const STORAGE_KEY = "cravebite_categories_data";

const getStoredCategories = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CATEGORIES;
  }
};

const saveCategories = (cats) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cats));
};

export const categoryService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredCategories();
  },

  create: async (categoryData) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCategories();
    const newCat = {
      ...categoryData,
      id: categoryData.slug || "cat-" + Date.now(),
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, "-"),
      itemCount: 0,
      active: categoryData.active !== false
    };
    const updated = [...list, newCat];
    saveCategories(updated);
    return newCat;
  },

  update: async (id, updates) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCategories();
    const idx = list.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) throw new Error("Category not found");
    list[idx] = { ...list[idx], ...updates };
    saveCategories(list);
    return list[idx];
  },

  delete: async (id) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCategories();
    const filtered = list.filter((c) => String(c.id) !== String(id));
    saveCategories(filtered);
    return true;
  }
};
