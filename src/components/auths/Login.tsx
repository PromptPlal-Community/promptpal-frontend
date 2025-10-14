import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../hooks/useAuth';
import loginBanner from "../../assets/images/login-banner.png"

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);
  
  const { loading, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Determine if identifier is email or username
    const isEmail = identifier.includes('@') && identifier.includes('.');
    
    const credentials = isEmail 
      ? { email: identifier, password, remember }
      : { username: identifier, password, remember };
    
    const success = await login(credentials);
    
    if (!success) {
      console.log('Login failed - check credentials or network');
    }
  };

  const handleGoogleLogin = (): void => {
    console.log('Google login clicked');
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section - Hidden on mobile, visible on md and up */}
      <div className="hidden md:flex md:w-2/5 bg-white items-center justify-center p-0 overflow-hidden">
        <img
          src={loginBanner}
          alt="AI Prompt Library Illustration"
          className="w-full h-full object-cover min-h-screen"
        />
      </div>

      {/* Form Section - Full width on mobile, 3/5 on desktop */}
      <div className="w-full md:w-3/5 flex flex-col items-center justify-center py-6 md:py-8 px-4 md:px-8">
        <Toaster position="top-right" />
        
        {/* Mobile-friendly container with better spacing */}
        <div className="w-full max-w-sm md:max-w-md">
          <div className="text-end">
            <p className="text-gray-600 text-sm">
              Are you new here?{' '}
              <Link 
                to="/register" 
                className="text-[#270450]/90 hover:underline font-medium transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="rounded-lg p-6 md:p-8 w-full bg-white md:bg-transparent shadow-sm md:shadow-none border border-gray-100 md:border-none">
            <h2 className="text-2xl font-bold text-start text-[#270450] mb-6">
              Login
            </h2>

            <input
              type="text"
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#270450]/50 text-sm"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#270450]/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="w-4 h-4 text-[#270450] rounded focus:ring-[#270450]"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#270450] underline hover:text-[#270450]/70 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-sm transition ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed text-gray-500'
                  : 'bg-[#270450] hover:bg-[#270450]/80 text-white shadow-sm hover:shadow-md'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">Or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-gray-700">Continue with Google</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;