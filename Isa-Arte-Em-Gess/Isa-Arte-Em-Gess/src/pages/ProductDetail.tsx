
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import ProductReviewForm, { ProductReview } from "@/components/ProductReviewForm";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";

// Mock products data (in a real app this would come from an API)
const products = [
  {
    id: "1",
    name: "Vaso Orgânico Ondulado",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Vasos",
    description: "Um vaso único com linhas orgânicas e onduladas que adicionam textura e movimento a qualquer espaço. Cada peça é cuidadosamente moldada à mão, garantindo que cada vaso seja verdadeiramente único.",
    material: "Gesso premium com acabamento fosco",
    dimensions: "30cm x 20cm x 20cm",
    weight: "1.2kg",
    inStock: 8,
    images: [
      "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578500351865-0a6aea3d9b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581093197308-937b964498cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Exclusivo", "Feito à mão"],
    rating: 4.8,
    reviews: [
      { id: "r1", user: "Maria S.", rating: 5, comment: "Peça lindíssima, superou minhas expectativas!", date: "15/03/2025" },
      { id: "r2", user: "João P.", rating: 4, comment: "Muito bonito, mas achei um pouco menor do que esperava.", date: "02/04/2025" }
    ],
    relatedProducts: ["2", "5", "6"]
  },
  {
    id: "2",
    name: "Escultura Abstrata Moderna",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1619218005459-c8be9d22c0ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Esculturas",
    description: "Uma peça escultural contemporânea que combina formas abstratas para criar um ponto focal fascinante em qualquer ambiente. Esta escultura representa a fusão entre o clássico e o moderno.",
    material: "Gesso com acabamento texturizado",
    dimensions: "25cm x 15cm x 40cm",
    weight: "2.3kg",
    inStock: 3,
    images: [
      "https://images.unsplash.com/photo-1619218005459-c8be9d22c0ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582913130063-8318329ef@1x.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602816255751-4a36bf7d9478?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Novidade", "Edição limitada"],
    rating: 4.9,
    reviews: [
      { id: "r3", user: "Ana C.", rating: 5, comment: "Uma obra de arte! Destaque na minha sala.", date: "20/03/2025" },
      { id: "r4", user: "Pedro M.", rating: 5, comment: "Qualidade impecável e design único.", date: "10/04/2025" }
    ],
    relatedProducts: ["1", "3", "8"]
  },
  // More product data would be here in a real application
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem, savedItems, toggleSaveItem } = useCart();
  const { isLoggedIn } = useAuth();
  
  // Find the product based on the URL parameter
  const product = products.find(p => p.id === id);
  
  // State for managing reviews
  const [productReviews, setProductReviews] = useState<ProductReview[]>(
    product?.reviews || []
  );
  
  // Check if product is in favorites
  const isFavorite = savedItems.includes(id || "");
  
  if (!product) {
    return (
      <div className="min-h-screen bg-beige-light">
        <Navbar />
        <div className="container-custom py-32 text-center">
          <h1 className="text-3xl font-serif text-olive-dark mb-4">Produto não encontrado</h1>
          <p className="text-gray-700 mb-8">O produto que você está procurando não existe ou foi removido.</p>
          <Button asChild className="bg-terracotta hover:bg-terracotta-dark">
            <a href="/produtos">Voltar para os produtos</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate related products
  const relatedProductsData = product.relatedProducts
    .map(relId => products.find(p => p.id === relId))
    .filter(Boolean);
  
  const handleQuantityChange = (newQty) => {
    if (newQty >= 1 && newQty <= product.inStock) {
      setQuantity(newQty);
    }
  };
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.inStock
    });
  };
  
  const handleAddToWishlist = () => {
    toggleSaveItem(product.id);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado para a área de transferência!');
  };
  
  // Handler for submitting a new review
  const handleReviewSubmit = (review: ProductReview) => {
    setProductReviews(prev => [review, ...prev]);
    // In a real app, we would send this to an API
  };
  
  // Calculate average rating
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 0;
  
  return (
    <div className="min-h-screen bg-beige-light">
      <Helmet>
        <title>{product.name} | Artesanato em Gesso</title>
        <meta name="description" content={`${product.description.substring(0, 150)}...`} />
        <meta name="keywords" content={`artesanato, gesso, ${product.category}, decoração, feito à mão, ${product.tags.join(', ').toLowerCase()}`} />
        <meta property="og:title" content={`${product.name} | Artesanato em Gesso`} />
        <meta property="og:description" content={`${product.description.substring(0, 150)}...`} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <Navbar />
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-beige py-4">
          <div className="container-custom">
            <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
              <ol className="flex">
                <li><a href="/" className="hover:text-terracotta">Home</a></li>
                <li><span className="mx-2">/</span></li>
                <li><a href="/produtos" className="hover:text-terracotta">Produtos</a></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-terracotta-dark font-medium" aria-current="page">{product.name}</li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Product Details */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                <div className="relative group">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="overflow-hidden rounded-lg cursor-zoom-in">
                        <img 
                          src={product.image} 
                          alt={`Foto principal do produto ${product.name}`}
                          className="w-full h-[500px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                      <Carousel>
                        <CarouselContent>
                          {product.images.map((img, i) => (
                            <CarouselItem key={i}>
                              <div className="p-1">
                                <div className="overflow-hidden rounded-lg">
                                  <img 
                                    src={img} 
                                    alt={`${product.name} - imagem ${i+1}`} 
                                    className="w-full h-[600px] object-contain"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Product tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="bg-beige-dark px-3 py-1 rounded-full text-xs font-medium text-olive-dark">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Image thumbnails */}
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {product.images.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-lg cursor-pointer">
                      <img 
                        src={img} 
                        alt={`${product.name} - miniatura ${i+1}`} 
                        className="w-full h-24 object-cover object-center hover:opacity-80 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-serif font-semibold text-olive-dark mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-terracotta text-terracotta" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">({product.reviews.length} avaliações)</span>
                  </div>
                  
                  <p className="text-2xl font-semibold text-terracotta mb-6">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  
                  <p className="text-gray-700 mb-6">
                    {product.description.substring(0, 150)}...
                  </p>
                  
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-800 font-medium w-24">Material:</span>
                      <span className="text-gray-600">{product.material}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-800 font-medium w-24">Dimensões:</span>
                      <span className="text-gray-600">{product.dimensions}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-800 font-medium w-24">Peso:</span>
                      <span className="text-gray-600">{product.weight}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-800 font-medium w-24">Disponível:</span>
                      <span className={`${product.inStock > 3 ? 'text-green-600' : 'text-orange-500'} font-medium`}>
                        {product.inStock > 0 ? `${product.inStock} em estoque` : 'Esgotado'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add to cart controls */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => handleQuantityChange(quantity - 1)} 
                          disabled={quantity <= 1}
                          className="px-3 py-2 text-gray-700 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.inStock}
                          className="px-3 py-2 text-gray-700 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={handleAddToCart}
                        disabled={product.inStock === 0}
                        className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Adicionar ao carrinho
                      </Button>
                      
                      <Button 
                        onClick={handleAddToWishlist}
                        variant="outline"
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-gray-300 ${isFavorite ? 'bg-rose-50 hover:bg-rose-100' : 'bg-background hover:bg-beige'}`}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-terracotta text-terracotta' : 'text-terracotta'}`} />
                      </Button>
                      
                      <Button 
                        onClick={handleShare}
                        variant="outline"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-gray-300 bg-background hover:bg-beige"
                      >
                        <Share2 className="h-5 w-5 text-olive-dark" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product tabs: description, details, reviews */}
            <div className="mt-16">
              <Tabs defaultValue="description" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                  <TabsTrigger value="details">Detalhes Técnicos</TabsTrigger>
                  <TabsTrigger value="reviews">Avaliações ({productReviews.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="prose max-w-none text-gray-700">
                    <h3 className="text-xl font-serif font-medium text-olive-dark mb-4">Descrição do Produto</h3>
                    <p className="mb-4">{product.description}</p>
                    <p className="mb-4">
                      Cada peça é cuidadosamente moldada à mão por nossos artesãos qualificados, seguindo técnicas tradicionais 
                      que têm sido aperfeiçoadas ao longo de gerações. O processo começa com a seleção meticulosa dos materiais,
                      seguida por um processo de moldagem preciso que garante a qualidade e durabilidade excepcionais pelas quais
                      nossa marca é conhecida.
                    </p>
                    <p>
                      A combinação única de design contemporâneo com métodos de fabricação tradicionais faz desta peça um item 
                      verdadeiramente especial que trará elegância e estilo para qualquer ambiente.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="prose max-w-none text-gray-700">
                    <h3 className="text-xl font-serif font-medium text-olive-dark mb-4">Detalhes Técnicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium text-olive-dark mb-2">Especificações</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Material:</strong> {product.material}</li>
                          <li><strong>Dimensões:</strong> {product.dimensions}</li>
                          <li><strong>Peso:</strong> {product.weight}</li>
                          <li><strong>Acabamento:</strong> Feito à mão com acabamento texturizado</li>
                          <li><strong>País de origem:</strong> Brasil</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-olive-dark mb-2">Cuidados</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Evite exposição direta e prolongada à luz solar</li>
                          <li>Limpe apenas com pano seco ou levemente úmido</li>
                          <li>Não utilize produtos químicos abrasivos</li>
                          <li>Manuseie com cuidado para evitar quedas</li>
                          <li>Evite áreas com umidade excessiva</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="p-6 bg-white rounded-lg shadow-sm">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-olive-dark mb-4">Avaliações dos Clientes</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-terracotta text-terracotta" : "text-gray-300"}`} 
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-gray-700">{averageRating.toFixed(1)} de 5</span>
                      <span className="text-gray-500">({productReviews.length} avaliações)</span>
                    </div>
                    
                    {/* Add review form for logged in users */}
                    {isLoggedIn && (
                      <ProductReviewForm 
                        productId={product.id} 
                        onReviewSubmit={handleReviewSubmit} 
                      />
                    )}
                    
                    {/* Login prompt if not logged in */}
                    {!isLoggedIn && (
                      <div className="bg-beige p-4 rounded-lg mb-6">
                        <p className="text-olive-dark font-medium mb-2">Faça login para avaliar este produto</p>
                        <Button asChild className="bg-terracotta hover:bg-terracotta-dark">
                          <a href="/login">Fazer Login</a>
                        </Button>
                      </div>
                    )}
                    
                    {/* Display reviews */}
                    {productReviews.length > 0 ? (
                      productReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 py-6 last:border-none">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-800">{review.user}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? "fill-terracotta text-terracotta" : "text-gray-300"}`} 
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 italic">Ainda não há avaliações para este produto.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Related products */}
            {relatedProductsData.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-serif font-semibold text-olive-dark mb-6">Produtos Relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {relatedProductsData.map((relatedProduct) => (
                    <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <a href={`/produto/${relatedProduct.id}`} className="block">
                        <div className="h-60 overflow-hidden">
                          <img 
                            src={relatedProduct.image} 
                            alt={`Foto do produto ${relatedProduct.name}`}
                            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-serif text-lg font-medium text-olive-dark mb-1 truncate">{relatedProduct.name}</h3>
                          <p className="text-terracotta font-medium">
                            {relatedProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
