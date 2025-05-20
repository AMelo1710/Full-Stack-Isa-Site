
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-olive-dark mb-6">
              Sobre a Loja
            </h2>
            <p className="text-gray-700 mb-4">
              A Isabelle Yanxauskas Arte em Gesso nasceu da paixão por criar peças que unem beleza, funcionalidade e expressão artística. Cada criação é pensada e executada com dedicação, valorizando a essência do trabalho manual e a exclusividade que só o artesanato proporciona.
            </p>
            <p className="text-gray-700 mb-6">
              Nossa inspiração vem de formas orgânicas, linhas contemporâneas e texturas que dialogam com diversos estilos de decoração. Buscamos criar peças que não apenas decoram, mas contam histórias e despertam sentimentos.
            </p>
            <Button asChild className="btn btn-outline">
              <Link to="/sobre">Conheça Nossa História</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-olive rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1544967919-44c1ef2f9e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Artista trabalhando em peça de gesso" 
                className="w-full h-auto rounded-lg shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
