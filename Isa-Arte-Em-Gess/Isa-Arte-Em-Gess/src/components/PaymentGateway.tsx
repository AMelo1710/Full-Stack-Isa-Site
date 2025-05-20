
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, ArrowRight } from 'lucide-react';

interface PaymentGatewayProps {
  buttonText: string;
  className?: string;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ buttonText, className }) => {
  const { total, clearCart } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePayment = (method: string) => {
    // In a real app, this would redirect to a real payment processor
    // For now, we'll just simulate the payment process
    
    toast.success(`Pagamento via ${method} iniciado!`);
    setTimeout(() => {
      toast.success("Pagamento processado com sucesso!");
      clearCart();
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-olive-dark">Finalizar Compra</DialogTitle>
          <DialogDescription>
            Escolha um método de pagamento para continuar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <p className="text-lg font-medium text-olive-dark">
            Total a pagar: <span className="text-terracotta">
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            <Button 
              variant="outline" 
              className="flex justify-between items-center h-14"
              onClick={() => handlePayment('Cartão de Crédito')}
            >
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <span>Cartão de Crédito</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center h-14"
              onClick={() => handlePayment('Boleto Bancário')}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Boleto Bancário</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center h-14"
              onClick={() => handlePayment('Pix')}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Pix</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-500">
            Pagamento processado com segurança
          </span>
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="sm:mt-0"
          >
            Voltar ao carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentGateway;
