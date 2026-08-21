import { INITIAL_REVIEWS } from "../data/initialReviews";

const STORAGE_KEY = "cravebite_reviews_data";

const getStoredReviews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REVIEWS;
  }
};

const saveReviews = (reviews) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const reviewService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredReviews();
  },

  getByProduct: async (productName) => {
    await new Promise((r) => setTimeout(r, 100));
    const list = getStoredReviews();
    if (!productName) return list;
    return list.filter((r) => r.productName.toLowerCase() === productName.toLowerCase());
  },

  create: async (reviewData) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredReviews();
    const newRev = {
      ...reviewData,
      id: "rev-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      verified: true,
      status: "approved"
    };
    const updated = [newRev, ...list];
    saveReviews(updated);
    return newRev;
  },

  updateStatus: async (id, status) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredReviews();
    const idx = list.findIndex((r) => String(r.id) === String(id));
    if (idx === -1) throw new Error("Review not found");
    list[idx].status = status;
    saveReviews(list);
    return list[idx];
  },

  delete: async (id) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredReviews();
    const filtered = list.filter((r) => String(r.id) !== String(id));
    saveReviews(filtered);
    return true;
  }
};
