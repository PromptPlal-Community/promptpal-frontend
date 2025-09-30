
import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-purple-900 text-white rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Ready to take your AI prompting to the next level?
          </h2>
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-purple-900 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Start Free Today
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
