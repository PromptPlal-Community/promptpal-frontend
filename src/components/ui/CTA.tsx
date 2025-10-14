import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="">
      <div className="max-w-5xl mx-auto px-3">
        <div className=" bg-[#ffff] border-2 border-[#00153E] rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold md:text-left text-[#00153E]">
            Ready to take your AI prompting to the next level?
          </h2>
          <Link
            to="/register"
            className="px-6 py-2 bg-[#270450] text-gray-100 font-semibold rounded-lg shadow hover:bg-[#270450]/80 transition"
          >
            Start Free Today
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
