import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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

import DashboardRouter from "./pages/DashboardRouter";
import PromptDetailsPage from "./pages/prompts/[id]";

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/success" element={<EmailSuccess />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/passwordverify" element={<PasswordVerification />} />
        <Route path="/passwordupdate" element={<PasswordUpdate />} />
        <Route path="/passwordsuccess" element={<PasswordSuccess />} />

        {/* Other Pages */}
        <Route path="/ctrending" element={<CTrending />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardRouter />} />
        <Route path="/dashboard/prompts/:id" element={<PromptDetailsPage />} />

      </Routes>
    </>
  );
}

export default App;