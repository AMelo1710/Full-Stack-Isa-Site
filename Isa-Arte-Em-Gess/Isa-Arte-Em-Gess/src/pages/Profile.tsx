
import { Helmet } from "react-helmet";
import UserProfile from "@/components/auth/UserProfile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Minha Conta - Isabelle Yanxauskas</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16">
        <UserProfile />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
