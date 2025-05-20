
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-beige-dark min-h-[85vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578500351865-0a6aea3d9b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
      />
      <div className="container-custom relative z-10">
        <div className="max-w-xl animate-fade-in">
          <span className="inline-block px-4 py-2 bg-terracotta/20 text-terracotta rounded-full text-sm font-medium mb-6">
            Artesanato em Gesso de Alta Qualidade
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-olive-dark mb-6">
            Arte em Gesso com Alma e Estilo
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800 max-w-lg">
            Peças exclusivas criadas artesanalmente para dar vida e personalidade aos seus espaços.
            Qualidade garantida em cada detalhe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-6 h-auto rounded-md">
              <Link to="/produtos" className="flex items-center text-lg">
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-olive border-2 text-olive hover:bg-olive/10 hover:text-olive-dark px-6 py-6 h-auto rounded-md">
              <Link to="/sobre" className="text-lg">Nossa História</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-olive-light flex items-center justify-center text-olive text-xs font-bold">99%</div>
              <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta text-xs font-bold">4.9</div>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Mais de 500 clientes satisfeitos</span><br />
              Avaliação média de 4.9/5
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <a href="#categorias" className="bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-olive">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
