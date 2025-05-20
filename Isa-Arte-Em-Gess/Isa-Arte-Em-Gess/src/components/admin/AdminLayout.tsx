
import React from 'react';
import AdminSidebar from './AdminSidebar';
// import AdminHeader from './AdminHeader'; // We can add a header later

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* <AdminHeader /> We can add this later */}
        <main className="flex-1 p-6">
          {children}
        </main>
        <footer className="bg-white shadow p-4 text-center text-sm text-gray-600">
          Painel Administrativo &copy; {new Date().getFullYear()} Sua Loja de Artesanato em Gesso
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
