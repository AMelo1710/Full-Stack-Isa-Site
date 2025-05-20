
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart4, 
  Settings, 
  LogOut 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/dashboard" },
    { name: "Produtos", icon: <Package className="h-5 w-5" />, path: "/products" },
    { name: "Pedidos", icon: <ShoppingBag className="h-5 w-5" />, path: "/orders" },
    { name: "Clientes", icon: <Users className="h-5 w-5" />, path: "/customers" },
    { name: "Análises", icon: <BarChart4 className="h-5 w-5" />, path: "/analytics" },
    { name: "Configurações", icon: <Settings className="h-5 w-5" />, path: "/settings" },
  ];

  return (
    <div className="h-screen fixed left-0 top-0 w-64 bg-sidebar shadow-lg flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center py-4">
          <h2 className="text-xl font-bold text-white">Arte em Gesso</h2>
        </div>
      </div>
      
      <div className="flex-1 py-6 flex flex-col justify-between">
        <nav className="px-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive(item.path)
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="px-8 pb-6">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-sidebar-foreground rounded-lg hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
