
function HowPPWorks() {
  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="width container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-12">How Promptpal Works</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div>
            <div className="bg-gray-300 h-32 mb-4 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Select or create a prompt</h3>
            <p className="text-gray-600 text-sm">
              Choose from PromptPal’s curated prompts or craft your own with smart editing features.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="bg-gray-300 h-32 mb-4 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Refine & Tailor</h3>
            <p className="text-gray-600 text-sm">
              Adjust tone, style, and context to match your needs and desired outcome.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <div className="bg-gray-300 h-32 mb-4 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Test & Compare</h3>
            <p className="text-gray-600 text-sm">
              Run variations and compare results to find the best performing prompt.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <div className="bg-gray-300 h-32 mb-4 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Use or Share</h3>
            <p className="text-gray-600 text-sm">
              Save, export, or collaborate with teammates to refine future use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowPPWorks;
