function PricingPlan() {
  return (
    <section className="py-16 bg-white">
      <div className=" width">
        <h2 className="text-3xl font-bold heading text-gray-800 mb-4">
          Pricing Plan
        </h2>
        <p className="text  text-lg text-gray-600 mb-12">
          Choose the plan that fits your workflow, whether you’re just getting
          started or scaling across teams, PromptPal has flexible options for
          everyone.
        </p>

        <div className="grid gap-8 md:grid-cols-3 mt-7">
          {/* Free Plan */}
          <div className="bg-[linear-gradient(180deg,#F7EFFF_32.69%,rgba(255,253,192,0.2)_100%)] rounded-xl p-6 shadow-sm">
            <div className="priceWidth">
              <h3 className="text-xl font-semibold text-gray-800">Free</h3>
              <p className="text-2xl font-bold my-2">$0/Month</p>
              <ul className="text-gray-600 text-sm mb-6 space-y-2">
                <li>Limited prompt templates</li>
                <li>Basic refinements</li>
                <li>Basic performance</li>
              </ul>
              <button className="px-6 py-2 rounded-lg bg-[#270450] text-white hover:bg-[#270450]/80  transition">
                Select Plan
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className=" bg-[linear-gradient(180deg,#F7EFFF_32.69%,rgba(255,253,192,0.2)_100%)] rounded-xl p-6 shadow-md">
            <div className="priceWidth">
              <h3 className="text-xl font-semibold text-gray-800">Pro</h3>
              <p className="text-2xl font-bold my-2">$15/Month</p>
              <ul className="text-gray-600 text-sm mb-6 space-y-2">
                <li>Full Prompt Template Access</li>
                <li>Advanced Refinement Tools</li>
                <li>Analytics & Version History</li>
                <li>Export & Save Prompts</li>
                <li>Team Collaboration Features</li>
              </ul>
              <button className="px-6 py-2 rounded-lg bg-[#270450]  text-white hover:bg-[#270450]/80 transition">
                Select Plan
              </button>
            </div>
          </div>

          {/* Executive Plan */}
          <div className="bg-[linear-gradient(180deg,#F7EFFF_32.69%,rgba(255,253,192,0.2)_100%)] rounded-xl p-6  shadow-sm">
            <div className="priceWidth">
              <h3 className="text-xl font-semibold text-gray-800">Executive</h3>
              <p className="text-2xl font-bold my-2">$20/Month</p>
              <ul className="text-gray-600 text-sm mb-6 space-y-2">
                <li>Full Prompt Template Access</li>
                <li>Advanced Refinement Tools</li>
                <li>Analytics & Version History</li>
                <li>Exports & Save Prompts</li>
                <li>Team Collaboration Features</li>
                <li>Priority Support & Onboarding</li>
              </ul>
              <button className="px-6 py-2 rounded-lg bg-[#270450]  text-white hover:bg-[#270450]/80  transition">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPlan;
