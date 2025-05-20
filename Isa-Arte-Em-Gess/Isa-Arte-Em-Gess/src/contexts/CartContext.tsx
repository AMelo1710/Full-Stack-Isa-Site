import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  stock?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { stock?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  applyDiscount: (code: string) => boolean;
  discountAmount: number;
  discountCode: string | null;
  shippingOption: string;
  setShippingOption: (option: string) => void;
  shippingCost: number;
  total: number;
  savedItems: string[];
  toggleSaveItem: (id: string, silent?: boolean) => void;
  isSaved: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get auth context safely using the useAuth hook
  const { isLoggedIn, user } = useAuth();
  
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [savedItems, setSavedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingOption, setShippingOption] = useState('standard');
  
  // Reset saved items when user logs out or changes
  useEffect(() => {
    if (!isLoggedIn) {
      // Clear favorites when logged out
      setSavedItems([]);
    } else if (user) {
      // Load user-specific favorites if logged in
      const userFavoriteKey = `savedItems_${user.id}`;
      const userSavedItems = localStorage.getItem(userFavoriteKey);
      if (userSavedItems) {
        setSavedItems(JSON.parse(userSavedItems));
      }
    }
  }, [isLoggedIn, user]);
  
  // Calculate shipping cost based on selected option and cart subtotal
  const calculateShippingCost = (option: string, subtotal: number): number => {
    if (subtotal >= 300) return 0; // Free shipping above R$300
    
    switch (option) {
      case 'express':
        return 25.90;
      case 'standard':
        return 15.90;
      case 'economic':
        return 9.90;
      default:
        return 15.90;
    }
  };
  
  // Calculate cart totals
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = calculateShippingCost(shippingOption, subtotal);
  const total = subtotal + shippingCost - discountAmount;
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);
  
  // Save savedItems to localStorage with user-specific key if logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      // Store user-specific favorites
      localStorage.setItem(`savedItems_${user.id}`, JSON.stringify(savedItems));
    }
    
    // Always update the general savedItems key for the current session
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems, isLoggedIn, user]);
  
  // Add item to cart
  const addItem = (item: Omit<CartItem, 'quantity'> & { stock?: number }) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        const currentItem = updatedItems[existingItemIndex];
        const stockLimit = currentItem.stock || item.stock || 10; // Default to 10 if no stock specified
        
        if (currentItem.quantity < stockLimit) {
          updatedItems[existingItemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity + 1
          };
          toast.success(`${item.name} adicionado ao carrinho!`);
          return updatedItems;
        } else {
          toast.error(`Estoque insuficiente para ${item.name}!`);
          return prevItems;
        }
      } else {
        // Add new item
        const stockLimit = item.stock || 10; // Default to 10 if no stock specified
        toast.success(`${item.name} adicionado ao carrinho!`);
        return [...prevItems, { ...item, quantity: 1, stock: stockLimit }];
      }
    });
  };
  
  // Remove item from cart
  const removeItem = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} removido do carrinho`);
    }
  };
  
  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (!item) return prevItems;
      
      const stockLimit = item.stock || 10;
      
      if (quantity > stockLimit) {
        toast.error(`Estoque insuficiente! Apenas ${stockLimit} unidades disponíveis.`);
        return prevItems.map(item => 
          item.id === id ? { ...item, quantity: stockLimit } : item
        );
      }
      
      return prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
    setDiscountAmount(0);
    toast.success('Carrinho esvaziado');
  };
  
  // Apply discount code
  const applyDiscount = (code: string): boolean => {
    // Simple validation - in a real app, this would verify against a database
    const validCodes: {[key: string]: number} = {
      'PROMO10': 10,
      'PROMO20': 20,
      'FRETE': 15.90,
    };
    
    if (validCodes[code]) {
      setDiscountCode(code);
      setDiscountAmount(validCodes[code]);
      toast.success(`Cupom ${code} aplicado com sucesso!`);
      return true;
    } else {
      toast.error('Cupom inválido');
      return false;
    }
  };
  
  // Toggle saved item status
  const toggleSaveItem = (id: string, silent: boolean = false) => {
    setSavedItems(prev => {
      if (prev.includes(id)) {
        if (!silent) {
          toast.success("Item removido dos favoritos");
        }
        return prev.filter(itemId => itemId !== id);
      } else {
        if (!silent) {
          toast.success("Item salvo nos favoritos!");
        }
        return [...prev, id];
      }
    });
  };
  
  // Check if an item is saved
  const isSaved = (id: string): boolean => {
    return savedItems.includes(id);
  };
  
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    applyDiscount,
    discountAmount,
    discountCode,
    shippingOption,
    setShippingOption,
    shippingCost,
    total,
    savedItems,
    toggleSaveItem,
    isSaved
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
