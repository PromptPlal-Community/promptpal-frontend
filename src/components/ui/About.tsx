import generateAIPromptImage from "../../assets/images/generate-image.png"


function About() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="width container mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-[#270450] mb-4">
            What is Promptpal
          </h2>
          <p className="mb-4  text-lg">
            PrompPal is your smart assistant for crafting and refining prompts.
            Whether you’re a creator, marketer, or developer, PrompPal helps you
            save time, improve output quality, and collaborate seamlessly.
          </p>
          <ul className="list-disc pl-6 space-y-2  text-lg">
            <li>
              Craft Better Prompts – Get intelligent assistance to create
              effective prompts.
            </li>

            <li>
              Save Time – Reduce trial-and-error and speed up your workflow.
            </li>

            <li>
              Improve Output Quality – Consistently generate higher-quality AI
              results.
            </li>

            <li>
              Collaborate Easily – Share and refine prompts with your team.
            </li>

            <li>
              For Everyone – Whether you’re a creator, marketer, or developer,
              PrompPal adapts to your needs.
            </li>
          </ul>
        </div>

        {/* Placeholder Image */}
        <div className="bg-gray-300 rounded-lg w-130 h-64 md:h-80 flex items-center justify-center">
          <img
          src={generateAIPromptImage}
          alt="Generate AI Prompt"
          className="flex h-80 w-110"
          
          />
        </div>
      </div>
    </section>
  );
}

export default About;
