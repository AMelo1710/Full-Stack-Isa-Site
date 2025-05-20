
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de e-mail inválido" }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data);
    
    // In a real app, you would authenticate with your server or API
    // For now, we're simulating a successful login
    
    // Create a user object
    const user = {
      id: "user-123",
      name: data.email.split('@')[0],
      email: data.email
    };
    
    // Login the user
    login(user);
    
    toast.success("Login realizado com sucesso!");
    
    // Redirect to home page after successful login
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Acesse sua conta para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel className="flex justify-between">
                    <span>Senha</span>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-normal text-sm" 
                      onClick={() => navigate("/recuperar-senha")}
                      type="button"
                    >
                      Esqueceu a senha?
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10 pr-10" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Sua senha" 
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
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Lembrar-me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Não possui uma conta?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/registro")}>
            Criar conta
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
