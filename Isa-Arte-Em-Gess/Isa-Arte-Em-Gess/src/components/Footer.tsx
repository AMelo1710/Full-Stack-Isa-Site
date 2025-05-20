
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-olive-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and about */}
          <div>
            <img
              src="/lovable-uploads/bb71f6aa-2adc-42b5-9985-a2a2dc6bd9a8.png"
              alt="Isabelle Yanxauskas Logo"
              className="h-14 mb-4 inline-block"
            />
            <p className="text-beige-light mt-4">
              Arte em gesso para transformar ambientes com exclusividade e beleza.
            </p>
            <div className="flex mt-6 space-x-4">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-beige hover:text-beige-light transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-beige hover:text-beige-light transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contato@isabelleart.com" 
                className="text-beige hover:text-beige-light transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-beige">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-beige-light hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-beige-light hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-beige-light hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-beige-light hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-beige">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos?categoria=esculturas" className="text-beige-light hover:text-white transition-colors">
                  Esculturas
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=vasos" className="text-beige-light hover:text-white transition-colors">
                  Vasos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=molduras" className="text-beige-light hover:text-white transition-colors">
                  Molduras
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=decoracao" className="text-beige-light hover:text-white transition-colors">
                  Decoração
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-beige">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-beige" />
                <span className="text-beige-light">
                  Rua das Artes, 123<br />
                  Vila Criativa<br />
                  São Paulo - SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-beige" />
                <span className="text-beige-light">(11) 99999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-beige" />
                <a href="mailto:contato@isabelleart.com" className="text-beige-light hover:text-white transition-colors">
                  contato@isabelleart.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-olive/30 text-center text-sm text-beige-light">
          <p>
            © {new Date().getFullYear()} Isabelle Yanxauskas Arte em Gesso. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
