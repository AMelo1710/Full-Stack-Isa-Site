
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical, Eye, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  status: "recebido" | "em preparo" | "enviado" | "finalizado" | "cancelado";
  items: number;
}

const orderStatusStyles: Record<
  string,
  { color: string; bgColor: string; label: string }
> = {
  recebido: { 
    color: "text-blue-700 dark:text-blue-400", 
    bgColor: "bg-blue-100 dark:bg-blue-900/30", 
    label: "Recebido" 
  },
  "em preparo": { 
    color: "text-yellow-700 dark:text-yellow-400", 
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30", 
    label: "Em Preparo" 
  },
  enviado: { 
    color: "text-purple-700 dark:text-purple-400", 
    bgColor: "bg-purple-100 dark:bg-purple-900/30", 
    label: "Enviado" 
  },
  finalizado: { 
    color: "text-green-700 dark:text-green-400", 
    bgColor: "bg-green-100 dark:bg-green-900/30", 
    label: "Finalizado" 
  },
  cancelado: { 
    color: "text-red-700 dark:text-red-400", 
    bgColor: "bg-red-100 dark:bg-red-900/30", 
    label: "Cancelado" 
  },
};

// Sample orders data
const ordersData: Order[] = [
  {
    id: "87432",
    customer: "Ana Silva",
    email: "ana.silva@email.com",
    date: "20/05/2023",
    total: "R$ 350,00",
    status: "finalizado",
    items: 3
  },
  {
    id: "87431",
    customer: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    date: "19/05/2023",
    total: "R$ 128,00",
    status: "enviado",
    items: 1
  },
  {
    id: "87430",
    customer: "Mariana Costa",
    email: "mariana.costa@email.com",
    date: "18/05/2023",
    total: "R$ 540,00",
    status: "em preparo",
    items: 4
  },
  {
    id: "87429",
    customer: "Paulo Vieira",
    email: "paulo.vieira@email.com",
    date: "17/05/2023",
    total: "R$ 270,00",
    status: "recebido",
    items: 2
  },
  {
    id: "87428",
    customer: "Lucia Santos",
    email: "lucia.santos@email.com",
    date: "16/05/2023",
    total: "R$ 150,00",
    status: "cancelado",
    items: 1
  },
  {
    id: "87427",
    customer: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    date: "15/05/2023",
    total: "R$ 210,00",
    status: "finalizado",
    items: 2
  },
  {
    id: "87426",
    customer: "Juliana Ferreira",
    email: "juliana.ferreira@email.com",
    date: "14/05/2023",
    total: "R$ 320,00",
    status: "enviado",
    items: 3
  },
  {
    id: "87425",
    customer: "Fernando Dias",
    email: "fernando.dias@email.com",
    date: "13/05/2023",
    total: "R$ 180,00",
    status: "finalizado",
    items: 2
  },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter orders based on search term and status filter
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.includes(searchTerm) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Header 
          title="Pedidos" 
          subtitle="Gerenciar todos os pedidos" 
        />
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-96"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Select onValueChange={(value) => setStatusFilter(value || null)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="recebido">Recebidos</SelectItem>
                <SelectItem value="em preparo">Em Preparo</SelectItem>
                <SelectItem value="enviado">Enviados</SelectItem>
                <SelectItem value="finalizado">Finalizados</SelectItem>
                <SelectItem value="cancelado">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Orders table */}
        <div className="dashboard-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-medium">Pedido</th>
                  <th className="text-left py-4 px-6 font-medium">Cliente</th>
                  <th className="text-left py-4 px-6 font-medium">Data</th>
                  <th className="text-left py-4 px-6 font-medium">Status</th>
                  <th className="text-left py-4 px-6 font-medium">Total</th>
                  <th className="text-center py-4 px-6 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="table-row">
                    <td className="py-4 px-6">
                      <div className="font-medium">#{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.items} {order.items === 1 ? "item" : "itens"}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        "text-xs font-medium",
                        orderStatusStyles[order.status].bgColor,
                        orderStatusStyles[order.status].color,
                      )}>
                        {orderStatusStyles[order.status].label}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 font-medium">{order.total}</td>
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
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>Marcar como finalizado</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              <span>Cancelar pedido</span>
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
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
