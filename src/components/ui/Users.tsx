
import React from "react";

function Users() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="width  ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          What Our Users Are Saying
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Creators, marketers, and developers trust PromptPal to simplify
          prompting, boost productivity, and deliver better results. Here’s
          what they have to say.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* User 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Daniel"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-800">Jane Daniel</h3>
            <p className="text-sm text-gray-500">Content Creator</p>
            <p className="mt-4 text-gray-600 text-sm">
              PromptPal helps me cut prompt iteration time by 70%. It’s like
              having a creative assistant by my side.
            </p>
            <div className="mt-4 text-yellow-400">★★★★★</div>
          </div>

          {/* User 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Alex Raymond"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-800">Alex Raymond</h3>
            <p className="text-sm text-gray-500">Freelance Writer</p>
            <p className="mt-4 text-gray-600 text-sm">
              The templates as a freelancer are a lifesaver. Instead of wasting
              hours tweaking, I can deliver polished prompts fast.
            </p>
            <div className="mt-4 text-yellow-400">★★★★★</div>
          </div>

          {/* User 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Chris Morgan"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-800">Chris Morgan</h3>
            <p className="text-sm text-gray-500">Marketing Analyst</p>
            <p className="mt-4 text-gray-600 text-sm">
              Sharing prompts across my team became seamless. PromptPal makes
              collaboration efficient and smooth.
            </p>
            <div className="mt-4 text-yellow-400">★★★★★</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Users;
