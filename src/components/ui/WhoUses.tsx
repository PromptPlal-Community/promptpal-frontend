
// src/components/WhoUses.tsx

import React from "react";

function WhoUses() {
  return (
    <section className="w-full bg-white py-12 px-6 lg:px-20">
      {/* Title */}
      <div className=" width text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-purple-700 mb-4">
          Who Uses PromptPal
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Made for creators of every kind, from writers and designers to marketers and developers. 
          PromptPal adapts to your workflow, helping you craft better prompts.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-gray-500">[ Image Placeholder ]</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Content Creators & Writers
          </h3>
          <p className="text-gray-600 text-sm">
            Use ready-made prompt templates to generate blogs, scripts, or social content faster.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-gray-500">[ Image Placeholder ]</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Designers & Visual Artists
          </h3>
          <p className="text-gray-600 text-sm">
            Transform ideas into AI-generated visuals by crafting prompts that produce consistent styles.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-gray-500">[ Image Placeholder ]</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Marketing Teams & Agencies
          </h3>
          <p className="text-gray-600 text-sm">
            Collaborate on prompts to keep campaigns aligned, test messaging variations, and save time.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-gray-500">[ Image Placeholder ]</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Developers
          </h3>
          <p className="text-gray-600 text-sm">
            292 Fill & 248, prompts for apps, chatbots, or AI-powered tools with version history & analytics.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhoUses;
