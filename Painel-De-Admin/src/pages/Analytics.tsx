
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChartComponent from "@/components/ChartComponent";
import StatCard from "@/components/StatCard";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for charts
const salesData = [
  { name: "Jan", vendas: 1200, meta: 1000 },
  { name: "Fev", vendas: 1900, meta: 1500 },
  { name: "Mar", vendas: 1500, meta: 1500 },
  { name: "Abr", vendas: 2400, meta: 2000 },
  { name: "Mai", vendas: 2800, meta: 2000 },
  { name: "Jun", vendas: 3800, meta: 3000 },
  { name: "Jul", vendas: 4300, meta: 3500 },
];

const trafficData = [
  { name: "Direto", valor: 30 },
  { name: "Google", valor: 40 },
  { name: "Instagram", valor: 25 },
  { name: "Facebook", valor: 20 },
  { name: "Outros", valor: 15 },
];

const topProductsData = [
  { name: "Nicho", quantidade: 25 },
  { name: "Placa 3D", quantidade: 40 },
  { name: "Moldura", quantidade: 32 },
  { name: "Luminária", quantidade: 18 },
  { name: "Gesso Flor", quantidade: 28 },
];

const monthlySalesData = [
  { name: "Jan", receita: 12000 },
  { name: "Fev", receita: 19000 },
  { name: "Mar", receita: 15000 },
  { name: "Abr", receita: 24000 },
  { name: "Mai", receita: 28000 },
  { name: "Jun", receita: 38000 },
  { name: "Jul", receita: 43000 },
];

const Analytics = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Header 
          title="Análises" 
          subtitle="Visualize o desempenho do seu negócio" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Receita Total"
            value="R$ 146.580"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Pedidos Processados"
            value="587"
            icon={<ShoppingBag className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Clientes Ativos"
            value="218"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Produtos Vendidos"
            value="842"
            icon={<Package className="h-5 w-5" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="h-[400px]">
            <ChartComponent
              data={salesData}
              type="line"
              dataKeys={["vendas", "meta"]}
              colors={["#9b87f5", "#d1d5db"]}
              title="Desempenho de Vendas vs. Meta"
              subtitle="Comparação entre as vendas realizadas e as metas mensais"
              height={350}
            />
          </div>
          <div className="h-[400px]">
            <ChartComponent
              data={monthlySalesData}
              type="bar"
              dataKeys={["receita"]}
              colors={["#9b87f5"]}
              title="Receita Mensal"
              subtitle="Total de receita por mês"
              height={350}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-[350px]">
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartComponent
                data={topProductsData}
                type="bar"
                dataKeys={["quantidade"]}
                colors={["#9b87f5"]}
                height={250}
              />
            </CardContent>
          </Card>
          <Card className="h-[350px]">
            <CardHeader>
              <CardTitle>Fontes de Tráfego</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartComponent
                data={trafficData}
                type="area"
                dataKeys={["valor"]}
                colors={["#9b87f5"]}
                height={250}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
