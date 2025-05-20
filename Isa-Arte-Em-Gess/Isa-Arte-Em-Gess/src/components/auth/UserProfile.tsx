
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { fetchAddressByCep, formatPhone, formatCep } from "@/services/addressService";

// Form schema for profile data
const profileSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
});

const addressSchema = z.object({
  nickname: z.string().min(1, { message: "Apelido é obrigatório" }),
  street: z.string().min(3, { message: "Rua é obrigatória" }),
  number: z.string().min(1, { message: "Número é obrigatório" }),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, { message: "Bairro é obrigatório" }),
  city: z.string().min(2, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  zipCode: z.string().min(8, { message: "CEP é obrigatório" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type AddressFormValues = z.infer<typeof addressSchema>;

// Load saved user data from localStorage
const loadUserProfile = () => {
  const savedProfile = localStorage.getItem('userProfile');
  return savedProfile ? JSON.parse(savedProfile) : null;
};

// Load saved addresses from localStorage
const loadAddresses = () => {
  const savedAddresses = localStorage.getItem('userAddresses');
  return savedAddresses ? JSON.parse(savedAddresses) : [];
};

// Sample order data
const orders = [
  {
    id: "123456",
    date: "15/05/2023",
    total: "R$ 350,00",
    status: "Entregue",
    tracking: "BR123456789",
  },
  {
    id: "123457",
    date: "03/05/2023",
    total: "R$ 175,50",
    status: "Em trânsito",
    tracking: "BR987654321",
  },
  {
    id: "123458",
    date: "22/04/2023",
    total: "R$ 89,90",
    status: "Processando",
    tracking: "",
  },
];

const UserProfile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("perfil");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<any>(null);
  const [addresses, setAddresses] = useState(loadAddresses());
  const [isDeleteAddressDialogOpen, setIsDeleteAddressDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : {
      emailMarketing: true,
      orderUpdates: true,
      passwordChanges: true,
    };
  });
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Initialize profile form with saved data
  const userProfile = loadUserProfile() || {};
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name || user?.name || "",
      email: userProfile.email || user?.email || "",
      phone: userProfile.phone || "",
      birthDate: userProfile.birthDate || "",
    },
  });

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      nickname: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  
  // Use useEffect for redirection instead of early return
  useEffect(() => {
    if (!user) {
      setIsAuthorized(false);
      const timer = setTimeout(() => navigate("/login"), 100);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // Handle CEP change and auto-fill address fields
  const handleCepChange = async (value: string) => {
    const formattedCep = formatCep(value);
    addressForm.setValue("zipCode", formattedCep);

    // Only fetch address if CEP has 8 digits
    if (formattedCep.replace(/\D/g, '').length === 8) {
      const addressData = await fetchAddressByCep(formattedCep);
      
      if (addressData) {
        addressForm.setValue("street", addressData.street || "");
        addressForm.setValue("neighborhood", addressData.neighborhood || "");
        addressForm.setValue("city", addressData.city || "");
        addressForm.setValue("state", addressData.state || "");
        
        // Focus on the number field after auto-fill
        setTimeout(() => {
          document.getElementById("address-number")?.focus();
        }, 100);
      }
    }
  };

  // Handle phone formatting
  const handlePhoneChange = (value: string) => {
    const formattedPhone = formatPhone(value);
    profileForm.setValue("phone", formattedPhone);
  };

  const handleUpdateProfile = (data: ProfileFormValues) => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(data));
    
    // Update user profile in auth context
    if (updateUserProfile) {
      updateUserProfile({
        ...user,
        name: data.name,
      });
    }
    
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleAddAddress = (data: AddressFormValues) => {
    const updatedAddresses = [...addresses];
    
    if (currentAddress) {
      // Update existing address
      const index = updatedAddresses.findIndex(addr => addr.id === currentAddress.id);
      if (index !== -1) {
        updatedAddresses[index] = {
          ...data,
          id: currentAddress.id,
          default: currentAddress.default,
        };
      }
      toast.success("Endereço atualizado com sucesso!");
    } else {
      // Add new address
      const newAddress = {
        ...data,
        id: `addr-${Date.now()}`,
        default: addresses.length === 0, // Make first address default
      };
      updatedAddresses.push(newAddress);
      toast.success("Endereço adicionado com sucesso!");
    }
    
    setAddresses(updatedAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
    setIsEditingAddress(false);
    setCurrentAddress(null);
    addressForm.reset();
  };

  const handleEditAddress = (address: any) => {
    setCurrentAddress(address);
    addressForm.reset({
      nickname: address.nickname || "Casa",
      street: address.street,
      number: address.number,
      complement: address.complement || "",
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    setIsEditingAddress(true);
  };

  const handleDeleteAddressClick = (addressId: string) => {
    setAddressToDelete(addressId);
    setIsDeleteAddressDialogOpen(true);
  };

  const confirmDeleteAddress = () => {
    if (!addressToDelete) return;
    
    const updatedAddresses = addresses.filter(addr => addr.id !== addressToDelete);
    
    // If the deleted address was default and there are other addresses, make one default
    if (addresses.find(addr => addr.id === addressToDelete)?.default && updatedAddresses.length > 0) {
      updatedAddresses[0].default = true;
    }
    
    setAddresses(updatedAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
    setIsDeleteAddressDialogOpen(false);
    setAddressToDelete(null);
    toast.success("Endereço excluído com sucesso!");
  };

  const handleSetDefaultAddress = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      default: addr.id === addressId,
    }));
    
    setAddresses(updatedAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
    toast.success("Endereço definido como principal!");
  };

  const handleSavePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    toast.success("Preferências salvas com sucesso!");
  };

  const handleExportData = () => {
    toast.success("Seus dados serão enviados para seu email em breve!");
  };

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteAccount = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userAddresses');
    localStorage.removeItem('userPreferences');
    
    toast.success("Conta excluída com sucesso!");
    logout();
    navigate("/");
  };

  const handleTrackOrder = (tracking: string) => {
    if (tracking) {
      window.open(`https://www.linkcorreios.com.br/?id=${tracking}`, "_blank");
    } else {
      toast.error("Este pedido ainda não possui código de rastreamento.");
    }
  };
  
  // If not authorized, show redirection message instead of an early return
  if (!isAuthorized) {
    return <div className="p-10 text-center">Redirecionando para o login...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Minha Conta</h1>
      
      <div className="bg-white rounded-lg shadow">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <div className="border-b">
            <TabsList className="bg-transparent w-full justify-start rounded-none px-4 h-12 border-b-0">
              <TabsTrigger value="perfil" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
                Perfil
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="enderecos" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
                Endereços
              </TabsTrigger>
              <TabsTrigger value="configuracoes" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
                Mais
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Profile Tab */}
          <TabsContent value="perfil" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações pessoais</CardTitle>
                <CardDescription>Atualize seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="(00) 00000-0000"
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                maxLength={15}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de nascimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="mt-4 bg-terracotta hover:bg-terracotta-dark">Salvar alterações</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="pedidos" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus pedidos</CardTitle>
                <CardDescription>Histórico e acompanhamento de pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Você ainda não fez nenhum pedido.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/produtos")}
                    >
                      Começar a comprar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className="font-medium">Pedido #{order.id}</p>
                            <p className="text-sm text-muted-foreground">Data: {order.date}</p>
                            <p className="text-sm">Total: {order.total}</p>
                            <p className={`text-sm font-medium ${
                              order.status === "Entregue" ? "text-green-600" :
                              order.status === "Em trânsito" ? "text-amber-600" :
                              "text-blue-600"
                            }`}>
                              {order.status}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate(`/pedido/${order.id}`)}
                            >
                              Ver detalhes
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-terracotta hover:bg-terracotta-dark"
                              onClick={() => handleTrackOrder(order.tracking)}
                              disabled={!order.tracking}
                            >
                              Rastrear
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Addresses Tab */}
          <TabsContent value="enderecos" className="p-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Meus endereços</CardTitle>
                  <CardDescription>Gerenciar seus endereços de entrega</CardDescription>
                </div>
                {!isEditingAddress && (
                  <Button 
                    className="bg-terracotta hover:bg-terracotta-dark"
                    onClick={() => {
                      addressForm.reset({
                        nickname: "Casa",
                        street: "",
                        number: "",
                        complement: "",
                        neighborhood: "",
                        city: "",
                        state: "",
                        zipCode: "",
                      });
                      setCurrentAddress(null);
                      setIsEditingAddress(true);
                    }}
                  >
                    Adicionar endereço
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditingAddress ? (
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(handleAddAddress)} className="space-y-4">
                      <FormField
                        control={addressForm.control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apelido do endereço</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ex: Casa, Trabalho" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="00000-000" 
                                onChange={(e) => handleCepChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                  <Input id="address-number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={addressForm.control}
                            name="complement"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Complemento</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={addressForm.control}
                          name="neighborhood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button type="submit" className="bg-terracotta hover:bg-terracotta-dark">
                          {currentAddress ? "Atualizar" : "Adicionar"} endereço
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setIsEditingAddress(false);
                          setCurrentAddress(null);
                        }}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Você ainda não cadastrou nenhum endereço.</p>
                    <Button 
                      className="mt-4 bg-terracotta hover:bg-terracotta-dark"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      Adicionar endereço
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <Card key={address.id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{address.nickname}</p>
                              {address.default && (
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                  Principal
                                </span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditAddress(address)}
                              >
                                Editar
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteAddressClick(address.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                Excluir
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm">
                            {address.street}, {address.number}
                            {address.complement && `, ${address.complement}`}
                          </p>
                          <p className="text-sm">
                            {address.neighborhood}, {address.city} - {address.state}
                          </p>
                          <p className="text-sm">{address.zipCode}</p>
                          
                          {!address.default && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="px-0 py-1 h-auto mt-2 text-terracotta hover:text-terracotta-dark"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Definir como endereço principal
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* More Tab */}
          <TabsContent value="configuracoes" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de comunicação</CardTitle>
                <CardDescription>Gerencie como deseja receber comunicações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-marketing">E-mails de marketing</Label>
                    <p className="text-sm text-muted-foreground">Receba promoções e novidades</p>
                  </div>
                  <Switch
                    id="email-marketing"
                    checked={preferences.emailMarketing}
                    onCheckedChange={(checked) => setPreferences({...preferences, emailMarketing: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-updates">Atualizações de pedidos</Label>
                    <p className="text-sm text-muted-foreground">Notificações sobre status de pedidos</p>
                  </div>
                  <Switch
                    id="order-updates"
                    checked={preferences.orderUpdates}
                    onCheckedChange={(checked) => setPreferences({...preferences, orderUpdates: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-alerts">Alertas de segurança</Label>
                    <p className="text-sm text-muted-foreground">Mudanças de senha e acesso à conta</p>
                  </div>
                  <Switch
                    id="security-alerts"
                    checked={preferences.passwordChanges}
                    onCheckedChange={(checked) => setPreferences({...preferences, passwordChanges: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} className="bg-terracotta hover:bg-terracotta-dark">
                  Salvar preferências
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Dados da conta</CardTitle>
                <CardDescription>Exporte ou exclua seus dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Exportar dados</h3>
                  <p className="text-sm text-muted-foreground">
                    Baixe todos os seus dados pessoais e histórico de pedidos
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={handleExportData}
                  >
                    Exportar meus dados
                  </Button>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-red-600">Excluir conta</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta ação é permanente e não pode ser desfeita
                  </p>
                  <Button 
                    variant="destructive" 
                    className="mt-2"
                    onClick={handleDeleteAccount}
                  >
                    Excluir minha conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAccount} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, excluir minha conta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Address Confirmation Dialog */}
      <AlertDialog open={isDeleteAddressDialogOpen} onOpenChange={setIsDeleteAddressDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir endereço</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAddress} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, excluir endereço
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfile;
