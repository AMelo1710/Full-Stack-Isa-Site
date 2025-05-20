
import { Helmet } from "react-helmet";
import LoginForm from "@/components/auth/LoginForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpForm from "@/components/HelpForm";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - Isabelle Yanxauskas</title>
      </Helmet>
      <Navbar />
      <div className="container max-w-md mx-auto py-20 px-4">
        <LoginForm />
        <div className="mt-6 text-center">
          <HelpForm buttonText="Precisa de ajuda?" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
