
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Filter, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import ProductForm from "@/components/ProductForm";
import CategoryForm from "@/components/CategoryForm";

// Category colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  "Nichos": { bg: "bg-blue-100", text: "text-blue-700" },
  "Placas 3D": { bg: "bg-purple-100", text: "text-purple-700" },
  "Molduras": { bg: "bg-green-100", text: "text-green-700" },
  "Luminárias": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Decorações": { bg: "bg-pink-100", text: "text-pink-700" },
};

interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string | null;
  stock_quantity: number;
  description: string | null;
  images: string[];
  technical_details: Record<string, string>;
  category?: {
    name: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(name)`)
      .order('name');

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos",
        variant: "destructive",
      });
      console.error(error);
    } else {
      const formattedProducts = data.map(product => ({
        ...product,
        images: Array.isArray(product.images) ? product.images : [],
        technical_details: product.technical_details || {}
      })) as Product[];
      setProducts(formattedProducts);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error(error);
    } else {
      setCategories(data);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productToDelete);

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o produto",
        variant: "destructive",
      });
      console.error(error);
    } else {
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso",
      });
      fetchProducts();
    }
    setProductToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const openDeleteConfirmation = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const openEditForm = (product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const openNewProductForm = () => {
    setCurrentProduct(null);
    setIsFormOpen(true);
  };

  const handleFormClose = (shouldRefresh: boolean = false) => {
    setIsFormOpen(false);
    if (shouldRefresh) {
      fetchProducts();
    }
  };

  const handleCategoryFormClose = (shouldRefresh: boolean = false) => {
    setIsCategoryFormOpen(false);
    if (shouldRefresh) {
      fetchCategories();
    }
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || (product.category?.name === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Header 
          title="Produtos" 
          subtitle="Gerenciar seu catálogo de produtos" 
        />
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-96"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
                  <Filter className="h-4 w-4" />
                  <span>Categorias</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                  Todas
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} onClick={() => setSelectedCategory(category.name)}>
                    {category.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem 
                  className="border-t mt-1 pt-1 text-primary"
                  onClick={() => setIsCategoryFormOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="flex gap-2 w-full sm:w-auto" onClick={openNewProductForm}>
              <Plus className="h-4 w-4" />
              <span>Novo Produto</span>
            </Button>
          </div>
        </div>
        
        {/* Products grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="dashboard-card hover:shadow-md transition-shadow">
                <div className="relative aspect-square mb-4 bg-muted rounded-md overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground">Sem imagem</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex gap-2" onClick={() => openEditForm(product)}>
                          <Edit className="h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 text-destructive" onClick={() => openDeleteConfirmation(product.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="font-semibold mb-2">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                
                <div className="flex justify-between items-center">
                  {product.category && (
                    <Badge className={cn(
                      categoryColors[product.category.name]?.bg || "bg-gray-100",
                      categoryColors[product.category.name]?.text || "text-gray-700"
                    )}>
                      {product.category.name}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Estoque: {product.stock_quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir Produto</DialogTitle>
            </DialogHeader>
            <p className="py-4">Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteProduct}>Excluir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Product Form Dialog */}
        <ProductForm 
          isOpen={isFormOpen}
          onClose={handleFormClose}
          product={currentProduct}
          categories={categories}
        />

        {/* Category Form Dialog */}
        <CategoryForm
          isOpen={isCategoryFormOpen}
          onClose={handleCategoryFormClose}
        />
      </div>
    </div>
  );
};

export default Products;
