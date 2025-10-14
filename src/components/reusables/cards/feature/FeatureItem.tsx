import React from 'react';
import FeatureCard from './FeatureCard';

// Define the feature item type
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

// Define the props for the Features component
interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
}

const FeatureItem = ({ 
  title = "Features Of Promptpal", 
  subtitle = "PromptPal comes packed with powerful features to help you create, refine, and manage prompts with ease, whether you're working solo or collaborating with a team.",
  features 
}: FeaturesProps) => {
  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="max-w-6xl container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#270450] mb-4">
            {title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              imageUrl={feature.imageUrl}
              imageAlt={feature.imageAlt}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureItem;