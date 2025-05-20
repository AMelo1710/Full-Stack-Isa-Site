
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Schema for email step
const emailSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de e-mail inválido" }),
});

// Schema for reset password step
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
    .regex(/[A-Z]/, { message: "Deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "Deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "Deve conter pelo menos um número" })
    .regex(/[^A-Za-z0-9]/, { message: "Deve conter pelo menos um caractere especial" }),
  confirmPassword: z
    .string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const PasswordRecoveryForm = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitEmail = (data: EmailFormValues) => {
    setEmail(data.email);
    
    // In a real app, you would send a recovery email with the OTP
    // For now, we'll just simulate sending the verification code
    
    toast.success("Código de verificação enviado para seu e-mail!");
    setStep("otp");
    
    // Start OTP timer
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // In a real app, you would verify the OTP with your server
      // For now, we'll just simulate a successful verification
      
      toast.success("Código verificado com sucesso!");
      setStep("reset");
    } else {
      toast.error("Código OTP incompleto");
    }
  };

  const resendOTP = () => {
    toast.info("Novo código de verificação enviado!");
    setOtpTimer(60);
    
    // Start OTP timer again
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmitReset = (data: ResetPasswordFormValues) => {
    // In a real app, you would send the new password to your server
    // For now, we'll just simulate a successful password reset
    
    toast.success("Senha redefinida com sucesso! Você será redirecionado para o login.");
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  if (step === "otp") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Verificação</CardTitle>
          <CardDescription>
            Digite o código de verificação enviado para {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
            <p className="text-sm text-muted-foreground text-center">
              Não recebeu o código? {otpTimer > 0 ? (
                <span>Reenviar em {otpTimer}s</span>
              ) : (
                <Button variant="link" className="p-0" onClick={resendOTP}>
                  Reenviar código
                </Button>
              )}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Verifique também sua pasta de spam caso não encontre o e-mail.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col space-y-2 w-full">
            <Button onClick={handleVerifyOTP} disabled={otp.length !== 6}>
              Verificar
            </Button>
            <Button variant="outline" onClick={() => setStep("email")}>
              Voltar
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (step === "reset") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Redefinir Senha</CardTitle>
          <CardDescription>
            Crie uma nova senha para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(onSubmitReset)} className="space-y-4">
              <FormField
                control={resetPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-10 pr-10" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Nova senha" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={resetPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-10 pr-10" 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirme sua nova senha" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Redefinir Senha
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Recuperar Senha</CardTitle>
        <CardDescription>
          Informe seu e-mail para receber um código de recuperação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" type="email" placeholder="seu.email@exemplo.com" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Enviar Código
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Lembrou sua senha?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
            Voltar para o login
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default PasswordRecoveryForm;
