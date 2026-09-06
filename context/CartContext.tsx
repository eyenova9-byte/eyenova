"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string; // Unique cart item ID (timestamp or hash)
  productId: string;
  titleEn: string;
  titleAr: string;
  sku: string;
  image: string;
  unitPriceQar: number;
  quantity: number;

  // Contact Lens Dual-Eye Config (EyeNova match)
  isContactLens?: boolean;
  isPlano?: boolean;
  rightEyePower?: string;
  rightEyeBoxes?: number;
  leftEyePower?: string;
  leftEyeBoxes?: number;

  // Eyeglasses Config
  lensOptionId?: string;
  lensNameEn?: string;
  lensPriceQar?: number;
  prescriptionId?: string;
  prescriptionTitle?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotalQar: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("eyenova_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("eyenova_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "id">) => {
    const id = `${newItem.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setItems((prev) => [...prev, { ...newItem, id }]);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotalQar = items.reduce((sum, item) => {
    const lensAddon = item.lensPriceQar || 0;
    return sum + (item.unitPriceQar + lensAddon) * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotalQar,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
