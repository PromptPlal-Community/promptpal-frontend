import { useState } from "react";
import LandingPage from "../ui/LandingPage";
import About from "../ui/About";
import Features from "../ui/Features";
import PLibrary from "../ui/PLibrary";
import HowPPWorks from "../ui/HowPPWorks";
import WhyPromptpal from "../ui/WhyPromptpal";
import WhoUses from "../ui/WhoUses";
import Users from "../ui/Users";
import PricingPlan from "../ui/PricingPlan";
import Footer from "../ui/Footer";
import Navbar from "./Navbar";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuToggle={setMenuOpen} />
      <main
        className={`transition-all duration-300 ${
          menuOpen ? "mt-55" : "mt-0"
        }`}
      >
        <LandingPage />
      </main>

      <About />
      <Features />
      <PLibrary />
      <HowPPWorks />
      <WhyPromptpal />
      <WhoUses />
      <Users />
      <PricingPlan />
      <Footer />
    </>
  );
}

export default Home;
