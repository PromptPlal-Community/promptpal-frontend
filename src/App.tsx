import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import { MessageProvider } from "./hooks/MessageProvider";
import GoogleAuthCallback from "./components/auths/GoogleAuthCallback";

function App() {
  return (
    <>
      <MessageProvider>
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
          <Route path="/reset-password" element={<PasswordUpdate />} />
          <Route path="/passwordsuccess" element={<PasswordSuccess />} />

          {/* Other Pages */}
          <Route path="/ctrending" element={<CTrending />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<DashboardRouter />} />
          <Route
            path="/dashboard/prompts/:id"
            element={<PromptDetailsPage />}
          />
          <Route
            path="/auth/google/callback"
            element={<GoogleAuthCallback />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MessageProvider>
    </>
  );
}

export default App;
