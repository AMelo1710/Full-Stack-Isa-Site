
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Mail, UserRound } from "lucide-react";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Password requirements
const passwordRequirements = [
  { id: "length", label: "Pelo menos 8 caracteres", regex: /.{8,}/ },
  { id: "uppercase", label: "Pelo menos uma letra maiúscula", regex: /[A-Z]/ },
  { id: "lowercase", label: "Pelo menos uma letra minúscula", regex: /[a-z]/ },
  { id: "number", label: "Pelo menos um número", regex: /[0-9]/ },
  { id: "special", label: "Pelo menos um caractere especial", regex: /[^A-Za-z0-9]/ },
];

// Schema for registration
const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z
    .string()
    .email({ message: "Formato de e-mail inválido" }),
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

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState<"register" | "verify">("register");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const checkPasswordStrength = (password: string) => {
    const strength: Record<string, boolean> = {};
    
    passwordRequirements.forEach(req => {
      strength[req.id] = req.regex.test(password);
    });
    
    setPasswordStrength(strength);
  };

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form submitted:", data);
    setEmail(data.email);
    
    // In a real app, you would send this data to your server or API
    // For now, we'll just simulate sending the verification code
    
    toast.success("Código de verificação enviado para seu e-mail!");
    setStep("verify");
    
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

    // Auto-fill OTP after 3 seconds for demo purposes
    setTimeout(() => {
      setOtp("123456");
    }, 3000);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // In a real app, you would verify the OTP with your server
      // For now, we'll just simulate a successful verification
      
      toast.success("Conta criada com sucesso!");
      
      // Redirect to email confirmation page after verification
      navigate(`/confirmar-email?email=${encodeURIComponent(email)}`);
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

    // Auto-fill OTP after 3 seconds for demo purposes
    setTimeout(() => {
      setOtp("123456");
    }, 3000);
  };

  // Generate a secure suggested password
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
    let password = "";
    
    // Ensure we include at least one of each required type
    password += "A"; // uppercase
    password += "a"; // lowercase
    password += "1"; // number
    password += "!"; // special
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    form.setValue("password", password);
    form.setValue("confirmPassword", password);
    checkPasswordStrength(password);
  };

  if (step === "verify") {
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
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <p className="text-amber-800 text-sm">
                <strong>Para este demo:</strong> O código será preenchido automaticamente após 3 segundos.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col space-y-2 w-full">
            <Button onClick={handleVerifyOTP} disabled={otp.length !== 6}>
              Verificar
            </Button>
            <Button variant="outline" onClick={() => setStep("register")}>
              Voltar
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para se cadastrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Seu nome completo" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
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
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10 pr-10" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Sua senha" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          checkPasswordStrength(e.target.value);
                        }}
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
                  <div className="mt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={generatePassword}
                      className="text-xs"
                    >
                      Sugerir senha segura
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req) => (
                      <div key={req.id} className="flex items-center space-x-2">
                        <div 
                          className={`h-2 w-2 rounded-full ${
                            passwordStrength[req.id] ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground">{req.label}</span>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10 pr-10" 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirme sua senha" 
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
              Registrar
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Já possui uma conta?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
            Entrar
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
