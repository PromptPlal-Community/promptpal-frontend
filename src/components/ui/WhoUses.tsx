import contentCreatorImage from "../../assets/images/content-creator.png"
import designerImage from "../../assets/images/designer.png"
import marketingImage from "../../assets/images/marketing.png"
import developerImage from "../../assets/images/developer.png"



function WhoUses() {
  return (
    <section className="w-full py-12 px-6 lg:px-20">
      {/* Title */}
      <div className=" width mb-12">
        <h2 className="text-3xl lg:text-4xl heading font-bold text-[#270450] mb-4">
          Who Uses PromptPal
        </h2>
        <p className="text-gray-600  text-lg text">
          Made for creators of every kind, from writers and designers to
          marketers and developers. PromptPal adapts to your workflow, helping
          you craft better prompts.
        </p>
      </div>

      <div className=" mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-full   rounded-xl mb-3 flex items-center justify-center">
            <img src={contentCreatorImage} alt="save time with prompt-pal"
              className="whyPPImage"
            />
          </div>
          <div className="text-90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Content Creators & Writers
            </h3>
            <p className="text-gray-600 text-sm">
              Use ready-made prompt templates to generate blogs, scripts, or
              social content faster.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className=" p-6 flex flex-col items-center">
          <div className="w-full rounded-xl mb-3 flex items-center justify-center">
            <img src={designerImage} alt="save time with prompt-pal"
              className="whyPPImage"
            />
          </div>
          <div className="text-90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
              Designers & Visual Artists
            </h3>
            <p className="text-gray-600 text-sm">
              Transform ideas into AI-generated visuals by crafting prompts that
              produce consistent styles.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className=" p-6 flex flex-col items-center">
          <div className="w-full rounded-xl mb-3 flex items-center justify-center">
            <img src={marketingImage} alt="save time with prompt-pal"
              className="whyPPImage"
            />
          </div>
          <div className="text-90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Marketing Teams & Agencies
            </h3>
            <p className=" text-sm">
              Collaborate on prompts to keep campaigns aligned, test messaging
              variations, and save time.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className=" p-6 flex flex-col items-center">
          <div className="w-full rounded-xl mb-3 flex items-center justify-center">
            <img src={developerImage} alt="save time with prompt-pal"
              className="whyPPImage"
            />
          </div>
          <div className="text-90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Developers & AI Enthusiasts
            </h3>
            <p className="text-gray-600 text-sm">
              Experiment, refine, and analyze prompts for apps, chatbots, or
              AI-powered tools with version history + analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoUses;
