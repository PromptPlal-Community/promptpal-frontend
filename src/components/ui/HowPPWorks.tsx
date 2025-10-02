import { FaArrowRight } from "react-icons/fa";

function HowPPWorks() {
  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="width container mx-auto px-6">
        <h2 className="text-3xl font-bold heading text-[#270450] mb-4">
          How Promptpal Works
        </h2>

        <div className="text text-lg">
          <p>
            PromptPal comes packed with powerful features to help you create,
            refine, and manage prompts with ease, whether you’re working solo or
            collaborating with a team.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-12">
          {/* Step 1 */}

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">
                Select or create a prompt
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Choose from PromptPal’s curated templates or start fresh with
                your own idea.
              </p>

              <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center">
                <span className="text-[#270450] font-bold"> Image</span>
              </div>
            </div>
            <p className="mx-1">
              <FaArrowRight />
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Refine & Tailor</h3>
              <p className="text-gray-600 text-sm mb-2">
                Adjust tone, style, and clarity using smart refinement tools.
              </p>

              <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center">
                <span className="text-[#270450] font-bold"> Image</span>
              </div>
            </div>
            <p className="mx-1">
              <FaArrowRight />
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Test & Compare</h3>
              <p className="text-gray-600 text-sm mb-2">
                Run variations and compare outputs to find the best-performing
                prompt.
              </p>

              <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center">
                <span className="text-[#270450] font-bold"> Image</span>
              </div>
            </div>
            <p className="mx-1">
              <FaArrowRight />
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <div>
              <h3 className="font-bold text-lg mb-1">Use & Share</h3>
              <p className="text-gray-600 text-sm mb-2">
                Save, export, or collaborate with your team for future use.
              </p>

              <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center">
                <span className="text-[#270450] font-bold"> Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowPPWorks;
