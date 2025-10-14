import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import passwordBanner from "../../assets/images/password.png"

function PasswordUpdate() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false)
      return;
    }
    
  }

  return (
    <>
      <section className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <div className="hidden md:flex md:w-2/5 bg-white items-center justify-center p-0 overflow-hidden">
        <img
          src={passwordBanner}
          alt="AI Prompt Library Illustration"
          className="w-full h-full object-cover min-h-screen"
        />
      </div>

        <div className="md:w-3/5 w-full mt-15 flex flex-col items-center justify-center">
          <Toaster position="top-right" />

          <form onSubmit={handleSubmit} className="rounded-lg  w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Reset Password
            </h2>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-[#270450]/30 cursor-not-allowed"
                  : "bg-[#270450]/90 hover:bg-[#270450]/80 text-white"
              }`}
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default PasswordUpdate;
