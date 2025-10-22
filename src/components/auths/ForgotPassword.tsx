import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import loginBanner from "../../assets/images/login-banner.png"
import { useAuth } from "../../hooks/useAuth";


function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { forgotPassword } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await forgotPassword(formData.email);    
  }

  return (
    <>
      <section className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <div className="hidden md:flex md:w-2/5 bg-white items-center justify-center p-0 overflow-hidden">
        <img
          src={loginBanner}
          alt="AI Prompt Library Illustration"
          className="loginImage"
        />
      </div>

        <div className="w-full md:w-3/5 flex flex-col items-center justify-center min-h-screen py-6 md:py-8 px-4 md:px-8">
          <Toaster position="top-right" />
          <form
            className=" rounded-lg  w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Reset Password
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mb-4"
            />

            <button
              className="w-full py-3 cursor-pointer rounded-lg font-semibold transition bg-[#270450]
           text-[#ffff] hover:bg-[#270450]/90 mt-5"
              type="submit"
              onClick={handleSubmit}
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 flex flex-col">
            <p className="text-gray-800">
              Back to{" "}
              <Link to="/login" className="text-[#270450]/90 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
