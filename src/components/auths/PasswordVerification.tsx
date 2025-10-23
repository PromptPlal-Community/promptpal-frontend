import { Link, useLocation } from "react-router-dom";
import passwordBanner from "../../assets/images/password.png"
import { useEffect, useState } from "react";


function PasswordVerification() {
    const [email, setEmail] = useState<string>("");
  
  const location = useLocation();

  // Get email from navigation state or use a default
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  return (
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
        <div className="p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-[#270450] mb-4">
            Email Confirmation
          </h2>
          <p className="text-gray-800 mb-6 font-medium">
            Check your inbox <br /> we have sent a password reset link to:
          </p>
          <p className="text-white mb-6 bg-[#270450] px-4 py-2 rounded-lg inline-block">
            {email || "Your email address"}
          </p>
          <p className="text-gray-800 mt-6">
            Didn't receive the email{" "}
            <Link to="/forgotpassword" className="text-[#270450] font-semibold underline">
              resend
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PasswordVerification;
