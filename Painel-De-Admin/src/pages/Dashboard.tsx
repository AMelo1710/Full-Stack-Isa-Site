
import React from "react";
import { LayoutDashboard, ShoppingBag, Package, Users, TrendingUp, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import RecentOrdersTable from "@/components/RecentOrdersTable";
import ChartComponent from "@/components/ChartComponent";

// Sample data
const salesData = [
  { name: "Jan", vendas: 1200 },
  { name: "Fev", vendas: 1900 },
  { name: "Mar", vendas: 1500 },
  { name: "Abr", vendas: 2400 },
  { name: "Mai", vendas: 2800 },
  { name: "Jun", vendas: 3800 },
  { name: "Jul", vendas: 4300 },
];

const productData = [
  { name: "Nicho", quantidade: 25 },
  { name: "Placa 3D", quantidade: 40 },
  { name: "Moldura", quantidade: 32 },
  { name: "Luminária", quantidade: 18 },
  { name: "Gesso Flor", quantidade: 28 },
];

const recentOrders = [
  {
    id: "87432",
    customer: "Ana Silva",
    date: "20/05/2023",
    total: "R$ 350,00",
    status: "finalizado" as const,
  },
  {
    id: "87431",
    customer: "Carlos Mendes",
    date: "19/05/2023",
    total: "R$ 128,00",
    status: "enviado" as const,
  },
  {
    id: "87430",
    customer: "Mariana Costa",
    date: "18/05/2023",
    total: "R$ 540,00",
    status: "em preparo" as const,
  },
  {
    id: "87429",
    customer: "Paulo Vieira",
    date: "17/05/2023",
    total: "R$ 270,00",
    status: "recebido" as const,
  },
  {
    id: "87428",
    customer: "Lucia Santos",
    date: "16/05/2023",
    total: "R$ 150,00",
    status: "cancelado" as const,
  },
];

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Header 
          title="Dashboard" 
          subtitle="Bem vinda de volta, Isabelle" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Vendas"
            value="R$ 24.780"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pedidos"
            value="128"
            icon={<ShoppingBag className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Produtos"
            value="45"
            icon={<Package className="h-5 w-5" />}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Clientes"
            value="84"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartComponent
              data={salesData}
              type="area"
              dataKeys={["vendas"]}
              colors={["#9b87f5"]}
              title="Vendas Mensais"
              subtitle="Valor total de vendas por mês"
            />
          </div>
          <div>
            <ChartComponent
              data={productData}
              type="bar"
              dataKeys={["quantidade"]}
              colors={["#9b87f5"]}
              title="Produtos Mais Vendidos"
              subtitle="Top 5 produtos em quantidade"
            />
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Pedidos Recentes</h2>
            <button className="text-sm text-primary hover:underline">Ver todos</button>
          </div>
          <RecentOrdersTable orders={recentOrders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
