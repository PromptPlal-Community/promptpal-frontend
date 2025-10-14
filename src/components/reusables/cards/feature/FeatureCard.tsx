import React from 'react';

// Define the prop types for the component
interface FeatureCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

const FeatureCard = ({ imageUrl, imageAlt, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Image container */}
      <div className="mb-5">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="w-full h-auto object-cover rounded-sm"
        />
      </div>
      
      {/* Content section */}
      <h3 className="text-xl font-bold mb-3 text-[#270450]">
        {title}
      </h3>
      <p className="flex-grow">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
