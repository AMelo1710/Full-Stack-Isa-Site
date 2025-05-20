
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUserProfile: (userData: User) => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user data is stored in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isLoggedIn = !!user;

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Bem-vindo, ${userData.name}!`);
  };

  const logout = () => {
    // Clear all user-related data
    setUser(null);
    localStorage.removeItem('user');
    
    // Reset saved items in localStorage when user logs out
    localStorage.removeItem('savedItems');
    
    // Clear cart items when logging out
    localStorage.removeItem('cartItems');
    
    // Resetting saved items for any user-specific storage
    if (user) {
      localStorage.removeItem(`savedItems_${user.id}`);
    }
    
    toast.success('Sessão encerrada com sucesso');
  };

  const updateUserProfile = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('Perfil atualizado com sucesso');
  };
  
  // New function to check if user is authenticated and show toast if not
  const requireAuth = () => {
    if (!isLoggedIn) {
      toast.error('É necessário fazer login para acessar esta funcionalidade');
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateUserProfile, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
