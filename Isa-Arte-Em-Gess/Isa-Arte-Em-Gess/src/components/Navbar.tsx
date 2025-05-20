
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { pathname } = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount, savedItems } = useCart();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
          <img 
            src="/lovable-uploads/601b126d-e259-4494-8f42-af23f37a8499.png" 
            alt="Isabelle Yanxauskas Logo" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}

        {/* Navigation Menu */}
        <ul
          className={cn(
            "font-sans text-base",
            // Desktop styles
            "hidden md:flex md:items-center md:gap-4",
            // Mobile styles
            isMobile && "absolute left-0 right-0 top-full bg-background border-b flex-col py-4 px-4 shadow-md",
            // Show/hide mobile menu based on state
            isMobile && isMenuOpen ? "flex animate-fade-in" : isMobile && "hidden"
          )}
        >
          <li className="py-2 md:py-0">
            <Link to="/" className="hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
              Início
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/sobre" className="hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
              Sobre
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/produtos" className="hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
              Produtos
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/contato" className="hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
              Contato
            </Link>
          </li>

          {/* Shopping cart and favorites */}
          <li className="py-2 md:py-0">
            <div className="flex items-center gap-2">
              <Link to="/favoritos" className="p-2 text-primary hover:bg-primary/10 rounded-full transition-all relative">
                <Heart size={20} className={savedItems.length > 0 ? "fill-terracotta text-terracotta" : ""} />
                {savedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {savedItems.length}
                  </span>
                )}
              </Link>
              <Link to="/carrinho" className="p-2 bg-terracotta text-white rounded-full hover:bg-terracotta-dark transition-all relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-terracotta text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-terracotta">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </li>
          
          {/* Login/Profile logic */}
          <li className="py-2 md:py-0">
            {isLoggedIn ? (
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Link to="/perfil">
                  <Button 
                    variant="ghost" 
                    className="hover:bg-primary/10 w-full md:w-auto justify-start md:justify-center transition-colors duration-300 text-terracotta"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {user?.name || "Meu Perfil"}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 w-full md:w-auto justify-start md:justify-center transition-colors duration-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login" className="block">
                <Button variant="default" className="bg-terracotta hover:bg-terracotta-dark w-full md:w-auto justify-start md:justify-center transition-colors duration-300">
                  Login
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
