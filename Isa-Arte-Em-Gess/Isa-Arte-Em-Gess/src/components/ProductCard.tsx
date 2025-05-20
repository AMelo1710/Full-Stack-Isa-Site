import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
  alt?: string; // Added alt prop here
}

const ProductCard = ({ id, name, price, image, category, stock = 10, alt }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { addItem, isSaved, toggleSaveItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image, category, stock });
  };
  
  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveItem(id);
  };

  // Check if this product is saved
  const itemIsSaved = isSaved(id);

  // Mock data for the quick view - in a real app this would come from props or an API call
  const productImages = [image];
  
  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/produto/${id}`}>
        <div className="relative h-60 overflow-hidden">
          <img
            src={image}
            alt={alt || name} // Use alt prop, fallback to name
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-beige-dark px-3 py-1 rounded-full text-xs font-medium text-olive-dark">
            {category}
          </span>
          
          {/* Quick action buttons that appear on hover */}
          <div 
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button 
              size="icon"
              variant="outline" 
              className={`h-8 w-8 rounded-full bg-white hover:bg-beige border-gray-200 ${
                itemIsSaved ? 'text-red-500' : 'text-terracotta'
              }`}
              onClick={handleToggleSave}
            >
              <Heart className="h-4 w-4" fill={itemIsSaved ? "currentColor" : "none"} />
            </Button>
            
            {/* Quick view button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="icon"
                  variant="outline" 
                  className="h-8 w-8 rounded-full bg-white hover:bg-beige border-gray-200"
                  onClick={(e) => e.preventDefault()}
                >
                  <Search className="h-4 w-4 text-olive-dark" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Carousel>
                      <CarouselContent>
                        {productImages.map((img, i) => (
                          <CarouselItem key={i}>
                            <div className="p-1">
                              <div className="overflow-hidden rounded-lg">
                                <img 
                                  src={img} 
                                  alt={`${alt || name} - imagem ${i+1}`} // Also update alt here
                                  className="w-full h-[400px] object-contain"
                                />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-serif font-semibold text-olive-dark mb-2">{name}</h2>
                    <p className="text-xl font-semibold text-terracotta mb-4">
                      {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p className="text-gray-600 mb-6">
                      Cada peça é cuidadosamente moldada à mão por nossos artesãos qualificados, 
                      seguindo técnicas tradicionais para garantir qualidade e durabilidade excepcionais.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Adicionar ao carrinho
                      </Button>
                      <Link to={`/produto/${id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Ver detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-serif text-lg font-medium text-olive-dark mb-1 line-clamp-2">
            {name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">{category}</p>
          <div className="flex justify-between items-center">
            <span className="text-terracotta font-medium">
              {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <Button 
              size="sm" 
              className="bg-beige hover:bg-beige-dark text-olive-dark"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span className="text-sm">Adicionar</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
