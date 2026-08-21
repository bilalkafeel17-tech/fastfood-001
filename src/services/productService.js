import { INITIAL_PRODUCTS } from "../data/initialProducts";

const STORAGE_KEY = "cravebite_products_data";

const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 150));
    return getStoredProducts();
  },

  getById: async (id) => {
    await new Promise((r) => setTimeout(r, 100));
    const list = getStoredProducts();
    return list.find((p) => String(p.id) === String(id)) || null;
  },

  getByCategory: async (categorySlug) => {
    await new Promise((r) => setTimeout(r, 100));
    const list = getStoredProducts();
    if (!categorySlug || categorySlug === "all") return list;
    return list.filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase());
  },

  create: async (productData) => {
    await new Promise((r) => setTimeout(r, 200));
    const list = getStoredProducts();
    const newProduct = {
      ...productData,
      id: "prod-" + Date.now(),
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 0,
      inStock: productData.inStock !== false,
      stockCount: Number(productData.stockCount) || 50,
      sizes: productData.sizes || [{ name: "Regular", priceDelta: 0 }],
      addOns: productData.addOns || []
    };
    const updated = [newProduct, ...list];
    saveProducts(updated);
    return newProduct;
  },

  update: async (id, updates) => {
    await new Promise((r) => setTimeout(r, 200));
    const list = getStoredProducts();
    const index = list.findIndex((p) => String(p.id) === String(id));
    if (index === -1) throw new Error("Product not found");

    const updatedItem = { ...list[index], ...updates };
    list[index] = updatedItem;
    saveProducts(list);
    return updatedItem;
  },

  delete: async (id) => {
    await new Promise((r) => setTimeout(r, 200));
    const list = getStoredProducts();
    const filtered = list.filter((p) => String(p.id) !== String(id));
    saveProducts(filtered);
    return true;
  },

  search: async (query, filters = {}) => {
    await new Promise((r) => setTimeout(r, 100));
    let list = getStoredProducts();
    
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.ingredients && p.ingredients.some((i) => i.toLowerCase().includes(q)))
      );
    }

    if (filters.category && filters.category !== "all") {
      list = list.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.isVeg !== undefined && filters.isVeg !== null) {
      list = list.filter((p) => p.isVeg === filters.isVeg);
    }

    if (filters.isSpicy !== undefined && filters.isSpicy !== null) {
      list = list.filter((p) => p.isSpicy === filters.isSpicy);
    }

    if (filters.minPrice !== undefined) {
      list = list.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.minRating !== undefined) {
      list = list.filter((p) => p.rating >= filters.minRating);
    }

    if (filters.sortBy) {
      if (filters.sortBy === "price-low") list.sort((a, b) => a.price - b.price);
      else if (filters.sortBy === "price-high") list.sort((a, b) => b.price - a.price);
      else if (filters.sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
      else if (filters.sortBy === "popular") list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }
};
