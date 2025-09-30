
function About() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="width container mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
        
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">What is Promptpal</h2>
          <p className="mb-4">
            PromptPal is your smart assistant for crafting and refining prompts.
            Whether you’re a creator, marketer, or developer, PromptPal helps you
            save time, improve output quality, and collaborate seamlessly.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Craft better prompts – Boost results and streamline workflows.</li>
            <li>Extra features – Tools and libraries to supercharge your prompts.</li>
            <li>For everyone – Whether you’re a creator, marketer, or developer.</li>
          </ul>
        </div>

        {/* Placeholder Image */}
        <div className="bg-gray-300 rounded-lg h-64 md:h-80 flex items-center justify-center">
          <span className="text-purple-700 font-bold">[ About Image ]</span>
        </div>
      </div>
    </section>
  );
}

export default About;
