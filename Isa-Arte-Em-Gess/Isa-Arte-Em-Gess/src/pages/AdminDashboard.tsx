
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Placeholder data - replace with actual data fetching later
  const stats = [
    { title: "Total de Vendas (Últimos 30 dias)", value: "R$ 12.345,67", trend: "+5.2%" },
    { title: "Novos Pedidos", value: "78", trend: "+10" },
    { title: "Produtos em Estoque Baixo", value: "12", trendColor: "text-red-500" },
    { title: "Visitantes Online", value: "42" },
  ];

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-olive-dark">Painel Administrativo</h2>
          <div className="flex items-center space-x-2">
            <Button>Exportar Relatório</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                {/* Placeholder for an icon */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-olive-dark">{stat.value}</div>
                {stat.trend && (
                  <p className={`text-xs ${stat.trendColor || 'text-muted-foreground'}`}>
                    {stat.trend} desde o último período
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-olive-dark">Visão Geral das Vendas</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Placeholder for a sales chart */}
              <div className="h-[350px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                Gráfico de Vendas (Recharts) - Em breve
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-olive-dark">Pedidos Recentes</CardTitle>
              <p className="text-sm text-gray-500">
                Você tem 5 novos pedidos esta semana.
              </p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for recent orders list */}
              <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-olive-dark">Pedido #{12340 + i}</p>
                      <p className="text-sm text-gray-500">cliente{i}@example.com</p>
                    </div>
                    <div className="ml-auto font-medium text-terracotta">+R$ {(Math.random() * 200 + 50).toFixed(2)}</div>
                  </div>
                ))}
                 <Link to="#" className="text-sm text-terracotta hover:underline">
                  Ver todos os pedidos
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
         {/* Placeholder links to other admin sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/admin/products">
                <Button variant="outline" className="w-full h-20 text-lg">Gerenciar Produtos</Button>
            </Link>
            <Link to="/admin/orders">
                <Button variant="outline" className="w-full h-20 text-lg">Gerenciar Pedidos</Button>
            </Link>
             <Link to="/admin/stock">
                <Button variant="outline" className="w-full h-20 text-lg">Gerenciar Estoque</Button>
            </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
