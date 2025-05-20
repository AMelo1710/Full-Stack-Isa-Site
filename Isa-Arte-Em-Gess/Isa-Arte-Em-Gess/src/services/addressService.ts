
import { toast } from "sonner";

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

// Modified interface with the mapped property names we use in the app
interface FormattedAddressResponse {
  cep: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export const fetchAddressByCep = async (cep: string): Promise<Partial<FormattedAddressResponse> | null> => {
  try {
    const cleanedCep = cep.replace(/\D/g, '');
    
    if (cleanedCep.length !== 8) {
      return null;
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    const data = await response.json() as CepResponse;
    
    if (data.erro) {
      toast.error("CEP não encontrado");
      return null;
    }
    
    return {
      cep: data.cep,
      street: data.logradouro,
      complement: data.complemento,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch (error) {
    toast.error("Erro ao buscar endereço");
    console.error("Erro ao buscar endereço:", error);
    return null;
  }
};

export const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 11) {
    let formatted = cleaned;
    
    if (cleaned.length > 2) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    
    return formatted;
  }
  
  return value.slice(0, 15);
};

export const formatCep = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 8) {
    let formatted = cleaned;
    
    if (cleaned.length > 5) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    
    return formatted;
  }
  
  return value.slice(0, 9);
};
