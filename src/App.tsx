
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/Home";

import Login from "./components/sections/Login";
import Register from "./components/sections/Register";
import EmailVerification from "./components/sections/EmailVerification";
import EmailSuccess from "./components/sections/EmailSuccess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
             
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<EmailVerification />}/>
        <Route path="/success" element={<EmailSuccess />}
        />
      </Routes>
    </>
  );
}

export default App;






// import "./index.css";
// import "./App.css";
// import Navbar from "./components/layout/Navbar";
// import LandingPage from "./components/sections/LandingPage";
// import About from "./components/sections/About";
// import Features from "./components/sections/Features";
// import PLibrary from "./components/sections/PLibrary";
// import HowPPWorks from "./components/sections/HowPPWorks"; 
// import WhyPromptpal from "./components/sections/WhyPromptpal";
// import WhoUses from "./components/sections/WhoUses";
// import Users from "./components/sections/Users";
// import PricingPlan from "./components/sections/PricingPlan";
// import Footer from "./components/sections/Footer";

// function App() {
//   return (
//     <>
//       <Navbar/>
//       <LandingPage/>
//       <About/>
//       <Features/>
//       <PLibrary/>
//       <HowPPWorks/>
//       <WhyPromptpal/>
//       <WhoUses/>
//       <Users/>
//       <PricingPlan/>
//       <Footer/>
//     </>
//   );
// }

// export default App;
