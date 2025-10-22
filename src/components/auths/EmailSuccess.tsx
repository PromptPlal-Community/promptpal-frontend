import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import loginBanner from "../../assets/images/login-banner.png"

function EmailSuccess() {
  return (
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
        <div className="p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-[#270450] mb-4">
            Email Verified Successfully
          </h2>
          <p className="text-gray-800 mb-6">
            Welcome to Promptpal! Let’s get your first prompt setup.
          </p>

          <p className="text-gray-800 mt-10 flex flex-col items-center justify-center mb-6">
            <CheckCircle size={68} color="green" />;
          </p>

          <Link
            to="/login"
            className="px-6 py-3 bg-[#270450]
           text-[#ffff]  font-semibold rounded-lg shadow hover:bg-[#270450]/90"
          >
            continue to login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EmailSuccess;
