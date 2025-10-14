import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import authService from "../../services/authService";
import loginBanner from "../../assets/images/login-banner.png"


function EmailVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from navigation state or use a default
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  // Handle countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && e.currentTarget.previousSibling) {
        // Move to previous input if current is empty
        (e.currentTarget.previousSibling as HTMLInputElement).focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!isNaN(Number(pastedData))) {
      const newOtp = pastedData.split('').slice(0, 6);
      const updatedOtp = [...otp];
      newOtp.forEach((char, index) => {
        updatedOtp[index] = char;
      });
      setOtp(updatedOtp);
      
      // Focus the last filled input
      const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
      const focusIndex = Math.min(newOtp.length, 5);
      if (inputs[focusIndex]) {
        inputs[focusIndex].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      alert("Email not found. Please try logging in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp(email, otpString);
      
      if (response.success) {
        // OTP verification successful
        const successMessage = location.state?.fromLogin 
          ? "Email verified successfully! You can now login." 
          : "Email verified successfully! Your account has been activated.";
        
        toast.success(successMessage);
        navigate("/success");
        // Redirect based on where they came from
        if (location.state?.fromLogin) {
          navigate('/success');
        } else {
          navigate('/success');
        }
      } else {
        alert(response.message || "OTP verification failed. Please try again.");
        // Clear OTP on failure
        setOtp(["", "", "", "", "", ""]);
        // Focus first input
        const firstInput = document.querySelector<HTMLInputElement>('.otp-input');
        if (firstInput) firstInput.focus();
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || !email) return;

    setResendLoading(true);
    try {
      const response = await authService.requestOtp(email);
      
      if (response.success) {
        alert("OTP has been resent to your email.");
        setCountdown(60); // 60 seconds countdown
        // Clear existing OTP
        setOtp(["", "", "", "", "", ""]);
        // Focus first input
        const firstInput = document.querySelector<HTMLInputElement>('.otp-input');
        if (firstInput) firstInput.focus();
      } else {
        alert(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert("An error occurred while resending OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const isOtpComplete = otp.join('').length === 6;

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <Toaster position="top-right" />
      
      {/* Image Section */}
      <div className="hidden md:flex md:w-2/5 bg-white items-center justify-center p-0 overflow-hidden">
        <img
          src={loginBanner}
          alt="AI Prompt Library Illustration"
          className="w-full h-full object-cover min-h-screen"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-3/5 w-full flex flex-col items-center justify-center py-8 px-4">
        <div className="p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-[#270450] mb-4">
            Verify Your Email
          </h2>
          
          <p className="text-gray-600 mb-2">
            Enter the 6-digit code sent to your email address to verify your account.
          </p>
          <p className="text-gray-800 font-semibold mb-6">
            {email || "your email"}
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                className="otp-input w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-semibold focus:border-[#270450] focus:outline-none transition-colors"
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                onFocus={(e) => e.target.select()}
                disabled={loading}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyOtp}
            disabled={!isOtpComplete || loading}
            className={`w-full py-3 rounded-lg font-semibold transition mb-6 ${
              !isOtpComplete || loading
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-[#270450] hover:bg-[#270450]/80 text-white'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          {/* Resend OTP Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Didn't receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-500">
                  Resend in {countdown}s
                </span>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  className="text-[#270450] font-semibold underline hover:text-[#270450]/80 transition-colors disabled:text-gray-400"
                >
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </p>

            {/* Back to Login Link */}
            <Link 
              to="/login" 
              className="text-[#270450] font-semibold hover:text-[#270450]/80 transition-colors inline-block mt-4"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailVerification;