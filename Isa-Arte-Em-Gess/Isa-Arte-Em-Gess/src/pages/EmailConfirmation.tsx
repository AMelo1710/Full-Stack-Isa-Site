
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmailConfirmation from "@/components/auth/EmailConfirmation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EmailConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in URL for automatic verification
    const token = searchParams.get("token");
    
    if (token) {
      setIsVerifying(true);
      
      // Simulate verifying token and auto-redirect
      setTimeout(() => {
        setIsVerifying(false);
        toast.success("Seu e-mail foi verificado com sucesso! Você pode fazer login agora.");
        
        // Redirect to login after successful verification
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }, 3000);
    }
  }, [searchParams, navigate]);

  const handleResend = () => {
    // In a real app, this would trigger an API call to resend the verification email
    console.log("Reenviando e-mail para:", email);
  };

  return (
    <>
      <Helmet>
        <title>Confirmação de E-mail - Isabelle Yanxauskas</title>
      </Helmet>
      <Navbar />
      <div className="container max-w-md mx-auto py-20 px-4">
        {isVerifying ? (
          <div className="text-center py-20">
            <div className="animate-pulse mb-4">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-primary"></div>
              </div>
            </div>
            <h2 className="text-xl font-medium mb-2">Verificando seu e-mail</h2>
            <p className="text-muted-foreground">Por favor, aguarde enquanto confirmamos sua conta...</p>
          </div>
        ) : (
          <EmailConfirmation email={email} onResend={handleResend} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default EmailConfirmationPage;
