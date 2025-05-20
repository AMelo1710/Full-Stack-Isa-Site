
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <div className="min-h-screen bg-beige-light font-sans">
      <Helmet>
        <title>Artesanato em Gesso | Decoração Artesanal e Peças Exclusivas</title>
        <meta name="description" content="Descubra peças únicas de artesanato em gesso, esculturas feitas à mão e decoração exclusiva. Conheça nossa coleção de produtos artesanais de alta qualidade." />
        <meta name="keywords" content="artesanato, gesso, decoração, escultura, feito à mão, peças exclusivas, design de interiores" />
        <meta property="og:title" content="Artesanato em Gesso | Decoração Artesanal e Peças Exclusivas" />
        <meta property="og:description" content="Descubra peças únicas de artesanato em gesso, esculturas feitas à mão e decoração exclusiva." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <Navbar />
      {/* Main content starts after navbar's height */}
      <div className="pt-20">
        <div className="animate-fade-in">
          <Hero />
        </div>
        
        <div className="animate-slide-in" style={{animationDelay: '0.2s'}}>
          <FeaturedProducts />
        </div>
        
        <div id="categorias" className="animate-slide-in scroll-mt-20" style={{animationDelay: '0.4s'}}>
          <Categories />
        </div>
        
        <div className="animate-slide-in" style={{animationDelay: '0.6s'}}>
          <About />
        </div>
        
        <div className="animate-slide-in" style={{animationDelay: '0.8s'}}>
          <Testimonials />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
