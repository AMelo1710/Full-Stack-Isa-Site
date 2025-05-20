
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: "Vaso Orgânico Ondulado",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Vasos",
    alt: "Vaso orgânico com forma ondulada em gesso branco"
  },
  {
    id: "2",
    name: "Escultura Abstrata Moderna",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1619218005459-c8be9d22c0ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Esculturas",
    alt: "Escultura moderna abstrata em gesso com formas geométricas"
  },
  {
    id: "3",
    name: "Moldura Decorativa Clássica",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Molduras",
    alt: "Moldura decorativa clássica com detalhes em alto relevo"
  },
  {
    id: "4",
    name: "Peça Decorativa Geométrica",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1602816255751-4a36bf7d9478?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Decoração",
    alt: "Peça decorativa com formas geométricas em gesso branco"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <span className="inline-block px-4 py-2 bg-olive/10 text-olive rounded-full text-sm font-medium mb-4">
              Destaques da Semana
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-olive-dark">
              Peças em Destaque
            </h2>
            <p className="text-gray-600 mt-2">
              Conheça nossas criações mais populares e exclusivas
            </p>
          </div>
          <Link 
            to="/produtos" 
            className="mt-4 md:mt-0 flex items-center text-terracotta hover:text-terracotta-dark transition-colors group"
          >
            Ver todos os produtos
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              alt={product.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
