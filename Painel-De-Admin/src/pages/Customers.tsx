
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Eye, Mail, ShoppingBag, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
}

// Sample customers data
const customersData: Customer[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    orders: 5,
    totalSpent: "R$ 750,00",
    lastOrder: "20/05/2023",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    orders: 2,
    totalSpent: "R$ 320,00",
    lastOrder: "19/05/2023",
  },
  {
    id: 3,
    name: "Mariana Costa",
    email: "mariana.costa@email.com",
    orders: 8,
    totalSpent: "R$ 1.200,00",
    lastOrder: "18/05/2023",
  },
  {
    id: 4,
    name: "Paulo Vieira",
    email: "paulo.vieira@email.com",
    orders: 3,
    totalSpent: "R$ 580,00",
    lastOrder: "17/05/2023",
  },
  {
    id: 5,
    name: "Lucia Santos",
    email: "lucia.santos@email.com",
    orders: 1,
    totalSpent: "R$ 150,00",
    lastOrder: "16/05/2023",
  },
  {
    id: 6,
    name: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    orders: 4,
    totalSpent: "R$ 680,00",
    lastOrder: "15/05/2023",
  },
  {
    id: 7,
    name: "Juliana Ferreira",
    email: "juliana.ferreira@email.com",
    orders: 6,
    totalSpent: "R$ 920,00",
    lastOrder: "14/05/2023",
  },
  {
    id: 8,
    name: "Fernando Dias",
    email: "fernando.dias@email.com",
    orders: 2,
    totalSpent: "R$ 340,00",
    lastOrder: "13/05/2023",
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter customers based on search
  const filteredCustomers = customersData.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Header 
          title="Clientes" 
          subtitle="Gerenciar informações de clientes" 
        />
        
        {/* Search */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        
        {/* Customers table */}
        <div className="dashboard-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-medium">Cliente</th>
                  <th className="text-left py-4 px-6 font-medium">Email</th>
                  <th className="text-left py-4 px-6 font-medium">Pedidos</th>
                  <th className="text-left py-4 px-6 font-medium">Total Gasto</th>
                  <th className="text-left py-4 px-6 font-medium">Último Pedido</th>
                  <th className="text-center py-4 px-6 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="table-row">
                    <td className="py-4 px-6 font-medium">{customer.name}</td>
                    <td className="py-4 px-6 text-muted-foreground">{customer.email}</td>
                    <td className="py-4 px-6">{customer.orders}</td>
                    <td className="py-4 px-6 font-medium">{customer.totalSpent}</td>
                    <td className="py-4 px-6 text-muted-foreground">{customer.lastOrder}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              <span>Ver detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              <span>Enviar email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              <span>Ver pedidos</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
