import React from "react";
import { Link } from "react-router-dom";

function EmailVerification() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-2/5 w-full bg-[#270450]/90 flex items-center justify-center">
        image
      </div>

      <div className="md:w-3/5 w-full mt-15 flex flex-col items-center justify-center">
        <div className="p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-[#270450] mb-4">
            Verify Your Email
          </h2>
          <p className="text-gray-800 mb-6">
            Check your inbox we have sent a verification link to[email]
          </p>

          <Link
            to="/"
            className="px-6 py-3 bg-[#270450]
           text-[#ffff]  font-semibold rounded-lg shadow hover:bg-[##270450]/90"
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

export default EmailVerification;
