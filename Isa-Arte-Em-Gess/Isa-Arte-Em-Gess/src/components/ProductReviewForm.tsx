
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductReviewFormProps {
  productId: string;
  onReviewSubmit: (review: ProductReview) => void;
}

export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const reviewSchema = z.object({
  comment: z.string().min(3, { message: "O comentário deve ter pelo menos 3 caracteres" }).max(500, { message: "O comentário deve ter no máximo 500 caracteres" }),
  rating: z.number().min(1, { message: "Selecione pelo menos 1 estrela" }).max(5)
});

const ProductReviewForm = ({ productId, onReviewSubmit }: ProductReviewFormProps) => {
  const { user, requireAuth } = useAuth();
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });
  
  const handleSubmit = (values: z.infer<typeof reviewSchema>) => {
    if (!requireAuth()) return;
    
    const newReview: ProductReview = {
      id: `r${Date.now()}`,
      user: user?.name || "Usuário",
      rating: values.rating,
      comment: values.comment,
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    onReviewSubmit(newReview);
    form.reset();
    toast.success("Sua avaliação foi enviada com sucesso!");
  };

  const handleStarClick = (rating: number) => {
    form.setValue("rating", rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };
  
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-serif font-medium text-olive-dark mb-4">Deixe sua avaliação</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Avaliação</FormLabel>
                <FormControl>
                  <div 
                    className="flex items-center gap-1 mb-2"
                    onMouseLeave={handleStarLeave}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer ${
                          (hoveredRating || field.value) >= star
                            ? "fill-terracotta text-terracotta"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        aria-label={`Avalie com ${star} estrelas`}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Comentário</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Compartilhe sua experiência com este produto..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="bg-terracotta hover:bg-terracotta-dark text-white"
          >
            Enviar Avaliação
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductReviewForm;
