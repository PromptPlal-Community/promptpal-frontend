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
  return (
    <>
      <Navbar/>
      <LandingPage />
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
