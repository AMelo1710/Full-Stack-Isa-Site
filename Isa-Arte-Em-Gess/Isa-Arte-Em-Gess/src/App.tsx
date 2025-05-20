
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordRecovery from "./pages/PasswordRecovery";
import Profile from "./pages/Profile";
import EmailConfirmation from "./pages/EmailConfirmation";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./pages/AdminDashboard"; // Import the new AdminDashboard page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/recuperar-senha" element={<PasswordRecovery />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/confirmar-email" element={<EmailConfirmation />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/admin" element={<AdminDashboard />} /> {/* Add admin route */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
