import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";

import Login from "./components/auths/Login";
import Register from "./components/auths/Register";
import EmailVerification from "./components/auths/EmailVerification";
import EmailSuccess from "./components/auths/EmailSuccess";
import ForgotPassword from "./components/auths/ForgotPassword";
import PasswordVerification from "./components/auths/PasswordVerification";
import PasswordUpdate from "./components/auths/PasswordUpdate";
import PasswordSuccess from "./components/auths/PasswordSuccess";
import CTrending from "./components/sections/CTrending";
import DbWorkspace from "./components/sections/DbWorkspace";

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

        <Route path="/verify" element={<EmailVerification />} />

        <Route path="/success" element={<EmailSuccess />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/passwordverify" element={<PasswordVerification />} />

        <Route path="/passwordupdate" element={<PasswordUpdate />} />

        <Route path="/passwordsuccess" element={<PasswordSuccess />} />

        <Route path="/ctrending" element={<CTrending />} />

        <Route path="/dashboard" element={<DbWorkspace />} />
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
import UpdatePassword from "./components/auths/PasswordUpdate";

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
