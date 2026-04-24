import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface QuoteItem {
  id: string;
  productId: string;
  vendor: string;
  name: string;
  variantTitle: string;
  quantity: number;
}

interface QuoteContextType {
  items: QuoteItem[];
  addToQuote: (item: Omit<QuoteItem, "quantity">) => void;
  removeFromQuote: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearQuote: () => void;
  itemCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    const saved = localStorage.getItem("mw-quote-list");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mw-quote-list", JSON.stringify(items));
  }, [items]);

  const addToQuote = (newItem: Omit<QuoteItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    toast.success("Added to quote list");
  };

  const removeFromQuote = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from quote list");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearQuote = () => {
    setItems([]);
    toast.success("Quote list cleared");
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        itemCount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
};
