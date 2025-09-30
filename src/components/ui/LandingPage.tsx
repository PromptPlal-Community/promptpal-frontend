
function LandingPage() {
  return (
    <section className="bg-purple-900 text-white min-h-screen flex items-center justify-center pt-20">
      <div className=" width container mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Better Prompts. <br /> Better AI Results.
          </h1>
          <p className="mt-6 text-lg">
            A community-driven AI prompt library where you can discover, share,
            and refine prompts for coding, design, writing, and more.
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-400 text-purple-900 font-semibold rounded-lg shadow hover:bg-yellow-500">
            Get Started for Free
          </button>
        </div>

        {/* Placeholder Image */}
        <div className="bg-gray-300 rounded-lg h-64 md:h-80 flex items-center justify-center">
          <span className="text-purple-900 font-bold">[ Landing Image ]</span>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
