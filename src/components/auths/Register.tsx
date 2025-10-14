import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import loginBanner from "../../assets/images/login-banner.png";
import { useAuth } from '../../hooks/useAuth';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    
    try {
      const success = await register(formData);
      
      if (success) {
        toast.success("Success")
        navigate("/verify")
      } else {
        toast.success("Registration failed. Please retry again")
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row min-h-screen bg-white ">
        {/* Image Section - Better sizing for desktop */}
        <div className=" lg:w-3/5 w-full bg-white hidden lg:flex items-center justify-center overflow-hidden pw-10">
            <img
              src={loginBanner}
              alt="AI Prompt Library Illustration"
              className="w-full h-full pr-15 object-cover min-h-[300px] rounded-2xl md:min-h-screen "
            />
        </div>

        {/* Form Section - Better proportions */}
        <div className="lg:w-3/5 xl:w-3/5 w-full flex items-center justify-center py-15 px-4 sm:px-6 lg:px-12 xl:px-20">
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              className: 'text-sm',
            }}
          />
          
          <div className="w-full max-w-sm lg:max-w-md mx-auto">
          <div className="mt-6 text-end mb-5">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-[#270450]/90 hover:text-[#270450] font-semibold underline hover:no-underline transition"
                  >
                    Sign in
                  </Link>
                </p>
          </div>
            <div className="bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none shadow-sm lg:shadow-none border border-gray-100 lg:border-none">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                Create An Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#270450]/50 focus:border-transparent transition text-sm"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="User Name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#270450]/50 focus:border-transparent transition text-sm"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#270450]/50 focus:border-transparent transition text-sm"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#270450]/50 focus:border-transparent transition text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#270450]/50 focus:border-transparent transition text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a href="/terms" className="text-[#270450]/90 underline hover:text-[#270450]">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#270450]/90 underline hover:text-[#270450]">
                    Privacy
                  </a>
                  .
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    loading
                      ? "bg-[#270450]/30 cursor-not-allowed text-gray-500"
                      : "bg-[#270450]/90 hover:bg-[#270450] text-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="flex items-center my-4">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="mx-3 text-gray-500 text-xs">Or</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                >
                  <FcGoogle className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;