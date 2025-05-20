import { Link } from "react-router-dom";

const categories = [
  {
    id: "esculturas",
    name: "Esculturas",
    image: "https://images.unsplash.com/photo-1607976973585-a6c292b480b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Peças únicas que adicionam personalidade a qualquer ambiente"
  },
  {
    id: "vasos",
    name: "Vasos",
    image: "https://images.unsplash.com/photo-1617005082133-5c66a0888395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Formatos orgânicos e elegantes para suas plantas"
  },
  {
    id: "molduras",
    name: "Molduras",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Detalhes sofisticados que elevam suas memórias favoritas"
  },
  {
    id: "decoracao",
    name: "Decoração",
    image: "https://images.unsplash.com/photo-1616046386594-c152babc9e15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Acessórios delicados para complementar seu décor"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-beige">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-terracotta/20 text-terracotta rounded-full text-sm font-medium mb-4">
            Explore Nossas Coleções
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-olive-dark">
            Nossas Categorias
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore nossa coleção de arte em gesso artesanal, criada com dedicação e atenção aos detalhes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={`/produtos?categoria=${category.id}`} key={category.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-serif text-xl font-medium text-olive-dark mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
import { Link } from "react-router-dom";

const categories = [
  {
    id: "esculturas",
    name: "Esculturas",
    image: "https://images.unsplash.com/photo-1607976973585-a6c292b480b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Peças únicas que adicionam personalidade a qualquer ambiente"
  },
  {
    id: "vasos",
    name: "Vasos",
    image: "https://images.unsplash.com/photo-1617005082133-5c66a0888395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Formatos orgânicos e elegantes para suas plantas"
  },
  {
    id: "molduras",
    name: "Molduras",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Detalhes sofisticados que elevam suas memórias favoritas"
  },
  {
    id: "decoracao",
    name: "Decoração",
    image: "https://images.unsplash.com/photo-1616046386594-c152babc9e15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Acessórios delicados para complementar seu décor"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-beige">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-terracotta/20 text-terracotta rounded-full text-sm font-medium mb-4">
            Explore Nossas Coleções
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-olive-dark">
            Nossas Categorias
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore nossa coleção de arte em gesso artesanal, criada com dedicação e atenção aos detalhes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/produtos?categoria=${category.id}`} key={category.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-serif text-xl font-medium text-olive-dark mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
