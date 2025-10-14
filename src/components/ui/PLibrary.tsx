import { Link } from "react-router-dom";
import { FaSearch,} from "react-icons/fa";
import { PromptCard } from "../dashboard/library";
import { mockPrompts } from "../../types/mockPrompts";

function PLibrary() {
  return (
    <section className="py-16 bg-white text-gray-800 w-full">
      <div className="container mx-auto px-6 flex flex-col w-320 ">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-[#270450] mb-4">
          Our Prompt Library
        </h2>
        <p className="mb-12 text-lg text-gray-600 w-160 items-center justify-center">
          A curated collection of ready-to-use prompts to save time and spark
          creativity. Get proven, structured prompts for writing, design,
          brainstorming, and more.
        </p>
        <form>
          <div className="flex items-center justify-center border border-gray-300 rounded-4xl px-4 py-3 mb-8 max-w-2xl w-100">
            <FaSearch className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Find Prompts"
              className="outline-none w-full"
            />
          </div>
        </form>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Use the new PromptCard component with the first 3 mock prompts */}
          {mockPrompts.slice(0, 3).map((prompt) => (
            <div key={prompt._id} className="prompt-card-wrapper">
              <PromptCard
                prompt={prompt}
                onLike={(id) => console.log('Liked:', id)}
                onBookmark={(id) => console.log('Bookmarked:', id)}
                onDownload={(id) => console.log('Downloaded:', id)}
              />
            </div>
          ))}
        </div>
      <div className="flex items-center justify-center">
        <Link
          to="/register"
          className="inline-block px-6 py-3 bg-[#270450] text-white rounded-lg font-semibold shadow hover:bg-[#270450]/80"
        >
          Browse all prompts
        </Link>
      </div>
      </div>
    </section>
  );
}

export default PLibrary;