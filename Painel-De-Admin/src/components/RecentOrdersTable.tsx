
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: "recebido" | "em preparo" | "enviado" | "finalizado" | "cancelado";
}

interface RecentOrdersTableProps {
  orders: Order[];
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

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              ID Pedido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr key={order.id} className="table-row">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                #{order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {order.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={cn(
                  "text-xs font-medium",
                  orderStatusStyles[order.status].bgColor,
                  orderStatusStyles[order.status].color,
                )}>
                  {orderStatusStyles[order.status].label}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
