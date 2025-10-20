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
  const { googleLogin, googleLoading, hasGoogleAccount, linkGoogleAccount } = useAuth();
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

  const handleGoogleLogin = async (): Promise<void> => {
    await googleLogin();
  };

  const handleLinkGoogle = async (): Promise<void> => {
    await linkGoogleAccount();
  };


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
              className={`w-full flex items-center justify-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                loading
                  ? "bg-white border-2 border-purple-600 cursor-not-allowed text-gray-500"
                  : "bg-[#270450] hover:bg-[#270450]/80 text-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="flex items-center my-4">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="mx-3 text-gray-500 text-xs">Or</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {!hasGoogleAccount ? (
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {googleLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                    ) : (
                      <>
                        <FcGoogle size={18} />
                        <span>Sign up with Google</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleLinkGoogle}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {googleLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                    ) : (
                      <>
                        <FcGoogle size={18} />
                        <span>Link Google Account</span>
                      </>
                    )}
                  </button>
                )}

                {/* Show link button if user is logged in but doesn't have Google linked */}
                {hasGoogleAccount() && (
                  <div className="p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700 mb-2">
                      Your Google account is linked
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;