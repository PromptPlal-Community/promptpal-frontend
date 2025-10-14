import type { ReactNode } from "react";

interface HowPPWorksCardProps {
  stepNumber?: number;
  title: string;
  description: string;
  image?: ReactNode;
  showArrow?: boolean;
  imagePlaceholder?: string;
  altPlaceholder?: string;
  className?: string;
}

export default function HowPPWorksCard({
  stepNumber,
  title,
  description,
  image,
  imagePlaceholder = "Image",
  altPlaceholder = "Step illustration",
  className = "",
}: HowPPWorksCardProps) {
  return (
    <div className={`flex items-center justify-between bg-white shadow-sm rounded-lg p-4 w-60 ${className}`}>
      <div className="flex-1">
        {stepNumber && (
          <div className="text-sm text-gray-500 mb-1">Step {stepNumber}</div>
        )}
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="bg-gray-100 h-fit w-fit rounded-lg flex items-center justify-center overflow-hidden">
          {image ? (
            image
          ) : (
            <>
              {imagePlaceholder.startsWith("http") || imagePlaceholder.includes("/") ? (
                <img 
                  src={imagePlaceholder}
                  alt={altPlaceholder} 
                  className="h-full w-fit object-cover"
                />
              ) : (
                <span className="text-[#270450] font-bold text-center px-2">{imagePlaceholder}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}