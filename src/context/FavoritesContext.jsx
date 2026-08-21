import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const FavoritesContext = createContext();
const STORAGE_FAVS_KEY = "cravebite_favorites_v2";

export const FavoritesProvider = ({ children }) => {
  const { showSuccess, showInfo } = useToast();
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_FAVS_KEY);
      return stored ? JSON.parse(stored) : ["prod-1", "prod-6", "prod-9", "prod-22"];
    } catch {
      return ["prod-1", "prod-6", "prod-9", "prod-22"];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (productId, productName = "Item") => {
    setFavoriteIds((prev) => {
      const isFav = prev.includes(productId);
      if (isFav) {
        showInfo(`Removed "${productName}" from favorites`);
        return prev.filter((id) => id !== productId);
      } else {
        showSuccess(`Added "${productName}" to favorites!`);
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        favoritesCount: favoriteIds.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
