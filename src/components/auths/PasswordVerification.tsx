import React from "react";
import { Link } from "react-router-dom";
import passwordBanner from "../../assets/images/password.png"


function PasswordVerification() {
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
          <p className="text-gray-800 mb-6">
            Check your inbox we have sent a password reset link to [email]
          </p>

          <Link
            to="/"
            className="px-6 py-3 bg-[#270450]
           text-[#ffff]  font-semibold rounded-lg shadow hover:bg-[#270450]/90"
          >
            Open Email
          </Link>

          <p className="text-gray-800 mt-6">
            Didn't receive the email{" "}
            <Link to="/" className="text-[#270450] font-semibold underline">
              resend
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PasswordVerification;
