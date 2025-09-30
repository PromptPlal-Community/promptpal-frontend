
import { Link } from "react-router-dom";

function PLibrary() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className=" width container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-8">Our Prompt Library</h2>
        <p className="mb-12 text-lg text-gray-600">
          A curated collection of ready-to-use prompts to save time and spark creativity. 
          Get proven, structured prompts for writing, design, brainstorming, and more.
        </p>

        {/* Prompt Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Card 1 */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl shadow p-6 text-left">
            <h3 className="font-semibold text-purple-700 mb-2">React Component Documentation</h3>
            <p className="text-gray-600 text-sm">
              Generate comprehensive documentation for your React components with clear examples and usage.
            </p>
            <div className="bg-gray-300 h-32 mt-4 flex items-center justify-center rounded-lg">
              <span className="text-purple-700 font-bold">[ Image ]</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow p-6 text-left">
            <h3 className="font-semibold text-yellow-600 mb-2">UI/UX Design Critique</h3>
            <p className="text-gray-600 text-sm">
              Get detailed feedback on your designs, including layout, accessibility, and user flow suggestions.
            </p>
            <div className="bg-gray-300 h-32 mt-4 flex items-center justify-center rounded-lg">
              <span className="text-yellow-600 font-bold">[ Image ]</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-green-50 border border-green-200 rounded-xl shadow p-6 text-left">
            <h3 className="font-semibold text-green-600 mb-2">Creative Writing Sparks</h3>
            <p className="text-gray-600 text-sm">
              Discover unique story ideas and character prompts to inspire your next creative project.
            </p>
            <div className="bg-gray-300 h-32 mt-4 flex items-center justify-center rounded-lg">
              <span className="text-green-600 font-bold">[ Image ]</span>
            </div>
          </div>
        </div>

        {/* Browse All Button */}
        {/* <Link
          to="/register"
          className="inline-block px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold shadow hover:bg-purple-800"
        >
          Browse all prompts
        </Link> */}
      </div>
    </section>
  );
}

export default PLibrary;
