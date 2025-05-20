
import { Helmet } from "react-helmet";
import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpForm from "@/components/HelpForm";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Criar Conta - Isabelle Yanxauskas</title>
      </Helmet>
      <Navbar />
      <div className="container max-w-md mx-auto py-20 px-4">
        <RegisterForm />
        <div className="mt-6 text-center">
          <HelpForm buttonText="Precisa de ajuda?" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
