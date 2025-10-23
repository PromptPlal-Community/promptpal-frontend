import { Link } from "react-router-dom";
import bannerImage from "../../assets/images/erasebg-transformed.png";

function LandingPage() {
  return (
    <section className="bg-[#270450]  text-white min-h-screen flex items-center justify-center pt-10 w-full md:min-h-[60vh]  lg:min-h-[100vh]">
      <div className=" width container mx-auto px-6 md:text-left grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Better Prompts. <br /> Better AI Results.
          </h1>
          <p className="mt-6  mb-8 text-lg">
            A community-driven AI prompt library where you can discover, share,
            and refine prompts for coding, design, writing, and more.
          </p>

          <Link
            to="/register"
            className="px-6 py-3 bg-[#FADC66]
           text-[#270450]  font-semibold rounded-lg shadow hover:bg-[#FADC66]/90"
          >
            Get Started for Free
          </Link>
        </div>

        <div className="">
          <img
            src={bannerImage}
            alt="AI Prompt Library Illustration"
            className="bannerImg "
          />

          {/* rounded-lg w-full h-auto max-w-md mx-auto */}
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
