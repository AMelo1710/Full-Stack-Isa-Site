
import React, { useEffect } from "react"; // Removed useState
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton"; // For better loading state

// Define a product interface for the favorites page
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
}

const Favorites = () => {
  const { savedItems, toggleSaveItem, addItem } = useCart();
  const { isLoggedIn, user } = useAuth(); // Added user for query key if needed, though savedItems is primary

  const { data: favoriteProducts, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['favoriteProducts', savedItems, user?.id], // Include user?.id to refetch if user changes
    queryFn: async () => {
      if (!isLoggedIn || !savedItems || savedItems.length === 0) {
        return [];
      }
      const { data, error: dbError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          stock_quantity,
          images,
          categories ( name ) 
        `)
        .in('id', savedItems);

      if (dbError) {
        console.error("Error fetching favorite products:", dbError);
        throw dbError;
      }

      return data ? data.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.images && p.images.length > 0 && typeof p.images[0] === 'string' ? p.images[0] : '/placeholder.svg',
        category: p.categories ? (p.categories as { name: string }).name : 'Sem Categoria',
        stock: p.stock_quantity,
      })) : [];
    },
    enabled: isLoggedIn && savedItems.length > 0, // Only run query if logged in and there are saved items
  });

  const handleRemoveFavorite = (id: string) => {
    toggleSaveItem(id);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-beige-light flex flex-col">
        <Navbar />
        <main className="flex-grow container py-16 px-4 md:px-0">
          <h1 className="text-3xl font-serif font-semibold text-olive-dark mb-8">Meus Favoritos</h1>
          <Alert variant="destructive">
            <AlertDescription>
              Ocorreu um erro ao carregar seus produtos favoritos. Tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-light flex flex-col">
      <Navbar />
      <main className="flex-grow container py-16 px-4 md:px-0">
        <h1 className="text-3xl font-serif font-semibold text-olive-dark mb-8">Meus Favoritos</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : favoriteProducts && favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md duration-300">
                <div className="relative">
                  <Link to={`/produto/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover object-center"
                      onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback for broken images
                    />
                  </Link>
                  <button 
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md transition-colors hover:bg-rose-50"
                  >
                    <Heart className="h-5 w-5 fill-terracotta text-terracotta" />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="font-medium text-lg truncate mb-1 text-olive-dark hover:text-terracotta">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-terracotta">
                      {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <Button 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-terracotta hover:bg-terracotta-dark text-white"
                      disabled={!product.stock || product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.stock && product.stock > 0 ? 'Adicionar' : 'Esgotado'}
                    </Button>
                  </div>
                  {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
                    <p className="text-xs text-red-500 mt-1">Apenas {product.stock} em estoque!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Alert variant="default" className="bg-beige border-terracotta/20 max-w-lg mx-auto">
              <div className="flex flex-col items-center p-4">
                <Heart className="h-12 w-12 text-muted-foreground mb-4 stroke-1" />
                <AlertDescription className="text-center text-muted-foreground">
                  <p className="mb-6">Você ainda não adicionou nenhum produto aos favoritos.</p>
                  <Button asChild className="bg-terracotta hover:bg-terracotta-dark text-white">
                    <Link to="/produtos">Explorar produtos</Link>
                  </Button>
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;

