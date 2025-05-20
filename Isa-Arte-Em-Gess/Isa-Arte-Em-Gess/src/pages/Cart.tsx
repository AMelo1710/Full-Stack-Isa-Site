
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  ShoppingBag, 
  Clock, 
  CreditCard,
  Heart
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import PaymentGateway from "@/components/PaymentGateway";
import HelpForm from "@/components/HelpForm";

const Cart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    applyDiscount, 
    discountAmount, 
    shippingOption, 
    setShippingOption, 
    shippingCost, 
    total,
    toggleSaveItem,
    isSaved
  } = useCart();
  
  const [couponCode, setCouponCode] = useState("");
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyDiscount(couponCode.trim());
      setCouponCode("");
    } else {
      toast.error("Por favor, insira um código de cupom válido");
    }
  };
  
  const handleRemoveItem = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setItemToRemove(null);
    }
  };
  
  const calculateDeliveryDate = (option: string) => {
    const today = new Date();
    let daysToAdd = 0;
    
    switch (option) {
      case 'express':
        daysToAdd = 3;
        break;
      case 'standard':
        daysToAdd = 5;
        break;
      case 'economic':
        daysToAdd = 7;
        break;
      default:
        daysToAdd = 5;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);
    
    return deliveryDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const isLowStock = (productId: string) => {
    // Assume some products have low stock
    const lowStockIds = ['1', '3', '6'];
    return lowStockIds.includes(productId);
  };
  
  // Define stock limits for products
  const getStockAmount = (productId: string): number => {
    // In a real app, this would come from your database
    const stockMap: {[key: string]: number} = {
      '1': 2,
      '2': 15,
      '3': 3,
      '4': 10,
      '5': 5,
      '6': 2
    };
    
    return stockMap[productId] || 10; // Default to 10 if not specified
  };
  
  return (
    <div className="min-h-screen bg-beige-light flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-olive-dark mb-8">
            Carrinho de Compras
          </h1>
          
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-serif text-olive-dark mb-4">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-6">
                Parece que você ainda não adicionou nenhum produto ao seu carrinho.
              </p>
              <Link to="/produtos">
                <Button className="bg-terracotta hover:bg-terracotta-dark text-white">
                  Explorar produtos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-serif text-olive-dark">
                        Itens do Carrinho ({items.length})
                      </h2>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-gray-500 hover:text-red-500 border-gray-200"
                          >
                            Limpar carrinho
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Limpar carrinho?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação irá remover todos os itens do seu carrinho. Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={clearCart}
                            >
                              Sim, limpar carrinho
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  
                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => {
                      const stockLimit = item.stock || getStockAmount(item.id);
                      const itemIsSaved = isSaved(item.id);
                      
                      return (
                        <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {/* Product Image */}
                          <Link to={`/produto/${item.id}`} className="w-24 h-24 flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          </Link>
                          
                          {/* Product Details */}
                          <div className="flex-grow">
                            <div className="flex flex-wrap justify-between">
                              <div>
                                <Link to={`/produto/${item.id}`}>
                                  <h3 className="text-lg font-medium text-olive-dark hover:text-terracotta transition-colors">
                                    {item.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                
                                {item.quantity >= stockLimit && (
                                  <div className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full mb-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Quantidade máxima atingida!
                                  </div>
                                )}
                                
                                {isLowStock(item.id) && (
                                  <div className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full mb-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Apenas {stockLimit} em estoque!
                                  </div>
                                )}
                              </div>
                              
                              <div className="font-medium text-olive-dark">
                                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </div>
                            </div>
                            
                            {/* Quantity and Actions */}
                            <div className="flex flex-wrap items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="px-3 py-1 text-gray-500 hover:text-terracotta focus:outline-none"
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className={`px-3 py-1 focus:outline-none ${
                                    item.quantity >= stockLimit 
                                      ? "text-gray-300 cursor-not-allowed" 
                                      : "text-gray-500 hover:text-terracotta"
                                  }`}
                                  aria-label="Aumentar quantidade"
                                  disabled={item.quantity >= stockLimit}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`p-0 h-auto flex items-center ${
                                    itemIsSaved 
                                      ? "text-red-500 hover:text-gray-500" 
                                      : "text-gray-500 hover:text-red-500"
                                  }`}
                                  onClick={() => toggleSaveItem(item.id)}
                                >
                                  <Heart className="h-5 w-5 mr-1" fill={itemIsSaved ? "currentColor" : "none"} />
                                  <span className="text-sm">{itemIsSaved ? "Salvo" : "Salvar"}</span>
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-gray-500 hover:text-red-500 p-0 h-auto"
                                      onClick={() => setItemToRemove(item.id)}
                                    >
                                      <Trash2 className="h-5 w-5 mr-1" />
                                      <span className="text-sm">Remover</span>
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remover item do carrinho?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Você está prestes a remover "{item.name}" do seu carrinho. Deseja continuar?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel onClick={() => setItemToRemove(null)}>
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction 
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={handleRemoveItem}
                                      >
                                        Sim, remover
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                            
                            {/* Subtotal */}
                            <div className="mt-3 text-right">
                              <p className="text-sm text-gray-500">
                                Subtotal: <span className="font-medium text-olive-dark">
                                  {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Back to Shopping */}
                <div className="mt-6">
                  <Link to="/produtos">
                    <Button variant="outline" size="sm" className="text-olive hover:text-olive-dark">
                      <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                      Continuar comprando
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm sticky top-24">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-serif text-olive-dark">Resumo do Pedido</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    
                    {/* Discount */}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto</span>
                        <span>-{discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    )}
                    
                    {/* Shipping Options */}
                    <div className="py-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Opções de Envio
                      </label>
                      <Select
                        value={shippingOption}
                        onValueChange={setShippingOption}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma opção de entrega" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="express">
                            <div className="flex justify-between items-center w-full">
                              <span>Express (2-3 dias úteis)</span>
                              <span className="font-medium">
                                {subtotal >= 300 ? 'Grátis' : 'R$ 25,90'}
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="standard">
                            <div className="flex justify-between items-center w-full">
                              <span>Padrão (4-5 dias úteis)</span>
                              <span className="font-medium">
                                {subtotal >= 300 ? 'Grátis' : 'R$ 15,90'}
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="economic">
                            <div className="flex justify-between items-center w-full">
                              <span>Econômico (6-8 dias úteis)</span>
                              <span className="font-medium">
                                {subtotal >= 300 ? 'Grátis' : 'R$ 9,90'}
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {/* Estimated Delivery */}
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Entrega estimada: {calculateDeliveryDate(shippingOption)}</span>
                      </div>
                      
                      {subtotal >= 300 && (
                        <div className="flex items-center text-sm text-green-600 mt-2">
                          <Truck className="h-4 w-4 mr-1" />
                          <span>Frete grátis para compras acima de R$ 300,00</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Shipping cost */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frete</span>
                      <span className="font-medium">
                        {shippingCost > 0 
                          ? shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                          : 'Grátis'}
                      </span>
                    </div>
                    
                    {/* Apply Coupon */}
                    <div className="pt-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Cupom de Desconto
                      </label>
                      <div className="flex">
                        <Input
                          type="text"
                          placeholder="PROMO10"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="rounded-r-none border-r-0"
                        />
                        <Button 
                          variant="default" 
                          className="rounded-l-none bg-olive hover:bg-olive-dark"
                          onClick={handleApplyCoupon}
                        >
                          Aplicar
                        </Button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-olive-dark">Total</span>
                        <span className="text-terracotta">
                          {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                    </div>
                    
                    {/* Accepted Payment Methods */}
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <CreditCard className="h-4 w-4 mr-1" />
                        <span className="font-medium">Meios de pagamento aceitos:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-2 py-1 bg-white text-xs border border-gray-100 rounded">
                          Cartão de Crédito
                        </span>
                        <span className="inline-block px-2 py-1 bg-white text-xs border border-gray-100 rounded">
                          Boleto Bancário
                        </span>
                        <span className="inline-block px-2 py-1 bg-white text-xs border border-gray-100 rounded">
                          Pix
                        </span>
                      </div>
                    </div>
                    
                    {/* Checkout Button */}
                    <PaymentGateway 
                      buttonText="Finalizar Compra" 
                      className="w-full bg-terracotta hover:bg-terracotta-dark text-white mt-2"
                    />
                    
                    {/* Secure Checkout */}
                    <div className="text-center text-xs text-gray-500 mt-2">
                      Compra 100% segura processada com criptografia
                    </div>
                    
                    {/* Help/Chat */}
                    <div className="mt-4 text-center">
                      <HelpForm buttonText="Precisa de ajuda? Fale conosco" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
