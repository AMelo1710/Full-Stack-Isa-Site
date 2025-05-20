
import { Helmet } from "react-helmet";
import PasswordRecoveryForm from "@/components/auth/PasswordRecoveryForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpForm from "@/components/HelpForm";

const PasswordRecovery = () => {
  return (
    <>
      <Helmet>
        <title>Recuperar Senha - Isabelle Yanxauskas</title>
      </Helmet>
      <Navbar />
      <div className="container max-w-md mx-auto py-20 px-4">
        <PasswordRecoveryForm />
        <div className="mt-6 text-center">
          <HelpForm buttonText="Precisa de ajuda?" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordRecovery;
