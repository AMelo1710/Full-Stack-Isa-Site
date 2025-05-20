
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: "1",
    name: "Marina Silva",
    location: "São Paulo, SP",
    comment: "As peças são simplesmente maravilhosas, cada detalhe transmite a dedicação da artista. Minha sala ganhou um toque especial com o vaso que comprei.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "2",
    name: "João Mendes",
    location: "Rio de Janeiro, RJ",
    comment: "Comprei uma escultura para presente e fiquei impressionado com a qualidade e o acabamento. O atendimento foi excelente e a entrega super cuidadosa.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "3",
    name: "Carla Rodrigues",
    location: "Belo Horizonte, MG",
    comment: "As molduras são elegantes e versáteis. Já comprei três peças e todas chegaram em perfeito estado. Com certeza voltarei a comprar.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setAnimating(false), 500);
  };

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setAnimating(false), 500);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="py-16 bg-beige-light">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-olive-dark">
            O Que Dizem Nossos Clientes
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Depoimentos de quem já transformou seus espaços com nossas criações
          </p>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id}>
                <div 
                  className={cn(
                    "bg-white rounded-lg shadow-md p-6 md:p-10 text-center transition-all duration-500 transform",
                    index === currentIndex ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  )}
                >
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        fill="#C66D45" 
                        stroke="#C66D45" 
                        className="h-5 w-5 animate-pulse" 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl italic text-gray-700 mb-8">
                    "{testimonial.comment}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-olive transition-transform hover:scale-105 duration-300"
                    />
                    <div className="text-left">
                      <p className="font-medium text-olive-dark">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-olive w-6" 
                    : "bg-gray-300 hover:bg-olive/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white rounded-full p-2 shadow-md hover:bg-beige transition-colors duration-300 hover:scale-110 transform"
            aria-label="Previous testimonial"
            disabled={animating}
          >
            <ArrowLeft className="h-5 w-5 text-olive" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white rounded-full p-2 shadow-md hover:bg-beige transition-colors duration-300 hover:scale-110 transform"
            aria-label="Next testimonial"
            disabled={animating}
          >
            <ArrowRight className="h-5 w-5 text-olive" />
          </button>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
