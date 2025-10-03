import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.promptpal.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login success:", data);

      // Save token (or session info)
      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 2000); // redirect to dashboard
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-2/5 w-full bg-[#270450]/90 flex items-center justify-center">
        image
      </div>

      <div className="md:w-3/5 w-full mt-15 flex flex-col items-center justify-center">
        <Toaster position="top-right" />
        <form
          onSubmit={handleSubmit}
          className=" rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-[#270450] mb-6">
            Login
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg mb-4"
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 text-[#270450] rounded"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-[#270450] underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-[#270450] hover:bg-[#270450]/80 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
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

        <div className=" text-center">
          <p className="text-gray-600">
            Are you new here?
            <Link to="/register" className="text-[#270450]/90 hover:underline">
              create account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
