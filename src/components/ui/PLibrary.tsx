import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { PromptCard } from "../dashboard/library";
import { mockPrompts } from "../../types/mockPrompts";
import { usePrompts } from "../../hooks/usePrompts";
import { useState, useEffect } from "react";

interface LibraryProps {
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onDownload?: (id: string) => void;
  onCopy?: (id: string) => void;
  onView?: (id: string) => void;
  onShare?: (id: string) => void;
}

const PLibrary: React.FC<LibraryProps> = ({
  onFavorite,
  onDownload,
  onCopy,
  onView,
  onShare,
}) => {
  const { 
    getPublicPrompts,
    prompts, 
    loading,
  } = usePrompts();

  const [localInteractions, setLocalInteractions] = useState<{
    [key: string]: {
      liked: boolean;
      favorited: boolean;
    }
  }>({});

  const [displayPrompts, setDisplayPrompts] = useState(mockPrompts.slice(0, 3));
  const [apiFailed, setApiFailed] = useState(false);

  // Fetch public prompts on component mount
  useEffect(() => {
    const fetchPublicPrompts = async () => {
      try {
        setApiFailed(false);
        await getPublicPrompts();
      } catch (error) {
        console.error('API call failed, using mock data:', error);
        setApiFailed(true);
      }
    };

    fetchPublicPrompts();
  }, [getPublicPrompts]);

  useEffect(() => {
    if (!apiFailed && prompts && prompts.length > 0) {
      setDisplayPrompts(prompts.slice(0, 3));
    } else {
      setDisplayPrompts(mockPrompts.slice(0, 3));
    }
  }, [prompts, apiFailed]);

  const handleLike = async (id: string) => {
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        liked: true,
        disliked: false
      }
    }));
    console.log('Mock like for prompt:', id);
  };

  const handleDislike = async (id: string) => {
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        liked: false,
        disliked: true
      }
    }));
    console.log('Mock dislike for prompt:', id);
  };

  const handleFavorite = async (id: string) => {
    const currentFavorited = localInteractions[id]?.favorited;
    
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        favorited: !currentFavorited
      }
    }));

    console.log('Mock favorite for prompt:', id);
    if (onFavorite) {
      onFavorite(id);
    }
  };

  // Keep download, copy, view, share handlers as they work locally
  const handleDownload = async (id: string) => {
    try {
      const prompt = displayPrompts.find(p => p._id === id);
      if (!prompt) return;

      const content = `Prompt: ${prompt.title}\n\n${prompt.promptText}\n\nCategory: ${prompt.category}\nTags: ${prompt.tags?.join(', ')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (onDownload) {
        onDownload(id);
      }
    } catch (error) {
      console.error('Failed to download prompt:', error);
    }
  };

  const handleCopy = async (id: string) => {
    try {
      const prompt = displayPrompts.find(p => p._id === id);
      if (!prompt) return;

      await navigator.clipboard.writeText(prompt.promptText);
      
      if (onCopy) {
        onCopy(id);
      }

      console.log('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const handleView = async (id: string) => {
    // Mock implementation
    console.log('Mock view increment for prompt:', id);
    
    if (onView) {
      onView(id);
    }
  };

  const handleShare = async (id: string) => {
    try {
      const prompt = displayPrompts.find(p => p._id === id);
      if (!prompt) return;

      if (navigator.share) {
        await navigator.share({
          title: prompt.title,
          text: prompt.description,
          url: `${window.location.origin}/prompts/${id}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/prompts/${id}`);
      }

      if (onShare) {
        onShare(id);
      }
    } catch (error) {
      console.error('Failed to share prompt:', error);
    }
  };

  return (
    <section className="pLibrary py-8 md:py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#270450] mb-3 md:mb-4 px-4">
            Our Prompt Library
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl px-4 md:px-0 leading-relaxed">
            A curated collection of ready-to-use prompts to save time and spark
            creativity. Get proven, structured prompts for writing, design,
            brainstorming, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 md:mb-12 px-4">
          <div className="relative w-full max-w-2xl">
            <div className="flex items-center border border-gray-300 rounded-2xl md:rounded-3xl px-4 py-3 w-full bg-white shadow-sm">
              <FaSearch className="text-gray-500 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Find Prompts"
                className="outline-none w-full bg-transparent text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && !apiFailed && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-sm md:text-base">Loading prompts...</p>
          </div>
        )}

        {/* API Failed Message */}
        {apiFailed && (
          <div className="text-center py-3 md:py-4 mb-4">
            <p className="text-orange-600 text-sm md:text-base px-4">
              Showing sample prompts - sign up to access the full library!
            </p>
          </div>
        )}

        {/* Prompts Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 md:mb-10">
          {displayPrompts.map((prompt) => (
            <div key={prompt._id} className="w-full">
              <PromptCard
                prompt={prompt}
                onLike={() => handleLike(prompt._id)}
                onDislike={() => handleDislike(prompt._id)}
                onFavorite={() => handleFavorite(prompt._id)}
                onDownload={() => handleDownload(prompt._id)}
                onCopy={() => handleCopy(prompt._id)}
                onView={() => handleView(prompt._id)}
                onShare={() => handleShare(prompt._id)}
                interactions={localInteractions[prompt._id]}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-center px-4">
          <Link
            to="/register"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-[#270450] text-white rounded-lg font-semibold text-sm md:text-base shadow hover:bg-[#270450]/80 transition-colors duration-200 text-center w-full sm:w-auto"
          >
            Browse all prompts
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PLibrary;