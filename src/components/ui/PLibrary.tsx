import { Link } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaBookmark,
  FaUser,
  FaEye,
  FaCode,
  FaPencilAlt,
} from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";

function PLibrary() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className=" width container mx-auto px-6">
        <h2 className="text-3xl heading font-bold text-[#270450] mb-4">
          Our Prompt Library
        </h2>
        <p className=" text mb-12 text-lg text-gray-600">
          A curated collection of ready-to-use prompts to save time and spark
          creativity. Get proven, structured prompts for writing, design,
          brainstorming, and more.
        </p>

        <form>
          <div className=" searchbar flex items-center border  px-2 py-1">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Find Prompts"
              className="outline-none"
            />
          </div>
        </form>

        <div className=" grid md:grid-cols-3 gap-8 mb-10">
          {/* Card 1 */}
          <div className="bg-[#F7EFFF] rounded-xl shadow p-6 text-left">
            <div className="libraryCardTop">
              <button className="flex items-center space-x-1 bg-[#E9D9FD] pt-2 p-2 rounded-xl ">
                <FaCode />
                <span>Coding</span>
              </button>

              <p>
                <FaHeart className="text-gray-500" />
              </p>
            </div>
            <h3 className="font-bold text-gray-800 mb-3.5 text-xl">
              React Component Documentation
            </h3>
            <p className="text-gray-600">
              Generate comprehensive documentation for your React components
              with clear examples and usage....
            </p>
            <div className="bg-[#E9D9FD] h-47 mt-4 rounded-lg">
              <div className="width">
                <p className="text-gray-400 text-l pt-2 ">Output Preview:</p>

                <p className="text-gray-700 text-l pt-2">
                  # Button Component ## Description A reusable button component
                  with multiple variants and sizes. ## Props - variant:
                  'primary' | 'secondary' | 'outline' - size: 'sm' | 'md' | 'lg'
                  - disabled: boolean
                </p>
              </div>
            </div>

            <div className="libBtn">
              <button className="bg-[#E9D9FD] text-gray-600">React</button>
              <button className="bg-[#E9D9FD] text-gray-600">
                Documentation
              </button>
              <button className="bg-[#E9D9FD]  text-gray-600">
                Components
              </button>
              <button className="bg-[#E9D9FD] text-gray-600 mt-4 ">
                Typescript
              </button>
            </div>

            <div className="line"></div>

            <div className="flex space-x-6 text-gray-700 mt-5">
              <p className="flex items-center space-x-1">
                <FaHeart className="text-gray-500" />
                <span>98</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaBookmark className="text-gray-500" />
                <span>67</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaEye className="text-gray-500" />
                <span>1.2k</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaUser className="text-gray-500" />
                <span>Alex Joe</span>
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFBED] rounded-xl shadow p-6 text-left">
            <div className="libraryCardTop">
              <button className="flex items-center space-x-1 bg-[#FEFFDC] pt-2 p-2 rounded-xl ">
                <MdOutlineDesignServices />
                <span>Design</span>
              </button>

              <p>
                <FaHeart className="text-gray-500" />
              </p>
            </div>
            <h3 className="font-bold text-gray-800 mb-3.5 text-xl">
              UI/UX Design Critique
            </h3>
            <p className="text-gray-600">
              Get detailed feedback on your designs, including layout,
              accessibility, and user flow suggestions.....
            </p>
            <div className="bg-[#FEFFDC] h-47 mt-4 rounded-lg">
              <div className="width">
                <p className="text-gray-400 text-l pt-2 ">Output Preview:</p>

                <p className="text-gray-700 text-l pt-2">
                  Receive detailed insights on layout, color choices, usability,
                  and flow, highlighting strengths, weaknesses, and practical
                  improvements for a more user-friendly experience.
                </p>
              </div>
            </div>

            <div className="libBtn">
              <button className="bg-[#FEFFDC] text-gray-600">Ui/Ux</button>
              <button className="bg-[#FEFFDC] text-gray-600">Critique</button>
              <button className="bg-[#FEFFDC]  text-gray-600">Designs</button>
              <button className="bg-[#FEFFDC] text-gray-600 ">Feedback</button>
            </div>

            <div className="line"></div>

            <div className="flex space-x-6 text-gray-700 mt-5">
              <p className="flex items-center space-x-1">
                <FaHeart className="text-gray-500" />
                <span>189</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaBookmark className="text-gray-500" />
                <span>78</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaEye className="text-gray-500" />
                <span>1.5k</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaUser className="text-gray-500" />
                <span>Designguru</span>
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#E5F1F2] border rounded-xl shadow p-6 text-left">
            <div className="libraryCardTop">
              <button className="flex items-center space-x-1 bg-[#CBEFF3] pt-2 p-2 rounded-xl ">
                <FaPencilAlt />
                <span>Coding</span>
              </button>

              <p>
                <FaHeart className="text-gray-500" />
              </p>
            </div>
            <h3 className="font-bold text-gray-800 mb-3.5 text-xl">
              Creative Writing Sparks
            </h3>
            <p className="text-gray-600">
              Discover unique story ideas and character prompts to inspire your
              next creative project....
            </p>
            <div className="bg-[#CBEFF3] h-47 mt-4 rounded-lg">
              <div className="width">
                <p className="text-gray-400 text-l pt-2 ">Output Preview:</p>

                <p className="text-gray-700 text-l pt-2">
                  AI reviews your drafts to refine storytelling, polish
                  language, and suggest improvements that make your writing more
                  engaging and impactful.
                </p>
              </div>
            </div>

            <div className="libBtn">
              <button className="bg-[#CBEFF3] text-gray-600">creative</button>
              <button className="bg-[#CBEFF3] text-gray-600">
                Storytelling
              </button>
              <button className="bg-[#CBEFF3]  text-gray-600">Fiction</button>
            </div>

            <div className="line"></div>

            <div className="flex space-x-6 text-gray-700 mt-5">
              <p className="flex items-center space-x-1">
                <FaHeart className="text-gray-500" />
                <span>158</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaBookmark className="text-gray-500" />
                <span>67</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaEye className="text-gray-500" />
                <span>790</span>
              </p>

              <p className="flex items-center space-x-1">
                <FaUser className="text-gray-500" />
                <span>Writerpro</span>
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/register"
          className="inline-block px-6 py-3 bg-[#270450] text-white rounded-lg font-semibold shadow hover:bg-[#270450]/80"
        >
          Browse all prompts
        </Link>
      </div>
    </section>
  );
}

export default PLibrary;
