function WhyPromptpal() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="width container mx-auto px-6 ">
        <h2 className="text-3xl font-bold heading text-[#270450] mb-4">
          Why Promptpal
        </h2>

        <p className="text  text-lg ">
          PromptPal helps you save time, improve results, and collaborate
          smarter, making prompt creation simple, consistent, and scalable.
        </p>

        <div className=" whyPp bg-gray-100">
          {/* Reason 1 */}
          <div className="  whyPPDiv ">
            <div className="bg-gray-300 whyPPImage">
              <span className="text-[#270450] font-bold"> Image</span>
            </div>
            <div className="whyPPText">
              <h3 className="font-bold mb-2 text-gray-800">
                Save time by reducing guesswork
              </h3>
              <p className="text-gray-600 ">
                PromptPal provides curated templates and smart tools so you
                don’t waste time trial-and-erroring prompts.
              </p>
            </div>
          </div>

          {/* Reason 2 */}
          <div className="  whyPPDiv ">
            <div className="bg-gray-300  whyPPImage  ">
              <span className="text-[#270450] font-bold">Image</span>
            </div>
            <div className="whyPPText">
              <h3 className="font-bold mb-2 text-gray-800">
                Better, more consistent AI outputs
              </h3>
              <p className="text-gray-600 ">
                Refinement tools ensure your outputs align with the tone, style,
                and clarity you need every time.
              </p>
            </div>
          </div>

          {/* Reason 3 */}
          <div className="  whyPPDiv">
            <div className="bg-gray-300  whyPPImage ">
              <span className="text-[#270450] font-bold"> Image</span>
            </div>
            <div className="whyPPText">
              <h3 className="font-bold mb-2 text-gray-800">
                Streamlined collaboration for teams
              </h3>
              <p className="text-gray-600">
                Teams can share, edit, and build on prompts together, keeping
                everyone aligned on messaging and style.
              </p>
            </div>
          </div>

          {/* Reason 4 */}
          <div className=" whyPPDiv">
            <div className="bg-gray-300 whyPPImage">
              <span className="text-[#270450] font-bold"> Image</span>
            </div>
            <div className="whyPPText">
              <h3 className="font-bold mb-2 text-gray-800">
                Data-driven improvement with analytics
              </h3>
              <p className="text-gray-600">
                Built-in version history and analytics show which prompts work
                best, helping you continuously optimize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyPromptpal;
