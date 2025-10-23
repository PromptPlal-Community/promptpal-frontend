import FeatureItem from "../reusables/cards/feature/FeatureItem";

// Import images - adjust paths according to your project structure
import promptTemplatesImg from "../../assets/images/prompt-templates.png";
import refinementToolsImg from "../../assets/images/refinement-tools.png";
import collaborationImg from "../../assets/images/streamlined.png";

function Features() {
  // Define features data
  const featuresData = [
    {
      id: 1,
      title: "Prompt Templates & Library",
      description:
        "Access a growing collection of curated, ready-to-use prompts designed for different use cases, from writing and design to coding and marketing. Instead of starting from scratch, you can pick a template and adapt it instantly.",
      imageUrl: promptTemplatesImg,
      imageAlt: "Prompt template library illustration",
    },
    {
      id: 2,
      title: "Refinement Tools",
      description:
        "Fine-tune your prompts with smart editing tools that help you improve tone, clarity, style, and structure. Whether you need more professional, casual, or creative outputs, PrompPal ensures your prompts always deliver the right results.",
      imageUrl: refinementToolsImg,
      imageAlt: "Refinement tools illustration",
    },
    {
      id: 3,
      title: "Collaboration",
      description:
        "Work smarter together. Share prompts with your team, build collections, and refine them collaboratively. Perfect for agencies, marketing teams, or developers who want consistency across projects.",
      imageUrl: collaborationImg,
      imageAlt: "Collaboration illustration",
    },
  ];

  return (
    <div>
      {/* Your other components */}
      <FeatureItem features={featuresData} />
    </div>
  );
}

export default Features;
