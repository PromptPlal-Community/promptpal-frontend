function Features() {
  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="width container mx-auto px-6 ">
        <h2 className="text-3xl heading font-bold text-[#270450] mb-4">
          Features Of Promptpal
        </h2>

        <p className="text text-lg">
          PromptPal comes packed with powerful features to help you create,
          refine, and manage prompts with ease, whether you’re working solo or
          collaborating with a team.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="bg-gray-300 h-40 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-[#270450] font-bold"> Image</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Prompt Templates & Library
            </h3>
            <p>
              Access a growing collection of curated, ready-to-use prompts
              designed for different use cases, from writing and design to
              coding and marketing.Instead of starting from scratch, you can
              pick a template and adapt it instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="bg-gray-300 h-40 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-[#270450] font-bold">Image</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Refinement Tools</h3>
            <p>
              Fine-tune your prompts with smart editing tools that help you
              improve tone, clarity, style, and structure. Whether you need more
              professional, casual, or creative outputs, PrompPal ensures your
              prompts always deliver the right results.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="bg-gray-300 h-40 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-[#270450] font-bold">Image</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p>
              Work smarter together. Share prompts with your team, build
              collections, and refine them collaboratively. Perfect for
              agencies, marketing teams, or developers who want consistency
              across projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
