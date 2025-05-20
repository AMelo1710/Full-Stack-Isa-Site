
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-beige-light">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-beige relative py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-olive-dark mb-6">
                Nossa História
              </h1>
              <p className="text-gray-700 mb-4 text-lg">
                Conheça a trajetória e a paixão por trás da Isabelle Yanxauskas Arte em Gesso
              </p>
            </div>
          </div>
        </div>

        {/* Founder Story */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-serif font-semibold text-olive-dark mb-6">
                  A Artesã por trás das Criações
                </h2>
                <p className="text-gray-700 mb-4">
                  A Isabelle Yanxauskas Arte em Gesso nasceu em 2015, de uma paixão por formas, texturas e a beleza atemporal do gesso como matéria-prima. Após anos trabalhando com design de interiores, Isabelle decidiu dedicar-se à criação de peças exclusivas que pudessem transformar ambientes com personalidade e elegância.
                </p>
                <p className="text-gray-700 mb-4">
                  Formada em Artes Plásticas e com especialização em Escultura, Isabelle une conhecimento técnico e sensibilidade artística para criar peças que são verdadeiras obras de arte funcional, com acabamento impecável e designs que transitam entre o clássico e o contemporâneo.
                </p>
                <p className="text-gray-700 mb-6">
                  Cada peça é criada manualmente em seu ateliê em São Paulo, onde o processo artesanal é valorizado em cada etapa - desde o esboço inicial até o acabamento final.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-olive rounded-lg"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Isabelle trabalhando em seu ateliê" 
                    className="w-full h-auto rounded-lg shadow-lg relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-beige">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-semibold text-olive-dark mb-6">
                Nossa Filosofia
              </h2>
              <p className="text-gray-700 mb-8">
                Acreditamos que cada peça deve contar uma história e despertar emoções. Nossa filosofia é baseada em três pilares fundamentais:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="bg-terracotta-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-serif text-white">1</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-olive-dark mb-4">Artesanal</h3>
                  <p className="text-gray-600">
                    Valorizamos o trabalho manual e a dedicação em cada detalhe, preservando técnicas tradicionais e a autenticidade do processo artesanal.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="bg-terracotta-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-serif text-white">2</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-olive-dark mb-4">Exclusividade</h3>
                  <p className="text-gray-600">
                    Criamos peças únicas ou de séries limitadas, garantindo que cada cliente tenha algo verdadeiramente especial e personalizado.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="bg-terracotta-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-serif text-white">3</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-olive-dark mb-4">Sustentabilidade</h3>
                  <p className="text-gray-600">
                    Utilizamos materiais de qualidade e processos que minimizam o impacto ambiental, buscando sempre alternativas mais sustentáveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-semibold text-olive-dark mb-10 text-center">
              Nosso Processo Criativo
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-24 h-24 rounded-full bg-beige flex items-center justify-center">
                    <span className="text-2xl font-serif text-olive-dark">01</span>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3">
                    <div className="w-6 h-6 rounded-full bg-terracotta"></div>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium text-olive-dark mb-3">Idealização</h3>
                <p className="text-gray-600">
                  Cada peça começa com um conceito, inspirado em formas naturais, arquitetura ou tendências contemporâneas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-24 h-24 rounded-full bg-beige flex items-center justify-center">
                    <span className="text-2xl font-serif text-olive-dark">02</span>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3">
                    <div className="w-6 h-6 rounded-full bg-terracotta"></div>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium text-olive-dark mb-3">Modelagem</h3>
                <p className="text-gray-600">
                  O desenho é transformado em forma tridimensional através de técnicas escultóricas e moldes precisos.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-24 h-24 rounded-full bg-beige flex items-center justify-center">
                    <span className="text-2xl font-serif text-olive-dark">03</span>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3">
                    <div className="w-6 h-6 rounded-full bg-terracotta"></div>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium text-olive-dark mb-3">Produção</h3>
                <p className="text-gray-600">
                  O gesso é preparado e vertido nos moldes, iniciando o processo de solidificação e criação da peça.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-24 h-24 rounded-full bg-beige flex items-center justify-center">
                    <span className="text-2xl font-serif text-olive-dark">04</span>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3">
                    <div className="w-6 h-6 rounded-full bg-terracotta"></div>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium text-olive-dark mb-3">Acabamento</h3>
                <p className="text-gray-600">
                  Após a secagem, cada peça recebe lixamento, pintura ou outros acabamentos para atingir o resultado desejado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-olive bg-opacity-10">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-semibold text-olive-dark mb-6">
                Conheça Nossas Criações
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                Descubra nossa coleção de peças artesanais em gesso e transforme seus espaços com arte e personalidade
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn btn-primary">
                  <Link to="/produtos">Ver Catálogo</Link>
                </Button>
                <Button asChild variant="outline" className="btn btn-outline">
                  <Link to="/contato">Entre em Contato</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
