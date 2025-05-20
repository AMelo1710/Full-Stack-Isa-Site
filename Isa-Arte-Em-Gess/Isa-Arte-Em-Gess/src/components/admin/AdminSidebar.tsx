
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, BarChart2, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // We'll use this for logout

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth(); // Assuming logout is available

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/admin' },
    { name: 'Produtos', icon: Package, path: '/admin/products' },
    { name: 'Pedidos', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Estoque', icon: BarChart2, path: '/admin/stock' }, // Added stock
    { name: 'Clientes', icon: Users, path: '/admin/customers' }, // Placeholder for customers
    { name: 'Configurações', icon: Settings, path: '/admin/settings' }, // Placeholder for settings
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-olive-dark text-beige-light flex flex-col min-h-screen">
      <div className="p-6 text-center border-b border-olive">
        <Link to="/admin">
          <h1 className="text-2xl font-serif font-semibold">Admin</h1>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-olive transition-colors
                        ${isActive(item.path) ? 'bg-olive-light text-olive-dark font-medium' : 'hover:text-white'}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t border-olive">
        <button
            onClick={logout} // Assuming logout redirects or handles state appropriately
            className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-olive transition-colors w-full text-left hover:text-white"
        >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
