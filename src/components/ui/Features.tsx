
function Features() {
  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="width container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-12">Features Of Promptpal</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="bg-gray-300 h-40 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Prompt Templates & Library</h3>
            <p>
              Access a growing collection of ready-to-use prompts across various
              fields, helping you save time and stay creative.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="bg-gray-300 h-40 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Refinement Tools</h3>
            <p>
              Fine-tune your prompts with smart editing and testing tools,
              ensuring you get the best results from AI models.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="bg-gray-300 h-40 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p>
              Work smarter together. Share prompts with your team, collaborate on
              ideas, and refine them collectively for better outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
