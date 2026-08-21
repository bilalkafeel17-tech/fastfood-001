import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { useToast } from "./ToastContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error("Failed to load products/categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addProduct = async (productData) => {
    try {
      const created = await productService.create(productData);
      setProducts((prev) => [created, ...prev]);
      showSuccess(`Product "${created.name}" created successfully!`);
      return created;
    } catch (err) {
      showError(err.message || "Failed to create product");
      throw err;
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const updated = await productService.update(id, updates);
      setProducts((prev) => prev.map((p) => (String(p.id) === String(id) ? updated : p)));
      showSuccess(`Product "${updated.name}" updated successfully!`);
      return updated;
    } catch (err) {
      showError(err.message || "Failed to update product");
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
      showSuccess("Product deleted successfully.");
      return true;
    } catch (err) {
      showError(err.message || "Failed to delete product");
      throw err;
    }
  };

  const addCategory = async (catData) => {
    try {
      const created = await categoryService.create(catData);
      setCategories((prev) => [...prev, created]);
      showSuccess(`Category "${created.name}" created!`);
      return created;
    } catch (err) {
      showError(err.message || "Failed to add category");
      throw err;
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      const updated = await categoryService.update(id, updates);
      setCategories((prev) => prev.map((c) => (String(c.id) === String(id) ? updated : c)));
      showSuccess(`Category "${updated.name}" updated!`);
      return updated;
    } catch (err) {
      showError(err.message || "Failed to update category");
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => String(c.id) !== String(id)));
      showSuccess("Category deleted.");
      return true;
    } catch (err) {
      showError(err.message || "Failed to delete category");
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        refreshProducts: loadData,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
