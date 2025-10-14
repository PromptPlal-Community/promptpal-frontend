import HowPPWorksCard from "../reusables/cards/HowPPWorksCard";
import createPromptImage from "../../assets/images/create-prompt.png";
import refineImage from "../../assets/images/refine.png";
import testImage from "../../assets/images/test.png";
import shareImage from "../../assets/images/share.png";
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
            refine, and manage prompts with ease, whether you're working solo or
            collaborating with a team.
          </p>
        </div>

        <div className="flex flex-row gap-3 items-center justify-center mt-10">
          {/* Step 1 */}
          <HowPPWorksCard
            stepNumber={1}
            title="Select or create a prompt"
            description="Choose from PromptPal's curated templates or start fresh with your own idea."
            imagePlaceholder={createPromptImage}
            altPlaceholder="Create prompt interface"
          />

          <p className="mx-1">
            <FaArrowRight />
           </p>

          {/* Step 2 */}
          <HowPPWorksCard
            stepNumber={2}
            title="Refine & Tailor"
            description="Run variations and compare outputs to find the best-performing prompt."
            imagePlaceholder={refineImage}
            altPlaceholder="Refinement tools"
          />
          <p className="mx-1">
            <FaArrowRight />
           </p>
          {/* Step 3 */}
          <HowPPWorksCard
            stepNumber={3}
            title="Test & Compare"
            description="Adjust tone, style, and clarity using smart refinement tools."
            imagePlaceholder={testImage}
            altPlaceholder="Testing interface"
          />
          <p className="mx-1">
            <FaArrowRight />
           </p>

          {/* Step 4 */}
          <HowPPWorksCard
            stepNumber={4}
            title="Use & Share"
            description="Save, export, or collaborate with your team for future use."
            imagePlaceholder={shareImage}
            altPlaceholder="Sharing options"
            showArrow={false}
          />
        </div>
      </div>
    </section>
  );
}

export default HowPPWorks;