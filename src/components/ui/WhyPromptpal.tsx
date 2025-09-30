
function WhyPromptpal() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="width container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-12">Why Promptpal</h2>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Reason 1 */}
          <div className="flex space-x-4">
            <div className="bg-gray-300 h-20 w-20 flex items-center justify-center rounded-lg">
              <span className="text-purple-700 font-bold">[ Icon ]</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-700">Save time by reducing guesswork</h3>
              <p className="text-gray-600 text-sm">
                PromptPal provides curated suggestions to cut trial-and-error, helping you work faster.
              </p>
            </div>
          </div>

          {/* Reason 2 */}
          <div className="flex space-x-4">
            <div className="bg-gray-300 h-20 w-20 flex items-center justify-center rounded-lg">
              <span className="text-purple-700 font-bold">[ Icon ]</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-700">Better, more consistent AI outputs</h3>
              <p className="text-gray-600 text-sm">
                Achieve high-quality, reliable results by refining prompts with precision tools.
              </p>
            </div>
          </div>

          {/* Reason 3 */}
          <div className="flex space-x-4">
            <div className="bg-gray-300 h-20 w-20 flex items-center justify-center rounded-lg">
              <span className="text-purple-700 font-bold">[ Icon ]</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-700">Streamlined collaboration for teams</h3>
              <p className="text-gray-600 text-sm">
                Teams can co-build and refine prompts together, making workflows smoother.
              </p>
            </div>
          </div>

          {/* Reason 4 */}
          <div className="flex space-x-4">
            <div className="bg-gray-300 h-20 w-20 flex items-center justify-center rounded-lg">
              <span className="text-purple-700 font-bold">[ Icon ]</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-700">Data-driven improvement with analytics</h3>
              <p className="text-gray-600 text-sm">
                Monitor which prompts work best and optimize with insights for continuous growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyPromptpal;
