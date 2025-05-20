
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmailConfirmationProps {
  email: string;
  onResend: () => void;
}

const EmailConfirmation = ({ email, onResend }: EmailConfirmationProps) => {
  const [resendTimer, setResendTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleResend = () => {
    setIsResending(true);
    
    // For demo purposes, we'll simulate automatic verification
    setTimeout(() => {
      onResend();
      toast.success("Um novo e-mail de confirmação foi enviado!");
      setResendTimer(60);
      setIsResending(false);
      
      // Auto-confirm after 2 seconds (for demo)
      setTimeout(() => {
        toast.success("Email verificado com sucesso! Você pode fazer login agora.");
        navigate("/login");
      }, 2000);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Confirme seu e-mail</CardTitle>
        <CardDescription className="text-center">
          Enviamos um e-mail de confirmação para
        </CardDescription>
        <div className="flex items-center justify-center mt-2">
          <Mail className="h-5 w-5 mr-2 text-primary" />
          <span className="font-medium">{email}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Próximos passos
          </h3>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>Abra o e-mail enviado para o endereço acima</li>
            <li>Clique no link de confirmação para ativar sua conta</li>
            <li>Após a confirmação, você será redirecionado para fazer login</li>
          </ol>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>Para este demo:</strong> O email será automaticamente verificado após clicar em "Reenviar e-mail" para simular o funcionamento.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <div className="w-full">
          {resendTimer > 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Reenviar e-mail em {resendTimer} segundos
            </p>
          ) : (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Reenviando..." : "Reenviar e-mail de confirmação"}
            </Button>
          )}
        </div>
        <Button 
          variant="ghost" 
          className="w-full"
          onClick={() => navigate("/login")}
        >
          Voltar para login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailConfirmation;
