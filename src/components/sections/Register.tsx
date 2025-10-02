import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.promptpal.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username || formData.name.replace(/\s+/g, ""),
          email: formData.email,
          password: formData.password,
          profession: "Other",
          level: "Newbie",
          subscription: "basic",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }

      toast.success("Account created! Please verify your email.");
      setTimeout(() => navigate("/verify-email"), 2000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="flex flex-col md:flex-row min-h-screen">
       
        <div className="md:w-2/5 w-full bg-[#270450]/90 flex items-center justify-center">
          image
        </div>

        
        <div className="md:w-3/5 w-full mt-15 flex flex-col items-center justify-center">
          <Toaster position="top-right" />
          <form onSubmit={handleSubmit} className="">
            <h2 className="text-2xl font-bold mb-6">Create an Account</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mb-4"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mb-4"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              By creating an account, you agree to the{" "}
              <a href="/terms" className="text-[#270450]/90 underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#270450]/90 underline">
                Privacy Policy
              </a>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-[#270450]/30 cursor-not-allowed"
                  : "bg-[#270450]/90 hover:bg-[#270450]/80 text-white"
              }`}
            >
              {loading ? "Creating Account..." : "Create an Account"}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-3 text-gray-500">Or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <FcGoogle className="w-6 h-6" />
              <span>Continue with Google</span>
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
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

export default Register;
