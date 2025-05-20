
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um app real, enviaria para uma API
    console.log("Formulário enviado:", formData);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-beige-light">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-beige py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-olive-dark mb-6">
                Entre em Contato
              </h1>
              <p className="text-gray-700 text-lg">
                Estamos aqui para responder suas dúvidas e ouvir suas ideias
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-serif font-semibold text-olive-dark mb-6">
                  Envie uma Mensagem
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                      placeholder="Digite sua mensagem aqui..."
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full btn btn-primary flex items-center justify-center">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-serif font-semibold text-olive-dark mb-6">
                  Informações de Contato
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-beige p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-olive-dark">Nosso Ateliê</h3>
                      <p className="text-gray-600 mt-1">
                        Rua das Artes, 123<br />
                        Vila Criativa<br />
                        São Paulo - SP<br />
                        CEP: 01234-567
                      </p>
                      <p className="text-gray-500 mt-2 text-sm">
                        Horário de funcionamento: Segunda a Sexta, 10h às 18h
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-beige p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-olive-dark">Telefone</h3>
                      <p className="text-gray-600 mt-1">
                        +55 (11) 99999-9999
                      </p>
                      <p className="text-gray-500 mt-2 text-sm">
                        Atendimento: Segunda a Sexta, 9h às 18h
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-beige p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-olive-dark">Email</h3>
                      <p className="text-gray-600 mt-1">
                        contato@isabelleart.com
                      </p>
                      <p className="text-gray-500 mt-2 text-sm">
                        Respondemos em até 24 horas úteis
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-12">
                  <h3 className="font-medium text-lg text-olive-dark mb-4">Redes Sociais</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-beige hover:bg-beige-dark p-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a 
                      href="https://www.facebook.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-beige hover:bg-beige-dark p-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://www.pinterest.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-beige hover:bg-beige-dark p-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
                        <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                        <path d="M9 15l-1 6"></path>
                        <path d="M16 15l1 6"></path>
                        <path d="M17 6h-13a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h13"></path>
                        <path d="M5 10h16a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-8"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="pb-16">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-md p-4 h-80">
              {/* Em uma aplicação real, aqui seria um mapa interativo */}
              <div className="w-full h-full flex items-center justify-center bg-beige rounded-lg">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-terracotta mx-auto mb-2" />
                  <p className="text-gray-700">Mapa seria exibido aqui em uma aplicação real</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
