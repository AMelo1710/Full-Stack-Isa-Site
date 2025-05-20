
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Produtos fictícios para a página
const products = [
  {
    id: "1",
    name: "Vaso Orgânico Ondulado",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Vasos"
  },
  {
    id: "2",
    name: "Escultura Abstrata Moderna",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1619218005459-c8be9d22c0ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Esculturas"
  },
  {
    id: "3",
    name: "Moldura Decorativa Clássica",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Molduras"
  },
  {
    id: "4",
    name: "Peça Decorativa Geométrica",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1602816255751-4a36bf7d9478?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Decoração"
  },
  {
    id: "5",
    name: "Vaso Texturizado Alto",
    price: 219.90,
    image: "https://images.unsplash.com/photo-1578500351865-0a6aea3d9b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Vasos"
  },
  {
    id: "6",
    name: "Escultura Linear Minimalista",
    price: 179.90,
    image: "https://images.unsplash.com/photo-1581093197308-937b964498cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Esculturas"
  },
  {
    id: "7",
    name: "Moldura Oval Vintage",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1582913130063-8318329ef@1x.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Molduras"
  },
  {
    id: "8",
    name: "Centro de Mesa Artesanal",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1581092446327-40b994d1ce93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Decoração"
  }
];

const categories = ["Todos", "Vasos", "Esculturas", "Molduras", "Decoração"];
const priceRanges = ["Todos", "Até R$150", "R$150 - R$200", "Acima de R$200"];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtragem dos produtos com base nas seleções
  const filteredProducts = products.filter((product) => {
    // Filtro por categoria
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    
    // Filtro por preço
    let matchesPrice = true;
    if (selectedPriceRange === "Até R$150") {
      matchesPrice = product.price <= 150;
    } else if (selectedPriceRange === "R$150 - R$200") {
      matchesPrice = product.price > 150 && product.price <= 200;
    } else if (selectedPriceRange === "Acima de R$200") {
      matchesPrice = product.price > 200;
    }
    
    // Filtro por termo de busca
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-beige-light">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-beige py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-olive-dark mb-6">
                Nossos Produtos
              </h1>
              <p className="text-gray-700 text-lg">
                Explore nossa coleção de peças artesanais em gesso
              </p>
            </div>
          </div>
        </div>

        {/* Products with Filters */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
                <h2 className="text-xl font-serif font-semibold text-olive-dark mb-6">Filtros</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nome ou categoria..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                  />
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-olive focus:ring-olive border-gray-300"
                        />
                        <label htmlFor={category} className="ml-2 text-sm text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Ranges */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-3">Faixa de Preço</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range} className="flex items-center">
                        <input
                          type="radio"
                          id={range}
                          name="priceRange"
                          checked={selectedPriceRange === range}
                          onChange={() => setSelectedPriceRange(range)}
                          className="w-4 h-4 text-olive focus:ring-olive border-gray-300"
                        />
                        <label htmlFor={range} className="ml-2 text-sm text-gray-700">
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory("Todos");
                    setSelectedPriceRange("Todos");
                    setSearchTerm("");
                  }}
                  className="text-terracotta hover:text-terracotta-dark text-sm font-medium"
                >
                  Limpar filtros
                </button>
              </div>
              
              {/* Products Grid */}
              <div className="lg:w-3/4">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-700">Nenhum produto encontrado com os filtros selecionados.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6">{filteredProducts.length} produto(s) encontrado(s)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          image={product.image}
                          category={product.category}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
